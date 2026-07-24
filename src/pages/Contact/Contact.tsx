import "./Contact.css";

export default function Contact() {
  return (
    <div className="contact-page">

      {/* Hero */}
      <section className="contact-hero">
      <h1>Contact Idealoop Lifestyle</h1>

<p>
Have questions, feedback, or partnership inquiries? Our team is here to help and would love to hear from you.
</p>
      </section>

      {/* Content */}
      <section className="contact-container">

        {/* Contact Info */}
        <div className="contact-info">

          <div className="info-card">
            <div className="info-icon">📍</div>
            <h3>Location</h3>
<p>
Idealoop Lifestyle<br />
Sri Lanka
</p>
          </div>

          <div className="info-card">
            <div className="info-icon">📧</div>
            <h3>Email</h3>
            <p>idealoop.info@gmail.com</p>
          </div>

          <div className="info-card">
            <div className="info-icon">📞</div>
            <h3>Phone</h3>
            <p>+94 XX XXX XXXX</p>
          </div>

          <div className="info-card">
            <div className="info-icon">🕒</div>
            <h3>Working Hours</h3>
            <p>
            Monday - Friday
9:00 AM - 6:00 PM (GMT+5:30)
            </p>
          </div>

        </div>

        {/* Contact Form */}
        <div className="contact-form-wrapper">

        <h2>Get in Touch</h2>

          <form className="contact-form">

            <input
              type="text"
              placeholder="Your Name"
              required
            />

            <input
              type="email"
              placeholder="Your Email"
              required
            />

            <input
              type="text"
              placeholder="Subject"
            />

            <textarea
              rows={6}
              placeholder="Write your message..."
              required
            />

            <button type="submit">
              Send Message
            </button>

          </form>

        </div>

      </section>

    </div>
  );
}