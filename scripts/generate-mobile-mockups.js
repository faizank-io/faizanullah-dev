// Renders a 1440x900 "UI concept" image for each mobile app backend in
// public/projects/mobile/. Each image shows two phone screens plus a sample
// API call, drawn with plain HTML/CSS and captured with Playwright.
//
// Run: node scripts/generate-mobile-mockups.js

const fs = require("fs");
const path = require("path");
const { chromium } = require("playwright");

const outDir = path.join(__dirname, "../public/projects/mobile");
fs.mkdirSync(outDir, { recursive: true });

const apps = [
  {
    id: "hotel-booking-app",
    name: "Hotel Booking",
    tagline: "Search, book and pay for stays in a few taps.",
    accent: "#0EA5E9",
    bg: ["#082f49", "#0c4a6e"],
    features: ["Availability search", "Room booking", "Stripe payments", "Reviews"],
    endpoint: { method: "POST", path: "/api/v1/bookings", status: "201 Created", body: '{ "room_id": 214, "nights": 3 }' },
    screens: [
      [
        { type: "header", kicker: "Good evening, Sara", title: "Find your stay" },
        { type: "search", text: "Dubai Marina · 12–15 Nov" },
        { type: "banner", title: "Marina Bay Suites", sub: "★ 4.8 · Sea view", meta: "$120/night", photo: true },
        { type: "list", items: [
          { t: "Palm Garden Resort", s: "★ 4.6 · Pool · Breakfast", m: "$98" },
          { t: "Downtown Loft Hotel", s: "★ 4.7 · City view", m: "$135" },
        ] },
      ],
      [
        { type: "header", kicker: "Booking summary", title: "Deluxe King Room" },
        { type: "stats", items: [{ l: "Check-in", v: "12 Nov" }, { l: "Nights", v: "3" }, { l: "Guests", v: "2" }] },
        { type: "list", items: [
          { t: "Room (3 nights)", s: "Deluxe King · Sea view", m: "$360" },
          { t: "Taxes & fees", s: "VAT included", m: "$42" },
          { t: "Total", s: "Pay securely with card", m: "$402" },
        ] },
        { type: "button", text: "Confirm & Pay" },
      ],
    ],
  },
  {
    id: "attendance-app",
    name: "Smart Attendance",
    tagline: "Geofenced check-ins with selfie verification.",
    accent: "#22C55E",
    bg: ["#052e16", "#14532d"],
    features: ["Geofencing", "Selfie check-in", "Shift schedules", "Leave requests"],
    endpoint: { method: "POST", path: "/api/v1/attendance/check-in", status: "200 OK", body: '{ "lat": 24.86, "lng": 67.01 }' },
    screens: [
      [
        { type: "header", kicker: "Thursday, 23 Oct", title: "Hi, Ahmed" },
        { type: "ring", label: "Checked in", value: "08:57 AM", sub: "Inside office geofence" },
        { type: "stats", items: [{ l: "Shift", v: "9–6" }, { l: "Worked", v: "6h 12m" }, { l: "Breaks", v: "45m" }] },
        { type: "button", text: "Check Out" },
      ],
      [
        { type: "header", kicker: "This week", title: "Attendance log" },
        { type: "list", items: [
          { t: "Mon, 20 Oct", s: "08:52 – 18:04", m: "On time", tone: "ok" },
          { t: "Tue, 21 Oct", s: "09:14 – 18:10", m: "Late", tone: "warn" },
          { t: "Wed, 22 Oct", s: "08:49 – 17:58", m: "On time", tone: "ok" },
          { t: "Thu, 23 Oct", s: "08:57 – now", m: "Active", tone: "info" },
        ] },
        { type: "button", text: "Request Leave", ghost: true },
      ],
    ],
  },
  {
    id: "ride-hailing-rider-app",
    name: "Ride-Hailing · Rider",
    tagline: "Book rides, track drivers live and pay in-app.",
    accent: "#FACC15",
    bg: ["#18181b", "#3f3f46"],
    features: ["Fare estimates", "Live tracking", "In-app payments", "Trip history"],
    endpoint: { method: "POST", path: "/api/v1/rides", status: "201 Created", body: '{ "pickup": "Clifton", "type": "go" }' },
    screens: [
      [
        { type: "map", height: 300, pins: true, route: true },
        { type: "header", kicker: "Where to?", title: "Choose a ride" },
        { type: "list", items: [
          { t: "Go", s: "4 seats · 3 min away", m: "Rs 650" },
          { t: "Comfort", s: "AC · 5 min away", m: "Rs 820" },
        ] },
        { type: "button", text: "Book Go" },
      ],
      [
        { type: "map", height: 360, pins: true, route: true, car: true },
        { type: "driver", name: "Bilal K.", car: "White Corolla · ABC-123", eta: "2 min" },
        { type: "button", text: "Share Trip", ghost: true },
      ],
    ],
  },
  {
    id: "ride-hailing-driver-app",
    name: "Ride-Hailing · Driver",
    tagline: "Trip requests, navigation and daily earnings.",
    accent: "#F97316",
    bg: ["#1c1917", "#431407"],
    features: ["Trip requests", "Online/offline", "Earnings", "Ratings"],
    endpoint: { method: "PATCH", path: "/api/v1/trips/{id}/accept", status: "200 OK", body: '{ "driver_id": 58 }' },
    screens: [
      [
        { type: "header", kicker: "You're online", title: "New trip request" },
        { type: "map", height: 230, pins: true, route: true },
        { type: "list", items: [
          { t: "Pickup · Clifton Block 5", s: "1.2 km away", m: "3 min" },
          { t: "Drop · Saddar", s: "8.4 km trip", m: "Rs 740" },
        ] },
        { type: "button", text: "Accept Trip" },
      ],
      [
        { type: "header", kicker: "Today", title: "Earnings" },
        { type: "bars" },
        { type: "stats", items: [{ l: "Trips", v: "14" }, { l: "Online", v: "7h" }, { l: "Rating", v: "4.9" }] },
        { type: "button", text: "Cash Out", ghost: true },
      ],
    ],
  },
  {
    id: "logistics-tracking-app",
    name: "Logistics & Fleet",
    tagline: "Shipments, dispatch and proof of delivery.",
    accent: "#818CF8",
    bg: ["#1e1b4b", "#312e81"],
    features: ["Shipment tracking", "Dispatch", "Proof of delivery", "Fleet status"],
    endpoint: { method: "GET", path: "/api/v1/shipments/LX-20931", status: "200 OK", body: '{ "status": "in_transit" }' },
    screens: [
      [
        { type: "header", kicker: "Shipment LX-20931", title: "In transit" },
        { type: "map", height: 210, pins: true, route: true, car: true },
        { type: "timeline", items: [
          { t: "Picked up", s: "Karachi hub · 09:10", done: true },
          { t: "On the way", s: "Highway M-9 · 11:45", done: true },
          { t: "Out for delivery", s: "Hyderabad · ETA 14:30" },
        ] },
      ],
      [
        { type: "header", kicker: "Fleet", title: "Vehicles today" },
        { type: "stats", items: [{ l: "Active", v: "18" }, { l: "Idle", v: "4" }, { l: "Service", v: "2" }] },
        { type: "list", items: [
          { t: "Truck KHI-4421", s: "Route 7 · 62% loaded", m: "Moving", tone: "ok" },
          { t: "Van KHI-1180", s: "Depot · loading", m: "Idle", tone: "warn" },
          { t: "Truck HYD-3307", s: "Route 2 · 88% loaded", m: "Moving", tone: "ok" },
        ] },
      ],
    ],
  },
  {
    id: "delivery-rider-app",
    name: "Delivery Rider",
    tagline: "Order assignment, routing and cash collection.",
    accent: "#F87171",
    bg: ["#450a0a", "#7f1d1d"],
    features: ["Auto-assignment", "Route view", "COD collection", "Proof photos"],
    endpoint: { method: "POST", path: "/api/v1/orders/8812/deliver", status: "200 OK", body: '{ "cod_collected": true }' },
    screens: [
      [
        { type: "header", kicker: "3 orders assigned", title: "Today's run" },
        { type: "list", items: [
          { t: "#8812 · Gulshan", s: "2 items · COD", m: "1.8 km" },
          { t: "#8815 · Johar", s: "1 item · Paid", m: "3.2 km" },
          { t: "#8819 · PECHS", s: "4 items · COD", m: "5.0 km" },
        ] },
        { type: "button", text: "Start Route" },
      ],
      [
        { type: "map", height: 250, pins: true, route: true, car: true },
        { type: "header", kicker: "Order #8812", title: "Collect & deliver" },
        { type: "stats", items: [{ l: "COD", v: "Rs 2,450" }, { l: "Items", v: "2" }] },
        { type: "button", text: "Mark Delivered" },
      ],
    ],
  },
  {
    id: "ecommerce-shopping-app",
    name: "E-commerce · Shopping",
    tagline: "Browse, add to cart and check out securely.",
    accent: "#EC4899",
    bg: ["#500724", "#831843"],
    features: ["Product catalog", "Cart & checkout", "Order tracking", "Wishlist"],
    endpoint: { method: "POST", path: "/api/v1/checkout", status: "201 Created", body: '{ "cart_id": "c_91f", "pay": "card" }' },
    screens: [
      [
        { type: "header", kicker: "New season", title: "Discover" },
        { type: "search", text: "Search products" },
        { type: "products" },
      ],
      [
        { type: "header", kicker: "2 items", title: "Your cart" },
        { type: "list", items: [
          { t: "Classic Sneakers", s: "Size 42 · White", m: "$79" },
          { t: "Everyday Backpack", s: "Charcoal", m: "$54" },
          { t: "Delivery", s: "2–3 business days", m: "Free" },
        ] },
        { type: "stats", items: [{ l: "Subtotal", v: "$133" }, { l: "Total", v: "$133" }] },
        { type: "button", text: "Checkout" },
      ],
    ],
  },
  {
    id: "ecommerce-vendor-app",
    name: "E-commerce · Vendor",
    tagline: "Sellers manage products, orders and payouts.",
    accent: "#C084FC",
    bg: ["#2e1065", "#4c1d95"],
    features: ["Inventory", "Order management", "Payouts", "Sales insights"],
    endpoint: { method: "PATCH", path: "/api/v1/vendor/products/301", status: "200 OK", body: '{ "stock": 48 }' },
    screens: [
      [
        { type: "header", kicker: "Store overview", title: "This week" },
        { type: "bars" },
        { type: "stats", items: [{ l: "Orders", v: "36" }, { l: "Pending", v: "5" }, { l: "Low stock", v: "3" }] },
      ],
      [
        { type: "header", kicker: "Orders", title: "To fulfil" },
        { type: "list", items: [
          { t: "#V-1042 · Sneakers", s: "Paid · ship today", m: "New", tone: "info" },
          { t: "#V-1039 · Backpack", s: "Packed", m: "Ready", tone: "ok" },
          { t: "#V-1035 · Watch", s: "Awaiting stock", m: "Hold", tone: "warn" },
        ] },
        { type: "button", text: "Print Labels", ghost: true },
      ],
    ],
  },
  {
    id: "hr-payroll-app",
    name: "HR & Payroll",
    tagline: "Employee self-service, payslips and approvals.",
    accent: "#2DD4BF",
    bg: ["#042f2e", "#134e4a"],
    features: ["Payslips", "Leave approvals", "Employee profiles", "Announcements"],
    endpoint: { method: "GET", path: "/api/v1/payslips?month=2025-10", status: "200 OK", body: '{ "net_pay": "…" }' },
    screens: [
      [
        { type: "header", kicker: "October payslip", title: "Net pay" },
        { type: "ring", label: "Net salary", value: "Rs 185k", sub: "Paid on 30 Oct" },
        { type: "list", items: [
          { t: "Basic salary", s: "Monthly", m: "Rs 150k" },
          { t: "Allowances", s: "Fuel · Internet", m: "Rs 45k" },
          { t: "Tax", s: "Withholding", m: "-Rs 10k" },
        ] },
      ],
      [
        { type: "header", kicker: "Manager", title: "Approvals" },
        { type: "list", items: [
          { t: "Ayesha R. · Annual leave", s: "3 days · 4–6 Nov", m: "Review", tone: "info" },
          { t: "Usman T. · Sick leave", s: "1 day · 24 Oct", m: "Approved", tone: "ok" },
          { t: "Hina S. · Expense claim", s: "Travel · Rs 8,400", m: "Pending", tone: "warn" },
        ] },
        { type: "button", text: "Approve Selected" },
      ],
    ],
  },
];

function esc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function block(b, accent) {
  switch (b.type) {
    case "header":
      return `<div class="hdr"><div class="kicker">${esc(b.kicker)}</div><div class="title">${esc(b.title)}</div></div>`;
    case "search":
      return `<div class="search"><span class="mag"></span>${esc(b.text)}</div>`;
    case "banner":
      return `<div class="banner"><div class="photo"></div><div class="bn-body"><div><div class="t">${esc(b.title)}</div><div class="s">${esc(b.sub)}</div></div><div class="m">${esc(b.meta)}</div></div></div>`;
    case "list":
      return `<div class="list">${b.items
        .map(
          (it) => `<div class="row"><div class="ico"></div><div class="rt"><div class="t">${esc(it.t)}</div><div class="s">${esc(it.s)}</div></div><div class="m ${it.tone ? "pill " + it.tone : ""}">${esc(it.m)}</div></div>`
        )
        .join("")}</div>`;
    case "stats":
      return `<div class="stats">${b.items.map((s) => `<div class="stat"><div class="v">${esc(s.v)}</div><div class="l">${esc(s.l)}</div></div>`).join("")}</div>`;
    case "button":
      return `<div class="btn ${b.ghost ? "ghost" : ""}">${esc(b.text)}</div>`;
    case "ring":
      return `<div class="ringwrap"><div class="ring"><div class="ring-in"><div class="l">${esc(b.label)}</div><div class="v">${esc(b.value)}</div></div></div><div class="ring-sub">● ${esc(b.sub)}</div></div>`;
    case "map":
      return `<div class="map" style="height:${b.height}px">
        <svg viewBox="0 0 300 ${b.height}" preserveAspectRatio="none">
          ${b.route ? `<path d="M40 ${b.height - 40} C 90 ${b.height - 120}, 150 ${b.height * 0.55}, 190 ${b.height * 0.45} S 250 60, 260 40" fill="none" stroke="${accent}" stroke-width="5" stroke-linecap="round" stroke-dasharray="1 0"/>` : ""}
        </svg>
        ${b.pins ? `<span class="pin a" style="left:32px;top:${b.height - 52}px"></span><span class="pin b" style="left:250px;top:28px"></span>` : ""}
        ${b.car ? `<span class="car" style="left:178px;top:${b.height * 0.45 - 12}px"></span>` : ""}
      </div>`;
    case "driver":
      return `<div class="driver"><div class="avatar"></div><div class="rt"><div class="t">${esc(b.name)} · ★ 4.9</div><div class="s">${esc(b.car)}</div></div><div class="eta">${esc(b.eta)}</div></div>`;
    case "timeline":
      return `<div class="tl">${b.items.map((it) => `<div class="tl-row ${it.done ? "done" : ""}"><span class="dot"></span><div><div class="t">${esc(it.t)}</div><div class="s">${esc(it.s)}</div></div></div>`).join("")}</div>`;
    case "bars":
      return `<div class="bars">${[46, 70, 52, 88, 64, 96, 74].map((h, i) => `<div class="bar-col"><div class="bar ${i === 5 ? "hi" : ""}" style="height:${h}%"></div><span>${"MTWTFSS"[i]}</span></div>`).join("")}</div>`;
    case "products":
      return `<div class="products">${[["Sneakers", "$79"], ["Backpack", "$54"], ["Watch", "$129"], ["Headphones", "$99"]]
        .map(([t, p], i) => `<div class="prod"><div class="pimg p${i}"></div><div class="t">${t}</div><div class="s">${p}</div></div>`)
        .join("")}</div>`;
    default:
      return "";
  }
}

function phone(screen, accent) {
  return `<div class="phone"><div class="screen">
    <div class="status"><span>9:41</span><span class="notch"></span><span class="sig">▮▮▮ ◔</span></div>
    <div class="content">${screen.map((b) => block(b, accent)).join("")}</div>
    <div class="tabbar"><span class="on"></span><span></span><span></span><span></span></div>
  </div></div>`;
}

function page(app) {
  const [b1, b2] = app.bg;
  const a = app.accent;
  return `<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500&display=swap" rel="stylesheet">
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{width:1440px;height:900px;overflow:hidden;font-family:Inter,system-ui,sans-serif;color:#fff;
  background:radial-gradient(circle at 78% 30%, ${a}33 0, transparent 45%), radial-gradient(circle at 10% 90%, ${a}22 0, transparent 40%), linear-gradient(135deg, ${b1}, ${b2});}
.grid{position:absolute;inset:0;background-image:linear-gradient(#ffffff0d 1px,transparent 1px),linear-gradient(90deg,#ffffff0d 1px,transparent 1px);background-size:48px 48px;mask-image:radial-gradient(ellipse at 60% 50%,#000 30%,transparent 75%)}
.left{position:absolute;left:110px;top:150px;width:520px}
.appicon{width:64px;height:64px;border-radius:18px;background:linear-gradient(135deg,${a},${a}99);box-shadow:0 12px 30px ${a}55;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:26px;color:#0b0b0f}
.eyebrow{margin-top:28px;font:600 14px Inter;letter-spacing:.18em;text-transform:uppercase;color:${a}}
h1{margin-top:12px;font-size:56px;line-height:1.05;font-weight:800;letter-spacing:-.03em}
.tag{margin-top:16px;font-size:21px;line-height:1.5;color:#ffffffb3}
.chips{margin-top:28px;display:flex;flex-wrap:wrap;gap:10px}
.chip{padding:9px 15px;border-radius:999px;background:#ffffff12;border:1px solid #ffffff22;font-size:15px;font-weight:600}
.api{margin-top:36px;border-radius:16px;background:#0b0b10cc;border:1px solid #ffffff1f;padding:18px 20px;font-family:'JetBrains Mono',monospace;font-size:15px;width:480px;box-shadow:0 20px 50px #0006}
.api .line1{display:flex;gap:12px;align-items:center}
.method{color:#0b0b0f;background:${a};padding:3px 9px;border-radius:6px;font-weight:700;font-size:13px}
.status-ok{margin-left:auto;color:#4ade80;font-size:13px}
.api .body{margin-top:10px;color:#ffffff99}
.phones{position:absolute;right:120px;top:70px;width:640px;height:780px}
.phone{position:absolute;width:330px;height:690px;border-radius:52px;background:#0b0b0f;padding:12px;box-shadow:0 40px 90px #000a, inset 0 0 0 2px #ffffff22}
.phone:nth-child(1){left:0;top:70px;transform:rotate(-6deg)}
.phone:nth-child(2){left:290px;top:10px;transform:rotate(5deg)}
.screen{position:relative;width:100%;height:100%;border-radius:41px;background:#f6f7fb;color:#0f172a;overflow:hidden;display:flex;flex-direction:column}
.status{display:flex;justify-content:space-between;align-items:center;padding:14px 26px 6px;font-size:13px;font-weight:700}
.notch{width:96px;height:26px;border-radius:20px;background:#0b0b0f}
.sig{font-size:10px;letter-spacing:1px}
.content{flex:1;padding:6px 18px 0;display:flex;flex-direction:column;gap:12px;overflow:hidden}
.hdr .kicker{font-size:12px;color:#64748b;font-weight:500}
.hdr .title{font-size:21px;font-weight:800;letter-spacing:-.02em;margin-top:2px}
.search{background:#fff;border:1px solid #e2e8f0;border-radius:14px;padding:11px 14px;font-size:12.5px;color:#94a3b8;display:flex;align-items:center;gap:8px}
.mag{width:12px;height:12px;border:2px solid #94a3b8;border-radius:50%}
.banner{border-radius:18px;overflow:hidden;background:#fff;box-shadow:0 6px 18px #0f172a14}
.photo{height:110px;background:linear-gradient(135deg,${a},${b2}),radial-gradient(circle,#fff,transparent);position:relative}
.photo:after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,transparent 40%,#0003),repeating-linear-gradient(90deg,#ffffff22 0 18px,transparent 18px 36px)}
.bn-body{display:flex;justify-content:space-between;align-items:center;padding:11px 13px}
.t{font-size:13.5px;font-weight:700}
.s{font-size:11.5px;color:#64748b;margin-top:2px}
.m{font-size:13px;font-weight:700;color:#0f172a;white-space:nowrap}
.list{background:#fff;border-radius:18px;padding:4px 12px;box-shadow:0 6px 18px #0f172a0f}
.row{display:flex;align-items:center;gap:10px;padding:10px 0;border-bottom:1px solid #f1f5f9}
.row:last-child{border-bottom:0}
.ico{width:34px;height:34px;border-radius:11px;background:${a}26;flex:none;position:relative}
.ico:after{content:"";position:absolute;inset:11px;border-radius:4px;background:${a}}
.rt{flex:1;min-width:0}
.pill{font-size:10.5px;padding:4px 8px;border-radius:999px}
.pill.ok{background:#dcfce7;color:#15803d}.pill.warn{background:#fef3c7;color:#b45309}.pill.info{background:#e0f2fe;color:#0369a1}
.stats{display:flex;gap:8px}
.stat{flex:1;background:#fff;border-radius:14px;padding:10px 8px;text-align:center;box-shadow:0 6px 18px #0f172a0f}
.stat .v{font-size:15px;font-weight:800}
.stat .l{font-size:10.5px;color:#64748b;margin-top:2px}
.btn{margin-top:auto;margin-bottom:6px;background:#0f172a;color:#fff;border-radius:16px;padding:14px;text-align:center;font-size:14px;font-weight:700}
.btn:not(.ghost){background:${a};color:#0b0b0f}
.btn.ghost{background:#fff;color:#0f172a;border:1px solid #e2e8f0}
.ringwrap{display:flex;flex-direction:column;align-items:center;gap:8px;padding:6px 0}
.ring{width:170px;height:170px;border-radius:50%;background:conic-gradient(${a} 0 72%,#e2e8f0 72% 100%);display:flex;align-items:center;justify-content:center}
.ring-in{width:138px;height:138px;border-radius:50%;background:#f6f7fb;display:flex;flex-direction:column;align-items:center;justify-content:center}
.ring-in .l{font-size:11px;color:#64748b}.ring-in .v{font-size:22px;font-weight:800;margin-top:2px}
.ring-sub{font-size:11.5px;color:#16a34a;font-weight:600}
.map{position:relative;border-radius:18px;overflow:hidden;flex:none;background:#e8eef5;
  background-image:linear-gradient(#ffffff 3px,transparent 3px),linear-gradient(90deg,#ffffff 3px,transparent 3px),linear-gradient(#dfe7f0 1px,transparent 1px),linear-gradient(90deg,#dfe7f0 1px,transparent 1px);
  background-size:70px 70px,70px 70px,14px 14px,14px 14px}
.map svg{position:absolute;inset:0;width:100%;height:100%}
.pin{position:absolute;width:22px;height:22px;border-radius:50% 50% 50% 0;transform:rotate(-45deg);border:3px solid #fff;box-shadow:0 4px 10px #0003}
.pin.a{background:#0f172a}.pin.b{background:${a}}
.car{position:absolute;width:26px;height:26px;border-radius:8px;background:#0f172a;border:3px solid ${a};box-shadow:0 4px 12px #0004}
.driver{display:flex;align-items:center;gap:10px;background:#fff;border-radius:18px;padding:12px;box-shadow:0 6px 18px #0f172a14}
.avatar{width:42px;height:42px;border-radius:50%;background:linear-gradient(135deg,#cbd5e1,#94a3b8)}
.eta{background:${a};color:#0b0b0f;font-weight:800;font-size:12px;padding:6px 10px;border-radius:10px}
.tl{background:#fff;border-radius:18px;padding:12px 14px;box-shadow:0 6px 18px #0f172a0f;display:flex;flex-direction:column;gap:12px}
.tl-row{display:flex;gap:10px;align-items:flex-start}
.dot{width:12px;height:12px;border-radius:50%;border:3px solid #cbd5e1;margin-top:3px;flex:none}
.tl-row.done .dot{border-color:${a};background:${a}}
.bars{display:flex;align-items:flex-end;gap:9px;height:170px;background:#fff;border-radius:18px;padding:14px 14px 8px;box-shadow:0 6px 18px #0f172a0f}
.bar-col{flex:1;height:100%;display:flex;flex-direction:column;justify-content:flex-end;align-items:center;gap:6px}
.bar-col span{font-size:10px;color:#94a3b8}
.bar{width:100%;border-radius:7px;background:${a}55}
.bar.hi{background:${a}}
.products{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.prod{background:#fff;border-radius:16px;padding:8px;box-shadow:0 6px 18px #0f172a0f}
.pimg{height:96px;border-radius:12px;margin-bottom:8px}
.p0{background:linear-gradient(135deg,#fde2e4,${a}88)}.p1{background:linear-gradient(135deg,#e0e7ff,#a5b4fc)}.p2{background:linear-gradient(135deg,#fef3c7,#fbbf24)}.p3{background:linear-gradient(135deg,#d1fae5,#34d399)}
.tabbar{display:flex;justify-content:space-around;padding:12px 30px 18px;background:#fff;border-top:1px solid #eef2f7}
.tabbar span{width:22px;height:22px;border-radius:7px;background:#e2e8f0}
.tabbar span.on{background:${a}}
.concept{position:absolute;left:110px;bottom:56px;font:500 13px Inter;color:#ffffff66;letter-spacing:.06em}
</style></head><body>
<div class="grid"></div>
<div class="left">
  <div class="appicon">${esc(app.name.trim()[0])}</div>
  <div class="eyebrow">Mobile app · REST API</div>
  <h1>${esc(app.name)}</h1>
  <p class="tag">${esc(app.tagline)}</p>
  <div class="chips">${app.features.map((f) => `<span class="chip">${esc(f)}</span>`).join("")}</div>
  <div class="api"><div class="line1"><span class="method">${app.endpoint.method}</span><span>${esc(app.endpoint.path)}</span><span class="status-ok">${app.endpoint.status}</span></div><div class="body">${esc(app.endpoint.body)}</div></div>
</div>
<div class="phones">${app.screens.map((s) => phone(s, a)).join("")}</div>
<div class="concept">UI concept · iOS &amp; Android</div>
</body></html>`;
}

(async () => {
  const browser = await chromium.launch();
  const page_ = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  for (const app of apps) {
    await page_.setContent(page(app), { waitUntil: "networkidle" });
    const dest = path.join(outDir, `${app.id}.png`);
    await page_.screenshot({ path: dest });
    console.log("Saved", path.relative(process.cwd(), dest));
  }
  await browser.close();
})();
