import React, { useEffect, useState } from "react";
import Button from "../UI/Button";
import emailjs from "@emailjs/browser";
const ContactPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    message: "",
  });

  const [messageStatus, setMessageStatus] = useState("Send Message");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const templateParams = {
      to_email: formData.email,
      from_name: formData.fullName,
      message: formData.message,
    };

    setMessageStatus("Sending...");

    emailjs
      .send(
        import.meta.env.VITE_EMAIL_SERVICE,
        import.meta.env.VITE_EMAIL_TEMPLATE,
        templateParams,
        import.meta.env.VITE_EMAIL,
      )
      .then(() => {
        setMessageStatus("Sent successfully!");
        setTimeout(() => setMessageStatus("Send Message"), 3000);
        setFormData({
          fullName: "",
          email: "",
          message: "",
        });
      })
      .catch((error) => {
        setMessageStatus("Sending Failed");
        setTimeout(() => setMessageStatus("Send Message"), 3000);
        console.error(error);
      });
  }
  

  return (
    <div className="w-full p-4">
      <h1 className="title text-3xl font-bold text-center mb-4">Contact Me!</h1>

      <div className="contact-box">
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            value={formData.fullName}
            type="text"
            onChange={handleChange}
            name="fullName"
            placeholder="Full Name"
            className="field w-full p-3 border border-gray-300 rounded focus:border-primary focus:ring-1 focus:ring-primary"
            required
          />
          <input
            value={formData.email}
            type="email"
            onChange={handleChange}
            name="email"
            placeholder="Email Address"
            className="field w-full p-3 border border-gray-300 rounded focus:border-primary focus:ring-1 focus:ring-primary"
            required
          />
          <textarea
            value={formData.message}
            placeholder="Your Message"
            name="message"
            onChange={handleChange}
            rows="6"
            className="field w-full p-3 border border-gray-300 rounded focus:border-primary focus:ring-1 focus:ring-primary resize-none"
          ></textarea>
          <Button type="submit" variant="primary" className="w-full">
            {messageStatus}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
