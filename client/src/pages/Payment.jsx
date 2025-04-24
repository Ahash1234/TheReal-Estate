import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BenefitsModal from '../components/BenefitsModal';

export default function Payment() {
  const { listingId } = useParams();
  const navigate = useNavigate();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [showBenefitsModal, setShowBenefitsModal] = useState(false);

  // Form state
  const [title, setTitle] = useState('Mr');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [email, setEmail] = useState('');
  const [healthInsuranceEnabled, setHealthInsuranceEnabled] = useState(false);
  const [healthInsurancePeople, setHealthInsurancePeople] = useState(1);
  const [secureTrip, setSecureTrip] = useState(false);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const res = await fetch(`/api/listing/get/${listingId}`);
        if (!res.ok) {
          setError(true);
          setLoading(false);
          return;
        }
        const data = await res.json();
        setListing(data);
        setLoading(false);
      } catch (err) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [listingId]);

  const handlePayment = () => {
    if (!firstName || !lastName || !contactNo || !email) {
      alert('Please fill in all the details.');
      return;
    }
    alert('Payment successful for listing ' + listingId);
    navigate('/');
  };

  if (loading) {
    return <p className="text-center mt-10 text-xl">Loading...</p>;
  }

  if (error || !listing) {
    return <p className="text-center mt-10 text-xl text-red-600">Failed to load listing details.</p>;
  }

  // Calculate prices
  const originalPrice = listing.regularPrice;
  const discountPrice = listing.offer ? listing.discountPrice : null;
  const convenienceFee = +(originalPrice * 0.0175).toFixed(2);
  const tax = +(originalPrice * 0.125).toFixed(2);
  const priceAfterDiscount = discountPrice !== null ? discountPrice : originalPrice;

  // Health insurance price per person is 3% of original price
  const healthInsurancePricePerPerson = +(originalPrice * 0.03).toFixed(2);
  const totalHealthInsurancePrice = healthInsuranceEnabled ? +(healthInsurancePricePerPerson * healthInsurancePeople).toFixed(2) : 0;

  // Final price includes health insurance if enabled
  const finalPrice = +(priceAfterDiscount + convenienceFee + tax + totalHealthInsurancePrice).toFixed(2);

  // Handle secure trip selection
  const handleSecureTripChange = (value) => {
    if (value === 'yes') {
      setSecureTrip(true);
      setHealthInsuranceEnabled(true);
    } else {
      setSecureTrip(false);
      setHealthInsuranceEnabled(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 mt-10 bg-white rounded shadow">
      <h1 className="text-3xl font-bold mb-4">Payment Page</h1>
      <div className="flex flex-col md:flex-row gap-6">
        {/* Property Image and Details */}
        <div className="md:w-1/3">
          {listing.imageUrls && listing.imageUrls.length > 0 && (
            <img
              src={listing.imageUrls[0]}
              alt={listing.name}
              className="w-full rounded object-cover mb-4"
              style={{ maxHeight: '400px' }}
            />
          )}
          <h2 className="text-2xl font-semibold mb-2">{listing.name}</h2>
          <p className="mb-2 text-gray-700">{listing.address}</p>
          <p className="mb-4 text-gray-800">{listing.description}</p>
          <div className="mb-4 border p-4 rounded shadow font-bold">
            <h3 className="text-lg mb-2">Price Breakup</h3>
            <ul className="list-disc list-inside text-gray-700">
              <li className="line-through text-red-600">Original Price: ${originalPrice.toLocaleString('en-US')}</li>
              {discountPrice !== null && (
                <li>Discount Price: ${discountPrice.toLocaleString('en-US')}</li>
              )}
              <li>Convenience Fee (1.75%): ${convenienceFee.toLocaleString('en-US')}</li>
              <li>Tax (12.5%): ${tax.toLocaleString('en-US')}</li>
              {healthInsuranceEnabled && (
                <li>
                  Health Insurance ({healthInsurancePeople} {healthInsurancePeople > 1 ? 'people' : 'person'}): ${totalHealthInsurancePrice.toLocaleString('en-US')}
                </li>
              )}
              <li className="text-green-700 text-xl font-extrabold">Final Price: ${finalPrice.toLocaleString('en-US')}</li>
            </ul>
          </div>
        </div>

        {/* User Details Form */}
        <div className="md:w-1/3">
          <h3 className="text-xl font-semibold mb-4">Your Details</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handlePayment();
            }}
            className="flex flex-col gap-4"
          >
            <label className="flex flex-col">
              Title
              <select
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border rounded p-2"
              >
                <option>Mr</option>
                <option>Mrs</option>
                <option>Miss</option>
              </select>
            </label>
            <label className="flex flex-col">
              First Name
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="border rounded p-2"
                required
              />
            </label>
            <label className="flex flex-col">
              Last Name
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="border rounded p-2"
                required
              />
            </label>
            <label className="flex flex-col">
              Contact Number
              <input
                type="tel"
                value={contactNo}
                onChange={(e) => setContactNo(e.target.value)}
                className="border rounded p-2"
                required
              />
            </label>
            <label className="flex flex-col">
              Email Address
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border rounded p-2"
                required
              />
            </label>
            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 transition duration-200"
            >
              Pay Now
            </button>
          </form>
        </div>

        {/* Health Insurance Column */}
        <div className="md:w-1/3">
          <div className="max-w-3xl mx-auto p-6 mt-8 bg-white rounded-lg shadow-md">
            <div className="flex items-center gap-3 bg-yellow-50 p-3 rounded mb-4">
              <span className="text-blue-600 text-xl">⭐</span>
              <p className="text-gray-700 font-medium">
                Over 1 million travellers secured in the last month
              </p>
            </div>

            <h1 className="text-2xl font-bold mb-2 text-slate-800">Trip Secure</h1>
            <p className="text-blue-600 mb-4 font-medium">Enjoy a Worry-Free Stay</p>

            <div className="bg-blue-50 rounded p-4 mb-4">
              <ul className="space-y-3 text-slate-700">
                <li className="flex justify-between">
                  <span>🩺 Medical Assistance</span>
                  <span className="text-sm text-gray-500">24*7 SUPPORT</span>
                </li>
                <li className="flex justify-between">
                  <span>🏨 Refund on Cancellation</span>
                  <span className="text-sm text-gray-500">$15,000</span>
                </li>
                <li className="flex justify-between">
                  <span>❤️ Personal Accident</span>
                  <span className="text-sm text-gray-500">$10,00,000</span>
                </li>
                <li className="flex justify-between">
                  <span>💊 OPD Expenses</span>
                  <span className="text-sm text-gray-500">$25,000</span>
                </li>
              </ul>
              <p
                className="text-blue-700 mt-3 text-sm cursor-pointer hover:underline"
                onClick={() => setShowBenefitsModal(true)}
              >
                11 more benefits
              </p>
            </div>

            <div className="mb-4">
              <p className="text-xl font-bold text-slate-800">${finalPrice.toLocaleString('en-US')} <span className="text-base font-normal">per guest</span></p>
              <p className="text-sm text-gray-500">Non Refundable | 18% GST Included</p>
            </div>

            <div className="space-y-3 mb-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="secureTrip"
                  value="yes"
                  onChange={(e) => handleSecureTripChange(e.target.value)}
                  className="h-4 w-4"
                  checked={secureTrip === true}
                />
                <span className="text-gray-800 font-medium">Yes, secure my trip.</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="secureTrip"
                  value="no"
                  onChange={(e) => handleSecureTripChange(e.target.value)}
                  className="h-4 w-4"
                  checked={secureTrip === false}
                />
                <span className="text-gray-800 font-medium">No, I will book without trip secure.</span>
              </label>
            </div>

            {secureTrip && (
              <div className="mb-4">
                <label className="flex flex-col">
                  Number of people to insure
                  <select
                    value={healthInsurancePeople}
                    onChange={(e) => setHealthInsurancePeople(Number(e.target.value))}
                    className="border rounded p-2 mt-1"
                  >
                    {[1, 2, 3, 4, 5].map((num) => (
                      <option key={num} value={num}>
                        {num}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            )}
          </div>
        </div>
      </div>
      <BenefitsModal
        open={showBenefitsModal}
        onClose={() => setShowBenefitsModal(false)}
        price={finalPrice}
      />
    </div>
  );
}

