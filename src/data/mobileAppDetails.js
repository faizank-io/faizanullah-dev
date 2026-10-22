// Case studies for the mobile app backends. Metrics here are deliberately
// qualitative (stack and platform facts) rather than usage numbers.

const platformMetrics = (realtime, extra, auth = { value: "Sanctum", unit: "tokens" }) => [
  { label: "Platforms", value: "iOS + Android", unit: "" },
  { label: "Auth", ...auth },
  { label: "Real-time", value: realtime, unit: "" },
  extra,
];

const jwt = { value: "JWT", unit: "access + refresh" };

export const mobileAppDetails = {
  "hotel-booking-app": {
    title: "Hotel Booking App — Mobile API",
    subtitle: "Search, Availability, Booking & Payments for a Hotel Booking Mobile App",
    liveUrl: null,
    githubUrl: null,
    techStack: ["Laravel", "PHP 8.2", "MySQL", "Sanctum", "Stripe", "FCM", "Redis"],
    badge: "iOS & Android API",
    metrics: platformMetrics("FCM push", { label: "Payments", value: "Stripe", unit: "" }),
    overview:
      "A versioned REST API powering a hotel booking app on iOS and Android. Guests search hotels by location and dates, see live room availability, book and pay in the app, manage their reservations and leave reviews after their stay. Hotel staff use the same backend to manage rooms, rates and bookings.",
    architecture: {
      description:
        "Laravel API with token authentication via Sanctum. Availability is calculated from a room-night inventory table rather than by scanning bookings, so search stays fast as data grows. Payments run through Stripe PaymentIntents, and booking state changes are pushed to the guest's device with Firebase Cloud Messaging through queued jobs.",
      flow: [
        "Mobile App",
        "Sanctum Auth",
        "Search & Availability",
        "Booking Hold",
        "Stripe PaymentIntent",
        "Webhook Confirmation",
        "FCM Notification",
      ],
      highlights: [
        "Room-night inventory model makes date-range availability queries simple and indexable",
        "Short-lived booking holds stop two guests paying for the same room at the same time",
        "Stripe webhooks are the single source of truth for marking a booking as paid",
        "API resources and versioned routes (/api/v1) keep mobile releases backward compatible",
      ],
    },
    challenges: [
      {
        title: "Preventing Double Bookings",
        problem:
          "Two guests could select the last available room at the same moment, and both reach the payment step.",
        solution:
          "Wrapped availability check and hold creation in a database transaction with row-level locks on the affected room-nights, and gave each hold an expiry so abandoned checkouts release the room automatically.",
        result: "Only one guest can hold a given room-night, and unpaid holds free themselves without manual clean-up.",
      },
      {
        title: "Reliable Payment Confirmation",
        problem:
          "Mobile networks drop mid-checkout, so the app can't always tell the server whether a payment succeeded.",
        solution:
          "Moved confirmation to Stripe webhooks with idempotent handlers; the app simply polls the booking status after returning from the payment sheet.",
        result: "Bookings are confirmed even when the app loses connection right after paying.",
      },
    ],
    features: [
      { title: "Search & Filters", description: "Search by city or area and dates, filter by price, rating and amenities, with paginated results tuned for mobile scrolling." },
      { title: "Room Booking", description: "Pick room type, dates and guests; the API returns a price breakdown with taxes before creating a booking hold." },
      { title: "In-App Payments", description: "Stripe PaymentIntents with 3-D Secure support and webhook-based confirmation." },
      { title: "Reservations & Reviews", description: "Guests view, modify or cancel upcoming stays and review hotels after check-out." },
    ],
    codeSnippet: {
      title: "BookingService.php",
      language: "php",
      code: `public function hold(Room $room, CarbonPeriod $nights, User $guest): Booking
{
    return DB::transaction(function () use ($room, $nights, $guest) {
        $taken = RoomNight::where('room_id', $room->id)
            ->whereBetween('date', [$nights->start, $nights->end])
            ->whereNotNull('booking_id')
            ->lockForUpdate()
            ->exists();

        if ($taken) {
            throw new RoomUnavailableException();
        }

        $booking = $guest->bookings()->create([
            'room_id' => $room->id,
            'status' => 'held',
            'expires_at' => now()->addMinutes(15),
        ]);

        RoomNight::where('room_id', $room->id)
            ->whereBetween('date', [$nights->start, $nights->end])
            ->update(['booking_id' => $booking->id]);

        return $booking;
    });
}`,
    },
  },

  "attendance-app": {
    title: "Smart Attendance App — Mobile API",
    subtitle: "Geofenced Check-ins, Selfie Verification, Shifts & Leave Management",
    liveUrl: null,
    githubUrl: null,
    techStack: ["Laravel", "PHP 8.2", "MySQL", "Sanctum", "FCM", "S3 Storage"],
    badge: "iOS & Android API",
    metrics: platformMetrics("FCM push", { label: "Location", value: "Geofencing", unit: "" }),
    overview:
      "Backend for a workforce attendance app. Employees check in and out from their phone only when they are inside an approved location, with a selfie captured at check-in. Managers see live attendance, late arrivals and leave requests, and HR exports monthly reports.",
    architecture: {
      description:
        "Each office or site is stored with a centre point and radius. On check-in the API validates the device's coordinates against the employee's assigned sites using a distance calculation, stores the selfie in object storage, and links the record to the employee's shift so lateness and overtime are computed on the server.",
      flow: [
        "Mobile App (GPS + Selfie)",
        "Sanctum Auth",
        "Geofence Validation",
        "Shift Matching",
        "Attendance Record",
        "Manager Dashboard",
      ],
      highlights: [
        "Server-side geofence checks so location rules can't be bypassed from the client",
        "Shift-aware records calculate late arrivals, early exits and overtime automatically",
        "Selfies stored in private object storage with signed URLs for managers",
        "Leave requests flow through manager approval with push notifications at each step",
      ],
    },
    challenges: [
      {
        title: "Trustworthy Location Checks",
        problem:
          "Attendance is only meaningful if staff are actually on site, but phone GPS can be inaccurate indoors.",
        solution:
          "Validated coordinates on the server with a configurable radius per site and stored the reported accuracy with each check-in, so borderline cases can be reviewed instead of silently rejected.",
        result: "Check-ins are enforced against real site boundaries while still handling weak indoor GPS fairly.",
      },
      {
        title: "Night Shifts Crossing Midnight",
        problem:
          "Shifts like 10 PM–6 AM span two calendar days, which broke simple per-day attendance logic.",
        solution:
          "Modelled attendance against the shift window instead of the calendar date, so a check-out after midnight closes the shift it belongs to.",
        result: "Overnight shifts calculate hours worked correctly without special-case reports.",
      },
    ],
    features: [
      { title: "Geofenced Check-in/out", description: "Check-in is accepted only inside an assigned site's radius, with location and accuracy recorded." },
      { title: "Selfie Verification", description: "A selfie is captured at check-in and stored privately for manager review." },
      { title: "Shifts & Rosters", description: "Fixed and rotating shifts with automatic late, early-exit and overtime calculation." },
      { title: "Leave Requests", description: "Employees request leave from the app; managers approve or reject with instant notifications." },
    ],
    codeSnippet: {
      title: "GeofenceService.php",
      language: "php",
      code: `public function isInside(Site $site, float $lat, float $lng): bool
{
    $earthRadius = 6371000; // metres

    $dLat = deg2rad($lat - $site->lat);
    $dLng = deg2rad($lng - $site->lng);

    $a = sin($dLat / 2) ** 2
        + cos(deg2rad($site->lat)) * cos(deg2rad($lat)) * sin($dLng / 2) ** 2;

    $distance = 2 * $earthRadius * asin(sqrt($a));

    return $distance <= $site->radius_m;
}`,
    },
  },

  "ride-hailing-rider-app": {
    title: "Ride-Hailing Rider App — Mobile API",
    subtitle: "Fare Estimates, Ride Booking, Driver Matching & Live Trip Tracking",
    liveUrl: null,
    githubUrl: null,
    techStack: ["Node.js", "Express", "MySQL", "Redis", "Socket.IO", "JWT", "FCM"],
    badge: "iOS & Android API",
    metrics: platformMetrics("Socket.IO", { label: "Matching", value: "Nearest driver", unit: "" }, jwt),
    overview:
      "Rider-side API for a ride-hailing service. Riders set pickup and drop-off, compare fare estimates for each vehicle type, request a ride, watch the assigned driver approach in real time, and pay at the end of the trip. Trip history and receipts are available in the app.",
    architecture: {
      description:
        "A Node.js and Express API with JWT authentication. Ride requests are matched to nearby online drivers using driver locations cached in Redis. Once a driver accepts, trip events and driver positions are pushed to the rider through a Socket.IO room for that trip, with push notifications as a fallback when the app is in the background.",
      flow: [
        "Rider App",
        "Fare Estimate",
        "Ride Request",
        "Driver Matching (Redis)",
        "Driver Accepts",
        "Live Tracking (Socket.IO)",
        "Trip Complete & Payment",
      ],
      highlights: [
        "Fare estimates calculated server-side from distance, time and vehicle type",
        "Driver positions held in Redis geo sets for fast nearest-driver lookups",
        "One Socket.IO room per trip, joined only after JWT verification, so riders only see their own trip",
        "Explicit trip state machine: requested → accepted → arrived → in progress → completed",
      ],
    },
    challenges: [
      {
        title: "Finding Nearby Drivers Quickly",
        problem:
          "Querying the main database for every online driver's latest position on each request would not scale with frequent location updates.",
        solution:
          "Kept live driver locations in Redis geo sets updated by the driver app, and queried them by radius to build a shortlist before touching MySQL.",
        result: "Matching reads from memory, and the database only stores trips, not every location ping.",
      },
      {
        title: "Consistent Trip State",
        problem:
          "Riders and drivers can tap buttons at the same time (e.g. cancel vs. accept), leading to conflicting trip states.",
        solution:
          "Implemented a trip state machine with allowed transitions enforced in one service, using conditional SQL updates so only one transition can win.",
        result: "Every trip follows a valid path and both apps always show the same status.",
      },
    ],
    features: [
      { title: "Fare Estimates", description: "Upfront prices per vehicle type before the rider confirms." },
      { title: "Ride Requests", description: "Request a ride and get matched with a nearby available driver." },
      { title: "Live Tracking", description: "Driver location and trip status streamed to the rider in real time." },
      { title: "Payments & History", description: "In-app payment at trip end, with receipts and past trips." },
    ],
    codeSnippet: {
      title: "driverLocator.js",
      language: "javascript",
      code: `// Nearest available drivers of a vehicle type, closest first
export async function nearestDrivers(redis, db, { lat, lng, type, limit = 5 }) {
  const ids = await redis.geosearch(
    \`drivers:online:\${type}\`,
    "FROMLONLAT", lng, lat,
    "BYRADIUS", 5, "km",
    "ASC", "COUNT", limit
  );
  if (ids.length === 0) return [];

  const [rows] = await db.query(
    "SELECT * FROM drivers WHERE id IN (?) AND status = 'available'",
    [ids]
  );

  return rows.sort((a, b) => ids.indexOf(String(a.id)) - ids.indexOf(String(b.id)));
}`,
    },
  },

  "ride-hailing-driver-app": {
    title: "Ride-Hailing Driver App — Mobile API",
    subtitle: "Driver Availability, Trip Dispatch, Navigation Events & Earnings",
    liveUrl: null,
    githubUrl: null,
    techStack: ["Node.js", "Express", "MySQL", "Redis", "Socket.IO", "BullMQ", "FCM"],
    badge: "iOS & Android API",
    metrics: platformMetrics("Socket.IO", { label: "Dispatch", value: "Timed offers", unit: "" }, jwt),
    overview:
      "Driver-side API for the same ride-hailing platform. Drivers go online, stream their location, receive trip offers with a short response window, move the trip through pickup and drop-off, and track their earnings and ratings for the day and week.",
    architecture: {
      description:
        "Built with Node.js and Express. Location updates arrive over Socket.IO, are written to Redis and relayed to the rider's trip room during active trips. Trip offers are sent to one driver at a time with a timeout; if a driver declines or doesn't answer, a delayed BullMQ job offers the trip to the next nearest driver.",
      flow: [
        "Driver App",
        "Go Online",
        "Location Stream (Redis)",
        "Timed Trip Offer",
        "Accept / Decline",
        "Trip Lifecycle",
        "Earnings Ledger",
      ],
      highlights: [
        "Sequential trip offers with timeouts handled by delayed BullMQ jobs",
        "Location updates throttled and batched to save battery and bandwidth",
        "Earnings recorded as ledger entries per trip for accurate daily and weekly summaries",
        "Driver ratings and acceptance rate computed from trip history",
      ],
    },
    challenges: [
      {
        title: "Offer Timeouts",
        problem:
          "A trip offer needs to move to the next driver if the first one doesn't respond within seconds, without blocking any request.",
        solution:
          "Dispatched each offer with a delayed job that re-checks the offer state when the window expires and escalates to the next candidate if it's still pending.",
        result: "Riders are not left waiting on unresponsive drivers, and the API stays non-blocking.",
      },
      {
        title: "Accurate Earnings",
        problem:
          "Earnings had to reflect fares, platform commission, cancellations and adjustments in a way drivers could trust.",
        solution:
          "Recorded every money movement as an immutable ledger entry tied to a trip, and derived summaries from the ledger.",
        result: "Drivers see a clear breakdown, and totals can always be traced back to individual trips.",
      },
    ],
    features: [
      { title: "Online / Offline", description: "Drivers control availability; only online drivers receive offers." },
      { title: "Trip Offers", description: "Timed offers with pickup distance and estimated fare, accept or decline in one tap." },
      { title: "Trip Lifecycle", description: "Arrived, start trip and complete trip events update the rider instantly." },
      { title: "Earnings & Ratings", description: "Daily and weekly earnings, trip counts and rating summaries." },
    ],
    codeSnippet: {
      title: "offerWorker.js",
      language: "javascript",
      code: `// BullMQ worker: offer a trip to the next driver, re-check after 15s
const worker = new Worker("trip-offers", async (job) => {
  const trip = await trips.findById(job.data.tripId);
  if (trip.status !== "requested") return; // accepted or cancelled

  const driver = await locator.nextCandidate(trip);
  if (!driver) {
    await trips.update(trip.id, { status: "no_drivers" });
    return;
  }

  await offers.create({ tripId: trip.id, driverId: driver.id });
  io.to(\`driver:\${driver.id}\`).emit("trip:offer", serializeTrip(trip));

  await offerQueue.add("offer", { tripId: trip.id }, { delay: 15_000 });
}, { connection: redis });`,
    },
  },

  "logistics-tracking-app": {
    title: "Logistics & Fleet Tracking App — Mobile API",
    subtitle: "Shipment Timelines, Dispatch, Fleet Status & Proof of Delivery",
    liveUrl: null,
    githubUrl: null,
    techStack: ["Node.js", "Express", "MySQL", "BullMQ", "S3 Uploads", "JWT", "FCM"],
    badge: "iOS & Android API",
    metrics: platformMetrics("FCM push", { label: "Proof", value: "Photo + sign", unit: "" }, jwt),
    overview:
      "API for a logistics company's mobile apps. Operations staff dispatch shipments to vehicles, drivers update shipment status from the road, customers follow a tracking timeline, and every delivery is closed with a photo and signature as proof of delivery.",
    architecture: {
      description:
        "A Node.js and Express API. Shipments move through a defined set of statuses, and every change is stored as an event with time and location. The tracking timeline is built from those events. Proof-of-delivery files are uploaded directly to object storage using pre-signed URLs so large images don't pass through the API servers.",
      flow: [
        "Ops Dispatch",
        "Vehicle Assignment",
        "Driver App Updates",
        "Shipment Events",
        "Customer Tracking",
        "Proof of Delivery",
      ],
      highlights: [
        "Event-based shipment history gives a full audit trail for every parcel",
        "Pre-signed uploads keep large proof-of-delivery photos off the API servers",
        "Fleet view shows each vehicle's status, current route and load",
        "Customers notified automatically at key milestones",
      ],
    },
    challenges: [
      {
        title: "Updates from Poor Coverage Areas",
        problem:
          "Drivers on highways often lose signal, so status updates arrive late or out of order.",
        solution:
          "Accepted updates with the device's original timestamp and an idempotency key, and ordered the timeline by when events happened rather than when they arrived.",
        result: "Timelines stay accurate even when a batch of updates syncs at once after reconnecting.",
      },
      {
        title: "Heavy Proof-of-Delivery Uploads",
        problem:
          "Photos and signatures uploaded through the API slowed down requests and used a lot of server bandwidth.",
        solution:
          "Issued short-lived pre-signed URLs so the app uploads directly to storage, then confirms the upload with a lightweight API call.",
        result: "API requests stay fast and uploads are more reliable on mobile connections.",
      },
    ],
    features: [
      { title: "Shipment Tracking", description: "Customer-facing timeline with each milestone, time and location." },
      { title: "Dispatch", description: "Assign shipments to vehicles and drivers, and rebalance loads when plans change." },
      { title: "Fleet Status", description: "See which vehicles are moving, idle or in service at a glance." },
      { title: "Proof of Delivery", description: "Photo and signature captured at drop-off and attached to the shipment." },
    ],
    codeSnippet: {
      title: "shipmentEvents.routes.js",
      language: "javascript",
      code: `// Idempotent status updates: replays after reconnecting are ignored
router.post("/shipments/:id/events", auth, validate(eventSchema), async (req, res) => {
  const { status, occurredAt, lat, lng, idempotencyKey } = req.body;

  await db.query(
    \`INSERT IGNORE INTO shipment_events
       (shipment_id, idempotency_key, status, occurred_at, lat, lng)
     VALUES (?, ?, ?, ?, ?, ?)\`,
    [req.params.id, idempotencyKey, status, occurredAt, lat, lng] // occurredAt = device time
  );

  const shipment = await shipments.refreshStatusFromEvents(req.params.id);
  res.status(201).json(shipment);
});`,
    },
  },

  "delivery-rider-app": {
    title: "Delivery Rider App — Mobile API",
    subtitle: "Order Assignment, Multi-Stop Runs, Cash on Delivery & Proof Photos",
    liveUrl: null,
    githubUrl: null,
    techStack: ["Node.js", "Express", "MySQL", "JWT", "FCM", "S3 Uploads"],
    badge: "iOS & Android API",
    metrics: platformMetrics("FCM push", { label: "Payments", value: "COD + prepaid", unit: "" }, jwt),
    overview:
      "API for last-mile delivery riders. Riders receive assigned orders, start a multi-stop run, navigate to each customer, collect cash where needed, and close each order with a photo. Cash collected is reconciled at the end of the day.",
    architecture: {
      description:
        "A Node.js and Express API. Orders are grouped into runs per rider. Each delivery updates the order status and, for cash orders, records the amount collected in a rider cash ledger. End-of-day reconciliation compares the ledger against cash handed in at the hub.",
      flow: [
        "Order Placed",
        "Assignment to Rider",
        "Run Started",
        "Delivery & COD",
        "Proof Photo",
        "Cash Reconciliation",
      ],
      highlights: [
        "Runs group several orders so riders work through stops in order",
        "Cash-on-delivery tracked in a per-rider ledger for clean daily reconciliation",
        "Failed deliveries captured with a reason and rescheduled automatically",
        "Push notifications for new assignments and customer updates",
      ],
    },
    challenges: [
      {
        title: "Cash Accountability",
        problem:
          "With many cash orders per day, it was hard to know exactly how much cash each rider should hand in.",
        solution:
          "Recorded every COD collection against the rider and order in a ledger, and built a reconciliation endpoint for hub staff.",
        result: "Each rider's expected cash is known at any moment, and differences are visible immediately.",
      },
      {
        title: "Failed Delivery Handling",
        problem:
          "Customers not home or unreachable left orders stuck in an 'out for delivery' state.",
        solution:
          "Added a failed-attempt flow with mandatory reason and photo, which returns the order to the queue for the next run.",
        result: "No orders get stuck, and support can see exactly why a delivery didn't happen.",
      },
    ],
    features: [
      { title: "Order Assignment", description: "New orders assigned to riders with push alerts and full order details." },
      { title: "Multi-Stop Runs", description: "Riders start a run and complete stops one by one." },
      { title: "Cash on Delivery", description: "Record cash collected per order, tracked in a rider ledger." },
      { title: "Proof Photos", description: "Delivery or failed-attempt photos attached to each order." },
    ],
    codeSnippet: {
      title: "completeDelivery.js",
      language: "javascript",
      code: `// Mark delivered and record COD in the rider's cash ledger atomically
export async function completeDelivery(db, { order, riderId, cashCollected }) {
  await db.transaction(async (trx) => {
    await trx("orders")
      .where({ id: order.id })
      .update({ status: "delivered", delivered_at: trx.fn.now() });

    if (order.payment_method === "cod") {
      await trx("rider_cash_ledger").insert({
        rider_id: riderId,
        order_id: order.id,
        amount: cashCollected ?? order.total,
      });
    }
  });

  await push.toCustomer(order.customer_id, "Your order has been delivered");
}`,
    },
  },

  "ecommerce-shopping-app": {
    title: "E-commerce Shopping App — Mobile API",
    subtitle: "Catalog, Cart, Secure Checkout & Order Tracking for Shoppers",
    liveUrl: null,
    githubUrl: null,
    techStack: ["Node.js", "Express", "MySQL", "Redis", "Stripe", "JWT", "FCM"],
    badge: "iOS & Android API",
    metrics: platformMetrics("FCM push", { label: "Payments", value: "Stripe", unit: "" }, jwt),
    overview:
      "Customer-facing API for a shopping app. Shoppers browse categories, search and filter products, manage a cart and wishlist, check out securely, and follow their orders until delivery. Promotions and coupons are applied server-side.",
    architecture: {
      description:
        "A Node.js and Express API. Catalog endpoints are read-heavy, so category trees and product listings are cached in Redis and invalidated when products change. Checkout re-prices the cart on the server, reserves stock, creates a payment, and only confirms the order once payment succeeds.",
      flow: [
        "Browse & Search",
        "Cart (server-side)",
        "Re-price & Coupons",
        "Stock Reservation",
        "Payment",
        "Order Confirmed",
        "Tracking Updates",
      ],
      highlights: [
        "Server-side cart pricing so totals can't be manipulated from the app",
        "Redis caching for categories and listings keeps browsing fast",
        "Stock reserved during checkout to avoid overselling",
        "Order status updates pushed to the shopper's device",
      ],
    },
    challenges: [
      {
        title: "Overselling Popular Items",
        problem:
          "During promotions, many shoppers could check out the last units of a product at the same time.",
        solution:
          "Reserved stock atomically at checkout with conditional updates, releasing reservations if payment fails or times out.",
        result: "Stock levels stay correct even under sudden traffic spikes.",
      },
      {
        title: "Trustworthy Totals",
        problem:
          "Prices, discounts and delivery fees calculated in the app could drift from the server's rules.",
        solution:
          "Made the API the only place prices are calculated; the app displays the server's breakdown.",
        result: "Customers always pay exactly what the business rules say.",
      },
    ],
    features: [
      { title: "Catalog & Search", description: "Categories, search, filters and sorting with paginated results." },
      { title: "Cart & Wishlist", description: "Server-side cart that syncs across devices, plus saved items." },
      { title: "Secure Checkout", description: "Address, delivery options, coupons and card payment in one flow." },
      { title: "Order Tracking", description: "Order history and live status from confirmation to delivery." },
    ],
    codeSnippet: {
      title: "reserveStock.js",
      language: "javascript",
      code: `// Reserve stock for every cart item, or none of them
export async function reserveStock(db, cart) {
  await db.transaction(async (trx) => {
    for (const item of cart.items) {
      const updated = await trx("products")
        .where("id", item.productId)
        .andWhere("stock", ">=", item.quantity)
        .decrement("stock", item.quantity);

      if (!updated) throw new OutOfStockError(item.productId);
    }

    await trx("carts")
      .where("id", cart.id)
      .update({ reserved_until: trx.raw("NOW() + INTERVAL 10 MINUTE") });
  });
}`,
    },
  },

  "ecommerce-vendor-app": {
    title: "E-commerce Vendor App — Mobile API",
    subtitle: "Product Management, Order Fulfilment & Payouts for Marketplace Sellers",
    liveUrl: null,
    githubUrl: null,
    techStack: ["Laravel", "PHP 8.2", "MySQL", "Sanctum", "Queues", "FCM"],
    badge: "iOS & Android API",
    metrics: platformMetrics("FCM push", { label: "Access", value: "Per-vendor", unit: "scoped" }),
    overview:
      "Seller-side API for a multi-vendor marketplace. Vendors manage their products and stock from their phone, receive and fulfil orders, print shipping labels, and track sales and payouts — while only ever seeing their own store's data.",
    architecture: {
      description:
        "Every vendor endpoint is scoped to the authenticated vendor through policies and query scopes, so one seller can never read or change another's products or orders. Marketplace orders are split into per-vendor sub-orders, and payouts are calculated from completed sub-orders minus commission.",
      flow: [
        "Customer Order",
        "Split per Vendor",
        "Vendor Notified",
        "Fulfil & Ship",
        "Order Completed",
        "Commission & Payout",
      ],
      highlights: [
        "Policies and global scopes enforce strict per-vendor data isolation",
        "Marketplace orders split into vendor sub-orders for independent fulfilment",
        "Low-stock alerts sent to vendors automatically",
        "Payout statements generated from completed sub-orders",
      ],
    },
    challenges: [
      {
        title: "Data Isolation Between Sellers",
        problem:
          "Vendors share the same tables, so a missed filter in any endpoint could expose another seller's data.",
        solution:
          "Applied a vendor global scope on vendor-facing models and authorization policies on every route, with tests asserting cross-vendor access is denied.",
        result: "Vendor data isolation is enforced by default rather than by remembering to add filters.",
      },
      {
        title: "Mixed-Vendor Orders",
        problem:
          "A single customer order can contain products from several vendors who ship separately.",
        solution:
          "Split each order into vendor sub-orders with their own status and shipping, while the customer still sees one order.",
        result: "Vendors fulfil independently and payouts are calculated per vendor accurately.",
      },
    ],
    features: [
      { title: "Inventory", description: "Add and edit products, variants, prices and stock from the app." },
      { title: "Order Fulfilment", description: "New, packed and shipped queues with label printing." },
      { title: "Payouts", description: "Earnings, commission and payout history per period." },
      { title: "Sales Insights", description: "Weekly sales, pending orders and low-stock overview." },
    ],
    codeSnippet: {
      title: "BelongsToVendor.php",
      language: "php",
      code: `trait BelongsToVendor
{
    protected static function bootBelongsToVendor(): void
    {
        static::addGlobalScope('vendor', function (Builder $query) {
            if ($vendor = auth()->user()?->vendor) {
                $query->where('vendor_id', $vendor->id);
            }
        });

        static::creating(function (Model $model) {
            $model->vendor_id ??= auth()->user()?->vendor?->id;
        });
    }
}`,
    },
  },

  "hr-payroll-app": {
    title: "HR & Payroll App — Mobile API",
    subtitle: "Employee Self-Service: Payslips, Leave, Expenses & Approvals",
    liveUrl: null,
    githubUrl: null,
    techStack: ["Laravel", "PHP 8.2", "MySQL", "Sanctum", "Queues", "PDF", "FCM"],
    badge: "iOS & Android API",
    metrics: platformMetrics("FCM push", { label: "Documents", value: "PDF payslips", unit: "" }),
    overview:
      "Employee self-service API for an HR and payroll system. Employees view and download payslips, apply for leave, submit expense claims and read company announcements. Managers approve requests from the same app, and HR keeps full records.",
    architecture: {
      description:
        "Requests such as leave and expenses follow a configurable approval chain based on the employee's department and manager. Payslips are generated as PDFs by queued jobs after payroll runs and served through signed, expiring links because they contain sensitive salary data.",
      flow: [
        "Employee Request",
        "Approval Chain",
        "Manager Decision",
        "Notification",
        "HR Records",
        "Payroll & Payslip PDF",
      ],
      highlights: [
        "Configurable approval chains per department",
        "Payslip PDFs generated in queued jobs after each payroll run",
        "Signed, expiring download links for sensitive documents",
        "Role-based access for employees, managers and HR",
      ],
    },
    challenges: [
      {
        title: "Protecting Salary Data",
        problem:
          "Payslips are highly sensitive and must never be accessible through guessable URLs.",
        solution:
          "Stored PDFs privately and issued short-lived signed URLs only after verifying the requester owns the payslip or has an HR role.",
        result: "Employees can download their payslips easily without exposing anyone else's.",
      },
      {
        title: "Different Approval Rules per Team",
        problem:
          "Some departments needed one approver, others needed a manager and then HR.",
        solution:
          "Modelled approval chains as data, so each request type and department defines its own steps without code changes.",
        result: "New approval rules can be set up by configuration instead of development work.",
      },
    ],
    features: [
      { title: "Payslips", description: "Monthly payslips with earnings and deductions, downloadable as PDF." },
      { title: "Leave & Expenses", description: "Apply for leave or submit expense claims with attachments." },
      { title: "Approvals", description: "Managers approve or reject requests with comments from their phone." },
      { title: "Announcements", description: "Company news and policy updates pushed to all employees." },
    ],
    codeSnippet: {
      title: "PayslipController.php",
      language: "php",
      code: `public function download(Request $request, Payslip $payslip): JsonResponse
{
    $this->authorize('view', $payslip);

    $url = Storage::disk('private')->temporaryUrl(
        $payslip->pdf_path,
        now()->addMinutes(5)
    );

    return response()->json(['url' => $url]);
}`,
    },
  },
};
