import React, { useState } from 'react';
import { Check, Info, Phone, Calendar, Zap, AlertCircle } from 'lucide-react';
import { Page } from '../types';
import { PARK_INFO, RATES_LIST } from '../data/parkData';

interface RatesPageProps {
  onOpenBooking: () => void;
}

export const RatesPage: React.FC<RatesPageProps> = ({ onOpenBooking }) => {
  const [selectedRate, setSelectedRate] = useState<string>('weekly');

  return (
    <div className="space-y-12 py-8 pb-16 max-w-7xl mx-auto px-6 sm:px-10">
      
      {/* Banner */}
      <div className="bg-[#2D4636] text-[#FDFCF8] rounded-[2.5rem] p-8 sm:p-14 shadow-xl border border-white/10">
        <div className="max-w-2xl space-y-3">
          <span className="text-[11px] uppercase tracking-[0.3em] font-bold text-[#C5A072] block">
            Transparent Rates & Pricing
          </span>
          <h1 className="font-serif italic text-3xl sm:text-5xl font-normal tracking-tight">
            Simple, Affordable RV Site Rates
          </h1>
          <p className="text-xs sm:text-sm text-[#E1EAF0]/90 leading-relaxed font-light">
            Choose between nightly, weekly, or long-term monthly options with full hookups and high-speed Wi-Fi included.
          </p>
        </div>
      </div>

      {/* Pricing Cards Table */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        {RATES_LIST.map((plan) => {
          const isPopular = plan.popular;
          return (
            <div
              key={plan.id}
              className={`rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 relative ${
                isPopular
                  ? 'bg-[#2D4636] text-[#FDFCF8] shadow-2xl scale-105 border-2 border-[#C5A072]'
                  : 'bg-white text-[#2D4636] shadow-md border border-[#2D4636]/10'
              }`}
            >
              {isPopular && (
                <span className="absolute -top-3.5 left-1/2 transform -translate-x-1/2 bg-[#7C5E43] text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1 rounded-full shadow-md">
                  Most Popular Choice
                </span>
              )}

              <div>
                <span className={`text-[10px] font-bold uppercase tracking-[0.2em] block ${isPopular ? 'text-[#C5A072]' : 'text-[#7C5E43]'}`}>
                  {plan.type} Stay
                </span>

                <div className="my-4">
                  <span className={`font-serif italic text-4xl sm:text-5xl font-bold ${isPopular ? 'text-white' : 'text-[#2D4636]'}`}>
                    {plan.price}
                  </span>
                  <span className={`text-xs block mt-1 ${isPopular ? 'text-[#E1EAF0]/80' : 'text-[#2D4636]/60'}`}>
                    {plan.period}
                  </span>
                </div>

                <p className={`text-xs mb-6 leading-relaxed ${isPopular ? 'text-[#E1EAF0]/90' : 'text-[#2D4636]/80'}`}>
                  {plan.subtitle}
                </p>

                <div className={`h-px w-full my-4 ${isPopular ? 'bg-white/10' : 'bg-[#2D4636]/10'}`} />

                <ul className="space-y-3 text-xs mb-6">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                        isPopular ? 'bg-[#7C5E43] text-white' : 'bg-[#E1EAF0] text-[#2D4636]'
                      }`}>
                        <Check className="w-2.5 h-2.5" />
                      </div>
                      <span className={isPopular ? 'text-[#E1EAF0]/90' : 'text-[#2D4636]/80'}>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                {plan.note && (
                  <p className={`text-[11px] mb-4 italic ${isPopular ? 'text-[#C5A072]' : 'text-[#2D4636]/60'}`}>
                    Note: {plan.note}
                  </p>
                )}

                <button
                  onClick={onOpenBooking}
                  className={`w-full py-3 rounded-full font-bold text-xs uppercase tracking-widest transition-all duration-200 shadow-md ${
                    isPopular
                      ? 'bg-[#7C5E43] hover:bg-white hover:text-[#2D4636] text-white'
                      : 'bg-[#2D4636] hover:bg-[#7C5E43] text-white'
                  }`}
                  id={`rates-plan-btn-${plan.id}`}
                >
                  Book {plan.type} Stay
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {/* Pricing Notice Banner */}
      <div className="bg-[#F4F2EA] p-6 sm:p-8 rounded-3xl border border-[#2D4636]/10 flex flex-col sm:flex-row items-start sm:items-center gap-4 text-xs text-[#2D4636]">
        <div className="w-10 h-10 rounded-full bg-[#7C5E43] text-white flex items-center justify-center shrink-0">
          <AlertCircle className="w-5 h-5" />
        </div>
        <div>
          <h4 className="font-bold text-[#2D4636] text-xs uppercase tracking-wider">Important Pricing & Utility Policy</h4>
          <p className="mt-0.5 leading-relaxed text-[#2D4636]/80">
            All prices are subject to change. Nightly and weekly stays include full power, water, sewer, and Wi-Fi. Long-term monthly stays are billed a base monthly site fee of $550 plus metered electricity consumed at individual site meters.
          </p>
        </div>
      </div>

      {/* Question or Direct Booking Callout */}
      <div className="bg-[#2D4636] text-white p-8 sm:p-10 rounded-[2.5rem] flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div>
          <h3 className="font-serif italic text-2xl sm:text-3xl font-normal text-white">
            Have Custom Dates or Rigs Over 40ft?
          </h3>
          <p className="text-xs sm:text-sm text-[#E1EAF0]/90 mt-1 font-light">
            Give park management a call directly to verify long-term site availability or pull-through site sizing.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 shrink-0">
          <a
            href={`tel:${PARK_INFO.phoneRaw}`}
            className="inline-flex items-center gap-2 bg-[#7C5E43] hover:bg-white hover:text-[#2D4636] text-white px-6 py-3.5 rounded-full font-bold text-xs uppercase tracking-widest shadow-md transition-colors"
          >
            <Phone className="w-4 h-4 text-white" />
            <span>Call {PARK_INFO.phone}</span>
          </a>

          <button
            onClick={onOpenBooking}
            className="inline-flex items-center gap-2 border-2 border-white/80 hover:bg-white hover:text-[#2D4636] text-white px-6 py-3.5 rounded-full font-bold text-xs uppercase tracking-widest transition-colors"
            id="rates-inquire-now-btn"
          >
            <Calendar className="w-4 h-4 text-[#C5A072]" />
            <span>Submit Inquiry</span>
          </button>
        </div>
      </div>

    </div>
  );
};
