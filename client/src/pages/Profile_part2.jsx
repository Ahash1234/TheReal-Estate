const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch('/api/auth/signout');
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleShowListings = async () => {
    try {
      setShowListingsError(false);
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        setShowListingsError(true);
        return;
      }

      setUserListings(data);
    } catch (error) {
      setShowListingsError(true);
    }
  };

  const handleListingDelete = async (listingId) => {
    try {
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }

      setUserListings((prev) =>
        prev.filter((listing) => listing._id !== listingId)
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      {/* Floating shapes background animation */}
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

      <div className="p-3 max-w-lg mx-auto" data-aos="fade-up">
        <h1 className="text-3xl font-semibold text-center my-7" data-aos="fade-down">Profile</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4" data-aos="fade-up">
          <input
            onChange={(e) => setFile(e.target.files[0])}
            type="file"
            ref={fileRef}
            hidden
            accept="image/*"
            data-aos="fade-right"
          />
          <img
            onClick={() => fileRef.current.click()}
            src={formData.avatar || currentUser.avatar}
            alt="profile"
            className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
            data-aos="zoom-in"
          />
          <p className="text-sm self-center" data-aos="fade-up">
            {fileUploadError ? (
              <span className="text-red-700">
                Error Image upload (image must be less than 2 mb)
              </span>
            ) : filePerc > 0 && filePerc < 100 ? (
              <span className="text-slate-700">{`Uploading ${filePerc}%`}</span>
            ) : filePerc === 100 ? (
              <span className="text-green-700">Image successfully uploaded!</span>
            ) : (
              ''
            )}
          </p>
          <input
            type="text"
            placeholder="username"
            defaultValue={currentUser.username}
            id="username"
            className="border p-3 rounded-lg"
            onChange={handleChange}
            data-aos="fade-right"
          />
          <input
            type="email"
            placeholder="email"
            id="email"
            defaultValue={currentUser.email}
            className="border p-3 rounded-lg"
            onChange={handleChange}
            data-aos="fade-left"
          />
          <input
            type="password"
            placeholder="password"
            onChange={handleChange}
            id="password"
            className="border p-3 rounded-lg"
            data-aos="fade-right"
          />
          <button
            disabled={loading}
            className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80"
            data-aos="zoom-in"
          >
            {loading ? 'Loading...' : 'Update'}
          </button>
          <Link
            className="bg-green-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-95"
            to={'/create-listing'}
            data-aos="fade-up"
          >
            Create Listing
          </Link>
        </form>
        <div className="flex justify-between mt-5" data-aos="fade-up">
          <span
            onClick={handleDeleteUser}
            className="text-red-700 cursor-pointer"
          >
            Delete account
          </span>
          <span onClick={handleSignOut} className="text-red-700 cursor-pointer">
            Sign out
          </span>
        </div>

        <p className="text-red-700 mt-5" data-aos="fade-up">{error ? error : ''}</p>
        <p className="text-green-700 mt-5" data-aos="fade-up">
          {updateSuccess ? 'User is updated successfully!' : ''}
        </p>
        <button onClick={handleShowListings} className="text-green-700 w-full" data-aos="fade-up">
          Show Listings
        </button>
        <p className="text-red-700 mt-5" data-aos="fade-up">
          {showListingsError ? 'Error showing listings' : ''}
        </p>

        {userListings && userListings.length > 0 && (
          <div className="flex flex-col gap-4" data-aos="fade-up">
            <h1 className="text-center mt-7 text-2xl font-semibold">
              Your Listings
            </h1>
            {userListings.map((listing) => (
              <div
                key={listing._id}
                className="border rounded-lg p-3 flex justify-between items-center gap-4"
              >
                <Link to={`/listing/${listing._id}`}>
                  <img
                    src={listing.imageUrls[0]}
                    alt="listing cover"
                    className="h-16 w-16 object-contain"
                  />
                </Link>
                <Link
                  className="text-slate-700 font-semibold  hover:underline truncate flex-1"
                  to={`/listing/${listing._id}`}
                >
                  <p>{listing.name}</p>
                </Link>

                <div className="flex flex-col item-center">
                  <button
                    onClick={() => handleListingDelete(listing._id)}
                    className="text-red-700 uppercase"
                  >
                    Delete
                  </button>
                  <Link to={`/update-listing/${listing._id}`}>
                    <button className="text-green-700 uppercase">Edit</button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </>
  );
}
