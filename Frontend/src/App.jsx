import React, { useState, useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/home/Hero';
import HowItWorks from './components/home/HowItWorks';
import SafetySection from './components/home/SafetySection';
import FoodFeed from './components/food/FoodFeed';
import Dashboard from './components/dashboard/Dashboard';
import AuthModal from './components/modals/AuthModal';
import DonateModal from './components/modals/DonateModal';
import ClaimModal from './components/modals/ClaimModal';
import LocationModal from './components/modals/LocationModal';
import { INITIAL_DONATIONS, DEMO_USERS, CITIES } from './data';
import confetti from 'canvas-confetti';
import { CheckCircle, AlertCircle, X, MapPin } from 'lucide-react';

export default function App() {
  // Location State (Default: Delhi NCR or saved city)
  const [selectedCity, setSelectedCity] = useState(() => {
    try {
      const savedCityId = localStorage.getItem('shareplate_city_id');
      if (savedCityId) {
        const found = CITIES.find(c => c.id === savedCityId);
        if (found) return found;
      }
      return CITIES.find(c => c.id === 'delhi') || CITIES[0];
    } catch {
      return CITIES[0];
    }
  });

  const [selectedLocality, setSelectedLocality] = useState(() => {
    try {
      return localStorage.getItem('shareplate_locality') || 'All Areas';
    } catch {
      return 'All Areas';
    }
  });

  const [locationModalOpen, setLocationModalOpen] = useState(false);

  // Current logged in user (null = Guest / Visitor)
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('shareplate_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Donations database with localStorage persistence (v8 exact matched food imagery across all cities)
  const [donations, setDonations] = useState(() => {
    try {
      const saved = localStorage.getItem('shareplate_donations_v8');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Ensure it contains extensive multi-city items with verified matched imagery
        if (Array.isArray(parsed) && parsed.length >= 80 && parsed.some(d => d.title.includes('Pav Bhaji') && d.imageUrl.includes('7625089'))) {
          return parsed;
        }
      }
      // Initialize with fresh multi-city verified data
      localStorage.setItem('shareplate_donations_v8', JSON.stringify(INITIAL_DONATIONS));
      return INITIAL_DONATIONS;
    } catch {
      return INITIAL_DONATIONS;
    }
  });

  // Current active page / view
  const [activeView, setActiveView] = useState('home');

  // Scroll to top smoothly when page view changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeView]);

  // Modals state
  const [authModal, setAuthModal] = useState({ isOpen: false, mode: 'login' });
  const [donateModalOpen, setDonateModalOpen] = useState(false);
  const [claimModalOpen, setClaimModalOpen] = useState(false);
  const [claimingItem, setClaimingItem] = useState(null);

  // Quick feedback toast
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  // Sync city & locality to localStorage
  useEffect(() => {
    try {
      if (selectedCity) {
        localStorage.setItem('shareplate_city_id', selectedCity.id);
      }
      if (selectedLocality) {
        localStorage.setItem('shareplate_locality', selectedLocality);
      }
    } catch (e) {
      console.error(e);
    }
  }, [selectedCity, selectedLocality]);

  // Sync donations to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('shareplate_donations_v8', JSON.stringify(donations));
    } catch (e) {
      console.error(e);
    }
  }, [donations]);

  // Sync user to localStorage
  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem('shareplate_user', JSON.stringify(currentUser));
      } else {
        localStorage.removeItem('shareplate_user');
      }
    } catch (e) {
      console.error(e);
    }
  }, [currentUser]);

  // Location handlers
  const handleSelectLocation = (city, locality = 'All Areas') => {
    setSelectedCity(city);
    setSelectedLocality(locality);
    showToast(`Location switched to ${city.name} (${locality})`);
  };

  // Auth actions
  const handleOpenAuth = (mode = 'login') => {
    setAuthModal({ isOpen: true, mode });
  };

  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    showToast(`Welcome, ${user.name}! Signed in as ${user.role === 'donor' ? 'Food Donor' : user.role === 'recipient' ? 'Shelter NGO' : 'Admin'}.`);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setActiveView('home');
    showToast('You have been signed out successfully.');
  };

  // Donation actions
  const handleOpenDonate = () => {
    setDonateModalOpen(true);
  };

  const handleAddDonation = (newDonation) => {
    setDonations([newDonation, ...donations]);
    showToast(`Success! "${newDonation.title}" is now published.`);
    try {
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
    } catch {}
  };

  // Claim actions
  const handleClaimClick = (item) => {
    setClaimingItem(item);
    setClaimModalOpen(true);
  };

  const handleConfirmClaim = (donationId, ngoName) => {
    setDonations(donations.map(d => {
      if (d.id === donationId) {
        return {
          ...d,
          status: 'Claimed',
          claimedBy: ngoName
        };
      }
      return d;
    }));
    showToast(`Batch claimed! Please use your 4-digit PIN at pickup.`);
    try {
      confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
    } catch {}
  };

  // Handover verification (PIN matching)
  const handleVerifyHandover = (donationId) => {
    setDonations(donations.map(d => {
      if (d.id === donationId) {
        return {
          ...d,
          status: 'Picked Up'
        };
      }
      return d;
    }));
    showToast('Handover PIN verified! Food rescue marked as complete.');
    try {
      confetti({ particleCount: 80, spread: 90, origin: { y: 0.5 } });
    } catch {}
  };

  const handleQuickLoginAsDonor = () => {
    setCurrentUser(DEMO_USERS.donor);
    showToast(`Signed in as ${DEMO_USERS.donor.name} (Food Donor)`);
  };

  const handleQuickLoginAsShelter = () => {
    setCurrentUser(DEMO_USERS.ngo);
    showToast(`Signed in as ${DEMO_USERS.ngo.name} (Verified Shelter NGO)`);
  };

  return (
    <div className="min-h-screen bg-[#173F35] text-[#252923] flex flex-col font-sans selection:bg-[#C9E7A3]/50">
      
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce">
          <div className="bg-[#173F35] text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 border border-[#C9E7A3]/30 text-xs font-bold">
            <CheckCircle className="w-5 h-5 text-[#C9E7A3] shrink-0" />
            <span>{toast.message}</span>
            <button onClick={() => setToast(null)} className="text-white/60 hover:text-white ml-2 cursor-pointer">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Main Top Navigation */}
      <Navbar
        currentUser={currentUser}
        activeView={activeView}
        setActiveView={setActiveView}
        selectedCity={selectedCity}
        selectedLocality={selectedLocality}
        onOpenLocation={() => setLocationModalOpen(true)}
        onOpenAuth={handleOpenAuth}
        onLogout={handleLogout}
        onOpenDonate={handleOpenDonate}
      />

      {/* Main Content Area (Offset for fixed top navbar) */}
      <main className="flex-1 pt-18 sm:pt-20 bg-[#F7F4EC] flex flex-col">
        {activeView === 'home' && (
          <div className="flex-1 flex flex-col">
            <Hero
              onOpenDonate={handleOpenDonate}
              onViewFood={() => {
                const feedEl = document.getElementById('food-feed-section');
                if (feedEl) {
                  feedEl.scrollIntoView({ behavior: 'smooth' });
                } else {
                  setActiveView('food');
                }
              }}
              selectedCity={selectedCity}
              selectedLocality={selectedLocality}
              donations={donations}
              onClaimFood={handleClaimClick}
              onOpenLocation={() => setLocationModalOpen(true)}
            />
            <FoodFeed
              donations={donations}
              onClaimFood={handleClaimClick}
              selectedCity={selectedCity}
              selectedLocality={selectedLocality}
              onSelectLocality={(loc) => setSelectedLocality(loc)}
              onOpenLocation={() => setLocationModalOpen(true)}
              currentUser={currentUser}
              onViewDashboard={() => setActiveView('dashboard')}
            />
            <HowItWorks />
            <SafetySection />
          </div>
        )}

        {activeView === 'food' && (
          <div className="pt-6 flex-1 flex flex-col bg-[#F7F4EC]">
            <FoodFeed
              donations={donations}
              onClaimFood={handleClaimClick}
              selectedCity={selectedCity}
              selectedLocality={selectedLocality}
              onSelectLocality={(loc) => setSelectedLocality(loc)}
              onOpenLocation={() => setLocationModalOpen(true)}
              currentUser={currentUser}
              onViewDashboard={() => setActiveView('dashboard')}
            />
          </div>
        )}

        {activeView === 'how-it-works' && (
          <div className="pt-6 flex-1 flex flex-col bg-[#F7F4EC]">
            <HowItWorks />
            <SafetySection />
          </div>
        )}

        {activeView === 'safety' && (
          <div className="pt-6 flex-1 flex flex-col bg-[#F7F4EC]">
            <SafetySection />
            <HowItWorks />
          </div>
        )}

        {activeView === 'dashboard' && (
          <div className="flex-1 flex flex-col bg-[#F7F4EC]">
            <Dashboard
              currentUser={currentUser}
              donations={donations}
              onOpenDonate={handleOpenDonate}
              onVerifyHandover={handleVerifyHandover}
              onSwitchUser={(user) => {
                setCurrentUser(user);
                showToast(`Switched view to ${user.name}`);
              }}
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer 
        setActiveView={setActiveView} 
        selectedCity={selectedCity}
        selectedLocality={selectedLocality}
        onSelectLocality={(loc) => {
          setSelectedLocality(loc);
          setActiveView('food');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenLocation={() => setLocationModalOpen(true)}
        onOpenDonate={handleOpenDonate}
        onOpenAuth={handleOpenAuth}
        currentUser={currentUser}
      />

      {/* Location Modal */}
      <LocationModal
        isOpen={locationModalOpen}
        onClose={() => setLocationModalOpen(false)}
        selectedCity={selectedCity}
        selectedLocality={selectedLocality}
        onSelectLocation={handleSelectLocation}
      />

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModal.isOpen}
        initialMode={authModal.mode}
        onClose={() => setAuthModal({ ...authModal, isOpen: false })}
        onLoginSuccess={handleLoginSuccess}
        selectedCity={selectedCity}
      />

      {/* Donate Modal */}
      <DonateModal
        isOpen={donateModalOpen}
        onClose={() => setDonateModalOpen(false)}
        onAddDonation={handleAddDonation}
        currentUser={currentUser}
        selectedCity={selectedCity}
        onQuickLoginAsDonor={handleQuickLoginAsDonor}
      />

      {/* Claim Modal */}
      <ClaimModal
        isOpen={claimModalOpen}
        foodItem={claimingItem}
        currentUser={currentUser}
        onClose={() => { setClaimModalOpen(false); setClaimingItem(null); }}
        onConfirmClaim={handleConfirmClaim}
        onQuickLoginAsShelter={handleQuickLoginAsShelter}
        onNavigateToDashboard={() => {
          setClaimModalOpen(false);
          setClaimingItem(null);
          setActiveView('dashboard');
        }}
      />

    </div>
  );
}
