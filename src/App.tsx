import React, { useState } from 'react';
import { Page } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { ChatbotWidget } from './components/ChatbotWidget';
import { BookingModal } from './components/BookingModal';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { AmenitiesPage } from './pages/AmenitiesPage';
import { RatesPage } from './pages/RatesPage';
import { GalleryPage } from './pages/GalleryPage';
import { AttractionsPage } from './pages/AttractionsPage';
import { ContactPage } from './pages/ContactPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={setCurrentPage} onOpenBooking={() => setBookingModalOpen(true)} />;
      case 'about':
        return <AboutPage onNavigate={setCurrentPage} onOpenBooking={() => setBookingModalOpen(true)} />;
      case 'amenities':
        return <AmenitiesPage onOpenBooking={() => setBookingModalOpen(true)} />;
      case 'rates':
        return <RatesPage onOpenBooking={() => setBookingModalOpen(true)} />;
      case 'gallery':
        return <GalleryPage />;
      case 'attractions':
        return <AttractionsPage onOpenBooking={() => setBookingModalOpen(true)} />;
      case 'contact':
        return <ContactPage />;
      default:
        return <HomePage onNavigate={setCurrentPage} onOpenBooking={() => setBookingModalOpen(true)} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFCF8] text-[#2D4636] selection:bg-[#2D4636] selection:text-white font-sans">
      {/* Sticky Top Header Navigation */}
      <Header
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        onOpenBooking={() => setBookingModalOpen(true)}
      />

      {/* Main View Area */}
      <main className="flex-1 w-full">
        {renderPage()}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={setCurrentPage}
        onOpenBooking={() => setBookingModalOpen(true)}
      />

      {/* Floating Utilities */}
      <ScrollToTop />
      <ChatbotWidget />

      {/* Reservation / Inquiry Booking Modal */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
      />
    </div>
  );
}
