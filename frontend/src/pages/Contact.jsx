import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Abhi ke liye sirf console mein log karo
    console.log('📩 Form Submitted:', formData);
    alert('✅ Thank you for reaching out! We will get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="pt-16">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-accent to-primary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Get in Touch</h1>
          <p className="text-xl max-w-2xl mx-auto opacity-90">
            Have questions or want to get involved? We'd love to hear from you!
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Left Side: Contact Info */}
          <div>
            <h2 className="text-3xl font-bold text-primary mb-6">Contact Information</h2>
            <p className="text-lg mb-8">
              Reach out to us through any of the channels below. We will respond 
              as soon as possible.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-2xl">
                  📍
                </div>
                <div>
                  <h3 className="font-bold">Our Address</h3>
                  <p className="text-gray-600">123, Foundation Street, City, India - 110001</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-2xl">
                  📞
                </div>
                <div>
                  <h3 className="font-bold">Phone</h3>
                  <p className="text-gray-600">+91 98765 43210</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-2xl">
                  ✉️
                </div>
                <div>
                  <h3 className="font-bold">Email</h3>
                  <p className="text-gray-600">info@yourfoundation.org</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-8">
              <h3 className="font-bold mb-3">Follow Us</h3>
              <div className="flex gap-4">
                <a href="#" className="btn btn-circle btn-outline btn-primary">📘</a>
                <a href="#" className="btn btn-circle btn-outline btn-primary">🐦</a>
                <a href="#" className="btn btn-circle btn-outline btn-primary">📸</a>
                <a href="#" className="btn btn-circle btn-outline btn-primary">▶️</a>
              </div>
            </div>
          </div>

          {/* Right Side: Contact Form */}
          <div className="card bg-base-100 shadow-2xl p-8">
            <h2 className="text-2xl font-bold text-center mb-6">Send Us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Your Name</span>
                </label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name" 
                  className="input input-bordered w-full" 
                  required 
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Email Address</span>
                </label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email" 
                  className="input input-bordered w-full" 
                  required 
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Your Message</span>
                </label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  placeholder="Write your message here..." 
                  className="textarea textarea-bordered w-full" 
                  required 
                />
              </div>

              <button type="submit" className="btn btn-primary w-full btn-lg mt-2">
                📨 Send Message
              </button>
            </form>
          </div>
        </div>

        {/* Google Map Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-6">Find Us on Map</h2>
          <div className="w-full h-96 rounded-xl overflow-hidden shadow-xl">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224345.839231928!2d77.068895!3d28.527582!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x37205b715389640!2sDelhi!5e0!3m2!1sen!2sin!4v1698575638485!5m2!1sen!2sin"
              title="Foundation Location"
              className="w-full h-full"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;