import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { BuildingStorefrontIcon, UserGroupIcon, HomeIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import '../components/background-animation.css';

export default function About() {
  const [listings, setListings] = useState(0);
  const [agents, setAgents] = useState(0);
  const [clients, setClients] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 800 });
    const counts = setInterval(() => {
      setListings(prev => (prev < 512 ? prev + 8 : 512));
      setAgents(prev => (prev < 35 ? prev + 1 : 35));
      setClients(prev => (prev < 1250 ? prev + 20 : 1250));
    }, 30);
    return () => clearInterval(counts);
  }, []);

  const handleGetStarted = () => {
    navigate('/sign-up');
  };

  return (
    <>
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => {
          const shapes = ['shape-blue', 'shape-pink', 'shape-teal', 'shape-purple'];
          const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
          const isCircle = Math.random() > 0.7; // 30% chance to make it a circle

          return (
            <div
              key={i}
              className={`floating-shape ${randomShape}`}
              style={{
                width: `${20 + Math.random() * 50}px`,
                height: `${20 + Math.random() * 50}px`,
                top: `${Math.random() * 100}vh`,
                left: `${Math.random() * 100}vw`,
                borderRadius: isCircle ? '50%' : '6px',
                animationDuration: `${20 + Math.random() * 30}s`,
                animationDelay: `${Math.random() * 15}s`,
              }}
            ></div>
          );
        })}
      </div>

      <div className="text-gray-800 dark:bg-gray-900 dark:text-gray-100 font-sans">

        {/* Hero Image */}
        <div className="relative">
          <img
            src="https://images.pexels.com/photos/4386397/pexels-photo-4386397.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="About"
            className="w-full h-72 object-cover"
            data-aos="zoom-in"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white px-4">
            <h1 className="text-4xl font-bold mb-2" data-aos="fade-down">Empowering Property Seekers</h1>
            <p className="max-w-2xl text-lg" data-aos="fade-up">Helping buyers, sellers and renters in World find the perfect property — beautifully, transparently, and securely.</p>
          </div>
        </div>

        {/* About Text */}
        <div className="max-w-5xl mx-auto py-16 px-6 space-y-12">
          <section data-aos="fade-up">
            <h2 className="text-3xl font-semibold mb-4 flex items-center gap-2">
              <BuildingStorefrontIcon className="w-8 h-8 text-blue-600" /> About TheReal Estate
            </h2>
            <p className="text-lg">We connect property seekers with premium listings. Our expert team ensures verified listings, fair deals, and a smooth property discovery experience across Globe.</p>
          </section>

          {/* Statistics */}
          <section data-aos="fade-up" className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div className="p-6 bg-blue-50 dark:bg-blue-900 rounded shadow">
              <img
                src="https://images.pexels.com/photos/439391/pexels-photo-439391.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Listings"
                className="w-full h-36 object-cover rounded mb-3"
                data-aos="fade-in"
              />
              <HomeIcon className="w-10 h-10 text-blue-600 mx-auto mb-2" />
              <h3 className="text-3xl font-bold">{listings}+</h3>
              <p className="text-gray-600 dark:text-gray-300">Listings</p>
            </div>

            <div className="p-6 bg-blue-50 dark:bg-blue-900 rounded shadow">
              <img
                src="https://images.pexels.com/photos/3182766/pexels-photo-3182766.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Agents"
                className="w-full h-36 object-cover rounded mb-3"
                data-aos="fade-in"
              />
              <UserGroupIcon className="w-10 h-10 text-blue-600 mx-auto mb-2" />
              <h3 className="text-3xl font-bold">{agents}+</h3>
              <p className="text-gray-600 dark:text-gray-300">Agents</p>
            </div>

            <div className="p-6 bg-blue-50 dark:bg-blue-900 rounded shadow">
              <img
                src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Clients"
                className="w-full h-36 object-cover rounded mb-3"
                data-aos="fade-in"
              />
              <UserGroupIcon className="w-10 h-10 text-blue-600 mx-auto mb-2" />
              <h3 className="text-3xl font-bold">{clients}+</h3>
              <p className="text-gray-600 dark:text-gray-300">Happy Clients</p>
            </div>
          </section>

          {/* CTA Banner */}
          <div className="bg-blue-600 text-white rounded-lg p-8 text-center mt-16 shadow-lg" data-aos="zoom-in">
            <h3 className="text-2xl font-bold mb-2">List Your Property Now</h3>
            <p className="mb-4">Join our growing community of property owners and reach thousands of buyers instantly.</p>
            <button onClick={handleGetStarted} className="bg-white text-blue-600 font-medium px-6 py-2 rounded hover:bg-gray-100 transition">Get Started</button>
          </div>

          {/* Testimonials Carousel */}
          <div className="mt-16 space-y-10" data-aos="fade-up">
            <h3 className="text-2xl font-semibold text-center mb-4">What Our Clients Say</h3>
            <div className="overflow-x-auto flex space-x-6 scrollbar-hide">
              {[
                { quote: "Seamless buying process — highly recommend!", author: "Divya R." },
                { quote: "Amazing property options. Found my dream villa!", author: "Prakash M." },
                { quote: "Top-notch support team and verified listings.", author: "Riya N." }
              ].map((testimonial, i) => (
                <div key={i} className="min-w-[280px] bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow transition hover:scale-105">
                  <p className="italic">“{testimonial.quote}”</p>
                  <p className="mt-3 font-semibold text-right">– {testimonial.author}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
