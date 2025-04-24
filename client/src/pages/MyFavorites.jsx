import { useEffect, useState } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import ListingItem from '../components/ListingItem';
//goddspeed
export default function MyFavorites() {
  const currentUser = useSelector((state) => state.user.currentUser);
  const favorites = useSelector((state) => state.user.favorites ?? [], shallowEqual);

  const [favoriteListings, setFavoriteListings] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('MyFavorites useEffect triggered. favorites:', favorites);
    if (!currentUser) {
      setFavoriteListings([]);
      return;
    }

    // Optimistically update favoriteListings by filtering out removed favorites
    setFavoriteListings((prevListings) =>
      prevListings.filter((listing) =>
        favorites.map(id => id.toString()).includes(listing._id.toString())
      )
    );

    const fetchFavoritesFromAPI = async () => {
      try {
        const response = await fetch(`/api/user/favorites/${currentUser._id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch favorites');
        }
        const data = await response.json();
        setFavoriteListings(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching favorites:', err);
        setError('Failed to load favorite listings.');
      }
    };

    fetchFavoritesFromAPI();
  }, [currentUser, favorites]);

  return (
    <main className='p-3 max-w-4xl mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>My Favorites</h1>
      {error && <p className='text-center text-red-600'>{error}</p>}
      <div className='flex flex-wrap gap-4'>
        {favoriteListings.length > 0 ? (
          favoriteListings.map((listing) => (
            <ListingItem key={listing._id} listing={listing} />
          ))
        ) : (
          <p className='text-center'>No favorite listings found.</p>
        )}
      </div>
    </main>
  );
}
