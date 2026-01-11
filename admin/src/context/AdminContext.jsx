import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const AdminContext = createContext();

const AdminContextProvider = ({ children }) => {
    const [aToken, setAToken] = useState(localStorage.getItem("aToken") || null);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [books,setBooks]=useState([])
  const [singleBook,setSingleBook]=useState(null)



  const getAllBooks = async () => {
  try {
    const { data } = await axios.get(`${backendUrl}/api/book/get-all-books`, {
      headers: { Authorization: `Bearer ${aToken}` },
    });
    if (data.success) {
      setBooks(data.books);
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error(error.message);
  }
};

const getSingleBook = async (id) => {
  try {
    const { data } = await axios.get(`${backendUrl}/api/book/get-book/${id}`, {
      headers: { Authorization: `Bearer ${aToken}` },
    });
    setSingleBook(data.book);
  } catch (error) {
    console.log(error.message);
  }
};






const updateBook = async (id, updatedData) => {
  try {
    let formData;

    // If already FormData (from component), reuse it directly
    if (updatedData instanceof FormData) {
      formData = updatedData;
    } else {
      // otherwise, construct one manually
      formData = new FormData();
      Object.keys(updatedData).forEach(key => {
        formData.append(key, updatedData[key]);
      });
    }

    const { data } = await axios.put(
      `${backendUrl}/api/admin/update-book/${id}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${aToken}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (data.success) {
      toast.success("✅ Book updated successfully");
      await getAllBooks(); // refresh after update
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    console.error("Error updating book:", error);
    toast.error("Error updating book: " + error.message);
  }
};

const deleteBook = async (id) => {
  try {
    const { data } = await axios.delete(
      `${backendUrl}/api/admin/delete-book/${id}`,
      { headers: { Authorization: `Bearer ${aToken}` } }
    );
    if (data.success) {
      toast.success("Book deleted successfully");
      getAllBooks();
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error(error.message);
  }
};


  useEffect(() => {
    if (aToken) {
      localStorage.setItem("aToken", aToken);
    } else {
      localStorage.removeItem("aToken"); // Remove token on logout
    }
  }, [aToken]);


  const value = {
  aToken,
  setAToken,
  books,
  backendUrl,
  getAllBooks,
  getSingleBook,
  singleBook,
  updateBook,
  deleteBook
}

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider
