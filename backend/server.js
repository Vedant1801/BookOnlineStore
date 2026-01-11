// import express from 'express';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import connectDB from './config/mongodb.js';
// import connectCloudinary from './config/cloudinary.js';
// import userRouter from './routes/userRoute.js';
// import adminRouter from './routes/adminRoute.js';
// import bookRouter from './routes/bookRoutes.js';
// import orderRouter from './routes/orderRoute.js';

// import chatRoutes from "./routes/chatRoutes.js";

// dotenv.config();  // Load environment variables at the top

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middleware (Ensure JSON parsing before URL-encoded parsing)
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Connect Database & Cloudinary
// connectDB();
// connectCloudinary();

// // CORS Middleware
// app.use(cors());

// // API Endpoints
// app.use('/api/user', userRouter);
// app.use('/api/admin', adminRouter);
// app.use('/api/book',bookRouter)
// app.use('/api/orders',orderRouter)

// // add new route for AI assistant
// app.use("/api/ai", chatRoutes);

// // Start Server
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });



// index.js (or server.js)
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";

import userRouter from "./routes/userRoute.js";
import adminRouter from "./routes/adminRoute.js";
import bookRouter from "./routes/bookRoutes.js";
import orderRouter from "./routes/orderRoute.js";
import chatRoutes from "./routes/chatRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 7000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Connect Database & Cloudinary (ensure these functions read env vars)
connectDB();
connectCloudinary();

// API endpoints
app.use("/api/user", userRouter);
app.use("/api/admin", adminRouter);
app.use("/api/book", bookRouter);
app.use("/api/orders", orderRouter);

// AI assistant route
// app.use("/api/ai", chatRoutes);

// Error handler (optional: helpful during development)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error", error: process.env.NODE_ENV === "development" ? err.message : undefined });
});

app.get("/", (req,res)=>{
 res.send("Backend is live 🚀");
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
