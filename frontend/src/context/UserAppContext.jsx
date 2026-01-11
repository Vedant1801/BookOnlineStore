// import { useState } from "react";
// import { createContext } from "react";
// import { toast } from "react-toastify";
// import axios from "axios";
// import { useEffect } from "react";

// export const UserAppContext = createContext();

// const UserAppContextProvider = ({ children }) => {
//   const backendUrl = import.meta.env.VITE_BACKEND_URL;

//   const [books, setBooks] = useState([]);
//   const [userId,SetUserId]=useState(null)
//   const [token,setToken]=useState(localStorage.getItem('token') || '');


//   const getAllBooks = async () => {
//     try {
//       const {data} = await axios.get(`${backendUrl}/api/book/get-all-books`);

//       // console.log(data);
//       if (data.success) {
//         setBooks(data.books);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error.message);
//     }
//   };


//   const fetchUserDetails = async () => {
//     try {
//       const { data } = await axios.get(backendUrl + "/api/user/get-profile", {
//         headers: { token },
//       });

//       //  console.log(data.userData._id);
//       if (data.success) {
//         SetUserId(data.userData._id);
//       } else {
//         toast.error("Unable to fetch user profile");
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error.message);
//     }
//   };




//   useEffect(()=>{
//     getAllBooks();
//     fetchUserDetails()
//   },[])


//   useEffect(() => {
//     localStorage.setItem("token", token);
//   }, [token]);

//   const value = {
//     backendUrl,
//     books,
//     getAllBooks,
//     token,
//     setBooks,setToken,
//     userId
//   };

//   return (
//     <UserAppContext.Provider value={value}>{children}</UserAppContext.Provider>
//   );
// };

// export default UserAppContextProvider;

import { useState, useEffect, createContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const UserAppContext = createContext();

const UserAppContextProvider = ({ children }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // -------------------------
  // ✅ State Management
  // -------------------------
  const [books, setBooks] = useState([]);
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  // -------------------------
  // ✅ Fetch All Books
  // -------------------------
  const getAllBooks = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/book/get-all-books`);
      if (data.success) {
        setBooks(data.books);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  // -------------------------
  // ✅ Fetch User Profile
  // -------------------------
  const fetchUserDetails = async () => {
    if (!token) return;

    try {
      const { data } = await axios.get(`${backendUrl}/api/user/get-profile`, {
        headers: { token },
      });

      if (data.success) {
        const userData = data.userData;

        // ✅ Ensure avatar always exists
        if (!userData.avatar) {
          userData.avatar = `https://api.dicebear.com/9.x/adventurer/svg?seed=${encodeURIComponent(
            userData.name || "User"
          )}`;
        }

        setUser(userData);
        setUserId(userData._id);
      } else {
        toast.error("Unable to fetch user profile");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  // -------------------------
  // ✅ Initial Data Load
  // -------------------------
  useEffect(() => {
    getAllBooks();
    fetchUserDetails();
  }, [token]); // re-fetch when token changes

  // -------------------------
  // ✅ Save Token to LocalStorage
  // -------------------------
  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  // -------------------------
  // ✅ Context Value
  // -------------------------
  const value = {
    backendUrl,
    books,
    getAllBooks,
    token,
    setToken,
    user,
    setUser,
    userId,
  };

  return (
    <UserAppContext.Provider value={value}>
      {children}
    </UserAppContext.Provider>
  );
};

export default UserAppContextProvider;
