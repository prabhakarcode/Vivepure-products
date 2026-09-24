import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { MapPin, Phone, Mail, Clock, Send, MessageSquare, CheckCircle2 } from 'lucide-react';

export const ContactUsPage: React.FC = () => {
  const { showToast } = useShop();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Customer Support',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    showToast('Your message has been sent to VIVEPANYA customer care.');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      
      {/* Title */}
      <div className="text-center max-w-xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-widest text-[#173F35]">
          Get in Touch
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#17372F] mt-1">
          Contact VIVEPANYA
        </h1>
        <p className="text-xs sm:text-sm text-[#5B6D66] mt-2">
          We welcome customer inquiries, distributor partnerships, and bulk corporate gifting orders.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Contact Info Cards */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-[#E7E2D6] shadow-xs space-y-6">
            <h3 className="font-serif text-xl font-bold text-[#17372F]">Direct Channels</h3>

            <div className="space-y-4 text-xs text-[#52615D]">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#EAF2EC] flex items-center justify-center text-[#173F35] shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-[#17372F]">Corporate Center</p>
                  <p>VIVEPANYA E-mart Private Ltd.</p>
                  <p>12/4, Herbal Way, Indiranagar, Bengaluru, Karnataka 560038, India</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#EAF2EC] flex items-center justify-center text-[#173F35] shrink-0 mt-0.5">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-[#17372F]">Phone & WhatsApp</p>
                  <p>Customer Care: +91 98450 12345</p>
                  <p>Corporate Desk: +91 80 4123 5678</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#EAF2EC] flex items-center justify-center text-[#173F35] shrink-0 mt-0.5">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-[#17372F]">Email Support</p>
                  <p>care@vivepanya.com</p>
                  <p>orders@vivepanya.com</p>
                  <p>distributors@vivepanya.com</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#EAF2EC] flex items-center justify-center text-[#173F35] shrink-0 mt-0.5">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-[#17372F]">Working Hours</p>
                  <p>Monday – Saturday: 9:30 AM – 6:30 PM IST</p>
                  <p>Sunday: Closed for artisan batch curing</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#173F35] text-white p-6 rounded-3xl shadow-sm space-y-2">
            <h4 className="font-serif text-lg font-bold">Wholesale & Corporate Gifting</h4>
            <p className="text-xs text-[#CADAD5] leading-relaxed">
              Planning custom festive hampers, wedding favors, or retail supermarket distribution? Speak directly to our business solutions team at <strong>+91 98450 12345</strong>.
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7">
          <div className="bg-white p-8 rounded-3xl border border-[#E7E2D6] shadow-xs">
            {submitted ? (
              <div className="py-12 text-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#17372F]">Message Received!</h3>
                <p className="text-xs text-[#6A7B74] max-w-sm mx-auto">
                  Thank you for reaching out. Our representative will respond within 24 business hours.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-4 py-2 px-4 rounded-xl border border-[#DBD5C5] text-xs font-semibold text-[#17372F] hover:bg-[#FAF8F5]"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="font-serif text-2xl font-bold text-[#17372F]">Send an Inquiry</h3>
                <p className="text-xs text-[#6A7B74]">Fill out the details below and we will get back to you promptly.</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="block text-xs font-semibold text-[#17372F] mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Ramesh Kumar"
                      className="w-full bg-[#FAF8F5] border border-[#DBD5C5] rounded-xl py-2 px-3 text-xs text-[#1E2E2A] focus:outline-none focus:border-[#173F35]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#17372F] mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="ramesh@example.com"
                      className="w-full bg-[#FAF8F5] border border-[#DBD5C5] rounded-xl py-2 px-3 text-xs text-[#1E2E2A] focus:outline-none focus:border-[#173F35]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#17372F] mb-1">Mobile Number</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98450 00000"
                      className="w-full bg-[#FAF8F5] border border-[#DBD5C5] rounded-xl py-2 px-3 text-xs text-[#1E2E2A] focus:outline-none focus:border-[#173F35]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#17372F] mb-1">Subject</label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full bg-[#FAF8F5] border border-[#DBD5C5] rounded-xl py-2 px-3 text-xs text-[#1E2E2A] focus:outline-none focus:border-[#173F35]"
                    >
                      <option>Customer Support</option>
                      <option>Order Tracking & Invoices</option>
                      <option>Wholesale & Distribution</option>
                      <option>Corporate Gifting Packages</option>
                      <option>Feedback & Product Suggestions</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#17372F] mb-1">Message *</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe how we can assist you..."
                    className="w-full bg-[#FAF8F5] border border-[#DBD5C5] rounded-xl p-3 text-xs text-[#1E2E2A] focus:outline-none focus:border-[#173F35]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3 px-6 bg-[#173F35] text-white text-xs font-bold rounded-xl hover:bg-[#235D4E] transition-colors shadow-sm cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
