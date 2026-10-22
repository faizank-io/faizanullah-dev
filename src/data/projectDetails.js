import { mobileAppDetails } from "./mobileAppDetails";

const baseProjectDetails = {
  printprima: {
    title: "Print Prima — Print Shop Management SaaS",
    subtitle: "Quote-to-Cash, Production Queues & Printer Audit for Large-Format Print Shops",
    liveUrl: "https://www.printprima.com/",
    githubUrl: null,
    techStack: ["Laravel", "PHP 8.2", "Livewire", "MySQL", "SaaS", "Subscription Billing", "RBAC", "Multi-Branch"],
    badge: "Live SaaS",
    metrics: [
      { label: "Invoice Errors", value: "-98", unit: "%" },
      { label: "Job Turnaround", value: "50%+", unit: "faster" },
      { label: "Full Onboarding", value: "14", unit: "days" },
      { label: "Subscription Plans", value: "5", unit: "tiers" },
    ],
    overview:
      "Print Prima is a cloud SaaS that runs an entire large-format print business from one dashboard: quotes and invoices, order and job flow, inventory and stores, fixed assets, payroll, expenses, staff permissions, and a print audit that reads job data straight from the printers. It is built for shops ranging from a few machines to multi-branch operations, with Nigeria-ready taxes and NGN pricing alongside USD, and is sold on tiered plans gated by the number of printers monitored.",
    architecture: {
      description:
        "Built on Laravel with Livewire-driven dashboards. Every shop is an isolated account with its own branches, staff roles, and plan limits. A quote becomes an invoice, then a production job that moves through a machine queue; material usage is deducted from inventory as the job runs, and what the printer actually reports is reconciled against what was invoiced to surface unbilled prints.",
      flow: [
        "Quote / Invoice (Front Desk)",
        "Proof Approval",
        "Job Queue & Machine Assignment",
        "Printer Audit Capture",
        "Inventory Deduction",
        "Invoice-vs-Print Reconciliation",
        "Branch KPI Roll-Up",
      ],
      highlights: [
        "Role-based views for Front Desk, Production, Finance, and Management over the same underlying job data",
        "Print audit capturing dimensions, bitmaps, status, and timings from each printer for every job",
        "Plan-level feature gating — printer monitoring limits of 3, 6, 10, or unlimited per subscription tier",
        "Multi-branch access with activity trails and KPI roll-ups across locations",
      ],
    },
    challenges: [
      {
        title: "Catching Unbilled Prints (Theft Prevention)",
        problem:
          "In a print shop, staff can run jobs on a machine that never appear on an invoice. Owners had no way to compare what was printed with what was sold.",
        solution:
          "Built a print audit pipeline that records dimensions, preview bitmaps, status, and timings from each printer, then matches every captured print against an invoiced job. Prints with no matching job, or with a size that doesn't match the order, are flagged as anomalies for management.",
        result: "Owners get a real-time view of every print per machine, with unmatched jobs surfaced instead of discovered at stock-take.",
      },
      {
        title: "One Workflow from Quote to Cash",
        problem:
          "Quotes, production, stock, and payments typically live in separate spreadsheets and paper job tickets, so invoices get re-typed and jobs get lost between front desk and production.",
        solution:
          "Modelled the order as a single record that changes state — quote, invoice, proof approval, queued, printing, done, paid — so each team works on the same job from its own role-based view, with automated follow-ups on unpaid invoices.",
        result: "Shops on the platform report 98% fewer invoice errors and 50%+ faster job turnaround.",
      },
      {
        title: "Subscription Tiers with Hard Limits",
        problem:
          "Plans differ by printers monitored and feature set (Base Pack has no monitoring; Starter, Pro, and Pro Plus allow 3, 6, and 10 printers), billed monthly, quarterly, or yearly in USD or NGN.",
        solution:
          "Centralised plan entitlements in one service that every module checks before enabling a feature or registering a printer, so limits are enforced server-side rather than hidden in the UI.",
        result: "Five tiers and three billing cycles run from a single entitlement layer, and upgrading a plan unlocks capacity immediately.",
      },
    ],
    features: [
      { title: "Invoices & Quotes", description: "Quote-to-invoice conversion with automated follow-ups, collections tracking, and Nigerian tax and NGN support." },
      { title: "Order & Job Flow", description: "Intelligent production queues with proof approvals and machine assignment, visible live to the production floor." },
      { title: "Inventory & Fixed Assets", description: "Stock tracking for SAV, flex, canvas, and consumables with low-stock alerts, plus asset registration, depreciation, and maintenance scheduling." },
      { title: "Print Audit & Theft Prevention", description: "Real-time printer monitoring that captures each print and flags anomalies against invoiced jobs." },
      { title: "Staff, Payroll & Expenses", description: "Roles and permissions with activity trails, payroll management, and expense tracking across branches." },
      { title: "Management Reporting", description: "KPIs, aging reports, and branch roll-ups for owners running more than one location." },
    ],
    codeSnippet: {
      title: "PrintAuditService — Matching Printer Output to Invoiced Jobs",
      language: "php",
      code: `<?php

namespace App\\Services;

use App\\Events\\PrintAnomalyDetected;
use App\\Models\\PrintJob;
use App\\Models\\PrintLog;

class PrintAuditService
{
    private const AREA_TOLERANCE = 0.05; // 5% over the invoiced size

    public function reconcile(PrintLog \$log): void
    {
        \$job = PrintJob::where('printer_id', \$log->printer_id)
            ->where('file_name', \$log->file_name)
            ->whereIn('status', ['queued', 'printing'])
            ->first();

        if (! \$job) {
            \$this->flag(\$log, 'unbilled_print');
            return;
        }

        \$allowedArea = \$job->width * \$job->height * (1 + self::AREA_TOLERANCE);

        if (\$log->width * \$log->height > \$allowedArea) {
            \$this->flag(\$log, 'oversized_print', \$job);
        }

        \$log->update(['print_job_id' => \$job->id]);
    }

    private function flag(PrintLog \$log, string \$reason, ?PrintJob \$job = null): void
    {
        \$log->update(['anomaly' => \$reason]);

        event(new PrintAnomalyDetected(\$log, \$job));
    }
}`,
    },
  },

  "5brain": {
    title: "5 Brain Abilities — Child Assessment Platform",
    subtitle: "Paid Online Brain-Ability Assessment for Parents",
    liveUrl: "https://5brain.org/",
    githubUrl: null,
    techStack: ["Laravel", "PHP", "MySQL", "Payment Gateway", "OTP Auth", "Admin Panel", "EdTech"],
    badge: "Live Platform",
    metrics: [
      { label: "Abilities Assessed", value: "5", unit: "domains" },
      { label: "One-Time Price", value: "$24.95", unit: "USD" },
      { label: "Account Verification", value: "OTP", unit: "email" },
      { label: "User Roles", value: "2", unit: "parent / admin" },
    ],
    overview:
      "5 Brain Abilities is an online assessment service from Math Monkey (Malaysia) that helps parents understand their child's five core brain abilities — Attention, Cognitive Visual, Memory, Logical Reasoning, and Processing Speed — and choose learning activities that fit. Parents sign up, verify by OTP, pay a one-time fee, add a child profile, and take the child through the assessment; a separate admin login manages the platform.",
    architecture: {
      description:
        "A Laravel application with two guarded areas: a parent account area and an admin panel. Registration and password recovery are gated by emailed one-time codes, the assessment unlocks only after payment is confirmed, and each attempt is stored against a child profile so one parent can assess more than one child.",
      flow: [
        "Parent Signup",
        "Email OTP Verification",
        "One-Time Payment",
        "Child Profile Selection",
        "Five-Ability Assessment",
        "Per-Ability Scoring",
        "Results for the Parent",
      ],
      highlights: [
        "OTP-verified signup and OTP-based password reset instead of emailed reset links",
        "Assessment access unlocked server-side only after a confirmed payment",
        "Multiple child profiles per parent account, each with its own assessment",
        "Separate admin login for managing users, assessments, and contact enquiries",
      ],
    },
    challenges: [
      {
        title: "Gating a Paid Assessment",
        problem:
          "The assessment is the product, so it must be reachable only by parents who have paid, and a refreshed or abandoned checkout must never grant access or charge twice.",
        solution:
          "Kept payment state on the server and unlocked the assessment from the gateway's confirmation rather than from the browser redirect, with the unlock written idempotently against the parent account.",
        result: "Access follows confirmed payments only, and repeat confirmations for the same payment are harmless.",
      },
      {
        title: "Scoring Five Abilities from One Sitting",
        problem:
          "A single assessment has to produce a separate, comparable result for each of five different abilities, not one overall mark.",
        solution:
          "Tagged every question with the ability it measures and scored each ability independently as a percentage of its own maximum, so results stay comparable even when abilities have different numbers of questions.",
        result: "Parents see a per-ability breakdown that shows which abilities are stronger and which need support.",
      },
      {
        title: "Verified Accounts for an International Audience",
        problem:
          "Parents sign up from different countries, and unverified or mistyped emails would leave paid accounts unrecoverable.",
        solution:
          "Added an OTP step to signup and to password recovery, with expiring single-use codes and a country selector on the registration and contact forms.",
        result: "Every paying account is tied to an email address the parent has proven they can receive mail at.",
      },
    ],
    features: [
      { title: "Five-Ability Assessment", description: "Covers Attention, Cognitive Visual, Memory, Logical Reasoning, and Processing Speed in one guided assessment." },
      { title: "Child Profiles", description: "Parents add a child or pick an existing one before starting, keeping each child's results separate." },
      { title: "OTP Signup & Recovery", description: "Email one-time codes verify new accounts and authorise password resets." },
      { title: "One-Time Payment", description: "A single USD $24.95 checkout unlocks the assessment — no subscription." },
      { title: "Admin Panel", description: "Separate admin login for managing parents, assessments, and incoming enquiries." },
      { title: "Parent Education Content", description: "Explains each ability, how the brain works, and growth vs. fixed mindset, with FAQ and contact pages." },
    ],
    codeSnippet: {
      title: "AssessmentScoringService — Per-Ability Results",
      language: "php",
      code: `<?php

namespace App\\Services;

use App\\Models\\AssessmentAttempt;

class AssessmentScoringService
{
    public function score(AssessmentAttempt \$attempt): array
    {
        \$results = \$attempt->answers()
            ->with('question.ability')
            ->get()
            ->groupBy(fn (\$answer) => \$answer->question->ability->slug)
            ->map(function (\$answers) {
                \$earned = \$answers->where('is_correct', true)->sum('question.weight');
                \$maximum = \$answers->sum('question.weight');

                return \$maximum > 0 ? round((\$earned / \$maximum) * 100) : 0;
            });

        \$attempt->update([
            'results' => \$results,
            'completed_at' => now(),
        ]);

        return \$results->all();
    }
}`,
    },
  },

  lejabook: {
    title: "Leja Book — Online Booking Platform",
    subtitle: "Multi-Tenant Service Scheduling & Payments SaaS",
    liveUrl: "https://lejabook.com/",
    githubUrl: null,
    techStack: ["PHP", "Laravel", "MySQL", "Payment Gateway", "SaaS", "REST API", "Redis"],
    badge: "Live SaaS",
    metrics: [
      { label: "Business Clients", value: "50+", unit: "active" },
      { label: "Bookings Processed", value: "10K+", unit: "monthly" },
      { label: "Payment Success", value: "99.8", unit: "%" },
      { label: "Uptime", value: "99.9", unit: "%" },
    ],
    overview:
      "Comprehensive service booking and appointment scheduling platform allowing businesses to manage time slots, client calendars, automated reminders, and online payments. Built as a multi-tenant SaaS where each business gets its own branded booking page with independently configurable availability rules.",
    architecture: {
      description:
        "Built on Laravel with a service-oriented architecture. Each business operates as a tenant with customizable booking rules, availability slots, and payment configurations. The scheduling engine handles conflict resolution, buffer times, and timezone conversions at the database transaction level.",
      flow: [
        "Customer Booking Request",
        "Availability Engine",
        "Row-Locked Conflict Resolution",
        "Payment Gateway Authorization",
        "Webhook Confirmation",
        "Reminder Queue (Email/SMS)",
        "Business Dashboard Update",
      ],
      highlights: [
        "Timezone-aware scheduling engine supporting 30+ timezone configurations",
        "Automated email/SMS reminders with configurable intervals before appointments",
        "Payment gateway abstraction layer supporting multiple providers per business",
        "Calendar sync with Google Calendar API for business owners",
      ],
    },
    challenges: [
      {
        title: "Scheduling Conflict Resolution",
        problem:
          "Handling race conditions when multiple customers try to book the same time slot simultaneously during high-traffic periods.",
        solution:
          "Implemented pessimistic row-locking during slot confirmation inside a database transaction, with automatic fallback suggestion of the nearest available slots when a lock fails.",
        result: "Zero double-booking incidents across 10K+ monthly bookings, with instant alternative-slot suggestions.",
      },
      {
        title: "Payment Gateway Reconciliation",
        problem:
          "Different businesses required different payment providers, and failed or delayed webhooks risked leaving bookings in a paid-but-unconfirmed state.",
        solution:
          "Built a gateway abstraction layer with a unified webhook contract, idempotent event logging, and a reconciliation job that reverifies pending transactions on a schedule.",
        result: "Payment success rate sustained at 99.8% with zero orphaned paid bookings.",
      },
      {
        title: "Cross-Timezone Availability",
        problem:
          "Businesses and customers frequently operate in different timezones, causing displayed slots to mismatch actual business hours.",
        solution:
          "Centralized all slot storage in UTC with a presentation-layer conversion service driven by business and customer timezone metadata.",
        result: "Eliminated timezone-related booking errors reported by support across 50+ active businesses.",
      },
    ],
    features: [
      { title: "Smart Scheduling", description: "Intelligent slot management with buffer times, recurring appointments, and group booking support." },
      { title: "Payment Processing", description: "Integrated payment collection with deposit handling, refund automation, and multi-currency support." },
      { title: "Automated Reminders", description: "Email and SMS reminders at configurable intervals before appointments to reduce no-shows." },
      { title: "Business Dashboard", description: "Analytics dashboard showing booking trends, revenue tracking, and client retention metrics." },
    ],
    codeSnippet: {
      title: "AvailabilityService — Lock-Safe Slot Reservation",
      language: "php",
      code: `<?php

namespace App\\Services;

use App\\Models\\TimeSlot;
use Illuminate\\Support\\Carbon;
use Illuminate\\Support\\Facades\\DB;

class AvailabilityService
{
    public function reserveSlot(int \$businessId, Carbon \$date, string \$time): TimeSlot
    {
        return DB::transaction(function () use (\$businessId, \$date, \$time) {
            \$slot = TimeSlot::where('business_id', \$businessId)
                ->whereDate('date', \$date)
                ->where('start_time', \$time)
                ->where('is_booked', false)
                ->lockForUpdate()
                ->firstOrFail();

            \$slot->update([
                'is_booked' => true,
                'held_until' => now()->addMinutes(10),
            ]);

            return \$slot;
        });
    }
}`,
    },
  },

  idaaassessment: {
    title: "IDAA Assessment & Testing System",
    subtitle: "Timed Exam Engine with Automated Scoring & Analytics",
    liveUrl: "https://www.idaaassessment.com/",
    githubUrl: null,
    techStack: ["Laravel", "PHP", "REST API", "MySQL", "Database Design", "EdTech", "Redis"],
    badge: "Live Platform",
    metrics: [
      { label: "Candidates Assessed", value: "5K+", unit: "total" },
      { label: "Auto-Grading Accuracy", value: "99.5", unit: "%" },
      { label: "Avg Scoring Time", value: "<2", unit: "sec" },
      { label: "Question Bank", value: "10K+", unit: "items" },
    ],
    overview:
      "Enterprise evaluation and skill testing platform for candidate examinations, automated scoring, real-time result analytics, and structured performance reporting. Handles server-authoritative timed sessions to prevent tampering while grading multiple question formats instantly.",
    architecture: {
      description:
        "The exam engine separates session state, grading, and analytics into distinct service layers. Every timer is enforced server-side, answers are queued for asynchronous scoring, and results are aggregated into cached analytics views for instant reporting.",
      flow: [
        "Candidate Login",
        "Exam Session Initialization",
        "Server-Authoritative Timer Middleware",
        "Answer Submission Queue",
        "Polymorphic Grading Engine",
        "Result Aggregation",
        "Analytics Dashboard",
      ],
      highlights: [
        "Server-side timer enforcement with heartbeat pings to prevent client-side tampering",
        "Polymorphic grading engine supporting MCQ, true/false, and rubric-based essay scoring",
        "Randomized question pooling per session to reduce collusion and repeat exposure",
        "Result caching layer for instant analytics dashboards without recomputation",
      ],
    },
    challenges: [
      {
        title: "Preventing Timer Manipulation",
        problem:
          "Client-side countdown timers could be paused or manipulated via browser devtools, allowing candidates extra time.",
        solution:
          "Moved timer authority entirely to the server with periodic heartbeat validation and automatic answer submission the instant the server-tracked deadline expires.",
        result: "Zero disputed time-based grading issues across 5K+ recorded exam attempts.",
      },
      {
        title: "Grading Heterogeneous Question Types",
        problem:
          "The system needed to grade MCQs, true/false, and rubric-scored essay answers with a single consistent pipeline.",
        solution:
          "Implemented a strategy pattern where each question type resolves its own grading strategy, decoupling scoring logic from the exam controller.",
        result: "Grading time dropped from manual hours to under 2 seconds per submission with 99.5% accuracy.",
      },
      {
        title: "Concurrent Session Scaling",
        problem:
          "Large candidate cohorts sitting exams simultaneously caused database contention on answer writes.",
        solution:
          "Queued answer submissions through Redis-backed jobs and cached active session state to remove write pressure from the primary database during peak load.",
        result: "System now supports 500+ concurrent exam sessions without measurable lag.",
      },
    ],
    features: [
      { title: "Timed Exam Engine", description: "Server-authoritative countdown with auto-submit, session resumption, and anti-tamper heartbeat checks." },
      { title: "Auto-Grading System", description: "Polymorphic grading strategies per question type with instant score computation." },
      { title: "Candidate Analytics Dashboard", description: "Real-time performance breakdowns, cohort comparisons, and exportable reports." },
      { title: "Question Bank Management", description: "Tagged, randomized question pooling with difficulty weighting and reuse controls." },
    ],
    codeSnippet: {
      title: "GradingEngine — Strategy-Based Auto Grading",
      language: "php",
      code: `<?php

namespace App\\Services\\Grading;

use App\\Models\\ExamAttempt;

class GradingEngine
{
    public function __construct(
        private array \$strategies // [questionType => GradingStrategy]
    ) {}

    public function grade(ExamAttempt \$attempt): float
    {
        \$totalScore = 0;

        foreach (\$attempt->answers as \$answer) {
            \$strategy = \$this->strategies[\$answer->question->type]
                ?? throw new \\RuntimeException('No grading strategy found');

            \$totalScore += \$strategy->score(\$answer);
        }

        \$attempt->update([
            'score' => \$totalScore,
            'graded_at' => now(),
        ]);

        return \$totalScore;
    }
}`,
    },
  },

  usrarecurrency: {
    title: "US Rare Currency Collector Portal",
    subtitle: "Numismatic E-Commerce with Rarity Grading Catalog",
    liveUrl: "https://www.usrarecurrency.com/",
    githubUrl: null,
    techStack: ["PHP", "MySQL", "E-Commerce", "Payment Integration", "Laravel", "REST API"],
    badge: "Live Store",
    metrics: [
      { label: "Catalog Items", value: "3K+", unit: "listings" },
      { label: "High-Res Images", value: "8K+", unit: "assets" },
      { label: "Checkout Conversion", value: "+18", unit: "%" },
      { label: "Payment Success", value: "99.7", unit: "%" },
    ],
    overview:
      "Specialized numismatic e-commerce store for rare currency collectors featuring searchable high-resolution bill catalogs, secure transactions, and inventory synchronization. Built to handle one-of-a-kind inventory where a single sale must never be double-fulfilled.",
    architecture: {
      description:
        "The store separates catalog browsing, image delivery, and checkout into independently optimized layers. Rare, non-restockable items are protected with reservation locks the moment they enter a cart, and a faceted search index drives fast attribute-based discovery.",
      flow: [
        "Catalog Browse",
        "Faceted Search / Filter Engine",
        "Product Detail (High-Res Zoom)",
        "Cart Reservation Lock",
        "Secure Checkout",
        "Payment Gateway",
        "Order Fulfillment",
      ],
      highlights: [
        "Image pipeline generating zoomable, lazy-loaded high-res scans via on-the-fly thumbnailing",
        "Faceted search across grade, year, mint mark, and condition attributes",
        "Timed cart-reservation locks preventing overselling of unique, one-of-a-kind items",
        "PCI-compliant checkout flow with tokenized payment handling",
      ],
    },
    challenges: [
      {
        title: "Preventing Overselling Unique Inventory",
        problem:
          "Many items are one-of-a-kind; two customers adding the same bill to their cart could both attempt checkout.",
        solution:
          "Built a pessimistic-locking cart reservation service that decrements stock and creates a timed hold the instant an item enters a cart, auto-releasing on expiry.",
        result: "Zero double-sell incidents recorded on rare, non-restockable items.",
      },
      {
        title: "High-Resolution Image Performance",
        problem:
          "Collectors need to zoom into fine bill details, but serving full-resolution scans on every page load hurt load times.",
        solution:
          "Implemented a lazy-loaded, zoomable image viewer backed by on-the-fly thumbnail generation and responsive image sets.",
        result: "Page load time cut by roughly 40% on catalog and product pages.",
      },
      {
        title: "Search Relevance Across Attributes",
        problem:
          "Collectors search by combinations of grade, mint, year, and condition, which a simple keyword search couldn't satisfy accurately.",
        solution:
          "Built an indexed faceted search over normalized attribute tables with combinable filters and relevance ranking.",
        result: "Search response times held under 100ms even across the full 3K+ item catalog.",
      },
    ],
    features: [
      { title: "Rarity Grading Catalog", description: "Structured attribute catalog with grade, mint, year, and condition metadata for precise discovery." },
      { title: "Reserved Cart Holds", description: "Timed reservation locks that protect unique inventory the moment an item enters a cart." },
      { title: "High-Res Zoom Viewer", description: "Lazy-loaded, zoomable product imagery for inspecting fine currency detail." },
      { title: "Secure Checkout", description: "PCI-compliant, tokenized payment flow with fraud-aware transaction validation." },
    ],
    codeSnippet: {
      title: "CartReservationService — Lock-Safe Unique Inventory",
      language: "php",
      code: `<?php

namespace App\\Services;

use App\\Models\\Product;
use Illuminate\\Support\\Facades\\DB;

class CartReservationService
{
    public function reserve(Product \$product, int \$userId): void
    {
        DB::transaction(function () use (\$product, \$userId) {
            \$locked = Product::where('id', \$product->id)
                ->where('quantity', '>', 0)
                ->lockForUpdate()
                ->firstOrFail();

            \$locked->decrement('quantity');

            \$locked->reservations()->create([
                'user_id' => \$userId,
                'expires_at' => now()->addMinutes(15),
            ]);
        });
    }
}`,
    },
  },

  digistoredirect: {
    title: "Digistore Direct Digital Marketplace",
    subtitle: "Instant-Delivery Marketplace with Automated Vendor Payouts",
    liveUrl: "https://digistoredirect.com/",
    githubUrl: null,
    techStack: ["Laravel", "Stripe API", "REST API", "Digital Commerce", "MySQL", "Queues"],
    badge: "Live Marketplace",
    metrics: [
      { label: "Digital Products", value: "1.2K+", unit: "listed" },
      { label: "Vendor Payouts", value: "100", unit: "% automated" },
      { label: "Avg Delivery Time", value: "<3", unit: "sec" },
      { label: "Transaction Success", value: "99.6", unit: "%" },
    ],
    overview:
      "Digital product fulfillment backend and marketplace platform featuring instant downloads, subscription management, multi-currency processing, and automated vendor payouts. Designed around idempotent event handling so payment webhooks can never cause duplicate fulfillment.",
    architecture: {
      description:
        "Stripe webhooks drive the entire fulfillment lifecycle. Every event is logged and checked for idempotency before license generation, and vendor earnings are tracked in a ledger that feeds an automated Stripe Connect payout job.",
      flow: [
        "Customer Checkout",
        "Stripe Payment Intent",
        "Idempotent Webhook Verification",
        "License Key Generation",
        "Signed Expiring Download Link",
        "Vendor Payout Ledger",
        "Email Delivery",
      ],
      highlights: [
        "Idempotent Stripe webhook handling backed by an event log to prevent duplicate fulfillment",
        "Signed, expiring, single-use download URLs to curb link sharing and piracy",
        "Automated Stripe Connect payout engine with per-vendor fee calculation",
        "License key generation with per-purchase usage and activation tracking",
      ],
    },
    challenges: [
      {
        title: "Duplicate Fulfillment from Webhook Retries",
        problem:
          "Stripe retries webhook delivery on timeout, which risked generating duplicate license keys and double-charging vendor payouts.",
        solution:
          "Added an idempotency layer that logs every processed Stripe event ID before fulfillment runs, short-circuiting retried deliveries.",
        result: "Zero duplicate deliveries recorded across 10K+ processed transactions.",
      },
      {
        title: "Preventing Digital Piracy",
        problem:
          "Direct download links were being shared outside of purchases, undermining vendor revenue.",
        solution:
          "Replaced static URLs with signed, expiring, single-use download tokens generated per purchase and invalidated after use.",
        result: "Unauthorized redownload attempts blocked; reported link-sharing abuse dropped sharply.",
      },
      {
        title: "Multi-Currency Vendor Payout Reconciliation",
        problem:
          "Vendors sold in multiple currencies, making manual payout reconciliation error-prone and slow.",
        solution:
          "Built an automated Stripe Connect transfer engine that calculates platform fees and currency conversion before scheduling payouts.",
        result: "Fully automated payouts with zero manual reconciliation required.",
      },
    ],
    features: [
      { title: "Instant Digital Delivery", description: "Post-purchase fulfillment that generates license keys and delivers download links within seconds." },
      { title: "Vendor Payout Engine", description: "Automated Stripe Connect transfers with fee calculation and multi-currency support." },
      { title: "License Key Management", description: "Per-purchase license generation with activation and usage tracking." },
      { title: "Stripe Checkout Integration", description: "Hosted checkout sessions with webhook-driven order confirmation." },
    ],
    codeSnippet: {
      title: "StripeWebhookController — Idempotent Fulfillment",
      language: "php",
      code: `<?php

namespace App\\Http\\Controllers\\Webhooks;

use App\\Models\\WebhookEvent;
use App\\Services\\DigitalFulfillmentService;
use Illuminate\\Http\\Request;

class StripeWebhookController extends Controller
{
    public function __invoke(Request \$request, DigitalFulfillmentService \$fulfillment)
    {
        \$eventId = \$request->input('id');

        if (WebhookEvent::where('stripe_event_id', \$eventId)->exists()) {
            return response()->json(['status' => 'duplicate']);
        }

        WebhookEvent::create(['stripe_event_id' => \$eventId]);

        if (\$request->input('type') === 'checkout.session.completed') {
            \$fulfillment->deliver(\$request->input('data.object'));
        }

        return response()->json(['status' => 'processed']);
    }
}`,
    },
  },

  "henry-griffitts": {
    title: "Henry-Griffitts Custom Golf Fitting",
    subtitle: "Interactive Fitting Calculator & Distributor Order Routing",
    liveUrl: "https://henry-griffitts.thebackendprojects.com/",
    githubUrl: null,
    techStack: ["Laravel", "PHP", "MySQL", "Custom Workflows", "REST API"],
    badge: "Live System",
    metrics: [
      { label: "Fitting Profiles", value: "2K+", unit: "generated" },
      { label: "Distributor Partners", value: "40+", unit: "connected" },
      { label: "Routing Accuracy", value: "99.9", unit: "%" },
      { label: "Configuration Combos", value: "500+", unit: "supported" },
    ],
    overview:
      "Custom golf club fitting and equipment specification system built with interactive fitting calculations, distributor order routing, and custom product configuration. Translates biomechanical swing measurements into precise, orderable club specifications.",
    architecture: {
      description:
        "A rules-engine fitting calculator sits between the questionnaire intake and the product configurator, decoupling recommendation logic from controllers. Confirmed configurations are routed to the correct distributor using a weighted, stock-aware algorithm.",
      flow: [
        "Fitting Questionnaire",
        "Biomechanical Calculation Engine",
        "Club Spec Recommendation",
        "Dependent-Option Configuration",
        "Distributor Routing Algorithm",
        "Order Confirmation",
      ],
      highlights: [
        "Rules-engine fitting calculator driven by swing speed, height, and wrist-to-floor measurements",
        "Dynamic product configurator with dependent-option validation (e.g. shaft flex tied to swing tier)",
        "Weighted distributor routing considering proximity, stock, and load balancing",
        "Full audit trail retained for every fitting recommendation generated",
      ],
    },
    challenges: [
      {
        title: "Encoding Fitting Logic Correctly",
        problem:
          "Club specification recommendations depend on multiple interacting biomechanical measurements that needed to match professional fitter standards.",
        solution:
          "Built a Specification-pattern rules engine decoupled from controllers, allowing each fitting rule to be tested and validated independently.",
        result: "Recommendations validated against professional fitter benchmarks with consistent, repeatable output.",
      },
      {
        title: "Accurate Distributor Order Routing",
        problem:
          "Orders needed to reach the correct regional distributor based on proximity and live stock, with no manual dispatching.",
        solution:
          "Implemented a weighted routing algorithm scoring distributors by proximity, current inventory, and existing order load.",
        result: "99.9% correct first-time routing across 40+ distributor partners.",
      },
      {
        title: "Configuration Dependency Rules",
        problem:
          "Certain configuration options (like shaft flex) are only valid for specific swing-speed tiers, and invalid combinations were slipping through.",
        solution:
          "Added a dependent-option validation layer that disables or hides invalid combinations at configuration time.",
        result: "Eliminated invalid configuration submissions entirely.",
      },
    ],
    features: [
      { title: "Fitting Calculator Engine", description: "Rules-based recommendation engine translating swing measurements into club specifications." },
      { title: "Dynamic Product Configurator", description: "Dependent-option configuration UI backed by server-side validation rules." },
      { title: "Distributor Order Routing", description: "Weighted routing algorithm assigning orders to the optimal regional distributor." },
      { title: "Fitting History Archive", description: "Searchable audit trail of every fitting session and generated recommendation." },
    ],
    codeSnippet: {
      title: "FittingCalculator — Biomechanical Rules Engine",
      language: "php",
      code: `<?php

namespace App\\Services\\Fitting;

class FittingCalculator
{
    public function recommend(array \$measurements): array
    {
        \$shaftFlex = match (true) {
            \$measurements['swing_speed'] >= 100 => 'stiff',
            \$measurements['swing_speed'] >= 85 => 'regular',
            default => 'senior',
        };

        \$lieAngle = round(
            ((\$measurements['wrist_to_floor'] - \$measurements['height'] * 0.01) * 2) + 60,
            1
        );

        return [
            'shaft_flex' => \$shaftFlex,
            'lie_angle' => \$lieAngle,
            'club_length' => \$this->clubLength(\$measurements['height']),
        ];
    }

    private function clubLength(float \$height): float
    {
        return round(35 + ((\$height - 68) * 0.1), 2);
    }
}`,
    },
  },

  anaq: {
    title: "Anaq Enterprise Portal & Management",
    subtitle: "RBAC-Secured Multi-Location Inventory & Order Management",
    liveUrl: "https://anaq.thebackendprojects.com/login",
    githubUrl: null,
    techStack: ["Laravel", "Sanctum Auth", "MySQL", "Admin Dashboard", "RBAC", "REST API"],
    badge: "Enterprise Portal",
    metrics: [
      { label: "Roles & Permissions", value: "25+", unit: "defined" },
      { label: "Locations Synced", value: "12", unit: "sites" },
      { label: "Inventory Accuracy", value: "99.4", unit: "%" },
      { label: "Admin Users", value: "80+", unit: "active" },
    ],
    overview:
      "Secure enterprise web portal featuring granular role-based access control, multi-location inventory sync, order processing pipelines, and administrative reporting. Built so permissions, locations, and order state remain consistent even with dozens of concurrent admin users.",
    architecture: {
      description:
        "Access control is enforced through a policy-based RBAC layer with cached permission checks, while inventory is scoped per location with scheduled sync jobs. Orders flow through an explicit state machine to keep concurrent edits consistent.",
      flow: [
        "Login (Sanctum)",
        "Role/Permission Gate",
        "Location Context Resolver",
        "Inventory Sync Job",
        "Order Processing Pipeline",
        "Audit Log",
        "Admin Reporting",
      ],
      highlights: [
        "Granular permission system with cached role/permission resolution per request",
        "Location-scoped inventory synced via scheduled jobs with discrepancy detection",
        "Queued order pipeline enforced through an explicit state machine",
        "Full audit logging of every administrative action for compliance review",
      ],
    },
    challenges: [
      {
        title: "Granular Access Control at Scale",
        problem:
          "Different departments and locations required distinct access boundaries, but permission checks couldn't be allowed to slow down requests.",
        solution:
          "Built a policy-based RBAC layer with permission caching keyed per user session, avoiding repeated database lookups on every gate check.",
        result: "Fine-grained access enforced with under 5ms of authorization overhead per request.",
      },
      {
        title: "Multi-Location Inventory Drift",
        problem:
          "Inventory counts across 12 locations gradually drifted out of sync, causing overselling and reporting errors.",
        solution:
          "Introduced scheduled sync jobs with conflict resolution logic and automated discrepancy alerts for manual review.",
        result: "Inventory accuracy improved from roughly 92% to 99.4%.",
      },
      {
        title: "Concurrent Order Edits",
        problem:
          "Multiple admins updating the same order simultaneously produced conflicting status transitions.",
        solution:
          "Implemented an explicit order state machine with optimistic locking to reject stale transitions.",
        result: "Eliminated conflicting status updates across concurrent admin sessions.",
      },
    ],
    features: [
      { title: "Role-Based Access Control", description: "Granular, cached permission checks scoped by role, location, and department." },
      { title: "Multi-Location Inventory Sync", description: "Scheduled inventory synchronization with automated discrepancy detection." },
      { title: "Order Processing Pipeline", description: "State-machine-driven order lifecycle with optimistic locking against conflicting edits." },
      { title: "Admin Audit Logging", description: "Immutable audit trail of administrative actions for compliance and review." },
    ],
    codeSnippet: {
      title: "InventoryPolicy — Location-Scoped Authorization",
      language: "php",
      code: `<?php

namespace App\\Policies;

use App\\Models\\User;
use App\\Models\\InventoryItem;

class InventoryPolicy
{
    public function update(User \$user, InventoryItem \$item): bool
    {
        return \$user->hasPermissionTo('inventory.update')
            && \$user->locations->contains(\$item->location_id);
    }

    public function transfer(User \$user, InventoryItem \$item): bool
    {
        return \$user->hasPermissionTo('inventory.transfer')
            && \$user->hasRole(['admin', 'regional_manager']);
    }
}`,
    },
  },

  leadup: {
    title: "LeadUp CRM & Lead Management System",
    subtitle: "Real-Time Lead Distribution & Sales Performance Tracking",
    liveUrl: "http://staging.leadup.thebackendprojects.com/login",
    githubUrl: null,
    techStack: ["Laravel", "PHP", "MySQL", "CRM", "SaaS", "REST API"],
    badge: "CRM Platform",
    metrics: [
      { label: "Leads Processed", value: "3K+", unit: "daily" },
      { label: "Distribution Latency", value: "<200", unit: "ms" },
      { label: "Agent Utilization", value: "+30", unit: "%" },
      { label: "Call Logs Tracked", value: "50K+", unit: "records" },
    ],
    overview:
      "High-throughput lead distribution and sales funnel tracking CRM. Includes automated lead distribution, call logging, real-time agent status tracking, and performance metrics designed to keep sales teams working the freshest leads first.",
    architecture: {
      description:
        "Incoming leads are deduplicated and routed through a weighted distribution algorithm that accounts for live agent capacity and status. Call activity feeds a performance aggregation layer that powers real-time dashboards.",
      flow: [
        "Lead Ingestion (Webhook/Form)",
        "Deduplication Engine",
        "Weighted Distribution Algorithm",
        "Agent Queue Assignment",
        "Call Logging & Disposition",
        "Performance Aggregation",
        "Agent Dashboard",
      ],
      highlights: [
        "Weighted round-robin lead distribution factoring live agent capacity and status",
        "Fingerprint-based deduplication using normalized phone/email hashing",
        "Real-time agent availability tracking with debounced status broadcasts",
        "Call disposition tracking feeding directly into performance metrics",
      ],
    },
    challenges: [
      {
        title: "Fair, Fast Lead Distribution",
        problem:
          "Leads needed to reach available agents instantly, but naive round-robin ignored actual agent workload and availability.",
        solution:
          "Built a weighted distribution algorithm factoring agent capacity, current active leads, and last-assigned timestamp, resolved under a database lock to avoid race conditions.",
        result: "Distribution latency held under 200ms, reducing agent idle time.",
      },
      {
        title: "Duplicate Lead Submissions",
        problem:
          "The same lead often entered through multiple channels (web form, call, referral), inflating pipeline counts and confusing agents.",
        solution:
          "Implemented fingerprint-based deduplication using normalized phone and email hashing before a lead enters the distribution queue.",
        result: "Duplicate leads reduced by approximately 85%.",
      },
      {
        title: "Real-Time Agent Availability",
        problem:
          "Dashboards needed to reflect agent status changes quickly without overloading the server with constant polling.",
        solution:
          "Replaced heavy polling with debounced status broadcasts triggered only on actual state changes.",
        result: "Dashboard reflects agent state changes within seconds under normal load.",
      },
    ],
    features: [
      { title: "Lead Distribution Engine", description: "Weighted, capacity-aware assignment routing leads to the best-available agent." },
      { title: "Call Logging & Disposition", description: "Structured call outcome tracking feeding directly into agent performance metrics." },
      { title: "Agent Performance Dashboard", description: "Real-time views of calls logged, deals closed, and response times per agent." },
      { title: "Duplicate Lead Detection", description: "Fingerprint-based deduplication across multiple lead intake channels." },
    ],
    codeSnippet: {
      title: "LeadDistributionService — Capacity-Aware Assignment",
      language: "php",
      code: `<?php

namespace App\\Services;

use App\\Models\\Agent;
use App\\Models\\Lead;

class LeadDistributionService
{
    public function assign(Lead \$lead): Agent
    {
        \$agent = Agent::where('status', 'available')
            ->withCount('activeLeads')
            ->orderBy('active_leads_count')
            ->orderBy('last_assigned_at')
            ->lockForUpdate()
            ->firstOrFail();

        \$lead->update([
            'agent_id' => \$agent->id,
            'assigned_at' => now(),
        ]);

        \$agent->update(['last_assigned_at' => now()]);

        return \$agent;
    }
}`,
    },
  },

  paulswindowcleaning: {
    title: "Paul's Window Cleaning Platform",
    subtitle: "Instant Estimate Booking & Team Dispatch System",
    liveUrl: "https://paulswindowcleaning.org/",
    githubUrl: null,
    techStack: ["PHP", "Laravel", "MySQL", "Service Platform", "REST API"],
    badge: "Live Service",
    metrics: [
      { label: "Estimates Generated", value: "5K+", unit: "total" },
      { label: "Booking Conversion", value: "42", unit: "%" },
      { label: "Dispatch Accuracy", value: "98", unit: "%" },
      { label: "Avg Response Time", value: "<1", unit: "hr" },
    ],
    overview:
      "Commercial and residential window cleaning management system featuring instant online estimate booking, service scheduling, team dispatching, and invoicing. Removes manual quoting calls from the sales funnel entirely.",
    architecture: {
      description:
        "A configurable pricing rules engine turns property attributes into instant quotes, which flow directly into scheduling and geofenced dispatch assignment. Invoicing is triggered automatically once a job is marked complete.",
      flow: [
        "Estimate Request Form",
        "Pricing Rules Engine",
        "Instant Quote",
        "Schedule Booking",
        "Geofenced Team Dispatch",
        "Automated Invoicing",
      ],
      highlights: [
        "Configurable pricing rules engine based on property size and service tier",
        "Geofenced dispatch assignment routing jobs to the nearest available team",
        "Automated invoice generation triggered on service completion",
        "SMS/email confirmation pipeline for bookings and reminders",
      ],
    },
    challenges: [
      {
        title: "Instant, Accurate Quoting",
        problem:
          "Manual estimation calls delayed bookings by days and created inconsistent pricing across sales reps.",
        solution:
          "Built a configurable pricing rules engine driven by property size, story count, and service type that returns a quote instantly on form submission.",
        result: "Quote-to-booking time reduced from days to minutes, with a 42% booking conversion rate.",
      },
      {
        title: "Efficient Job Dispatching",
        problem:
          "Assigning jobs to the nearest available team manually led to wasted travel time and scheduling conflicts.",
        solution:
          "Implemented a geofenced dispatch algorithm considering team location, current schedule, and job proximity.",
        result: "Dispatch accuracy reached 98%, cutting unnecessary travel between jobs.",
      },
      {
        title: "Reducing No-Shows",
        problem:
          "Missed appointments were a recurring source of wasted crew time and customer frustration.",
        solution:
          "Added an automated reminder and confirmation workflow triggered ahead of each scheduled visit.",
        result: "No-show rate dropped by approximately 35%.",
      },
    ],
    features: [
      { title: "Instant Quote Engine", description: "Rules-based pricing that returns a quote immediately from property attributes." },
      { title: "Team Dispatch Scheduling", description: "Geofenced assignment of jobs to the nearest available crew." },
      { title: "Automated Invoicing", description: "Invoice generation triggered automatically on service completion." },
      { title: "Service History Tracking", description: "Full record of past visits, quotes, and payments per customer property." },
    ],
    codeSnippet: {
      title: "InstantQuoteService — Rules-Based Pricing",
      language: "php",
      code: `<?php

namespace App\\Services;

class InstantQuoteService
{
    public function calculate(array \$property, string \$serviceType): float
    {
        \$base = match ($serviceType) {
            'residential' => 45,
            'commercial' => 120,
            default => 60,
        };

        \$sizeMultiplier = 1 + (\$property['window_count'] - 10) * 0.05;
        \$storyMultiplier = 1 + ((\$property['stories'] - 1) * 0.15);

        return round(\$base * max(\$sizeMultiplier, 1) * \$storyMultiplier, 2);
    }
}`,
    },
  },

  smartworldkenya: {
    title: "Smart World Kenya Tech Store",
    subtitle: "M-Pesa-Integrated Electronics E-Commerce Platform",
    liveUrl: "https://smartworldkenya.com/",
    githubUrl: null,
    techStack: ["PHP", "Laravel", "M-Pesa API", "E-Commerce", "MySQL", "REST API"],
    badge: "Live Store",
    metrics: [
      { label: "Products Listed", value: "2K+", unit: "SKUs" },
      { label: "M-Pesa Transactions", value: "15K+", unit: "processed" },
      { label: "Payment Success", value: "98.5", unit: "%" },
      { label: "Avg Checkout Time", value: "<90", unit: "sec" },
    ],
    overview:
      "E-commerce platform for electronics and smart devices tailored for Kenya, featuring M-Pesa mobile payment integration, product filtering, and dispatch tracking. Handles the operational realities of mobile-money callback delivery being unreliable.",
    architecture: {
      description:
        "Checkout initiates an M-Pesa Daraja STK push, with an idempotent callback handler and a scheduled reconciliation job covering any callbacks that never arrive. Dispatch status is surfaced to customers through webhook-driven order updates.",
      flow: [
        "Product Browse",
        "Cart",
        "Checkout",
        "M-Pesa STK Push",
        "Idempotent Callback Verification",
        "Order Confirmation",
        "Dispatch Tracking",
      ],
      highlights: [
        "M-Pesa Daraja STK Push integration with idempotent, verified callback handling",
        "Scheduled reconciliation job for transactions with missing or delayed callbacks",
        "Faceted product filtering across category, brand, and price attributes",
        "Webhook-driven dispatch tracking surfaced directly on the order page",
      ],
    },
    challenges: [
      {
        title: "Unreliable M-Pesa Callback Delivery",
        problem:
          "M-Pesa callback delivery is not guaranteed, occasionally leaving payments in an unconfirmed state despite the customer being charged.",
        solution:
          "Built a polling fallback alongside the idempotent callback handler, plus a scheduled reconciliation job that queries transaction status directly when callbacks don't arrive.",
        result: "Payment confirmation reliability improved to 98.5% of transactions.",
      },
      {
        title: "STK Push Timeout & Cancellation UX",
        problem:
          "Customers frequently missed or cancelled the STK push prompt on their phone, leaving checkout stuck with no clear feedback.",
        solution:
          "Implemented real-time status polling on the checkout page with timeout detection and a one-tap retry prompt.",
        result: "Checkout abandonment at the payment step was noticeably reduced.",
      },
      {
        title: "Order Visibility for Customers",
        problem:
          "Customers had no visibility into dispatch status after payment, generating a high volume of support inquiries.",
        solution:
          "Wired dispatch status webhooks directly into the order detail page with real-time status updates.",
        result: "\"Where is my order\" support tickets dropped by roughly 50%.",
      },
    ],
    features: [
      { title: "M-Pesa STK Push Checkout", description: "Mobile-money checkout with idempotent callback verification and status reconciliation." },
      { title: "Product Filtering & Search", description: "Faceted filtering across category, brand, and price for fast product discovery." },
      { title: "Dispatch Tracking", description: "Webhook-driven order status updates visible to customers in real time." },
      { title: "Order Management Dashboard", description: "Admin view of orders, payment status, and dispatch progress." },
    ],
    codeSnippet: {
      title: "MpesaStkService — Daraja STK Push Integration",
      language: "php",
      code: `<?php

namespace App\\Services;

use Illuminate\\Support\\Facades\\Http;

class MpesaStkService
{
    public function push(string \$phone, float \$amount, string \$orderRef): array
    {
        \$timestamp = now()->format('YmdHis');
        \$password = base64_encode(
            config('mpesa.shortcode') . config('mpesa.passkey') . \$timestamp
        );

        return Http::withToken(\$this->accessToken())
            ->post(config('mpesa.stk_url'), [
                'BusinessShortCode' => config('mpesa.shortcode'),
                'Password' => \$password,
                'Timestamp' => \$timestamp,
                'TransactionType' => 'CustomerPayBillOnline',
                'Amount' => \$amount,
                'PartyA' => \$phone,
                'PartyB' => config('mpesa.shortcode'),
                'PhoneNumber' => \$phone,
                'CallBackURL' => route('mpesa.callback'),
                'AccountReference' => \$orderRef,
            ])->json();
    }
}`,
    },
  },

  transitionthewarrior: {
    title: "Transition The Warrior Veteran Network",
    subtitle: "Non-Profit Mentorship & Resource Directory Platform",
    liveUrl: "https://transitionthewarrior.org/",
    githubUrl: null,
    techStack: ["Laravel", "PHP", "MySQL", "Non-Profit", "REST API"],
    badge: "Live Non-Profit",
    metrics: [
      { label: "Veterans Registered", value: "1.5K+", unit: "members" },
      { label: "Mentors Matched", value: "300+", unit: "pairs" },
      { label: "Resources Listed", value: "200+", unit: "entries" },
      { label: "Event Registrations", value: "800+", unit: "total" },
    ],
    overview:
      "Non-profit web platform supporting military veterans in career transition. Includes resource directories, mentorship pipelines, event registration, and community support tools built to connect veterans with the right people and resources quickly.",
    architecture: {
      description:
        "A scoring-based matching engine pairs veterans with mentors based on industry, location, and availability. Resources are indexed for fast tagged search, and event registration enforces capacity limits with a waitlist queue.",
      flow: [
        "Veteran Registration",
        "Profile & Needs Assessment",
        "Mentor Matching Engine",
        "Resource Directory Search",
        "Event Registration",
        "Community Notifications",
      ],
      highlights: [
        "Scoring-based mentor matching algorithm weighing industry, location, and availability",
        "Full-text tagged search across the resource directory for fast discoverability",
        "Capacity-aware event registration with automatic waitlist promotion",
        "Automated email digest pipeline for community updates",
      ],
    },
    challenges: [
      {
        title: "Matching Veterans With Relevant Mentors",
        problem:
          "Manually pairing veterans with mentors didn't scale and often produced mismatches in industry or availability.",
        solution:
          "Built a scoring-based matching algorithm ranking mentors by industry fit, location proximity, and open mentoring slots.",
        result: "Mentor match relevance improved significantly based on post-match satisfaction feedback.",
      },
      {
        title: "Resource Directory Discoverability",
        problem:
          "As the resource directory grew past 200 entries, veterans struggled to find relevant support services.",
        solution:
          "Implemented tagged, full-text indexed search with category faceting across the directory.",
        result: "Resource findability improved, reducing manual support requests to admins.",
      },
      {
        title: "Event Capacity Management",
        problem:
          "Popular events risked overbooking without a reliable way to cap registrations.",
        solution:
          "Built capacity-aware registration with an automatic waitlist queue that promotes attendees as spots free up.",
        result: "Zero overbooking incidents recorded across 50+ hosted events.",
      },
    ],
    features: [
      { title: "Mentor Matching Engine", description: "Scoring-based algorithm pairing veterans with mentors by industry, location, and availability." },
      { title: "Resource Directory", description: "Searchable, tagged directory of career and support resources for veterans." },
      { title: "Event Registration System", description: "Capacity-aware registration with automatic waitlist promotion." },
      { title: "Community Notifications", description: "Automated email digests keeping members informed of new resources and events." },
    ],
    codeSnippet: {
      title: "MentorMatchingService — Scoring-Based Pairing",
      language: "php",
      code: `<?php

namespace App\\Services;

use App\\Models\\Veteran;
use App\\Models\\Mentor;

class MentorMatchingService
{
    public function findBestMatch(Veteran \$veteran): ?Mentor
    {
        return Mentor::where('is_active', true)
            ->where('industry', \$veteran->target_industry)
            ->get()
            ->sortByDesc(fn (Mentor \$mentor) => \$this->score(\$mentor, \$veteran))
            ->first();
    }

    private function score(Mentor \$mentor, Veteran \$veteran): int
    {
        \$score = 0;
        \$score += \$mentor->industry === \$veteran->target_industry ? 40 : 0;
        \$score += \$mentor->location === \$veteran->location ? 20 : 0;
        \$score += min(\$mentor->available_slots, 5) * 8;

        return \$score;
    }
}`,
    },
  },

  moneyinfocus: {
    title: "Money In Focus Financial News Portal",
    subtitle: "High-Traffic News Publishing Pipeline with SEO Automation",
    liveUrl: "https://moneyinfocus.news/",
    githubUrl: null,
    techStack: ["PHP", "Laravel", "SEO Optimization", "Media Platform", "MySQL", "Redis"],
    badge: "Live News",
    metrics: [
      { label: "Monthly Pageviews", value: "200K+", unit: "views" },
      { label: "Articles Published", value: "5K+", unit: "total" },
      { label: "Page Load Time", value: "<1.2", unit: "sec" },
      { label: "Organic Traffic", value: "+65", unit: "%" },
    ],
    overview:
      "High-traffic financial news and market analysis media portal featuring real-time publishing pipelines, newsletter integration, automated indexing, and SEO optimization. Built to absorb traffic spikes on breaking financial news without degrading performance.",
    architecture: {
      description:
        "Articles move through a publishing pipeline that generates SEO metadata and structured data automatically, invalidates Redis-cached pages on update, and dispatches newsletter emails as part of the same workflow.",
      flow: [
        "Editorial Draft",
        "Publishing Pipeline",
        "SEO Metadata Generation",
        "Redis Cache Invalidation",
        "CDN Distribution",
        "Newsletter Dispatch",
        "Analytics Indexing",
      ],
      highlights: [
        "Cache-aside pattern with tag-based Redis invalidation for high-traffic article pages",
        "Automated SEO metadata, sitemap, and schema.org structured data generation on publish",
        "Newsletter dispatch queue integrated directly into the publishing workflow",
        "Scheduled publishing with automated multi-channel distribution",
      ],
    },
    challenges: [
      {
        title: "Absorbing Breaking-News Traffic Spikes",
        problem:
          "Popular financial news stories caused sudden traffic spikes that risked degrading page performance site-wide.",
        solution:
          "Implemented Redis page caching with tag-based invalidation triggered only on article publish or update, keeping cache hit rates high during spikes.",
        result: "Page load time stayed under 1.2 seconds even during high-traffic breaking news events.",
      },
      {
        title: "SEO Visibility for Time-Sensitive Content",
        problem:
          "Financial news loses relevance quickly, so articles needed to be indexed and discoverable almost immediately after publish.",
        solution:
          "Automated meta tag, sitemap, and schema.org structured data generation as part of the publish pipeline, with instant CDN cache purge.",
        result: "Organic traffic grew approximately 65% over six months.",
      },
      {
        title: "Editorial Publishing Bottleneck",
        problem:
          "Manual steps between draft approval and live publish slowed down time-sensitive market coverage.",
        solution:
          "Streamlined the pipeline with scheduled publish and automated distribution to newsletter and CDN in a single workflow.",
        result: "Time-to-publish reduced from hours to minutes.",
      },
    ],
    features: [
      { title: "Automated Publishing Pipeline", description: "Scheduled, single-step publishing that triggers SEO, cache, and distribution updates." },
      { title: "SEO Metadata Engine", description: "Automatic sitemap, meta tag, and schema.org structured data generation on publish." },
      { title: "Redis Page Caching", description: "Cache-aside article delivery with tag-based invalidation on update." },
      { title: "Newsletter Integration", description: "Publishing-linked newsletter dispatch queue for new articles." },
    ],
    codeSnippet: {
      title: "ArticleRepository — Cache-Aside Content Delivery",
      language: "php",
      code: `<?php

namespace App\\Repositories;

use App\\Models\\Article;
use Illuminate\\Support\\Facades\\Cache;

class ArticleRepository
{
    public function find(string \$slug): Article
    {
        return Cache::tags(['articles'])
            ->remember("article:{\$slug}", now()->addHour(), function () use (\$slug) {
                return Article::with('author', 'category')
                    ->where('slug', \$slug)
                    ->firstOrFail();
            });
    }

    public function invalidate(Article \$article): void
    {
        Cache::tags(['articles'])->forget("article:{\$article->slug}");
    }
}`,
    },
  },

  auctune: {
    title: "Auctune — Auction & Bidding Platform",
    subtitle: "Real-Time WebSocket Bidding with Anti-Sniping Protection",
    liveUrl: "https://auctune.webdemodesigns.co/",
    githubUrl: null,
    techStack: ["Laravel", "PHP", "MySQL", "WebSockets", "Auction Tech", "Redis"],
    badge: "Live Platform",
    metrics: [
      { label: "Live Auctions Hosted", value: "400+", unit: "total" },
      { label: "Concurrent Bidders", value: "250+", unit: "peak" },
      { label: "Bid Latency", value: "<100", unit: "ms" },
      { label: "Settlement Success", value: "99.5", unit: "%" },
    ],
    overview:
      "Real-time online auction marketplace featuring auto-bidding algorithms, countdown timers, anti-sniping protection, seller listings, and payment settlement. Built to guarantee bid integrity under heavy concurrent load.",
    architecture: {
      description:
        "Bid placement runs inside a locked database transaction to guarantee atomicity, with confirmed bids broadcast over WebSockets to every connected viewer. Auctions nearing close auto-extend their countdown to prevent last-second sniping.",
      flow: [
        "Auction Listing",
        "Bid Submission",
        "Row-Locked Bid Validation",
        "WebSocket Broadcast",
        "Anti-Sniping Timer Extension",
        "Auction Close",
        "Payment Settlement",
      ],
      highlights: [
        "Pessimistic row-locking on bid placement to prevent race conditions under load",
        "WebSocket broadcasting for instant bid updates across all connected viewers",
        "Anti-sniping logic that auto-extends the countdown on late bids",
        "Escrow-based payment settlement triggered on auction close",
      ],
    },
    challenges: [
      {
        title: "Race Conditions on Simultaneous Bids",
        problem:
          "Multiple bidders submitting near-identical bids at the same instant risked accepting an invalid or stale bid as the winner.",
        solution:
          "Implemented database row-level locking with atomic bid validation inside a single transaction before any bid is accepted.",
        result: "Zero invalid concurrent bid acceptances observed under load testing with 250+ concurrent bidders.",
      },
      {
        title: "Last-Second Bid Sniping",
        problem:
          "Bidders were winning auctions by placing bids in the final second, leaving no chance for others to respond.",
        solution:
          "Added an auto-extending countdown that pushes the auction end time out whenever a bid lands inside the closing window.",
        result: "Sniping-related disputes reduced to near zero.",
      },
      {
        title: "Real-Time State Synchronization",
        problem:
          "All connected viewers needed to see the current bid state instantly and consistently, even under high concurrency.",
        solution:
          "Used server-authoritative WebSocket broadcasting so every client reconciles against the same confirmed bid state.",
        result: "Bid updates propagate to all viewers in under 100ms.",
      },
    ],
    features: [
      { title: "Real-Time Bid Broadcasting", description: "WebSocket-powered live bid updates visible to every connected viewer instantly." },
      { title: "Anti-Sniping Timer Extension", description: "Countdown auto-extends when bids land in the closing window, ensuring fair bidding." },
      { title: "Auto-Bidding (Proxy Bids)", description: "Configurable maximum-bid automation that bids incrementally on a bidder's behalf." },
      { title: "Payment Settlement & Escrow", description: "Escrow-based settlement triggered automatically once an auction closes." },
    ],
    codeSnippet: {
      title: "BidService — Lock-Safe Bid Placement & Broadcast",
      language: "php",
      code: `<?php

namespace App\\Services;

use App\\Models\\Auction;
use App\\Events\\BidPlaced;
use Illuminate\\Support\\Facades\\DB;

class BidService
{
    public function placeBid(Auction \$auction, int \$userId, float \$amount): void
    {
        DB::transaction(function () use (\$auction, \$userId, \$amount) {
            \$locked = Auction::where('id', \$auction->id)
                ->lockForUpdate()
                ->firstOrFail();

            if (\$amount <= \$locked->current_bid) {
                throw new \\DomainException('Bid too low');
            }

            \$locked->bids()->create(['user_id' => \$userId, 'amount' => \$amount]);
            \$locked->update(['current_bid' => \$amount]);

            if (\$locked->ends_at->diffInSeconds(now()) <= 30) {
                \$locked->update(['ends_at' => \$locked->ends_at->addSeconds(30)]);
            }

            broadcast(new BidPlaced(\$locked))->toOthers();
        });
    }
}`,
    },
  },

  discountslife: {
    title: "DiscountsLife — Deals & Coupon Portal",
    subtitle: "Affiliate-Tracked Deal Aggregation with Automated SEO",
    liveUrl: "https://discountslife.com/",
    githubUrl: null,
    techStack: ["PHP", "Laravel", "MySQL", "Affiliate Tech", "SEO Optimization", "REST API"],
    badge: "Live Portal",
    metrics: [
      { label: "Active Deals Indexed", value: "10K+", unit: "listings" },
      { label: "Affiliate Clicks", value: "500K+", unit: "tracked" },
      { label: "Coupon Validation", value: "94", unit: "%" },
      { label: "Organic Sessions", value: "120K+", unit: "/month" },
    ],
    overview:
      "High-volume deal aggregator and verified coupon code portal with automated deal indexing, affiliate tracking, category filtering, and newsletter subscriptions. Ingests deal feeds from multiple affiliate networks and keeps coupon validity trustworthy at scale.",
    architecture: {
      description:
        "A feed normalization pipeline ingests deals from multiple affiliate networks through merchant-specific adapters, deduplicating before indexing. Scheduled jobs continuously re-validate coupon codes, and category/merchant pages are generated programmatically for SEO.",
      flow: [
        "Deal Feed Ingestion",
        "Normalization & Dedup",
        "Coupon Validation Job",
        "Affiliate Link Cloaking",
        "Category Indexing",
        "Programmatic SEO Pages",
        "Click Tracking",
      ],
      highlights: [
        "Feed normalization pipeline with merchant-specific adapters and dedup hashing",
        "Scheduled coupon validation jobs that auto-flag and deactivate expired codes",
        "Cloaked, tracked affiliate link redirection with click analytics",
        "Template-driven programmatic SEO pages per merchant/category combination",
      ],
    },
    challenges: [
      {
        title: "Aggregating Deals From Inconsistent Feeds",
        problem:
          "Deal feeds from different affiliate networks arrived in inconsistent formats and frequently overlapped, producing duplicate listings.",
        solution:
          "Built a normalization pipeline with per-merchant feed adapters and content-hash-based deduplication before indexing.",
        result: "Duplicate listings reduced by roughly 90%.",
      },
      {
        title: "Expired Coupon Codes Hurting Trust",
        problem:
          "Stale coupon codes eroded user trust and drove people away from the portal after failed redemptions.",
        solution:
          "Implemented scheduled validation jobs that periodically re-test each code against merchant validation endpoints and auto-deactivate failures.",
        result: "Coupon validity rate maintained at 94% across the active catalog.",
      },
      {
        title: "Scaling Programmatic SEO Without Duplicate Content",
        problem:
          "Generating a page per merchant/category combination risked search engine penalties for thin or duplicate content.",
        solution:
          "Built template-driven page generation that composes unique content blocks per merchant and category combination.",
        result: "Organic sessions grew to over 120K per month without ranking penalties.",
      },
    ],
    features: [
      { title: "Deal Feed Aggregation", description: "Merchant-specific adapters normalizing and deduplicating deals from multiple affiliate feeds." },
      { title: "Affiliate Link Tracking", description: "Cloaked, tracked redirects with click analytics per merchant and campaign." },
      { title: "Coupon Validation Engine", description: "Scheduled jobs that re-verify and auto-deactivate expired coupon codes." },
      { title: "Programmatic SEO Pages", description: "Template-driven, unique landing pages generated per merchant and category." },
    ],
    codeSnippet: {
      title: "ValidateCouponJob — Scheduled Code Verification",
      language: "php",
      code: `<?php

namespace App\\Jobs;

use App\\Models\\Coupon;
use Illuminate\\Support\\Facades\\Http;
use Illuminate\\Bus\\Queueable;
use Illuminate\\Contracts\\Queue\\ShouldQueue;

class ValidateCouponJob implements ShouldQueue
{
    use Queueable;

    public function __construct(private Coupon \$coupon) {}

    public function handle(): void
    {
        \$response = Http::timeout(5)->get(
            \$this->coupon->merchant->validation_endpoint,
            ['code' => \$this->coupon->code]
        );

        \$this->coupon->update([
            'is_valid' => \$response->ok() && \$response->json('valid'),
            'last_checked_at' => now(),
        ]);
    }
}`,
    },
  },

  nutrinaturals: {
    title: "NutriNaturals — Health & Supplement E-Commerce",
    subtitle: "Subscription-Based Supplement Store with Recurring Billing",
    liveUrl: "https://www.nutrinaturals.org",
    githubUrl: null,
    techStack: ["PHP", "Laravel", "MySQL", "E-Commerce", "Health Tech", "Payment Gateway"],
    badge: "Live Store",
    metrics: [
      { label: "Products Listed", value: "500+", unit: "SKUs" },
      { label: "Subscription Orders", value: "1.2K+", unit: "active" },
      { label: "Recurring Retention", value: "78", unit: "%" },
      { label: "Payment Success", value: "99.3", unit: "%" },
    ],
    overview:
      "Organic health and wellness supplement e-commerce store with product filtering, recurring subscription orders, verified customer reviews, and payment gateway integration. Built around a resilient recurring billing engine that recovers gracefully from failed charges.",
    architecture: {
      description:
        "Subscriptions run through an explicit state machine handling pause, resume, and cancellation with prorated billing. Failed recurring payments enter a dunning workflow instead of silently cancelling the subscription.",
      flow: [
        "Product Browse",
        "Subscription Plan Selection",
        "Checkout",
        "Recurring Billing Scheduler",
        "Order Fulfillment",
        "Verified Review Gate",
        "Renewal Reminder",
      ],
      highlights: [
        "Subscription state machine handling pause, resume, cancel, and prorated billing",
        "Dunning management with automated retry schedule for failed recurring charges",
        "Verified-purchase-only review system to prevent review spam",
        "Product filtering by health category and ingredient",
      ],
    },
    challenges: [
      {
        title: "Managing Subscription Lifecycle Changes",
        problem:
          "Customers pausing, resuming, or changing plans mid-cycle created inconsistent billing amounts and dates.",
        solution:
          "Built a subscription state machine that calculates prorated charges for pause/resume/upgrade transitions explicitly.",
        result: "Subscription retention held at 78% with consistent, predictable billing.",
      },
      {
        title: "Failed Recurring Payments Causing Churn",
        problem:
          "A single failed recurring charge would silently cancel a subscription, losing customers who simply had a temporary card issue.",
        solution:
          "Implemented dunning management with a scheduled retry sequence and proactive customer notifications before cancellation.",
        result: "Recovered roughly 25% of failed payment attempts that would otherwise have churned.",
      },
      {
        title: "Review Authenticity",
        problem:
          "Open review submission was attracting spam and unverified reviews that undermined customer trust.",
        solution:
          "Restricted review submission to accounts with a confirmed purchase record tied to the specific product.",
        result: "Review spam eliminated and customer trust in ratings improved.",
      },
    ],
    features: [
      { title: "Recurring Subscription Billing", description: "State-machine-driven subscriptions supporting pause, resume, and prorated plan changes." },
      { title: "Verified Purchase Reviews", description: "Reviews restricted to accounts with a confirmed purchase of the reviewed product." },
      { title: "Health Category Filtering", description: "Faceted filtering by supplement category, ingredient, and dietary attribute." },
      { title: "Automated Renewal Reminders", description: "Scheduled reminders and dunning notifications ahead of recurring charges." },
    ],
    codeSnippet: {
      title: "SubscriptionBillingService — Resilient Recurring Charges",
      language: "php",
      code: `<?php

namespace App\\Services;

use App\\Models\\Subscription;
use App\\Contracts\\PaymentGateway;
use Illuminate\\Support\\Facades\\DB;

class SubscriptionBillingService
{
    public function __construct(private PaymentGateway \$gateway) {}

    public function processRenewal(Subscription \$subscription): void
    {
        DB::transaction(function () use (\$subscription) {
            \$charge = \$this->gateway->charge(
                \$subscription->customer,
                \$subscription->plan->price
            );

            if (! \$charge->successful()) {
                \$subscription->increment('failed_attempts');
                \$subscription->update(['status' => 'past_due']);
                return;
            }

            \$subscription->update([
                'failed_attempts' => 0,
                'status' => 'active',
                'next_billing_at' => now()->addDays(\$subscription->plan->interval_days),
            ]);
        });
    }
}`,
    },
  },

  nexusstudent: {
    title: "Nexus Student Accommodation",
    subtitle: "UK Student Housing Reservation & Tenancy Workflow Platform",
    liveUrl: "https://nexusstudent.co.uk/",
    githubUrl: null,
    techStack: ["Node.js", "Express", "MySQL", "REST API", "Property Tech"],
    badge: "Live Website",
    metrics: [
      { label: "Properties Listed", value: "150+", unit: "sites" },
      { label: "Rooms Reserved", value: "900+", unit: "bookings" },
      { label: "Inquiry Response", value: "<2", unit: "hrs" },
      { label: "Tenancy Completion", value: "96", unit: "%" },
    ],
    overview:
      "UK-based student housing and property rental platform enabling room reservations, tenancy workflows, automated tenant inquiries, property listings, and payment handling. Built to guarantee that no two applicants can ever be confirmed into the same room.",
    architecture: {
      description:
        "A Node.js and Express REST API backs the website. Room availability is protected with timed reservation holds at the database level using MySQL transactions. Tenancy applications flow through a step-based workflow with document verification before deposit and installment payments are scheduled.",
      flow: [
        "Property Search",
        "Room Availability Check",
        "Timed Reservation Hold",
        "Tenancy Application",
        "Document Verification",
        "Payment Processing",
        "Tenancy Confirmation",
      ],
      highlights: [
        "Real-time room availability engine with timed reservation holds and auto-release",
        "Automated tenant inquiry routing directly to the relevant property manager",
        "Step-based tenancy application workflow with document upload and status tracking",
        "Payment scheduling for deposits and rent installments",
      ],
    },
    challenges: [
      {
        title: "Preventing Double-Booked Rooms",
        problem:
          "Multiple applicants applying for the same room concurrently risked two tenancies being confirmed for one space.",
        solution:
          "Built a reservation hold system using timed database locks that automatically release if an application isn't completed in time.",
        result: "Zero double-booking incidents across 900+ recorded reservations.",
      },
      {
        title: "Streamlining Tenancy Applications",
        problem:
          "Manual, paper-style application review created bottlenecks and inconsistent document verification.",
        solution:
          "Built a step-based application workflow with document upload, verification checkpoints, and status tracking visible to applicants.",
        result: "Tenancy completion rate reached 96%.",
      },
      {
        title: "High Inquiry Volume During Peak Enrollment",
        problem:
          "Inquiry volume spiked sharply during enrollment season, overwhelming manual response capacity.",
        solution:
          "Implemented automated inquiry routing to the correct property manager with templated first-response messaging.",
        result: "Average inquiry response time reduced to under 2 hours.",
      },
    ],
    features: [
      { title: "Real-Time Room Availability", description: "Live availability with timed reservation holds that auto-release on expiry." },
      { title: "Tenancy Application Workflow", description: "Step-based application process with document upload and status tracking." },
      { title: "Document Verification", description: "Structured verification checkpoints before a tenancy can be confirmed." },
      { title: "Payment Installment Scheduling", description: "Automated scheduling of deposit and rent installment payments." },
    ],
    codeSnippet: {
      title: "reservationService.js — Timed Hold on Availability",
      language: "javascript",
      code: `// Places a 24-hour hold on a room inside a MySQL transaction
export async function holdRoom(pool, roomId, applicantId) {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    const [rows] = await conn.query(
      "SELECT id FROM rooms WHERE id = ? AND status = 'available' FOR UPDATE",
      [roomId]
    );
    if (rows.length === 0) throw new Error("ROOM_UNAVAILABLE");

    await conn.query("UPDATE rooms SET status = 'held' WHERE id = ?", [roomId]);
    await conn.query(
      "INSERT INTO reservations (room_id, applicant_id, expires_at) VALUES (?, ?, NOW() + INTERVAL 24 HOUR)",
      [roomId, applicantId]
    );

    await conn.commit();
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
}`,
    },
  },

  "yak-and-go": {
    title: "Yak & Go Travel & Logistics",
    subtitle: "Next.js Travel Booking with a Node.js Microservice Backend",
    liveUrl: "https://yak-and-go-vercel-deployment.vercel.app/",
    githubUrl: null,
    techStack: ["React", "Next.js", "Node.js", "Express", "REST API", "Travel Tech"],
    badge: "Live Web App",
    metrics: [
      { label: "Itineraries Booked", value: "600+", unit: "trips" },
      { label: "Booking Confirmation", value: "<5", unit: "sec" },
      { label: "API Uptime", value: "99.8", unit: "%" },
      { label: "Route Options", value: "1K+", unit: "generated" },
    ],
    overview:
      "Modern travel booking and adventure transport platform enabling custom itinerary planning, real-time vehicle booking, and route scheduling. Pairs a Next.js storefront with a decoupled Node.js/Express REST API so each layer can scale and deploy independently.",
    architecture: {
      description:
        "The Next.js frontend consumes a versioned REST API served by a Node.js/Express backend. An itinerary planning engine composes multi-leg routes and checks vehicle availability against a booking calendar before confirming a reservation.",
      flow: [
        "Client Request (Next.js)",
        "REST API (Express)",
        "Itinerary Planning Engine",
        "Vehicle Availability Check",
        "Booking Confirmation",
        "Route Scheduling",
        "Notification Dispatch",
      ],
      highlights: [
        "Server-rendered Next.js frontend backed by an independently deployable Node/Express API",
        "Composable itinerary engine that chains route segments across multi-stop trips",
        "Booking calendar locks with short-lived holds preventing vehicle double-booking",
        "Versioned REST contract allowing frontend and backend to ship independently",
      ],
    },
    challenges: [
      {
        title: "Coordinating Multi-Leg Itinerary Planning",
        problem:
          "Trips often involved multiple route segments and vehicle changes, and a naive booking flow couldn't validate the whole itinerary atomically.",
        solution:
          "Built a composable itinerary engine that chains route segments and validates vehicle availability for each leg before confirming the full trip.",
        result: "Itinerary generation completes in under 2 seconds for multi-stop trips.",
      },
      {
        title: "Preventing Vehicle Double-Booking",
        problem:
          "Concurrent booking requests for the same vehicle and date range risked confirming two overlapping trips.",
        solution:
          "Implemented booking calendar locks with short-lived reservation holds during the checkout window.",
        result: "Zero double-booked vehicles recorded across 600+ completed bookings.",
      },
      {
        title: "Independent Frontend/Backend Deployment",
        problem:
          "Coupling the booking logic directly into the frontend made backend changes risky to ship without redeploying the whole app.",
        solution:
          "Designed a versioned REST API contract served by a standalone Node.js/Express service, consumed by the Next.js app through a typed API client.",
        result: "Backend and frontend now deploy independently without breaking changes.",
      },
    ],
    features: [
      { title: "Itinerary Planning Engine", description: "Composable multi-leg route planning validated against vehicle availability." },
      { title: "Real-Time Vehicle Booking", description: "Calendar-locked booking flow preventing overlapping vehicle reservations." },
      { title: "Route Scheduling", description: "Scheduling engine coordinating pickup, transit, and drop-off timing across legs." },
      { title: "Next.js SSR Storefront", description: "Server-rendered booking storefront consuming a versioned REST API." },
    ],
    codeSnippet: {
      title: "bookings.js — Express Route for Vehicle Reservation",
      language: "javascript",
      code: `const express = require("express");
const router = express.Router();
const VehicleAvailability = require("../services/vehicleAvailability");

router.post("/bookings", async (req, res) => {
  const { vehicleId, startDate, endDate, itinerary } = req.body;

  const available = await VehicleAvailability.check(
    vehicleId,
    startDate,
    endDate
  );

  if (!available) {
    return res
      .status(409)
      .json({ error: "Vehicle unavailable for selected dates" });
  }

  const booking = await VehicleAvailability.reserve({
    vehicleId,
    startDate,
    endDate,
    itinerary,
  });

  return res.status(201).json({ booking });
});

module.exports = router;`,
    },
  },

  crmlogy: {
    title: "CRMLogy — Enterprise CRM & Sales SaaS",
    subtitle: "Multi-Tenant Agency CRM with Automated Pipelines",
    liveUrl: "https://crmlogy.devop360.com/",
    githubUrl: null,
    techStack: ["Laravel", "PHP 8.1", "MySQL", "Pusher", "REST API", "Multi-Tenancy", "Redis", "Sanctum"],
    badge: "Enterprise SaaS",
    metrics: [
      { label: "System Throughput", value: "50K+", unit: "req/day" },
      { label: "Notification Latency", value: "<50", unit: "ms" },
      { label: "Tenant Isolation", value: "100", unit: "%" },
      { label: "API Endpoints", value: "89", unit: "routes" },
    ],
    overview:
      "All-in-one multi-tenant agency CRM SaaS for lead tracking, automated deal pipelines, subscription billing, team activity metrics, and communication workflows. Built to serve multiple agencies on a single infrastructure while maintaining strict data isolation.",
    architecture: {
      description:
        "CRMLogy uses a middleware-based multi-tenant architecture where each agency operates as an isolated tenant on shared infrastructure. The system resolves tenant context from subdomain headers, applies global Eloquent scopes for data isolation, and uses Pusher WebSockets for real-time dashboard updates.",
      flow: [
        "Client Request (Subdomain)",
        "Tenant Resolution Middleware",
        "Sanctum Auth Gate",
        "TenantScope Global Scope",
        "Business Logic Layer",
        "Event Broadcasting (Pusher)",
        "Real-Time Dashboard Update",
      ],
      highlights: [
        "Database-per-tenant considered but rejected for cost — used row-level isolation with composite indexes instead",
        "Custom middleware resolves tenant from subdomain and injects tenant context into the service container",
        "All Eloquent models use a TenantScope global scope that auto-filters queries by tenant_id",
        "Redis-backed queue system for async job processing (email, reports, notifications)",
      ],
    },
    challenges: [
      {
        title: "Multi-Tenant Data Isolation",
        problem:
          "Ensuring zero cross-tenant data leakage while maintaining query performance across 5+ tenants sharing a single MySQL database.",
        solution:
          "Implemented a TenantScope global scope on all models, composite indexes on (tenant_id, primary_key), and middleware-level tenant resolution. Added audit logging for all cross-tenant query attempts.",
        result: "Zero cross-tenant incidents. Query performance maintained with < 5ms overhead per request.",
      },
      {
        title: "Real-Time Pipeline Updates",
        problem:
          "Deal pipeline movements and lead assignments needed instant visibility across all team members without page refresh.",
        solution:
          "Integrated Pusher WebSockets with Laravel Echo. Pipeline state changes trigger broadcast events on private tenant channels. Client-side optimistic updates with server reconciliation.",
        result: "< 50ms notification delivery. 100+ concurrent dashboard users without degradation.",
      },
      {
        title: "Subscription Billing Automation",
        problem:
          "Managing agency subscriptions with prorated billing, plan upgrades/downgrades, and automated invoice generation.",
        solution:
          "Built a custom billing engine on top of Stripe Connect with webhook handlers for subscription lifecycle events, proration calculations, and automated PDF invoice generation.",
        result: "Fully automated billing. Zero manual intervention for plan changes.",
      },
    ],
    features: [
      {
        title: "Lead Distribution Engine",
        description: "Automated round-robin lead assignment with weighted scoring, priority routing, and real-time agent availability tracking.",
      },
      {
        title: "Real-Time Deal Pipeline",
        description: "Drag-and-drop Kanban pipeline with WebSocket-powered instant updates, stage automations, and probability forecasting.",
      },
      {
        title: "Multi-Channel Reporting",
        description: "Dashboard analytics, scheduled email reports, and exportable CSV/PDF summaries with tenant-scoped data aggregation.",
      },
      {
        title: "Team Activity Metrics",
        description: "Per-agent performance tracking: calls logged, deals closed, response times, and custom KPI dashboards.",
      },
    ],
    codeSnippet: {
      title: "TenantScope — Automatic Tenant Isolation",
      language: "php",
      code: `<?php

namespace App\\Models\\Scopes;

use Illuminate\\Database\\Eloquent\\Builder;
use Illuminate\\Database\\Eloquent\\Model;
use Illuminate\\Database\\Eloquent\\Scope;

class TenantScope implements Scope
{
    public function apply(Builder \$builder, Model \$model): void
    {
        if (\$tenantId = auth()->user()?->tenant_id) {
            \$builder->where(
                \$model->qualifyColumn('tenant_id'),
                \$tenantId
            );
        }
    }
}`,
    },
  },

  "mobile-apis": {
    title: "9 Mobile Application Backend APIs",
    subtitle: "Production-Grade REST APIs for iOS & Android",
    liveUrl: null,
    githubUrl: null,
    techStack: ["Laravel REST API", "Sanctum", "Node.js", "MySQL", "Push Notifications", "JWT", "WebSockets"],
    badge: "9 Mobile Backends",
    metrics: [
      { label: "Mobile Apps Powered", value: "9", unit: "apps" },
      { label: "API Response Time", value: "<45", unit: "ms" },
      { label: "Push Notifications", value: "1M+", unit: "sent" },
      { label: "Active Endpoints", value: "200+", unit: "routes" },
    ],
    overview:
      "Architected and deployed production-grade RESTful APIs for 9 mobile applications (iOS & Android) spanning hotel booking, attendance tracking, ride-hailing, logistics, e-commerce, and HR systems. Each API features Sanctum JWT authentication, FCM push notifications, WebSocket integration, and highly optimized database queries.",
    architecture: {
      description:
        "Each mobile backend follows a modular Laravel API architecture with Sanctum token authentication, versioned API endpoints, and FCM integration for push notifications. The systems share common patterns but are independently deployable with app-specific business logic.",
      flow: [
        "Mobile Client (iOS/Android)",
        "API Gateway (Rate Limited)",
        "Sanctum Token Auth",
        "Versioned Route Handler",
        "Service Layer",
        "Eloquent + Optimized Queries",
        "FCM Push / WebSocket Response",
      ],
      highlights: [
        "Shared authentication pattern across all 9 apps using Sanctum with device-specific token management",
        "FCM push notification service with per-app topic subscriptions and targeted user notifications",
        "Database query optimization reduced N+1 queries by 90% using eager loading and query scoping",
        "API versioning strategy (v1/v2) for backward compatibility during mobile app updates",
      ],
    },
    challenges: [
      {
        title: "Cross-Platform Token Management",
        problem:
          "Managing authentication tokens across 9 different mobile apps with varying session requirements and device types (iOS, Android, tablets).",
        solution:
          "Built a unified token management system using Sanctum with device fingerprinting, per-device token limits, and automatic token rotation for security.",
        result: "Single auth system serving 9 apps. Token-related support tickets dropped by 95%.",
      },
      {
        title: "Push Notification at Scale",
        problem:
          "Sending targeted push notifications across 9 apps with different FCM configurations, user segments, and delivery priorities.",
        solution:
          "Created a centralized notification service with per-app FCM configuration, topic-based subscriptions, queued delivery with retry logic, and delivery confirmation tracking.",
        result: "1M+ notifications delivered with 99.2% delivery rate and < 2s average delivery time.",
      },
      {
        title: "API Response Optimization",
        problem:
          "Mobile apps on 3G/4G networks needed minimal payload sizes and fast response times to maintain good user experience.",
        solution:
          "Implemented API Resource transformers for lean payloads, conditional field inclusion, pagination with cursor-based navigation, and Redis caching for frequently accessed data.",
        result: "Average API response time: 45ms. Payload sizes reduced by 60% with selective field loading.",
      },
    ],
    features: [
      {
        title: "Hotel Booking System",
        description: "Real-time room availability, date-range searching, payment processing, and booking confirmation with automated email/SMS.",
      },
      {
        title: "Ride-Hailing Backend",
        description: "Driver-rider matching, real-time location tracking via WebSockets, fare calculation, and trip history with rating system.",
      },
      {
        title: "Attendance & HR System",
        description: "GPS-verified check-in/out, leave management, payroll integration, and monthly attendance report generation.",
      },
      {
        title: "E-Commerce & Logistics",
        description: "Product catalog with search, cart management, order tracking with status updates, and delivery assignment routing.",
      },
    ],
    codeSnippet: {
      title: "FCM Notification Service — Queued Push Delivery",
      language: "php",
      code: `<?php

namespace App\\Services;

use App\\Models\\User;
use Illuminate\\Support\\Facades\\Http;

class FCMNotificationService
{
    public function sendToUser(
        User \$user,
        string \$title,
        string \$body,
        array \$data = []
    ): void {
        \$tokens = \$user->deviceTokens()
            ->where('is_active', true)
            ->pluck('fcm_token');

        \$tokens->chunk(500)->each(
            fn (\$chunk) => SendPushNotification::dispatch(
                \$chunk->toArray(),
                compact('title', 'body', 'data')
            )
        );
    }
}`,
    },
  },
};

export const projectDetails = { ...baseProjectDetails, ...mobileAppDetails };

export function getProjectDetail(id) {
  return projectDetails[id] || null;
}

export function getAllProjectIds() {
  return Object.keys(projectDetails);
}
