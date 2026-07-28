import React, { useState, useRef } from 'react';
import { Calendar, Phone, MapPin, CheckCircle2, Star, ArrowRight, ShieldCheck, Compass, Sparkles, ChevronRight, Volume2, VolumeX } from 'lucide-react';
import { Page } from '../types';
import { PARK_INFO, AMENITIES_LIST, RATES_LIST } from '../data/parkData';

interface HomePageProps {
  onNavigate: (page: Page) => void;
  onOpenBooking: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onOpenBooking }) => {
  // Stay estimator calculator state
  const [stayType, setStayType] = useState<'Nightly' | 'Weekly' | 'Monthly'>('Nightly');
  const [duration, setDuration] = useState<number>(3);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const calculateEstimate = () => {
    if (stayType === 'Nightly') return `$${duration * 45}`;
    if (stayType === 'Weekly') return `$${duration * 240}`;
    return `$${duration * 550} (+ metered electric)`;
  };

  return (
    <div className="space-y-20 sm:space-y-28 pb-16">
      
      {/* HERO SECTION */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-[#2D4636] text-[#FDFCF8] py-20 lg:py-32">
        {/* Background Video with Overlay */}
        <div className="absolute inset-0 z-0">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            poster={PARK_INFO.images.hero}
            className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-1000"
          >
            <source
              src="https://vbq22dt2m5zj2dat.public.blob.vercel-storage.com/Create_video_South_Fork_RV_202607290050.mp4"
              type="video/mp4"
            />
            <img
              src={PARK_INFO.images.hero}
              alt="South Fork 82 RV Park scenic view"
              className="w-full h-full object-cover object-center"
            />
          </video>
          <div className="absolute inset-0 bg-[#2D4636]/60 backdrop-blur-[2px]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2D4636] via-transparent to-black/40" />
        </div>

        {/* Video Audio Control Toggle */}
        <button
          onClick={toggleMute}
          aria-label={isMuted ? "Unmute video audio" : "Mute video audio"}
          title={isMuted ? "Unmute video" : "Mute video"}
          className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 z-20 flex items-center gap-2 bg-black/40 hover:bg-black/60 backdrop-blur-md text-white px-3.5 py-2 rounded-full border border-white/20 text-xs font-medium transition-all shadow-lg group"
        >
          {isMuted ? (
            <>
              <VolumeX className="w-4 h-4 text-[#C5A072] group-hover:scale-110 transition-transform" />
              <span className="hidden sm:inline text-[11px] uppercase tracking-wider font-semibold">Sound Off</span>
            </>
          ) : (
            <>
              <Volume2 className="w-4 h-4 text-[#C5A072] group-hover:scale-110 transition-transform animate-pulse" />
              <span className="hidden sm:inline text-[11px] uppercase tracking-wider font-semibold text-[#C5A072]">Sound On</span>
            </>
          )}
        </button>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 w-full text-center">
          <div className="max-w-3xl mx-auto space-y-6 flex flex-col items-center">
            
            {/* Location Badge */}
            <div className="inline-flex items-center gap-2 bg-[#E1EAF0]/20 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20 text-xs font-semibold tracking-widest uppercase text-[#E1EAF0] shadow-sm">
              <MapPin className="w-3.5 h-3.5 text-[#C5A072]" />
              <span>Blossom, Texas • Off US Highway 82</span>
            </div>

            {/* Headline */}
            <h1 className="font-serif italic text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-white leading-[1.1]">
              Welcome to <br />
              <span className="font-sans not-italic font-bold text-[#E1EAF0]">South Fork 82</span> <span className="font-serif italic font-light text-[#C5A072]">RV Park</span>
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-xl text-[#E1EAF0]/90 font-light leading-relaxed max-w-2xl">
              A peaceful East Texas destination for overnight, weekly, and long-term RV stays under majestic Texas skies.
            </p>

            {/* Key Value Badges */}
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-[#E1EAF0] font-medium pt-1">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#C5A072]" /> Full 30/50 Amp Hookups
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#C5A072]" /> Free High-Speed Wi-Fi
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#C5A072]" /> Pet Friendly
              </span>
            </div>

            {/* Prominent CTA Buttons */}
            <div className="pt-4 flex flex-wrap justify-center items-center gap-4">
              <button
                onClick={onOpenBooking}
                id="hero-book-stay-btn"
                className="bg-[#7C5E43] hover:bg-[#684E37] text-white px-8 py-4 rounded-full text-xs uppercase tracking-widest font-bold shadow-lg shadow-[#7C5E43]/20 transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95 flex items-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Your Stay</span>
              </button>

              <button
                onClick={() => onNavigate('contact')}
                id="hero-contact-us-btn"
                className="border-2 border-white/80 hover:bg-white hover:text-[#2D4636] text-white px-8 py-4 rounded-full text-xs uppercase tracking-widest font-bold transition-all duration-300 flex items-center gap-2 shadow-md"
              >
                <Phone className="w-4 h-4" />
                <span>Contact Us</span>
              </button>
            </div>

            {/* Quick Call Direct */}
            <div className="pt-2 text-xs text-[#E1EAF0]/80">
              Need assistance? Call us directly: <a href={`tel:${PARK_INFO.phoneRaw}`} className="text-[#C5A072] font-bold underline hover:text-white">{PARK_INFO.phone}</a>
            </div>

          </div>
        </div>
      </section>


      {/* PARK INTRODUCTION SECTION */}
      <section className="max-w-7xl mx-auto px-6 sm:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Image Grid Side */}
          <div className="lg:col-span-6 relative">
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-xl border border-[#2D4636]/10">
              <img
                src={PARK_INFO.images.about}
                alt="South Fork 82 RV Park grounds"
                referrerPolicy="no-referrer"
                className="w-full h-80 sm:h-96 object-cover transform hover:scale-105 transition-transform duration-700"
              />
            </div>
            
            {/* Decorative Overlay Card */}
            <div className="absolute -bottom-6 -right-6 z-20 bg-[#2D4636] text-[#FDFCF8] p-6 rounded-3xl shadow-2xl hidden sm:block max-w-xs border border-white/10">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-full bg-[#7C5E43] flex items-center justify-center text-white font-serif italic text-lg">
                  S
                </div>
                <div>
                  <h4 className="font-bold text-xs uppercase tracking-widest">East Texas Hospitality</h4>
                  <span className="text-[10px] text-[#C5A072]">Blossom, TX 75416</span>
                </div>
              </div>
              <p className="text-xs text-[#E1EAF0]/90 font-light italic font-serif">
                "Quiet, clean, and conveniently located right off US-82."
              </p>
            </div>
          </div>

          {/* Intro Text Side */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <span className="text-[11px] uppercase tracking-[0.3em] font-bold text-[#7C5E43] block">
                Your Home Away From Home
              </span>
              <h2 className="font-serif italic text-3xl sm:text-5xl font-normal text-[#2D4636] leading-tight">
                Quiet Country Setting with Modern RV Conveniences
              </h2>
            </div>

            <p className="text-[#2D4636]/80 text-sm leading-relaxed">
              At <strong>South Fork 82 RV Park</strong>, we pride ourselves on offering a peaceful, safe, and hospitable atmosphere in Blossom, Texas. Whether you are passing through for a single night, spending a week exploring Lamar County, or establishing a comfortable long-term home base, our park is designed with your comfort in mind.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-5 bg-[#F4F2EA] rounded-2xl border border-[#2D4636]/10 space-y-1">
                <h4 className="font-bold text-[#2D4636] text-xs uppercase tracking-wider flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#7C5E43]" /> Clean & Secure
                </h4>
                <p className="text-xs text-[#2D4636]/70">
                  Well-maintained drives, clean pedestal power, and friendly management.
                </p>
              </div>

              <div className="p-5 bg-[#F4F2EA] rounded-2xl border border-[#2D4636]/10 space-y-1">
                <h4 className="font-bold text-[#2D4636] text-xs uppercase tracking-wider flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#7C5E43]" /> Prime Location
                </h4>
                <p className="text-xs text-[#2D4636]/70">
                  Easy pull-in from Highway 82, just 10 minutes east of Paris, TX.
                </p>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-4">
              <button
                onClick={() => onNavigate('about')}
                className="inline-flex items-center gap-2 text-[#7C5E43] font-bold text-xs uppercase tracking-widest hover:text-[#2D4636] transition-colors group"
                id="intro-read-story-btn"
              >
                <span>Read Our Full Story</span>
                <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

        </div>
      </section>


      {/* QUICK AMENITIES OVERVIEW */}
      <section className="bg-[#F4F2EA] py-20 border-y border-[#2D4636]/10">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
            <span className="text-[11px] uppercase tracking-[0.3em] font-bold text-[#7C5E43] block">
              Park Amenities
            </span>
            <h2 className="font-serif italic text-3xl sm:text-5xl font-normal text-[#2D4636]">
              Everything You Need For A Seamless Stay
            </h2>
            <p className="text-[#2D4636]/70 text-xs sm:text-sm">
              From heavy-duty electrical service to high-speed internet, we ensure your RV setup is effortless.
            </p>
          </div>

          {/* Quick Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {AMENITIES_LIST.slice(0, 8).map((item) => (
              <div
                key={item.id}
                className="bg-white p-6 rounded-2xl shadow-sm border border-[#2D4636]/10 hover:shadow-md transition-all duration-300 group hover:-translate-y-1"
              >
                <div className="w-10 h-10 rounded-full bg-[#E1EAF0] text-[#2D4636] flex items-center justify-center mb-4 group-hover:bg-[#2D4636] group-hover:text-white transition-colors">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-sm text-[#2D4636] mb-1">
                  {item.name}
                </h3>
                <p className="text-xs text-[#2D4636]/70 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          {/* View All Amenities Callout */}
          <div className="text-center mt-12">
            <button
              onClick={() => onNavigate('amenities')}
              id="view-all-amenities-btn"
              className="px-8 py-3.5 bg-[#2D4636] hover:bg-[#7C5E43] text-white text-xs uppercase tracking-widest font-bold rounded-full shadow-md transition-colors inline-flex items-center gap-2"
            >
              <span>Explore All Amenities</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </section>


      {/* INTERACTIVE STAY COST ESTIMATOR */}
      <section className="max-w-7xl mx-auto px-6 sm:px-10">
        <div className="bg-[#2D4636] text-[#FDFCF8] rounded-[2.5rem] p-8 sm:p-14 shadow-2xl relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-6 space-y-4">
              <span className="text-[11px] uppercase tracking-[0.3em] font-bold text-[#C5A072] block">
                Instant Rate Calculator
              </span>
              <h2 className="font-serif italic text-3xl sm:text-5xl font-normal leading-tight">
                Plan Your Stay & Estimate Your Rate
              </h2>
              <p className="text-xs sm:text-sm text-[#E1EAF0]/90 leading-relaxed font-light">
                Whether staying for 2 nights or several months, calculate your estimated stay cost with transparent pricing and no surprise fees.
              </p>

              <ul className="space-y-2 text-xs text-[#E1EAF0]/80 pt-2 font-medium">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C5A072]" /> Nightly: $45 / night (Utilities included)
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C5A072]" /> Weekly: $240 / week (Utilities included)
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C5A072]" /> Monthly: $550 / month (+ metered electric)
                </li>
              </ul>
            </div>

            {/* Calculator Card */}
            <div className="lg:col-span-6 bg-[#FDFCF8] text-[#2D4636] p-6 sm:p-8 rounded-3xl shadow-xl space-y-5 border border-white/20">
              
              <div>
                <label className="block text-[11px] uppercase tracking-wider font-bold text-[#2D4636] mb-2">
                  Select Stay Duration Type
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['Nightly', 'Weekly', 'Monthly'] as const).map((type) => (
                    <button
                      key={type}
                      onClick={() => {
                        setStayType(type);
                        setDuration(type === 'Nightly' ? 3 : 1);
                      }}
                      className={`py-2.5 px-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                        stayType === type
                          ? 'bg-[#7C5E43] text-white shadow-md'
                          : 'bg-[#F4F2EA] text-[#2D4636] hover:bg-gray-200'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-[#2D4636] mb-1">
                  <span>Number of {stayType === 'Nightly' ? 'Nights' : stayType === 'Weekly' ? 'Weeks' : 'Months'}:</span>
                  <span className="text-[#7C5E43] font-extrabold">{duration} {stayType === 'Nightly' ? 'night(s)' : stayType === 'Weekly' ? 'week(s)' : 'month(s)'}</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={stayType === 'Nightly' ? 14 : stayType === 'Weekly' ? 8 : 12}
                  value={duration}
                  onChange={(e) => setDuration(parseInt(e.target.value))}
                  className="w-full accent-[#7C5E43]"
                />
              </div>

              <div className="bg-[#F4F2EA] p-5 rounded-2xl border border-[#2D4636]/10 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-[#2D4636]/60 uppercase tracking-widest font-bold block">Estimated Cost:</span>
                  <span className="text-2xl font-serif italic font-bold text-[#2D4636]">
                    {calculateEstimate()}
                  </span>
                </div>

                <button
                  onClick={onOpenBooking}
                  className="bg-[#2D4636] hover:bg-[#7C5E43] text-white px-6 py-2.5 rounded-full text-xs uppercase tracking-widest font-bold shadow-md transition-all"
                  id="estimator-reserve-now-btn"
                >
                  Reserve Now
                </button>
              </div>

              <p className="text-[10px] text-[#2D4636]/60 text-center italic">
                * Rates subject to availability. Monthly stays require metered electrical connection setup.
              </p>

            </div>
          </div>

        </div>
      </section>


      {/* EMBEDDED GOOGLE MAP SECTION */}
      <section className="max-w-7xl mx-auto px-6 sm:px-10">
        <div className="bg-[#F4F2EA] rounded-3xl p-8 sm:p-10 border border-[#2D4636]/10 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-[11px] uppercase tracking-[0.3em] font-bold text-[#7C5E43] block">
                Convenient Location
              </span>
              <h2 className="font-serif italic text-2xl sm:text-4xl font-normal text-[#2D4636]">
                Find South Fork 82 RV Park in Blossom, TX
              </h2>
              <p className="text-xs sm:text-sm text-[#2D4636]/70 mt-1">
                Located at <strong>1105 W. Front, Blossom, TX 75416</strong> off US Highway 82, just 10 miles east of Paris, Texas.
              </p>
            </div>

            <a
              href={PARK_INFO.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#7C5E43] hover:bg-[#2D4636] text-white px-6 py-3.5 rounded-full text-xs uppercase tracking-widest font-bold shadow-md transition-colors shrink-0"
              id="get-directions-btn"
            >
              <MapPin className="w-4 h-4 text-white" />
              <span>Get Driving Directions</span>
            </a>
          </div>

          {/* Map iFrame */}
          <div className="w-full h-80 sm:h-96 rounded-2xl overflow-hidden shadow-inner border border-[#2D4636]/10">
            <iframe
              title="South Fork 82 RV Park Google Map Location"
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
      </section>

    </div>
  );
};
