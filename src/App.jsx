import { useEffect, useMemo, useState } from "react";
import "./styles.css";

/* Update these details before publishing. */
const PHONE = "919495544068";
const PHONE_DISPLAY = "+91 94955 44068";
const EMAIL = "cleanoprivate@gmail.com";
// Paste your deployed Google Apps Script Web App URL here (the URL ending in /exec).
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycby37ChfSM-l7CoP-rHRPm1MxyHd84xb-Fguwj_glY1-6PrklCJ94wxfB7uMZs6Ecgl-Bw/exec";
const LOGO_SRC = "/logo.png";

const SOCIAL = {
  Instagram: "",
  Facebook: "",
};

const wa = (message) =>
  `https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`;

/* =====================================
   CLEANO SERVICES
===================================== */

const SERVICES = [
  {
    title: "Residential Deep Cleaning",
    description:
      "Complete deep cleaning solutions for furnished homes, leaving every space fresh, spotless and hygienic.",
    image: "/interior.png",
    alt: "Clean modern residential living room",
  },
  {
    title: "Exterior Deep Cleaning",
    description:
      "Deep cleaning for exterior walls, driveways and outdoor surfaces, removing dirt, stains and algae.",
    image: "/exterior.png",
    alt: "Exterior wall cleaning service",
  },
  {
    title: "Bathroom Deep Cleaning",
    description:
      "Restore the sparkle of your bathroom with deep cleaning that eliminates stains and germs.",
    image: "/bath.png",
    alt: "Bathroom deep cleaning service",
  },
  {
    title: "Water Tank Cleaning",
    description:
      "Thorough cleaning of overhead and underground water tanks to maintain clean and hygienic water storage.",
    image: "/watertank.png",
    alt: "Professional water tank cleaning",
  },
];

const TRUST_POINTS = [
  [
    "01",
    "A careful, detailed clean",
    "A clear checklist helps our team work through the areas that matter.",
  ],
  [
    "02",
    "The right tools for the job",
    "Professional equipment is brought along for the agreed cleaning service.",
  ],
  [
    "03",
    "No price surprises",
    "Understand the quote and scope before the work begins.",
  ],
];

/* =====================================
   BRAND
===================================== */

function Brand({ footer = false }) {
  return (
    <a
      className={`brand${footer ? " brand--footer" : ""}`}
      href="#home"
      aria-label="Cleano home"
    >
      {LOGO_SRC ? (
        <img src={LOGO_SRC} alt="Cleano Cleaning Service" />
      ) : (
        <>
          <span className="brand-mark">c.</span>
          <span>
            cleano<span className="brand-period">.</span>
          </span>
        </>
      )}
    </a>
  );
}

/* =====================================
   NAVBAR
===================================== */


function Header({ onEnquire }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const close = () => setMenuOpen(false);

  return (
    <header className={`site-header premium-header ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-wrap premium-nav-wrap">

        <Brand />

        <nav
          className={`main-nav premium-nav ${menuOpen ? "is-open" : ""}`}
          aria-label="Main navigation"
        >
          <a href="#home" onClick={close}>Home</a>
          <a href="#services" onClick={close}>Services</a>
          <a href="#process" onClick={close}>How It Works</a>
          <a href="#contact" onClick={close}>Contact</a>

          {/* <button
            className="premium-mobile-cta"
            onClick={() => {
              close();
              onEnquire("");
            }}
          >
            Book a cleaning <span>↗</span>
          </button> */}
        </nav>

        <button
          className={`menu-toggle premium-menu-toggle ${menuOpen ? "active" : ""}`}
          type="button"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((value) => !value)}
        >
          <span />
          <span />
        </button>

      </div>
    </header>
  );
}


/* =====================================
   BOOKING / ENQUIRY MODAL
===================================== */

function BookingModal({ service, onClose }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    area: "",
    service: service || SERVICES[0].title,
    message: "",
  });

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const update = (event) =>
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));

  const submit = async (event) => {
    event.preventDefault();
    if (isSubmitting) return;

    if (!GOOGLE_SCRIPT_URL) {
      alert("Google Sheets connection is not configured.");
      return;
    }

    setIsSubmitting(true);

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify({
          name: form.name.trim(),
          phone: form.phone.trim(),
          service: form.service,
          location: form.area.trim(),
          message: form.message.trim(),
        }),
      });

      setSuccess(true);
    } catch (error) {
      console.error("Enquiry submission error:", error);
      alert("Unable to send your enquiry. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="modal-backdrop"
      onMouseDown={(event) =>
        event.target === event.currentTarget && onClose()
      }
    >
      <div
        className="enquiry-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <button
          className="modal-close"
          type="button"
          onClick={onClose}
          aria-label="Close form"
        >
          ×
        </button>

        {success ? (
          <div className="enquiry-success">
            <div className="success-icon" aria-hidden="true">
              <svg viewBox="0 0 52 52" fill="none">
                <circle className="success-circle" cx="26" cy="26" r="24" />
                <path className="success-tick" d="M15 27L22 34L37 18" />
              </svg>
            </div>

            <h2 id="modal-title">Thank You for Contacting Us!</h2>
            <p>
              Your enquiry has been submitted successfully. We appreciate
              your interest in Cleano. Our team will get in touch with you shortly.
            </p>

            <button
              className="button button--dark button--wide"
              type="button"
              onClick={onClose}
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={submit}>
            <p className="eyebrow">LET'S GET STARTED</p>
            <h2 id="modal-title">Tell us what needs a clean.</h2>
            <p className="modal-intro">
              Share a few details. We'll save your enquiry and continue on WhatsApp.
            </p>

            <label>
              Your name
              <input
                name="name"
                value={form.name}
                onChange={update}
                required
                placeholder="Name"
                autoFocus
              />
            </label>

            <label>
              Phone number
              <input
                name="phone"
                type="tel"
                inputMode="tel"
                value={form.phone}
                onChange={update}
                required
                placeholder="+91 XXXXX XXXXX"
              />
            </label>

            <label>
              Service
              <select name="service" value={form.service} onChange={update}>
                {SERVICES.map((item) => (
                  <option key={item.title} value={item.title}>
                    {item.title}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Location
              <input
                name="area"
                value={form.area}
                onChange={update}
                placeholder="e.g. Kowdiar"
              />
            </label>

            <label>
              Tell us more (optional)
              <textarea
                name="message"
                value={form.message}
                onChange={update}
                rows="3"
              />
            </label>

            <button
              className="button button--dark button--wide"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting enquiry..." : "Enquire Now"}
            </button>

            <p className="privacy-note">
              Your details are used only to respond to this enquiry.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

/* =====================================
   HERO SECTION
===================================== */

function Hero({ onEnquire }) {
  return (
    <section className="hero hero-cinematic" id="home">
      <div className="hero-background">
        <img
          src="/cleano1.png"
          alt="CleanO professional cleaning team cleaning a modern living room"
        />
      </div>

      <div className="hero-overlay"></div>

      <div className="container hero-content">
        <div className="hero-copy">
          <h1>
            Professional
            <br />
            Cleaning
            <br />
            Services.
          </h1>

          <p className="hero-description">
            For homes, offices and more. We create cleaner,
            healthier and happier spaces so you can focus
            on what matters most.
          </p>

          <div className="hero-actions">
            <button
              className="button hero-button"
              onClick={() => onEnquire("")}
            >
              Book a Cleaning
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =====================================
   PREMIUM SERVICES SECTION
===================================== */

function Services({ onEnquire }) {
  const [direction, setDirection] = useState("left");

  const changeDirection = (newDirection) => {
    setDirection(newDirection);
  };

  return (
    <section className="services-section section-pad" id="services">
      <div className="container">
        <div className="services-heading">
          <p className="eyebrow">
            <span className="eyebrow-line" /> WHAT WE DO
          </p>

          <h2>
            Our Services
          </h2>
        </div>
      </div>

      <div className="services-carousel">

        {/* LEFT NAVIGATION */}
        <button
          className="services-nav services-nav--left"
          onClick={() => changeDirection("right")}
          aria-label="Move services left"
          type="button"
        >
          ←
        </button>

        {/* RIGHT NAVIGATION */}
        <button
          className="services-nav services-nav--right"
          onClick={() => changeDirection("left")}
          aria-label="Move services right"
          type="button"
        >
          →
        </button>

        <div className="services-marquee">
          <div
            className={`services-track ${
              direction === "right" ? "move-right" : "move-left"
            }`}
          >
            {[0, 1].map((group) => (
              <div
                className="services-group"
                key={group}
                aria-hidden={group === 1 ? "true" : undefined}
              >
                {SERVICES.map((item) => (
                  <article
                    className="service-card"
                    key={`${group}-${item.number}`}
                  >
                    <button
                      className="service-image"
                      type="button"
                      onClick={() => onEnquire(item.title)}
                      aria-label={`Enquire about ${item.title}`}
                      tabIndex={group === 1 ? -1 : 0}
                    >
                      <img
                        src={item.image}
                        alt={group === 1 ? "" : item.alt}
                        loading="lazy"
                      />
                    </button>

                    <div className="service-content">
                      <div className="service-meta">
                        <span>{item.number}</span>
                        <span>{item.category}</span>
                      </div>

                      <h3>{item.title}</h3>

                      <p>{item.description}</p>

                      <div className="service-bottom">
                        <button
                          className="service-link"
                          type="button"
                          onClick={() => onEnquire(item.title)}
                          tabIndex={group === 1 ? -1 : 0}
                        >
                          Enquire now
                          <span className="service-link-line"></span>
                        </button>

                        <button
                          className="service-arrow"
                          type="button"
                          onClick={() => onEnquire(item.title)}
                          aria-label={`Enquire about ${item.title}`}
                          tabIndex={group === 1 ? -1 : 0}
                        >
                          ↗
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* =====================================
   MONTHLY BATHROOM PLAN
===================================== */

function About({ onEnquire }) {
  const features = [
    ["01", "4 cleaning visits every month", "One professional cleaning session every week."],
    ["02", "Complete bathroom cleaning", "Tiles, floors, washbasins and fittings."],
    ["03", "Affordable monthly plan", "Convenient cleaning at one fixed monthly price."]
  ];

  return (
    <section className="monthly-plan-section" id="about">
      <div className="container monthly-plan-grid">

        <div className="monthly-plan-visual">
          <img
            src="/bath.png"
            alt="Bathroom deep cleaning"
            loading="lazy"
          />

          <div className="monthly-plan-badge">
            <span>MONTHLY PLAN</span>
            <strong>₹2,499</strong>
            <small>PER MONTH</small>
          </div>
        </div>

        <div className="monthly-plan-content">
          <h2>
            A fresh bathroom.
            <br />
            <em>Every week.</em>
          </h2>

          <p className="monthly-plan-description">
            Keep your bathroom spotless with four professional
            deep cleaning visits every month.
          </p>

          <div className="monthly-plan-price">
            <strong>₹2,499</strong>
            <span>/ MONTH</span>
          </div>

          <div className="monthly-plan-features">
            {features.map(([number, title, description]) => (
              <div className="monthly-plan-feature" key={number}>
                <span>{number}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
              </div>
            ))}
          </div>

          <button
            className="button button--cream"
            type="button"
            onClick={() => onEnquire("Bathroom Deep Cleaning")}
          >
            Book Monthly Plan <span>↗</span>
          </button>
        </div>
      </div>
    </section>
  );
}

/* =====================================
   PROCESS SECTION
===================================== */

function Process({ onEnquire }) {
  const steps = [
    [
      "01",
      "Tell us what you need",
      "Choose a service and share a little about your space.",
    ],
    [
      "02",
      "Get a clear quote",
      "We'll discuss the scope, price and available timings.",
    ],
    [
      "03",
      "We get to work",
      "Our team arrives with the equipment for the agreed job.",
    ],
    [
      "04",
      "Walk through together",
      "Review the work with us before the team leaves.",
    ],
  ];

  return (
    <section className="process-section section-pad" id="process">
      <div className="container">
        <div className="section-heading process-heading">
          <div>
            <p className="eyebrow">
              <span className="eyebrow-line" /> SIMPLE FROM THE START
            </p>

            <h2>
              Four steps.<br />
              <em>One fresh space.</em>
            </h2>
          </div>
        </div>

        <div className="process-grid">
          {steps.map(([number, title, description]) => (
            <article className="process-step" key={number}>
              <span className="step-number">{number}</span>
              <span className="step-mark">✳</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =====================================
   CONTACT SECTION
===================================== */

function Contact({ onEnquire }) {
  return (
    <section className="contact-section">
      <div className="container contact-inner">
        <div>
          <p className="eyebrow eyebrow--light">
            <span className="eyebrow-line" /> READY WHEN YOU ARE
          </p>

          <h2>
            We treat every space with the care it deserves.<br />
          </h2>
        </div>

        <div className="contact-side">
          <p>
            Tell us about your space. We'll help you figure out the next step.
          </p>

          <button
            className="button button--cream"
            onClick={() => onEnquire("")}
          >
            Get your quote <span>↗</span>
          </button>
    
        </div>
      </div>
    </section>
  );
}

/* =====================================
   FOOTER
===================================== */

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-main">
          <div className="footer-brand">
            <Brand footer />
            <p>
              Making everyday spaces feel<br />
              a little more like new.
            </p>
          </div>

          <div className="footer-col">
            <h3>EXPLORE</h3>
            <a href="#home">Home</a>
            <a href="#services">Our services</a>
          </div>

          <div className="footer-col">
            <h3>GET IN TOUCH</h3>
            <a href={`tel:${PHONE}`}>{PHONE_DISPLAY}</a>
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          </div>

          <div className="footer-col">
            <h3>FOLLOW ALONG</h3>

            {Object.entries(SOCIAL)
              .filter(([, url]) => url)
              .map(([name, url]) => (
                <a
                  href={url}
                  key={name}
                  target="_blank"
                  rel="noreferrer"
                >
                  {name} ↗
                </a>
              ))}

            <span>Trivandrum, Kerala</span>
          </div>
        </div>

        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} Cleano Cleaning Service
          </span>

          <a href="#home">BACK TO TOP ↑</a>
        </div>
      </div>
    </footer>
  );
}

/* =====================================
   MAIN APP
===================================== */

export default function App() {
  const [booking, setBooking] = useState(null);
  const [search, setSearch] = useState("");

  const openBooking = (service = "") => setBooking(service);
  const closeBooking = () => setBooking(null);

  const filteredServices = useMemo(() => {
    const term = search.trim().toLowerCase();

    return term
      ? SERVICES.filter((service) =>
          `${service.title} ${service.description} ${service.category}`
            .toLowerCase()
            .includes(term)
        )
      : SERVICES;
  }, [search]);

  return (
    <>
      <Header onEnquire={openBooking} />

      <Hero onEnquire={openBooking} />

      {search ? (
        <section className="services-section section-pad" id="services">
          <div className="container">
            <div className="section-heading">
              <div></div>

              <span className="results-count">
                {filteredServices.length} RESULT
                {filteredServices.length === 1 ? "" : "S"}
              </span>
            </div>

            {filteredServices.length ? (
              <div className="services-grid">
                {filteredServices.map((item) => (
                  <article className="service-card" key={item.number}>
                    <button
                      className="service-image"
                      onClick={() => openBooking(item.title)}
                    >
                      <img
                        src={item.image}
                        alt={item.alt}
                        loading="lazy"
                      />

                      <span className="image-arrow">↗</span>
                    </button>

                    <div className="service-meta">
                      <span>{item.number} / 05</span>
                      <span>CLEANO SERVICE</span>
                    </div>

                    <h3>{item.title}</h3>

                    <p>{item.description}</p>

                    <button
                      className="service-link"
                      onClick={() => openBooking(item.title)}
                    >
                      Enquire about this <span>↗</span>
                    </button>
                  </article>
                ))}
              </div>
            ) : (
              <p className="no-results">
                No matching service yet.{" "}

                <a
                  href={wa(`Hi Cleano, do you offer ${search}?`)}
                  target="_blank"
                  rel="noreferrer"
                >
                  Ask us on WhatsApp ↗
                </a>
              </p>
            )}
          </div>
        </section>
      ) : (
        <Services onEnquire={openBooking} />
      )}

      <About onEnquire={openBooking} />

      <Process onEnquire={openBooking} />

      <Contact onEnquire={openBooking} />

      <Footer />

      {/* FLOATING WHATSAPP BUTTON */}
      <a
        className="whatsapp-float"
        href={wa("Hi Cleano, I'd like to enquire about your services.")}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Cleano on WhatsApp"
        title="Chat with us on WhatsApp"
      >
        <svg
          className="wa-icon"
          viewBox="0 0 32 32"
          role="img"
          aria-label="WhatsApp"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16 3.1a12.6 12.6 0 0 0-10.8 19.1L3.5 28.5l6.5-1.7A12.6 12.6 0 1 0 16 3.1Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.1"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M11.2 9.4c-.4-.5-.7-.5-1-.5h-.7c-.3 0-.7.1-1 .5-.4.4-1.3 1.3-1.3 3.1s1.3 3.6 1.5 3.8c.2.3 2.6 4.1 6.4 5.6 3.1 1.2 3.8 1 4.5.9.7-.1 2.2-.9 2.5-1.8.3-.9.3-1.7.2-1.8-.1-.2-.4-.3-.8-.5l-2.6-1.2c-.4-.2-.7-.3-1 .2-.3.4-1 1.2-1.2 1.5-.2.3-.4.3-.8.1-.4-.2-1.7-.6-3.1-1.9-1.1-1-1.9-2.2-2.1-2.6-.2-.4 0-.6.2-.8l.6-.7c.2-.2.3-.4.4-.6.1-.3 0-.5 0-.7l-1.2-2.9Z"
            fill="currentColor"
          />
        </svg>
      </a>

      {/* BOOKING MODAL */}

      {booking !== null && (
        <BookingModal
          service={booking}
          onClose={closeBooking}
        />
      )}
    </>
  );
}