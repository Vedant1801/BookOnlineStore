
import { useContext, useState } from "react";
import { AdminContext } from "../context/AdminContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const { setAToken, backendUrl } = useContext(AdminContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${backendUrl}/api/admin/login`, {
        email,
        password,
      });

      if (data.success) {
        toast.success("Login Successfully");
        localStorage.setItem("aToken", data.token);
        setAToken(data.token);
      } else {
        toast.error("Login Failed. Please check your credentials");
      }
    } catch (error) {
      console.log(error);
      toast.error("Server error. Try again later.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-[#DEF2F1]">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-96 border-t-4 border-[#3AAFA9]">
        <h2 className="text-3xl font-bold mb-6 text-center text-[#3AAFA9]">
          Admin Login
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3AAFA9]"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3AAFA9]"
          />
          <button
            type="submit"
            className="w-full bg-[#3AAFA9] text-white p-3 rounded-lg font-semibold hover:bg-[#2B7A78] transition-all duration-200"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
