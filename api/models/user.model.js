import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,//kill
    },
    avatar:{
      type: String,
      default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
    },

    favorites: [
      {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Listing',
      }
      ],
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

export default User;
