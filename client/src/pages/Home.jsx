import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import ListingItem from '../components/ListingItem';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '../components/background-animation.css';
//goddspeed

export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);

  const navigate = useNavigate();

  SwiperCore.use([Navigation, Autoplay]);

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch('/api/listing/get?offer=true&limit=6');
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchRentListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=rent&limit=6');
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=sale&limit=6');
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOfferListings();
  }, []);

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

      <div className='relative z-10'>
        {/* top */}
        <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto'>
          <h1 className='text-slate-700 font-bold text-3xl lg:text-6xl' data-aos="fade-up">
            Find your next <span className='text-slate-500'>perfect</span>
            <br />
            place with ease
          </h1>
          <div className='text-gray-400 text-xs sm:text-sm' data-aos="fade-up">
            TheReal Estate is the best place to find your next perfect place to
            live.
            <br />
            We have a wide range of properties for you to choose from.
          </div>
          <Link
            to={'/search'}
            className='text-xs sm:text-sm text-blue-800 font-bold hover:underline'
            data-aos="fade-up"
          >
            Let's get started...
          </Link>
          <button
            onClick={() => navigate('/map-view')}
            className='mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700'
            data-aos="fade-up"
          >
            Explore on map
          </button>
        </div>
      </div>

      {/* swiper */}
      <Swiper navigation autoplay={{ delay: 3000, disableOnInteraction: false }} data-aos="fade-up">
        {offerListings &&
          offerListings.length > 0 &&
          offerListings.map((listing) => (
            <SwiperSlide key={listing._id}>
              <div
                style={{
                  background: `url(${listing.imageUrls[0]}) center no-repeat`,
                  backgroundSize: 'cover',
                }}
                className='h-[500px]'
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>

      {/* listing results for offer, sale and rent */}
      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10' data-aos="fade-up">
        {offerListings && offerListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent offers</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?offer=true'}>
                Show more offers
              </Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {offerListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {rentListings && rentListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent places for rent</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=rent'}>
                Show more places for rent
              </Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {rentListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {saleListings && saleListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent places for sale</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=sale'}>
                Show more places for sale
              </Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {saleListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
