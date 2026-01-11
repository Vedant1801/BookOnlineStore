// import { useContext, useState } from "react";
// // import { AuthContext } from "../context/AuthContext";
// import { Link, useNavigate } from "react-router-dom";
// import { UserAppContext } from "../context/UserAppContext";
// import axios from "axios";
// import { toast } from "react-toastify";

// export default function Login() {
//   // const { login } = useContext(AuthContext);

//   const navigate= useNavigate()

//   const { backendUrl, setToken } = useContext(UserAppContext);
//   const [formData, setFormData] = useState({ email: "", password: "" });
//   // const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const {data} = await axios.post(
//         `${backendUrl}/api/user/login`,
//         formData
//       );
//       // console.log(/);
//       console.log(data);

//       if (data.success) {
//         toast.success("Login Successfully");
//         setToken(data.token);
//         navigate('/')
//       } else {
//         toast.error('Login Failed');
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error.message);
//     }
//   };

//   return (
//     <div className="max-w-md mb-16 mx-auto mt-10 p-6 shadow-lg rounded-lg">
//       <h2 className="text-2xl font-bold mb-4">Login</h2>
//       <form onSubmit={handleSubmit} className="space-y-3">
//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={formData.email}
//           onChange={handleChange}
//           className="w-full p-2 border rounded"
//           required
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={formData.password}
//           onChange={handleChange}
//           className="w-full p-2 border rounded"
//           required
//         />
//         <button
//           type="submit"
//           className="w-full bg-blue-500 text-white p-2 rounded"
//         >
//           Login
//         </button>
//       </form>
//       <p className="mt-3 text-center">
//         Don't have an account?{" "}
//         <Link to="/signup" className="text-blue-500">
//           Sign Up
//         </Link>
//       </p>
//     </div>
//   );
// }

import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAppContext } from "../context/UserAppContext";
import axios from "axios";
import { toast } from "react-toastify";

export default function Login() {
  const navigate = useNavigate();
  const { backendUrl, setToken } = useContext(UserAppContext);

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(`${backendUrl}/api/user/login`, formData);

      if (data.success) {
        toast.success("Login successful ");
        setToken(data.token);
        localStorage.setItem("token", data.token);
        navigate("/");
      } else {
        toast.error(data.message || "Invalid email or password");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mb-16 mx-auto mt-12 p-6 shadow-lg rounded-xl border border-gray-200 bg-white">
      <h2 className="text-3xl font-bold mb-6 text-center text-[#3AAFA9]">
        Welcome Back
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#3AAFA9]"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#3AAFA9]"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className={`w-full p-2 rounded-md text-white font-semibold transition-all duration-200 ${
            loading
              ? "bg-[#3AAFA9]/70 cursor-not-allowed"
              : "bg-[#3AAFA9] hover:bg-[#2E8F8B]"
          }`}
        >
          {loading ? "Logging In..." : "Login"}
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-gray-600">
        Don’t have an account?{" "}
        <Link to="/signup" className="text-[#3AAFA9] font-medium hover:underline">
          Sign Up
        </Link>
      </p>
    </div>
  );
}
