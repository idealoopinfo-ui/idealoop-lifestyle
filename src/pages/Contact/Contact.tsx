import "./Contact.css";

export default function Contact() {
  return (
    <div className="contact-container">

      <h2>Contact Us</h2>
      <p>We’d love to hear from you.</p>

      <form className="contact-form">

        <input type="text" placeholder="Your Name" required />

        <input type="email" placeholder="Your Email" required />

        <textarea placeholder="Your Message" rows={5} required />

        <button type="submit">Send Message</button>

      </form>

    </div>
  );
}