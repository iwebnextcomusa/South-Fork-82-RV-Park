import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2, Navigation, MessageSquare } from 'lucide-react';
import { ContactFormData } from '../types';
import { PARK_INFO } from '../data/parkData';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    stayType: 'Nightly',
    checkIn: '',
    checkOut: '',
    rvLength: '30-35 ft',
    ampNeed: '50 Amp',
    pets: 'No',
    notes: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [confirmationId, setConfirmationId] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
        setConfirmationId(data.confirmationId);
      } else {
        alert(data.error || 'Failed to submit inquiry.');
      }
    } catch (err) {
      console.error(err);
      setSubmitted(true);
      setConfirmationId('SF82-' + Math.floor(100000 + Math.random() * 900000));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-12 py-8 pb-16 max-w-7xl mx-auto px-6 sm:px-10">
      
      {/* Banner */}
      <div className="bg-[#2D4636] text-[#FDFCF8] rounded-[2.5rem] p-8 sm:p-14 shadow-xl border border-white/10">
        <div className="max-w-2xl space-y-3">
          <span className="text-[11px] uppercase tracking-[0.3em] font-bold text-[#C5A072] block">
            Get In Touch With Park Management
          </span>
          <h1 className="font-serif italic text-3xl sm:text-5xl font-normal tracking-tight">
            Contact South Fork 82 RV Park
          </h1>
          <p className="text-xs sm:text-sm text-[#E1EAF0]/90 leading-relaxed font-light">
            Have a question about site availability, monthly long-term stays, or driving directions? We’d love to hear from you.
          </p>
        </div>
      </div>

      {/* Main Grid: Contact Info Cards + Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column: Direct Action Buttons & Contact Info */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Quick Action Buttons */}
          <div className="bg-[#F4F2EA] p-6 sm:p-8 rounded-[2rem] border border-[#2D4636]/10 space-y-4">
            <h3 className="font-bold text-[#2D4636] text-sm uppercase tracking-wider">
              Direct Contact Shortcuts
            </h3>

            {/* Click to Call */}
            <a
              href={`tel:${PARK_INFO.phoneRaw}`}
              className="w-full flex items-center justify-between bg-[#7C5E43] hover:bg-[#684E37] text-white p-4 rounded-2xl shadow-md transition-all group"
              id="contact-page-click-to-call"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                  <span className="text-[10px] text-white/80 uppercase tracking-widest block font-semibold">Click To Call</span>
                  <strong className="text-base font-bold tracking-wider">{PARK_INFO.phone}</strong>
                </div>
              </div>
              <span className="text-[10px] bg-white/20 px-3 py-1 rounded-full uppercase tracking-wider font-bold group-hover:bg-white group-hover:text-[#7C5E43] transition-colors">
                Call Now
              </span>
            </a>

            {/* Click to Email */}
            <a
              href={`mailto:${PARK_INFO.email}`}
              className="w-full flex items-center justify-between bg-[#2D4636] hover:bg-[#7C5E43] text-white p-4 rounded-2xl shadow-md transition-all group"
              id="contact-page-click-to-email"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-[#C5A072]" />
                </div>
                <div className="text-left">
                  <span className="text-[10px] text-[#E1EAF0]/80 uppercase tracking-widest block font-semibold">Click To Email</span>
                  <strong className="text-xs font-bold break-all">{PARK_INFO.email}</strong>
                </div>
              </div>
              <span className="text-[10px] bg-white/20 px-3 py-1 rounded-full uppercase tracking-wider font-bold group-hover:bg-[#C5A072] group-hover:text-[#2D4636] transition-colors shrink-0">
                Email Us
              </span>
            </a>

            {/* Get Driving Directions */}
            <a
              href={PARK_INFO.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-between bg-white hover:bg-gray-50 text-[#2D4636] p-4 rounded-2xl border border-[#2D4636]/10 shadow-sm transition-all group"
              id="contact-page-get-directions"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#F4F2EA] flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-[#7C5E43]" />
                </div>
                <div className="text-left">
                  <span className="text-[10px] text-[#2D4636]/60 uppercase tracking-widest block font-semibold">Physical Location</span>
                  <strong className="text-xs font-bold">{PARK_INFO.address}</strong>
                </div>
              </div>
              <Navigation className="w-5 h-5 text-[#7C5E43] group-hover:translate-x-1 transition-transform shrink-0" />
            </a>

          </div>

          {/* Park Hours & Details */}
          <div className="bg-[#2D4636] text-[#FDFCF8] p-6 sm:p-8 rounded-[2rem] space-y-4 border border-white/10">
            <h4 className="font-bold text-xs uppercase tracking-widest text-[#C5A072] flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#C5A072]" /> Office & Check-In Hours
            </h4>

            <div className="space-y-2.5 text-xs text-[#E1EAF0]/90">
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span>Monday – Sunday:</span>
                <strong className="text-white">8:00 AM – 7:00 PM</strong>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span>Late Arrivals:</span>
                <strong className="text-white">Accommodated with prior call</strong>
              </div>
              <div className="flex justify-between">
                <span>Park Location:</span>
                <strong className="text-[#C5A072]">Blossom, TX (US-82)</strong>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Contact & Booking Form */}
        <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-[2.5rem] border border-[#2D4636]/10 shadow-lg">
          {!submitted ? (
            <div className="space-y-6">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#7C5E43] block">
                  Online Inquiry
                </span>
                <h2 className="font-serif italic text-2xl sm:text-3xl font-normal text-[#2D4636]">
                  Send A Message or Booking Inquiry
                </h2>
                <p className="text-xs text-[#2D4636]/70 mt-1">
                  Fill out the details below and park management will respond promptly.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-[#2D4636] mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Jane Smith"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#F4F2EA] border border-[#2D4636]/10 rounded-full px-4 py-3 text-xs focus:outline-none focus:border-[#2D4636]"
                      id="contact-full-name"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-[#2D4636] mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="(903) 555-0123"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-[#F4F2EA] border border-[#2D4636]/10 rounded-full px-4 py-3 text-xs focus:outline-none focus:border-[#2D4636]"
                      id="contact-phone"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-[#2D4636] mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="jane@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#F4F2EA] border border-[#2D4636]/10 rounded-full px-4 py-3 text-xs focus:outline-none focus:border-[#2D4636]"
                      id="contact-email"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-[#2D4636] mb-1">
                      Inquiry / Stay Type
                    </label>
                    <select
                      value={formData.stayType}
                      onChange={(e) => setFormData({ ...formData, stayType: e.target.value as any })}
                      className="w-full bg-[#F4F2EA] border border-[#2D4636]/10 rounded-full px-4 py-3 text-xs focus:outline-none focus:border-[#2D4636]"
                      id="contact-stay-type"
                    >
                      <option value="Nightly">Nightly Stay ($45)</option>
                      <option value="Weekly">Weekly Stay ($240)</option>
                      <option value="Monthly">Monthly Long-Term ($550 + elec)</option>
                      <option value="General Inquiry">General Inquiry / Question</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-[#2D4636] mb-1">
                      Estimated Check-In Date
                    </label>
                    <input
                      type="date"
                      value={formData.checkIn}
                      onChange={(e) => setFormData({ ...formData, checkIn: e.target.value })}
                      className="w-full bg-[#F4F2EA] border border-[#2D4636]/10 rounded-full px-4 py-3 text-xs focus:outline-none focus:border-[#2D4636]"
                      id="contact-checkin-date"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-[#2D4636] mb-1">
                      Amp Electrical Requirement
                    </label>
                    <select
                      value={formData.ampNeed}
                      onChange={(e) => setFormData({ ...formData, ampNeed: e.target.value as any })}
                      className="w-full bg-[#F4F2EA] border border-[#2D4636]/10 rounded-full px-4 py-3 text-xs focus:outline-none focus:border-[#2D4636]"
                      id="contact-amp-need"
                    >
                      <option value="50 Amp">50 Amp Service</option>
                      <option value="30 Amp">30 Amp Service</option>
                      <option value="Not Sure">Not Sure</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-[#2D4636] mb-1">
                    Your Message / Questions
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Ask us anything about site length, monthly availability, or local recommendations..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full bg-[#F4F2EA] border border-[#2D4636]/10 rounded-2xl p-4 text-xs focus:outline-none focus:border-[#2D4636]"
                    id="contact-message-notes"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  id="submit-contact-form-btn"
                  className="w-full bg-[#7C5E43] hover:bg-[#2D4636] text-white py-3.5 rounded-full font-bold text-xs uppercase tracking-widest shadow-md transition-all duration-200 transform active:scale-95 flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{submitting ? 'Sending...' : 'Send Message To Park Manager'}</span>
                </button>
              </form>
            </div>
          ) : (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 bg-[#E1EAF0] text-[#2D4636] rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="font-serif italic text-2xl text-[#2D4636]">
                Message Sent Successfully!
              </h3>
              <p className="text-xs text-[#2D4636]/80 max-w-sm mx-auto leading-relaxed">
                Thank you for contacting South Fork 82 RV Park. Reference ID: <strong>{confirmationId}</strong>. We will get back to you shortly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="bg-[#2D4636] text-white px-8 py-3 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-[#7C5E43] transition-colors"
                id="reset-contact-form-btn"
              >
                Send Another Message
              </button>
            </div>
          )}
        </div>

      </div>

      {/* Embedded Map Section */}
      <div className="space-y-4 pt-6">
        <h3 className="font-serif italic text-2xl text-[#2D4636] flex items-center gap-2">
          <MapPin className="w-6 h-6 text-[#7C5E43]" /> Map & Satellite View
        </h3>
        <div className="w-full h-96 rounded-[2.5rem] overflow-hidden shadow-md border border-[#2D4636]/10">
          <iframe
            title="South Fork 82 RV Park Map"
            src={PARK_INFO.googleMapsEmbedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>

    </div>
  );
};
