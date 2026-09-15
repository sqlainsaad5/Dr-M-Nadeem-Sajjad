"use client";

/* eslint-disable @next/next/no-img-element */
import { FormEvent, useEffect, useState } from "react";
import { useRef } from "react";

const WHATSAPP_LINK = "https://wa.me/923017978308";
const WHATSAPP_MESSAGE = encodeURIComponent("Assalam o Alaikum, I want to book an appointment with Dr. Muhammad Nadeem Sajjad.");

const treatments = [
  ["01", "⌁", "Congenital", "Anomalies", "Specialized treatment for conditions present from birth."],
  ["02", "◌", "Paediatric", "Urology", "Expert care for urinary and genital conditions in children."],
  ["03", "◒", "Laparoscopic &", "Endoscopic", "Modern minimally invasive techniques for better recovery."],
  ["04", "♡", "Scrotal &", "Vascular", "Care for hernia, hydrocele and varicocele conditions."],
];

const testimonials = [
  {
    initials: "SN",
    quote: "Dr. M. Nadeem Sajjad is an exceptional pediatric surgeon. His expertise combined with his compassionate approach ensures the best outcomes for children. We felt safe and supported at every step.",
    name: "Dr. Saleem Niazi",
    role: "Consultant Pediatric Surgeon",
  },
  {
    initials: "JC",
    quote: "His meticulous approach to surgery and compassionate patient care make him a trusted name in pediatric healthcare. He truly takes the time to understand every family.",
    name: "Dr. Junaid Chaudhary",
    role: "Pediatric Neurosurgeon",
  },
  {
    initials: "SA",
    quote: "Outstanding surgical skills and deep compassion for young patients. His dedication to quality care makes him highly trusted for complex pediatric cases.",
    name: "Dr. Sikandar Ali Arshad",
    role: "Consultant Cardiologist",
  },
];

function AnimatedNumber({
  value,
  suffix = "",
  decimals = 0,
  pad = 0,
  duration = 1300,
}: {
  value: number;
  suffix?: string;
  decimals?: number;
  pad?: number;
  duration?: number;
}) {
  const [current, setCurrent] = useState(0);
  const numberRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = numberRef.current;
    if (!element) return;

    let frame = 0;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      const startedAt = performance.now();

      const animate = (now: number) => {
        const progress = Math.min((now - startedAt) / duration, 1);
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        setCurrent(value * easedProgress);
        if (progress < 1) frame = requestAnimationFrame(animate);
      };

      frame = requestAnimationFrame(animate);
    }, { threshold: 0.45 });

    observer.observe(element);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [duration, value]);

  const formatted = current.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <span className="animated-number" ref={numberRef}>
      <span className="animated-number-value">{formatted.padStart(pad, "0")}</span>
      {suffix && <span className="animated-number-suffix">{suffix}</span>}
    </span>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [slide, setSlide] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [minDate, setMinDate] = useState("");

  useEffect(() => {
    setMinDate(new Date().toISOString().split("T")[0]);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>("main > section:not(.hero)");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );

    sections.forEach((section) => {
      section.classList.add("reveal-section");
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const visibleCards = () => {
    if (typeof window !== "undefined" && window.innerWidth <= 560) return 1;
    if (typeof window !== "undefined" && window.innerWidth <= 900) return 2;
    return 3;
  };

  const moveTestimonials = (direction: number) => {
    setSlide((current) => {
      const maximum = Math.max(testimonials.length - visibleCards(), 0);
      return Math.min(Math.max(current + direction, 0), maximum);
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const clinic = String(formData.get("clinic") || "").trim();
    const date = String(formData.get("date") || "").trim();
    const message = String(formData.get("message") || "").trim();

    const whatsappText = encodeURIComponent(
      [
        "Assalam o Alaikum, I want to book an appointment with Dr. Muhammad Nadeem Sajjad.",
        `Name: ${name}`,
        `Phone: ${phone}`,
        email ? `Email: ${email}` : "",
        `Clinic: ${clinic}`,
        `Preferred date: ${date}`,
        message ? `Message: ${message}` : "",
      ]
        .filter(Boolean)
        .join("\n"),
    );

    window.open(`${WHATSAPP_LINK}?text=${whatsappText}`, "_blank");
    setSubmitted(true);
    event.currentTarget.reset();
  };

  return (
    <>
      <header className="site-header" id="home">
        <div className="container nav-wrap">
          <a className="brand" href="#home" aria-label="Dr. M. Nadeem Sajjad home">
            <img className="brand-logo" src="/pediatric-logo.jpg" alt="Paediatric Surgeon and Paediatric Urologist" />
            <span><strong>Dr. M. Nadeem Sajjad</strong></span>
          </a>
          <button className="menu-toggle" aria-label="Open navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
            <span></span><span></span><span></span>
          </button>
          <nav className={`main-nav ${menuOpen ? "open" : ""}`} aria-label="Main navigation">
            {[
              ["Home", "#home"], ["About", "#about"], ["Treatments", "#treatments"],
              ["Clinics", "#clinics"], ["Testimonials", "#testimonials"], ["Contact", "#contact"],
            ].map(([label, href], index) => (
              <a className={index === 0 ? "active" : ""} href={href} key={label} onClick={() => setMenuOpen(false)}>{label}</a>
            ))}
            <a className="nav-cta" href={`${WHATSAPP_LINK}?text=${WHATSAPP_MESSAGE}`} target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)}>Book Appointment <span>↗</span></a>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="hero-pattern"></div>
          <div className="container hero-grid">
            <div className="hero-copy">
              <p className="eyebrow"><span></span> Dr. Muhammad Nadeem Sajjad</p>
              <h1>Paediatric Surgeon and<br />Paediatric Urologist</h1>
              <p className="hero-text">MBBS, FCPS (Paediatric Surgery) — Paediatric Surgeon and Paediatric Urologist. Contact for children’s surgery: 0301-7978308.</p>
              <div className="hero-actions">
                <a className="button button-primary" href={`${WHATSAPP_LINK}?text=${WHATSAPP_MESSAGE}`} target="_blank" rel="noopener noreferrer">Book an appointment <span>↗</span></a>
              </div>
            </div>
          </div>
          <button className="hero-arrow hero-arrow-left" aria-label="Previous slide">‹</button>
          <button className="hero-arrow hero-arrow-right" aria-label="Next slide">›</button>
          <div className="hero-dots" aria-label="Hero slides"><span className="active"></span><span></span><span></span></div>
        </section>

        <section className="stats-section">
          <div className="container stats-grid">
            <div><strong><AnimatedNumber value={5000} suffix="+" /></strong><p>Happy families</p></div>
            <div><strong><AnimatedNumber value={13} suffix="+" /></strong><p>Years of experience</p></div>
            <div><strong><AnimatedNumber value={15} suffix="+" /></strong><p>Specialized treatments</p></div>
            <div><strong><AnimatedNumber value={4.9} suffix="/5" decimals={1} /></strong><p>Patient satisfaction</p></div>
          </div>
        </section>

        <section className="about section-pad" id="about">
          <div className="container about-grid">
            <div className="about-visual">
              <div className="about-image-main"><img src="/doctor-meet-section.png" alt="Dr. M. Nadeem Sajjad" /></div>
              <div className="about-image-small"><img src="/drnadeem.jpeg" alt="Dr. M. Nadeem Sajjad" /></div>
              <div className="about-stamp"><span>✚</span><strong>Healing<br />with heart</strong></div>
            </div>
            <div className="about-copy">
              <p className="eyebrow"><span></span> Meet your surgeon</p>
              <h2>Expert hands.<br /><em>Gentle hearts.</em></h2>
              <p className="lead">Paediatric Surgeon and Paediatric Urologist.</p>
              <p>Dr. Muhammad Nadeem Sajjad — MBBS, FCPS (Paediatric Surgery). Ex-Registrar, Paediatric Surgery, Mayo Hospital, Lahore. Senior Registrar, Paediatric Urology, Children&apos;s Hospital, Lahore.</p>
              <div className="credentials">
                <div className="credential"><span>✓</span><p><strong>MBBS, FCPS</strong><small>Paediatric Surgery</small></p></div>
                <div className="credential"><span>✓</span><p><strong>Ex-Registrar</strong><small>Mayo Hospital, Lahore</small></p></div>
                <div className="credential"><span>✓</span><p><strong>Senior Registrar</strong><small>Paediatric Urology, CH Lahore</small></p></div>
              </div>
              <a className="text-link" href={`${WHATSAPP_LINK}?text=${WHATSAPP_MESSAGE}`} target="_blank" rel="noopener noreferrer">Book a consultation <span>→</span></a>
            </div>
          </div>
        </section>

        <section className="treatments section-pad" id="treatments">
          <div className="container">
            <div className="section-heading"><div><p className="eyebrow"><span></span> What we treat</p><h2>Specialized care for<br /><em>every little need.</em></h2></div><p>From congenital conditions to paediatric urology, every child receives thoughtful, experienced care.</p></div>
            <div className="treatment-grid">
              {treatments.map(([number, icon, title, subtitle, description], index) => (
                <article className={`treatment-card ${index === 0 ? "featured" : ""}`} key={number}>
                  <span className="treatment-number">{number}</span><div className="treatment-icon">{icon}</div><h3>{title}<br />{subtitle}</h3><p>{description}</p><a href="#appointment">Explore treatment <span>↗</span></a>
                </article>
              ))}
            </div>
            <div className="treatment-more"><span>Also treating</span><p>Hypospadias &nbsp;·&nbsp; Undescended Testicles &nbsp;·&nbsp; Bladder Exstrophy &nbsp;·&nbsp; Hydronephrosis &nbsp;·&nbsp; VUR &nbsp;·&nbsp; UTIs &nbsp;·&nbsp; Phimosis &nbsp;·&nbsp; Hydrocele &nbsp;·&nbsp; Varicocele &nbsp;·&nbsp; Bedwetting &nbsp;·&nbsp; Kidney Stones &nbsp;·&nbsp; Tumors</p></div>
          </div>
        </section>

        <section className="care-section section-pad">
          <div className="container care-grid">
            <div className="care-copy"><p className="eyebrow"><span></span> Why families choose us</p><h2>Care that goes<br /><em>beyond treatment.</em></h2><p>We believe healing is more than a procedure. It’s listening, explaining, supporting, and being there every step of the way.</p><a className="button button-dark" href={`${WHATSAPP_LINK}?text=${WHATSAPP_MESSAGE}`} target="_blank" rel="noopener noreferrer">Start your child’s care <span>↗</span></a></div>
            <div className="care-points">
              <div className="care-point"><span>01</span><div><h3>Mayo Hospital</h3><p>Ex-Registrar, Paediatric Surgery, Mayo Hospital, Lahore.</p></div></div>
              <div className="care-point"><span>02</span><div><h3>Children&apos;s Hospital</h3><p>Senior Registrar, Paediatric Urology, Children&apos;s Hospital, Lahore.</p></div></div>
              <div className="care-point"><span>03</span><div><h3>Paediatric Surgeon and Paediatric Urologist</h3><p>Specialist care for children’s surgery and paediatric urology.</p></div></div>
            </div>
          </div>
        </section>

        <section className="appointment section-pad" id="appointment">
          <div className="container appointment-grid">
            <div className="appointment-copy"><p className="eyebrow"><span></span> Your child’s health comes first</p><h2>Let’s take the<br /><em>next step together.</em></h2><p>Contact for children’s surgery appointments. We’ll confirm your preferred clinic and time.</p><div className="appointment-contact"><div className="contact-icon">☎</div><div><small>Contact for appointment</small><a href="tel:+923017978308">0301-7978308</a></div></div><div className="appointment-contact"><div className="contact-icon">⌖</div><div><small>Rasheed Hospital</small><p>Near DHA, Lahore<br />Mon–Thu | 3 PM – 5 PM</p></div></div></div>
            <form className="appointment-form" onSubmit={handleSubmit}>
              <div className="form-heading"><span>01</span><h3>Book an appointment</h3><p>Fill in your details and we’ll open WhatsApp to confirm.</p></div>
              <div className="form-row"><label>Parent / Guardian name<input type="text" name="name" placeholder="Your full name" required /></label><label>Phone number<input type="tel" name="phone" placeholder="0301-7978308" required /></label></div>
              <label>Email address <span className="optional">(optional)</span><input type="email" name="email" placeholder="you@example.com" /></label>
              <div className="form-row"><label>Preferred clinic<select name="clinic" required><option value="">Select a clinic</option><option>Rasheed Hospital, Near DHA Lahore (Mon–Thu, 3 PM – 5 PM)</option><option>Zaitoon Hospital, Pattoki (Friday, 4 PM)</option><option>Rehman Medical Complex, Okara (5:30 PM – 7:30 PM)</option></select></label><label>Preferred date<input type="date" name="date" min={minDate} required /></label></div>
              <label>How can we help? <span className="optional">(optional)</span><textarea name="message" rows={3} placeholder="Tell us a little about your child’s concern..."></textarea></label>
              <button className="button button-primary submit-button" type="submit">Send on WhatsApp <span>↗</span></button>
              <p className="form-message" role="status">{submitted ? "Opening WhatsApp — please send the message to confirm your appointment." : ""}</p>
            </form>
          </div>
        </section>

        <section className="clinics section-pad" id="clinics">
          <div className="container">
            <div className="section-heading centered"><div><p className="eyebrow"><span></span> Find us near you</p><h2>Here when<br /><em>you need us.</em></h2></div><p>Choose the clinic that’s most convenient for your family.</p></div>
            <div className="clinic-grid">
              <article className="clinic-card">
                <span className="clinic-tag">Clinic 01</span>
                <h3>Rasheed Hospital</h3>
                <ul className="clinic-meta">
                  <li><span>Location</span><strong>Near DHA, Lahore</strong></li>
                  <li><span>Days</span><strong>Monday to Thursday</strong></li>
                  <li><span>Timing</span><strong>3 PM – 5 PM</strong></li>
                </ul>
                <a className="clinic-book" href={`${WHATSAPP_LINK}?text=${WHATSAPP_MESSAGE}`} target="_blank" rel="noopener noreferrer">Book on WhatsApp <span>↗</span></a>
              </article>
              <article className="clinic-card">
                <span className="clinic-tag">Clinic 02</span>
                <h3>Zaitoon Hospital</h3>
                <ul className="clinic-meta">
                  <li><span>Location</span><strong>Pattoki</strong></li>
                  <li><span>Days</span><strong>Every Friday</strong></li>
                  <li><span>Timing</span><strong>4 PM</strong></li>
                </ul>
                <a className="clinic-book" href={`${WHATSAPP_LINK}?text=${WHATSAPP_MESSAGE}`} target="_blank" rel="noopener noreferrer">Book on WhatsApp <span>↗</span></a>
              </article>
              <article className="clinic-card">
                <span className="clinic-tag">Clinic 03</span>
                <h3>Rehman Medical Complex</h3>
                <ul className="clinic-meta">
                  <li><span>Location</span><strong>Okara</strong></li>
                  <li><span>Days</span><strong>Appointments available</strong></li>
                  <li><span>Timing</span><strong>5:30 PM – 7:30 PM</strong></li>
                </ul>
                <a className="clinic-book" href={`${WHATSAPP_LINK}?text=${WHATSAPP_MESSAGE}`} target="_blank" rel="noopener noreferrer">Book on WhatsApp <span>↗</span></a>
              </article>
            </div>
          </div>
        </section>

        <section className="testimonials section-pad" id="testimonials">
          <div className="container">
            <div className="testimonial-header"><div><p className="eyebrow"><span></span> Kind words</p><h2>What parents<br /><em>say about us.</em></h2></div><div className="testimonial-controls"><button className="testimonial-prev" aria-label="Previous testimonial" onClick={() => moveTestimonials(-1)}>←</button><button className="testimonial-next" aria-label="Next testimonial" onClick={() => moveTestimonials(1)}>→</button></div></div>
            <div className="testimonial-window"><div className="testimonial-track" style={{ transform: `translateX(-${slide * (100 / visibleCards())}%)` }}>
              {testimonials.map((testimonial) => <article className="testimonial-card" key={testimonial.initials}><div className="quote-mark">“</div><p>{testimonial.quote}</p><div className="reviewer"><span>{testimonial.initials}</span><div><strong>{testimonial.name}</strong><small>{testimonial.role}</small></div></div></article>)}
            </div></div>
          </div>
        </section>
      </main>

      <footer className="site-footer" id="contact">
        <div className="container footer-top"><div><a className="brand footer-brand" href="#home"><img className="brand-logo" src="/pediatric-logo.jpg" alt="Paediatric Surgeon and Paediatric Urologist" /><span><strong>Dr. M. Nadeem Sajjad</strong></span></a><p>Paediatric Surgeon and<br />Paediatric Urologist</p></div><div className="footer-column"><h4>Explore</h4><a href="#about">About the doctor</a><a href="#treatments">Treatments</a><a href="#clinics">Our clinics</a></div><div className="footer-column"><h4>Get in touch</h4><a href="tel:+923017978308">0301-7978308</a><a href={`${WHATSAPP_LINK}?text=${WHATSAPP_MESSAGE}`} target="_blank" rel="noopener noreferrer">WhatsApp: 0301-7978308</a><a href="mailto:Mazhar20211@gmail.com">Mazhar20211@gmail.com</a><p>Rasheed Hospital (Near DHA)<br />Mon–Thu, 3–5 PM<br />Zaitoon Hospital, Pattoki<br />Friday, 4 PM<br />Rehman Medical Complex, Okara<br />5:30 PM – 7:30 PM</p></div><div className="footer-column footer-cta"><h4>Ready to talk?</h4><a className="button button-light" href={`${WHATSAPP_LINK}?text=${WHATSAPP_MESSAGE}`} target="_blank" rel="noopener noreferrer">Book an appointment <span>↗</span></a></div></div>
        <div className="container footer-bottom"><span>© 2025 Dr. M. Nadeem Sajjad. All rights reserved.</span><span>Made with care for little ones <span className="heart">♥</span></span></div>
      </footer>
    </>
  );
}
