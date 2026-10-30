import { useEffect, useMemo, useState } from "react";
import "./styles.css";

/* Update these details before publishing. */
const PHONE = "91XXXXXXXXXX";
const PHONE_DISPLAY = "+91 6282773704, +91 9495050153";
const EMAIL = "cleanoprivate@gmail.com";
const LOGO_SRC = "/logo.png";

const SOCIAL = {
  Instagram: "",
  Facebook: "",
};

const wa = (message) =>
  `https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`;

const SERVICES = [
  {
    number: "01",
    title: "Full home deep cleaning",
    description: "A proper top-to-bottom refresh for every room, including the places regular cleaning misses.",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=85",
    alt: "Bright, freshly cleaned contemporary living room",
  },
  {
    number: "02",
    title: "Kitchen cleaning",
    description: "Cut through built-up grease on tiles, cabinets, chimneys and kitchen surfaces.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=85",
    alt: "Clean modern kitchen with bright countertops",
  },
  {
    number: "03",
    title: "Bathroom cleaning",
    description: "Give tiles, fittings, grout and hard-to-reach corners a detailed clean and sanitise.",
    image: "https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=1000&q=85",
    alt: "Fresh, minimal bathroom",
  },
  {
    number: "04",
    title: "Sofa & carpet care",
    description: "A deeper clean to lift embedded dirt, everyday odours and trapped dust from soft furnishings.",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1000&q=85",
    alt: "Comfortable sofa in a tidy living room",
  },
  {
    number: "05",
    title: "Water tank cleaning",
    description: "Hygienic cleaning for overhead and underground water tanks, handled with care.",
    image: "https://images.unsplash.com/photo-1564540583246-934409427776?auto=format&fit=crop&w=1000&q=85",
    alt: "Clean water flowing from a tap",
  },
  {
    number: "06",
    title: "Post-construction cleaning",
    description: "Clear away construction dust, paint marks and leftover mess before move-in day.",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1000&q=85",
    alt: "Newly finished home interior",
  },
  {
    number: "07",
    title: "Office deep cleaning",
    description: "Thoughtful cleaning for workspaces, pantry areas, washrooms and shared spaces.",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1000&q=85",
    alt: "Neat, bright modern office",
  },
  {
    number: "08",
    title: "Move-in / move-out",
    description: "Leave your old place ready for its next chapter, or make your new one feel like home.",
    image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1000&q=85",
    alt: "Freshly prepared home interior",
  },
];

const FAQS = [
  ["How do I get a quote?", "Choose the service you need and send us your details through the enquiry form. Sharing your area and approximate property size helps us give you a useful estimate."],
  ["Do I need to arrange cleaning equipment?", "No. Our team brings the equipment and cleaning products needed for the agreed service."],
  ["Can I book a specific day?", "Send us your preferred date when you enquire. We will confirm the available time slots directly."],
  ["Which areas do you cover?", "We serve Trivandrum and nearby areas. Share your location with us and we will confirm whether we can visit."],
];

const TRUST_POINTS = [
  ["01", "A careful, detailed clean", "A clear checklist helps our team work through the areas that matter."],
  ["02", "The right tools for the job", "Professional equipment is brought along for the agreed cleaning service."],
  ["03", "No price surprises", "Understand the quote and scope before the work begins."],
];

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
          <span>cleano<span className="brand-period">.</span></span>
        </>
      )}
    </a>
  );
}

/* NAVBAR */
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
    <header className={`site-header${scrolled ? " scrolled" : ""}`}>
      <div className="container nav-wrap">
        <Brand />

        <nav
          className={`main-nav${menuOpen ? " is-open" : ""}`}
          aria-label="Main navigation"
        >
          <a href="#home" onClick={close}>Home</a>
          <a href="#services" onClick={close}>Our Services</a>
          <a href="#about" onClick={close}>Why CleanO</a>
          <a href="#faq" onClick={close}>FAQs</a>

        </nav>

        <button
          className={`menu-toggle${menuOpen ? " active" : ""}`}
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

function BookingModal({ service, onClose }) {
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

  const submit = (event) => {
    event.preventDefault();

    const message = [
      "Hello Cleano, I'd like to enquire about a cleaning service.",
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      `Service: ${form.service}`,
      `Area / property size: ${form.area || "Not specified"}`,
      `Additional details: ${form.message || "None"}`,
    ].join("\n");

    window.open(wa(message), "_blank", "noopener,noreferrer");
    onClose();
  };

  return (
    <div
      className="modal-backdrop"
      onMouseDown={(event) =>
        event.target === event.currentTarget && onClose()
      }
    >
      <form
        className="enquiry-modal"
        onSubmit={submit}
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

        <p className="eyebrow">LET'S GET STARTED</p>
        <h2 id="modal-title">Tell us what needs a clean.</h2>
        <p className="modal-intro">
          Share a few details. We'll take it from here on WhatsApp.
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
            placeholder="+91"
          />
        </label>

        <label>
          Service
          <select
            name="service"
            value={form.service}
            onChange={update}
          >
            {SERVICES.map((item) => (
              <option key={item.title} value={item.title}>
                {item.title}
              </option>
            ))}
          </select>
        </label>

        <label>
          Area & property size
          <input
            name="area"
            value={form.area}
            onChange={update}
            placeholder="e.g. Kowdiar, 3 BHK"
          />
        </label>

        <label>
          Anything else?
          <textarea
            name="message"
            value={form.message}
            onChange={update}
            rows="3"
            placeholder="Tell us a little more (optional)"
          />
        </label>

        <button
          className="button button--dark button--wide"
          type="submit"
        >
          Continue to WhatsApp <span>↗</span>
        </button>

        <p className="privacy-note">
          Your details are used only to respond to this enquiry.
        </p>
      </form>
    </div>
  );
}

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
            <em>Services.</em>
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

function Services({ onEnquire }) {
  return (
    <section className="services-section section-pad" id="services">
      <div className="container">
        <div className="section-heading">
          <div>
            <p className="eyebrow">
              <span className="eyebrow-line" /> WHAT WE DO
            </p>
            <h2>Good clean.<br /><em>Good feeling.</em></h2>
          </div>

          <p className="section-intro">
            From a single room to an entire property, we make it easier
            to care for the spaces that matter.
          </p>
        </div>

        <div className="services-grid">
          {SERVICES.map((item, index) => (
            <article
              className={`service-card${index === 0 ? " service-card--feature" : ""}`}
              key={item.number}
            >
              <button
                className="service-image"
                onClick={() => onEnquire(item.title)}
                aria-label={`Enquire about ${item.title}`}
              >
                <img src={item.image} alt={item.alt} loading="lazy" />
                <span className="image-arrow">↗</span>
              </button>

              <div className="service-meta">
                <span>{item.number} / 08</span>
                <span>CLEANO SERVICE</span>
              </div>

              <h3>{item.title}</h3>
              <p>{item.description}</p>

              <button
                className="service-link"
                onClick={() => onEnquire(item.title)}
              >
                Enquire about this <span>↗</span>
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function About({ onEnquire }) {
  return (
    <section className="about-section section-pad" id="about">
      <div className="container about-grid">
        <div className="about-visual">
          <img
            src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=85"
            alt="Cleaning professional carefully cleaning a home"
            loading="lazy"
          />
          <div className="about-label">
            <span>CARE IN</span>
            <strong>EVERY<br />CORNER.</strong>
          </div>
        </div>

        <div className="about-copy">
          <p className="eyebrow eyebrow--light">
            <span className="eyebrow-line" /> THE CLEANO APPROACH
          </p>

          <h2>
            It's not just<br />
            about looking<br />
            <em>clean.</em>
          </h2>

          <p className="about-lead">
            It's about feeling comfortable in your own space.
          </p>

          <p className="about-text">
            We believe a good cleaning service should feel simple from
            the first message to the final walkthrough. We listen to
            what your space needs, explain the work clearly and arrive
            ready to get it done.
          </p>

          <div className="trust-list">
            {TRUST_POINTS.map(([number, title, description]) => (
              <div className="trust-item" key={number}>
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
            onClick={() => onEnquire("")}
          >
            Talk to our team <span>↗</span>
          </button>
        </div>
      </div>
    </section>
  );
}

function Process({ onEnquire }) {
  const steps = [
    ["01", "Tell us what you need", "Choose a service and share a little about your space."],
    ["02", "Get a clear quote", "We'll discuss the scope, price and available timings."],
    ["03", "We get to work", "Our team arrives with the equipment for the agreed job."],
    ["04", "Walk through together", "Review the work with us before the team leaves."],
  ];

  return (
    <section className="process-section section-pad">
      <div className="container">
        <div className="section-heading process-heading">
          <div>
            <p className="eyebrow">
              <span className="eyebrow-line" /> SIMPLE FROM THE START
            </p>
            <h2>Four steps.<br /><em>One fresh space.</em></h2>
          </div>

          <button
            className="text-link"
            onClick={() => onEnquire("")}
          >
            Start an enquiry <span>↗</span>
          </button>
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

function FAQ() {
  const [active, setActive] = useState(0);

  return (
    <section className="faq-section section-pad" id="faq">
      <div className="container faq-grid">
        <div>
          <p className="eyebrow">
            <span className="eyebrow-line" /> GOOD TO KNOW
          </p>

          <h2>A few things<br /><em>you might ask.</em></h2>

          <p className="faq-aside">
            Still have a question? We're happy to help.
          </p>

          <a
            className="text-link"
            href={wa("Hi Cleano, I have a question about your cleaning services.")}
            target="_blank"
            rel="noreferrer"
          >
            Message us on WhatsApp <span>↗</span>
          </a>
        </div>

        <div className="faq-list">
          {FAQS.map(([question, answer], index) => (
            <div
              className={`faq-item${active === index ? " is-active" : ""}`}
              key={question}
            >
              <button
                onClick={() =>
                  setActive(active === index ? -1 : index)
                }
                aria-expanded={active === index}
              >
                <span>{question}</span>
                <b>{active === index ? "−" : "+"}</b>
              </button>

              {active === index && <p>{answer}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact({ onEnquire }) {
  return (
    <section className="contact-section">
      <div className="container contact-inner">
        <div>
          <p className="eyebrow eyebrow--light">
            <span className="eyebrow-line" /> READY WHEN YOU ARE
          </p>
          <h2>Let's make room<br />for <em>fresh.</em></h2>
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
          <span className="contact-location">TRIVANDRUM, KERALA</span>
        </div>

        <span className="contact-flower">✳</span>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-main">
          <div className="footer-brand">
            <Brand footer />
            <p>Making everyday spaces feel<br />a little more like new.</p>
          </div>

          <div className="footer-col">
            <h3>EXPLORE</h3>
            <a href="#home">Home</a>
            <a href="#services">Our services</a>
            <a href="#about">Why Cleano</a>
            <a href="#faq">FAQs</a>
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
                <a href={url} key={name} target="_blank" rel="noreferrer">
                  {name} ↗
                </a>
              ))}
            <span>Trivandrum, Kerala</span>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Cleano Cleaning Service</span>
          <a href="#home">BACK TO TOP ↑</a>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const [booking, setBooking] = useState(null);
  const [search, setSearch] = useState("");

  const openBooking = (service = "") => setBooking(service);
  const closeBooking = () => setBooking(null);

  const filteredServices = useMemo(() => {
    const term = search.trim().toLowerCase();

    return term
      ? SERVICES.filter((service) =>
          `${service.title} ${service.description}`
            .toLowerCase()
            .includes(term)
        )
      : SERVICES;
  }, [search]);

  return (
    <>
      <Header onEnquire={openBooking} />
      <Hero onEnquire={openBooking} />

      {/* <div className="service-search-strip">
        <div className="container search-strip-inner">
          <label className="service-search">
            <span>⌕</span>
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search our services"
              aria-label="Search services"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                aria-label="Clear search"
              >
                ×
              </button>
            )}
          </label>
        </div>
      </div> */}

      {search ? (
        <section className="services-section section-pad" id="services">
          <div className="container">
            <div className="section-heading">
              <div>
              </div>

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
                      <img src={item.image} alt={item.alt} loading="lazy" />
                      <span className="image-arrow">↗</span>
                    </button>

                    <div className="service-meta">
                      <span>{item.number} / 08</span>
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
      <FAQ />
      <Contact onEnquire={openBooking} />
      <Footer />

      <a
        className="whatsapp-float"
        href={wa("Hi Cleano, I'd like to enquire about your cleaning services.")}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat with Cleano on WhatsApp"
      >
        <span className="wa-icon">◔</span>
        <span>Let's chat</span>
      </a>

      {booking !== null && (
        <BookingModal
          service={booking}
          onClose={closeBooking}
        />
      )}
    </>
  );
} 