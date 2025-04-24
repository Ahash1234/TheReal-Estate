import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp, FaHeart, FaAmbulance, FaLaptop, FaHotel, FaUserFriends, FaHome, FaFileInvoice, FaIdCard } from 'react-icons/fa';

export default function BenefitsModal({ open, onClose, price }) {
  const [openSections, setOpenSections] = useState({
    medical: true,
    travel: true,
    other: true,
  });

  const toggleSection = (section) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-[999]">
      <div className="bg-white max-w-lg w-full rounded-lg p-6 overflow-y-auto max-h-[90vh]
                      transition-all duration-300 transform scale-95 opacity-0 animate-fadeScaleIn">

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">15 Benefits</h2>
          <button onClick={onClose} className="text-xl font-bold text-gray-500">×</button>
        </div>

        {/* Medical Benefits */}
        <CategoryHeader label="4 MEDICAL BENEFITS" open={openSections.medical} onToggle={() => toggleSection('medical')} />
        {openSections.medical && (
          <div className="space-y-3 transition-all duration-300">
            <BenefitItem icon={<FaAmbulance />} title="Emergency Medical Assistance" value="24*7 SUPPORT" desc="Covers Ambulance Assistance, House call-doctor & teleconsultations" />
            <BenefitItem icon={<FaHeart />} title="In-Patient Care" value="$5,00,000" desc="Emergency hospitalization during trip" />
            <BenefitItem icon={<FaAmbulance />} title="Medical Evacuation" value="$50,000" desc="Evacuation expenses for emergencies" />
            <BenefitItem icon={<FaHeart />} title="OPD Expenses" value="$25,000" desc="Outpatient expenses for illness/injury during trip" />
          </div>
        )}

        {/* Travel Benefits */}
        <CategoryHeader label="5 TRAVEL BENEFITS" open={openSections.travel} onToggle={() => toggleSection('travel')} />
        {openSections.travel && (
          <div className="space-y-3 transition-all duration-300">
            <BenefitItem icon={<FaHotel />} title="Bounced Booking" value="$25,000" desc="Alternate stay if denied check-in" />
            <BenefitItem icon={<FaFileInvoice />} title="Property Cancellation" value="$15,000" desc="Cancellation cover due to illness/natural calamity" />
            <BenefitItem icon={<FaLaptop />} title="Loss of Laptop/Baggage" value="$25,000" desc="Covers loss during trip" />
            <BenefitItem icon={<FaUserFriends />} title="Emergency Property Accommodation" value="$20,000" desc="Stay for family if hospitalized" />
            <BenefitItem icon={<FaHeart />} title="Personal Accident" value="$10,00,000" desc="Accident cover for death or disability" />
          </div>
        )}

        {/* Other Benefits */}
        <CategoryHeader label="6 OTHER BENEFITS" open={openSections.other} onToggle={() => toggleSection('other')} />
        {openSections.other && (
          <div className="space-y-3 transition-all duration-300">
            <BenefitItem icon={<FaUserFriends />} title="Compassionate Visit" value="$20,000" desc="Family visit during hospitalization" />
            <BenefitItem icon={<FaHeart />} title="Personal Accident" value="$10,00,000" desc="Accidental cover" />
            <BenefitItem icon={<FaAmbulance />} title="Repatriation of Mortal Remains" value="$50,000" desc="Funeral and return expenses" />
            <BenefitItem icon={<FaHome />} title="Home Content Burglary" value="$1,00,000" desc="Covers theft at home (no cash/jewelry)" />
            <BenefitItem icon={<FaFileInvoice />} title="Personal Liability" value="$25,000" desc="Covers third-party claims" />
            <BenefitItem icon={<FaIdCard />} title="Identity Document Theft" value="$10,000" desc="Covers charges to replace lost Passport/Aadhar/PAN" />
          </div>
        )}

        <div className="mt-6 flex justify-between items-center">
          <p className="text-lg font-bold">${price}</p>
          <button onClick={onClose} className="bg-blue-600 text-white px-6 py-2 rounded-lg">ADD</button>
        </div>
      </div>
    </div>
  );
}
/* Keyframes */
function CategoryHeader({ label, open, onToggle }) {
  return (
    <div className="flex justify-between items-center mt-6 mb-2 cursor-pointer" onClick={onToggle}>
      <h5 className="font-semibold text-sm">{label}</h5>
      {open ? <FaChevronUp className="text-gray-500" /> : <FaChevronDown className="text-gray-500" />}
    </div>
  );
}

function BenefitItem({ icon, title, value, desc }) {
  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-blue-600">{icon}</span>
          <p className="font-medium">{title}</p>
        </div>
        <span className="text-blue-600 text-sm">{value}</span>
      </div>
      <p className="text-gray-600 text-sm ml-7">{desc}</p>
    </div>
  );
}
