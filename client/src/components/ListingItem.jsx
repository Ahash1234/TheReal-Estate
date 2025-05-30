import { Link } from 'react-router-dom';
import { MdLocationOn, MdFavorite, MdFavoriteBorder } from 'react-icons/md';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { addToFavorites, removeFromFavorites } from '../redux/user/userSlice';
import { useState, useEffect } from 'react';

export default function ListingItem({ listing }) {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);//goddspeed
  const favorites = useSelector((state) => state.user.favorites ?? [], shallowEqual);

  return (
    <div className='bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px] relative'>
      <Link to={`/listing/${listing._id}`}>
        <img
          src={
            listing.imageUrls[0] ||
            'https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/Sales_Blog/real-estate-business-compressor.jpg?width=595&height=400&name=real-estate-business-compressor.jpg'
          }
          alt='listing cover'
          className='h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300'
        />
      </Link>
      <div className='p-3 flex flex-col gap-2 w-full'>
        <p className='truncate text-lg font-semibold text-slate-700'>
          <Link to={`/listing/${listing._id}`}>{listing.name}</Link>
        </p>
        <div className='flex items-center gap-1'>
          <MdLocationOn className='h-4 w-4 text-green-700' />
          <p className='text-sm text-gray-600 truncate w-full'>{listing.address}</p>
        </div>
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
            listing.address
          )}`}
          target='_blank'
          rel='noopener noreferrer'
          className='text-blue-600 text-sm hover:underline mt-1'
        >
          View on Map
        </a>
        <p className='text-sm text-gray-600 line-clamp-2'>{listing.description}</p>
        <p className='text-slate-500 mt-2 font-semibold '>
          $
          {listing.offer
            ? listing.discountPrice.toLocaleString('en-US')
            : listing.regularPrice.toLocaleString('en-US')}
          {listing.type === 'rent' && ' / month'}
        </p>
        {listing.notAvailable && (
          <p className='text-red-600 font-bold mt-1'>Not Available</p>
        )}
        <div className='text-slate-700 flex gap-4'>
          <div className='font-bold text-xs'>
            {listing.bedrooms > 1 ? `${listing.bedrooms} beds ` : `${listing.bedrooms} bed `}
          </div>
          <div className='font-bold text-xs'>
            {listing.bathrooms > 1 ? `${listing.bathrooms} baths ` : `${listing.bathrooms} bath `}
          </div>
        </div>
      </div>
    </div>
  );
}
