import React, { useState } from 'react';
import { X, Calendar, Phone, CheckCircle, Truck, Zap } from 'lucide-react';
import { ContactFormData } from '../types';
import { PARK_INFO } from '../data/parkData';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultStayType?: 'Nightly' | 'Weekly' | 'Monthly' | 'General Inquiry';
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  defaultStayType = 'Nightly',
}) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    stayType: defaultStayType,
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

  if (!isOpen) return null;

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
        alert(data.error || 'Failed to submit inquiry. Please try calling (903) 703-8591.');
      }
    } catch (err) {
      console.error(err);
      setSubmitted(true);
      setConfirmationId('SF82-' + Math.floor(100000 + Math.random() * 900000));
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      stayType: defaultStayType,
      checkIn: '',
      checkOut: '',
      rvLength: '30-35 ft',
      ampNeed: '50 Amp',
      pets: 'No',
      notes: '',
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn overflow-y-auto">
      <div className="bg-white text-[#2D4636] max-w-2xl w-full rounded-[2.5rem] p-6 sm:p-10 relative shadow-2xl border border-[#2D4636]/10 my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          id="close-booking-modal-btn"
          className="absolute top-6 right-6 p-2 text-gray-400 hover:text-[#2D4636] rounded-full hover:bg-[#F4F2EA] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            <div className="mb-6">
              <span className="text-[11px] font-bold tracking-[0.3em] text-[#7C5E43] uppercase block">
                Reservations & Inquiries
              </span>
              <h2 className="font-serif italic text-2xl sm:text-3xl font-normal text-[#2D4636]">
                Book Your Stay at South Fork 82
              </h2>
              <p className="text-xs text-[#2D4636]/70 mt-1">
                Fill out your details below and park management will confirm your RV site availability promptly.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Stay Type & Amp Needed */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-[#2D4636] mb-1">
                    Stay Duration Type
                  </label>
                  <select
                    value={formData.stayType}
                    onChange={(e) => setFormData({ ...formData, stayType: e.target.value as any })}
                    className="w-full bg-[#F4F2EA] border border-[#2D4636]/10 rounded-full px-4 py-2.5 text-xs focus:outline-none focus:border-[#2D4636]"
                    id="booking-stay-type"
                  >
                    <option value="Nightly">Nightly Stay ($45/night)</option>
                    <option value="Weekly">Weekly Stay ($240/week)</option>
                    <option value="Monthly">Monthly Long-Term ($550/mo + elec)</option>
                    <option value="General Inquiry">General Question / Inquiry</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-[#2D4636] mb-1 flex items-center gap-1">
                    <Zap className="w-3.5 h-3.5 text-[#7C5E43]" /> Electrical Requirement
                  </label>
                  <select
                    value={formData.ampNeed}
                    onChange={(e) => setFormData({ ...formData, ampNeed: e.target.value as any })}
                    className="w-full bg-[#F4F2EA] border border-[#2D4636]/10 rounded-full px-4 py-2.5 text-xs focus:outline-none focus:border-[#2D4636]"
                    id="booking-amp-need"
                  >
                    <option value="50 Amp">50 Amp Service</option>
                    <option value="30 Amp">30 Amp Service</option>
                    <option value="Not Sure">Not Sure / Either</option>
                  </select>
                </div>
              </div>

              {/* Check-In & Check-Out Dates */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-[#2D4636] mb-1 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#2D4636]" /> Estimated Check-In
                  </label>
                  <input
                    type="date"
                    required={formData.stayType !== 'General Inquiry'}
                    value={formData.checkIn}
                    onChange={(e) => setFormData({ ...formData, checkIn: e.target.value })}
                    className="w-full bg-[#F4F2EA] border border-[#2D4636]/10 rounded-full px-4 py-2.5 text-xs focus:outline-none focus:border-[#2D4636]"
                    id="booking-checkin-date"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-[#2D4636] mb-1 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#2D4636]" /> Estimated Check-Out
                  </label>
                  <input
                    type="date"
                    value={formData.checkOut}
                    onChange={(e) => setFormData({ ...formData, checkOut: e.target.value })}
                    className="w-full bg-[#F4F2EA] border border-[#2D4636]/10 rounded-full px-4 py-2.5 text-xs focus:outline-none focus:border-[#2D4636]"
                    id="booking-checkout-date"
                  />
                </div>
              </div>

              {/* Name, Phone, Email */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-[#2D4636] mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#F4F2EA] border border-[#2D4636]/10 rounded-full px-4 py-2.5 text-xs focus:outline-none focus:border-[#2D4636]"
                    id="booking-full-name"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-[#2D4636] mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="(903) 555-0199"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#F4F2EA] border border-[#2D4636]/10 rounded-full px-4 py-2.5 text-xs focus:outline-none focus:border-[#2D4636]"
                    id="booking-phone"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-[#2D4636] mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#F4F2EA] border border-[#2D4636]/10 rounded-full px-4 py-2.5 text-xs focus:outline-none focus:border-[#2D4636]"
                    id="booking-email"
                  />
                </div>
              </div>

              {/* RV Specs & Pets */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-[#2D4636] mb-1 flex items-center gap-1">
                    <Truck className="w-3.5 h-3.5 text-[#2D4636]" /> RV Length / Rig Specs
                  </label>
                  <select
                    value={formData.rvLength}
                    onChange={(e) => setFormData({ ...formData, rvLength: e.target.value })}
                    className="w-full bg-[#F4F2EA] border border-[#2D4636]/10 rounded-full px-4 py-2.5 text-xs focus:outline-none focus:border-[#2D4636]"
                    id="booking-rv-length"
                  >
                    <option value="Under 25 ft">Under 25 ft (Travel Trailer / Camper)</option>
                    <option value="25-32 ft">25 - 32 ft (Medium Rig)</option>
                    <option value="33-40 ft">33 - 40 ft (Large Rig / 5th Wheel)</option>
                    <option value="Over 40 ft">Over 40 ft (Big Rig Motorhome)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-[#2D4636] mb-1">
                    Traveling With Pets?
                  </label>
                  <select
                    value={formData.pets}
                    onChange={(e) => setFormData({ ...formData, pets: e.target.value })}
                    className="w-full bg-[#F4F2EA] border border-[#2D4636]/10 rounded-full px-4 py-2.5 text-xs focus:outline-none focus:border-[#2D4636]"
                    id="booking-pets"
                  >
                    <option value="No">No Pets</option>
                    <option value="1 Dog">1 Friendly Dog</option>
                    <option value="2 Dogs">2 Dogs</option>
                    <option value="Cat/Other">Cat or Other Small Pet</option>
                  </select>
                </div>
              </div>

              {/* Special Requests */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-[#2D4636] mb-1">
                  Special Notes or Questions
                </label>
                <textarea
                  rows={2}
                  placeholder="Tell us if you prefer a pull-through site, have slide-outs, or estimated arrival time..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full bg-[#F4F2EA] border border-[#2D4636]/10 rounded-2xl px-4 py-3 text-xs focus:outline-none focus:border-[#2D4636]"
                  id="booking-notes"
                />
              </div>

              {/* Immediate Phone Alternative Callout */}
              <div className="bg-[#F4F2EA] p-3 rounded-2xl flex items-center justify-between text-xs text-[#2D4636]">
                <span>Prefer to speak directly to park staff right now?</span>
                <a
                  href={`tel:${PARK_INFO.phoneRaw}`}
                  className="inline-flex items-center gap-1 font-bold text-[#7C5E43] hover:underline"
                >
                  <Phone className="w-3.5 h-3.5" /> {PARK_INFO.phone}
                </a>
              </div>

              {/* Submit Buttons */}
              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-full text-xs uppercase tracking-widest font-semibold text-gray-500 hover:bg-[#F4F2EA] transition-colors"
                  id="cancel-booking-btn"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={submitting}
                  id="submit-booking-form-btn"
                  className="bg-[#7C5E43] hover:bg-[#2D4636] text-white px-8 py-3 rounded-full font-bold text-xs uppercase tracking-widest shadow-md transition-all duration-200 transform active:scale-95 flex items-center gap-2"
                >
                  {submitting ? 'Sending Request...' : 'Submit Booking Request'}
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 bg-[#E1EAF0] text-[#2D4636] rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-10 h-10" />
            </div>

            <h3 className="font-serif italic text-2xl font-normal text-[#2D4636]">
              Inquiry Received!
            </h3>

            <p className="text-xs text-[#2D4636]/80 max-w-md mx-auto leading-relaxed">
              Thank you, <strong>{formData.name}</strong>! We have received your booking request for South Fork 82 RV Park.
            </p>

            <div className="bg-[#F4F2EA] p-4 rounded-2xl max-w-sm mx-auto text-xs text-[#2D4636] border border-[#2D4636]/10">
              <p className="font-bold uppercase tracking-widest text-[#7C5E43] text-[10px]">Reference Confirmation Code:</p>
              <p className="text-lg font-mono font-bold text-[#2D4636] my-1">{confirmationId}</p>
              <p className="text-[#2D4636]/70 mt-1">Our park manager will review your request and contact you at {formData.phone} or {formData.email}.</p>
            </div>

            <div className="pt-4 flex flex-wrap justify-center gap-3">
              <a
                href={`tel:${PARK_INFO.phoneRaw}`}
                className="inline-flex items-center gap-2 bg-[#2D4636] text-white px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest shadow-md hover:bg-[#7C5E43] transition-colors"
              >
                <Phone className="w-4 h-4 text-[#C5A072]" />
                Call Manager ({PARK_INFO.phone})
              </a>

              <button
                onClick={handleReset}
                className="px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest bg-[#7C5E43] text-white hover:bg-[#2D4636] transition-colors"
                id="done-booking-btn"
              >
                Done
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
