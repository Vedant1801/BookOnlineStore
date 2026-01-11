

import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [aToken, setAToken] = useState(localStorage.getItem("aToken") || null);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [users, setUsers] = useState([]);

  // ✅ Get all users
  const getAllUser = async () => {
    if (!aToken) return;

    try {
      const { data } = await axios.get(`${backendUrl}/api/user/get-all-user`, {
        headers: { Authorization: `Bearer ${aToken}` },
      });

      if (data.success) {
        setUsers(data.users); // backend returns "users"
      } else {
        toast.error(data.message || "Failed to fetch users");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  // ✅ Edit user
//   const editUser = async (id, updatedData) => {
//     try {
//       const { data } = await axios.put(`${backendUrl}/api/admin/update-user/${id}`, updatedData, {
//   headers: { Authorization: `Bearer ${aToken}` },
// });

//       if (data.success) {
//         toast.success("User updated successfully!");
//         getAllUser();
//       } else {
//         toast.error(data.message || "Failed to update user");
//       }

//       return data;
//     } catch (error) {
//       console.error(error);
//       toast.error(error.message);
//       return { success: false, message: error.message };
//     }
//   };

const editUser = async (id, updatedData) => {
  try {
    const { data } = await axios.put(
      `${backendUrl}/api/admin/update-user/${id}`, // must match backend route
      updatedData,
      {
        headers: { Authorization: `Bearer ${aToken}` },
      }
    );

    if (data.success) {
      toast.success("User updated successfully!");
      getAllUser();
    } else {
      toast.error(data.message || "Failed to update user");
    }

    return data;
  } catch (error) {
    console.error(error);
    toast.error(error.message);
    return { success: false, message: error.message };
  }
};

 // Delete user
const deleteUser = async (id) => {
  try {
    const { data } = await axios.delete(`${backendUrl}/api/admin/delete-user/${id}`, {
      headers: { Authorization: `Bearer ${aToken}` },
    });

    if (data.success) {
      toast.success("User deleted successfully!");
      getAllUser();
    } else {
      toast.error(data.message || "Failed to delete user");
    }

    return data;
  } catch (error) {
    console.error(error);
    toast.error(error.message);
    return { success: false, message: error.message };
  }
};

  // ✅ Save token to localStorage
  useEffect(() => {
    if (aToken) {
      localStorage.setItem("aToken", aToken);
    } else {
      localStorage.removeItem("aToken"); // Remove token on logout
    }
  }, [aToken]);

  const value = {
    users,
    setUsers,
    aToken,
    setAToken,
    backendUrl,
    getAllUser,
    editUser,
    deleteUser,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
