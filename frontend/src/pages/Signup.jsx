// import axios from "axios";
// import { useContext, useState } from "react";
// // import { AuthContext } from "../context/AuthContext";
// import { Link, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { UserAppContext } from "../context/UserAppContext";

// export default function Signup() {

//   const {backendUrl,setToken}= useContext(UserAppContext)
//   const navigate=useNavigate();
//   //   const { signup } = useContext(AuthContext);
//   const [formData, setFormData] = useState({
//     name: "",
//     phone: "",
//     email: "",
//     password: "",
//   });
//   //   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const {data}= await axios.post(backendUrl+'/api/user/register',formData)
//       console.log(data)
//       if(data.success)
//       {
//         setToken(data.token);
//         toast.success('Register Successfully');
//         localStorage.setItem("token", data.token);
//         navigate('/');

//       }
//       else{
//         toast.error(data.message)
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error.message);
//     }
//     // signup(formData.email, formData.password);
//     // navigate("/dashboard"); // Redirect after signup
//   };

//   return (
//     <div className="max-w-md mb-16 mx-auto mt-10 p-6 shadow-lg rounded-lg">
//       <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
//       <form onSubmit={handleSubmit} className="space-y-3">
//         <input
//           type="text"
//           name="name"
//           placeholder="Name"
//           value={formData.name}
//           onChange={handleChange}
//           className="w-full p-2 border rounded"
//           required
//         />

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

//         <input
//           type="text"
//           name="phone"
//           placeholder="Phone Number"
//           value={formData.phone}
//           onChange={handleChange}
//           className="w-full p-2 border rounded"
//           required
//         />
//         <button
//           type="submit"
//           className="w-full bg-green-500 text-white p-2 rounded"
//         >
//           Sign Up
//         </button>
//       </form>
//       <p className="mt-3 text-center">
//         Already have an account?{" "}
//         <Link to="/login" className="text-blue-500">
//           Login
//         </Link>
//       </p>
//     </div>
//   );
// }

import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserAppContext } from "../context/UserAppContext";

export default function Signup() {
  const navigate = useNavigate();
  const { backendUrl, setToken } = useContext(UserAppContext);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(`${backendUrl}/api/user/register`, formData);

      if (data.success) {
        setToken(data.token);
        localStorage.setItem("token", data.token);
        toast.success("Registration successful ");
        navigate("/");
      } else {
        toast.error(data.message || "Registration failed");
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
        Create Your Account
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#3AAFA9]"
          required
        />

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

        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
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
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-gray-600">
        Already have an account?{" "}
        <Link to="/login" className="text-[#3AAFA9] font-medium hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
}

