import express from 'express';
import { deleteUser, test, updateUser,  getUserListings, getUser, addFavorite, getFavorites, removeFavorite } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';



const router = express.Router();

router.get('/test', test);
router.post('/update/:id', verifyToken, updateUser)
router.delete('/delete/:id', verifyToken, deleteUser)
router.get('/listings/:id', verifyToken, getUserListings)
router.get('/:id', verifyToken, getUser)
// New routes for favorites
router.post('/favorites/:id', verifyToken, addFavorite);
router.get('/favorites/:id', verifyToken, getFavorites);
router.delete('/favorites/:id', verifyToken, removeFavorite);

export default router;//kill