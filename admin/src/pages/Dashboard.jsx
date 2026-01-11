


import React, { useContext, useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { AdminContext } from "../context/AdminContext";
import { AppContext } from "../context/AppContext";
import axios from "axios";

export default function Dashboard() {
  const { books, aToken, getAllBooks } = useContext(AdminContext);
  const { backendUrl } = useContext(AppContext);
  const [orders, setOrders] = useState([]);
  const [revenue, setRevenue] = useState(0);

  const booksByCategory = books.reduce((acc, book) => {
    acc[book.category] = (acc[book.category] || 0) + 1;
    return acc;
  }, {});

  const booksByCategoryArray = Object.keys(booksByCategory).map((category) => ({
    name: category,
    count: booksByCategory[category],
  }));

  const getAllOrders = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/orders/getallorders`, {
        headers: { atoken: aToken },
      });
      setOrders(data.orders);
      const totalRevenue = data.orders.reduce(
        (acc, order) => acc + order.totalAmount,
        0
      );
      setRevenue(totalRevenue);
    } catch (error) {
      console.log(error);
    }
  };

  const salesData = [
    { name: "Week 1", sales: 400 },
    { name: "Week 2", sales: 450 },
    { name: "Week 3", sales: 300 },
    { name: "Week 4", sales: 500 },
  ];

  const recentActivities = [
    'New Book Added: "React for Beginners"',
    "Order #45 has been shipped",
    "New User Registered: John Doe",
  ];

  useEffect(() => {
    if (aToken) {
      getAllBooks();
      getAllOrders();
    }
  }, [aToken]);

  return (
    <div className="p-8 bg-[#f4f7f8] min-h-screen">
      {/* Header */}
      <h1 className="text-4xl font-semibold text-[#17252A] mb-8">
        Admin Dashboard
      </h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {/* Total Books */}
        <div className="bg-white p-6 rounded-2xl shadow-md border-t-4 border-[#3AAFA9] hover:shadow-lg transition-all duration-200">
          <h2 className="text-lg font-medium text-gray-600">Total Books</h2>
          <p className="text-4xl font-bold text-[#3AAFA9] mt-2">
            {books?.length || 0}
          </p>
        </div>

        {/* Total Orders */}
        <div className="bg-white p-6 rounded-2xl shadow-md border-t-4 border-pink-500 hover:shadow-lg transition-all duration-200">
          <h2 className="text-lg font-medium text-gray-600">Total Orders</h2>
          <p className="text-4xl font-bold text-pink-500 mt-2">
            {orders?.length || 0}
          </p>
        </div>

        {/* Total Revenue */}
        <div className="bg-white p-6 rounded-2xl shadow-md border-t-4 border-green-500 hover:shadow-lg transition-all duration-200">
          <h2 className="text-lg font-medium text-gray-600">Total Revenue</h2>
          <p className="text-4xl font-bold text-green-500 mt-2">
            ₹{revenue.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Books by Category */}
      <div className="mt-10 bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition-all duration-200">
        <h2 className="text-2xl font-semibold mb-4 text-[#17252A]">
          Books by Category
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={booksByCategoryArray}>
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Bar dataKey="count" fill="#3AAFA9" barSize={40} radius={[5, 5, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Sales Overview */}
      <div className="mt-10 bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition-all duration-200">
        <h2 className="text-2xl font-semibold mb-4 text-[#17252A]">
          Sales Overview (Weekly)
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={salesData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="#2B7A78"
              strokeWidth={3}
              dot={{ r: 5 }}
              activeDot={{ r: 7 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Activities */}
      <div className="mt-10 bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition-all duration-200">
        <h2 className="text-2xl font-semibold mb-4 text-[#17252A]">
          Recent Activities
        </h2>
        <ul className="space-y-3">
          {recentActivities.map((activity, index) => (
            <li
              key={index}
              className="border-b last:border-none pb-2 text-gray-700"
            >
              {activity}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
