
import jwt from 'jsonwebtoken'
import { v2 as cloudinary } from 'cloudinary'
import BookModel from '../models/BookModel.js';
import UserModel from '../models/UserModel.js';  






 const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(
        process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD,
        process.env.JWT_SECRET
      );

      return res.json({ success: true, token });
    }

    res.status(401).json({ success: false, message: 'Invalid credentials' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


const addBook = async (req, res) => {
    try {
        const { title, category, old_price, new_price, about, rating, trending } = req.body;
        const imageFile = req.file;

        if (!title || !category || !old_price || !new_price || !about || !rating || !trending) {
            return res.json({ success: false, message: 'Missing Book data' });
        }

        // console.log(title, category, old_price, new_price, trending, rating, about)

        let imageURL = "";

        if (imageFile) {
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" })
            imageURL = imageUpload.secure_url;
        }

        const bookData = {
            title, image: imageURL, category, old_price, new_price, about, rating, trending
        }

        // console.log(bookData)

        const newBook = new BookModel(bookData)

        await newBook.save();

        res.json({ success: true, message: "Book added Successfully", book: newBook })


    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })

    }
}







const updateBook = async (req, res) => {
  try {
    const bookId = req.params.id;
    const { title, category, old_price, new_price, about, rating, trending } = req.body;
    const imageFile = req.file;

    const book = await BookModel.findById(bookId);
    if (!book) {
      return res.status(404).json({ success: false, message: "Book not found" });
    }
  console.log("Update Request Body:", req.body);
  console.log("File:", req.file?.originalname);

    let imageURL = book.image;
    if (imageFile) {
      // upload new image to cloudinary
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
        folder:"BookStore"
      });
      imageURL = imageUpload.secure_url;
    }

    // convert data types properly
    const updatedFields = {
      title: title || book.title,
      category: category || book.category,
      old_price: old_price ? Number(old_price) : book.old_price,
      new_price: new_price ? Number(new_price) : book.new_price,
      about: about || book.about,
      rating: rating ? Number(rating) : book.rating,
      trending: trending === "true" || trending === true,
      image: imageURL,
    };

    const updatedBook = await BookModel.findByIdAndUpdate(bookId, updatedFields, {
      new: true,
    });

    return res.json({
      success: true,
      message: "✅ Book updated successfully",
      book: updatedBook,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error updating book",
      error: error.message,
    });
  }
};


const deleteBook=async(req,res)=>{
    try {
        const bookId = req.params.id;

        // console.log(bookId);
        const book = await BookModel.findById(bookId);

        if (!book) {
            return res.status(404).json({ success: false, message: "Book not found" });
        }

        if (book.image) {
            const publicId = book.image.split('/').pop().split('.')[0]; // Extract public ID from URL
            await cloudinary.uploader.destroy(publicId);
        }

        await BookModel.findByIdAndDelete(bookId);

        res.json({ success: true, message: "Book deleted successfully" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
        
    }
}

// Update any user by admin

const updateUserByAdmin = async (req, res) => {
    console.log("PUT /update-user/:id called", req.params.id);
    
  try {
    console.log("PUT /update-user/:id called", req.params.id);
    
    const { name, email, phone, dob, gender, role } = req.body;
    const userId = req.params.id;
    

    if (!name || !email) {
      return res.json({ success: false, message: "Name and Email are required" });
    }

    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { name, email, phone, dob, gender, role },
      { new: true }
    );

    if (!updatedUser) {
      return res.json({ success: false, message: "User not found" });
    }

    res.json({ success: true, message: "User updated successfully", user: updatedUser });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};


// Delete user by admin
const deleteUserByAdmin = async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedUser = await UserModel.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.json({ success: false, message: "User not found" });
    }

    res.json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { addBook, loginAdmin, updateBook,deleteBook,updateUserByAdmin,deleteUserByAdmin }