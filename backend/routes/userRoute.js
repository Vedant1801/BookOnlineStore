


import express from 'express'
import { 
  getAllUuser, 
  getProfile, 
  loginUser, 
  registerUser, 
  updateProfile 
} from '../controllers/userController.js';

import authUser from '../middleware/authUser.js';
import upload from '../middleware/multer.js';
import authAdmin from '../middleware/authAdmin.js';
import User from '../models/UserModel.js'; // ✅ add this import

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/get-profile', authUser, getProfile);
userRouter.post('/update-profile', authUser, upload.single('image'), updateProfile);
userRouter.get('/get-all-user', authAdmin, getAllUuser);

// ✅ Add Edit and Delete Routes
userRouter.put("/user/:id", authAdmin, async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, phone },
      { new: true }
    );

    if (!updatedUser) {
      return res.json({ success: false, message: "User not found" });
    }

    res.json({ success: true, user: updatedUser });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
});

userRouter.delete("/user/:id", authAdmin, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    res.json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
});

export default userRouter;
