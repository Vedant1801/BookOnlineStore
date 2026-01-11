// import axios from "axios";
// import React, { useContext, useEffect, useState } from "react";
// import { toast } from "react-toastify";
// import { UserAppContext } from "../context/UserAppContext";
// import { useParams } from "react-router-dom";
// import moment from "moment";

// export default function OrderPage() {
//   const { backendUrl } = useContext(UserAppContext);
//   const { userId } = useParams();

//   const [orders, setOrders] = useState([]);

//   const fetchOrders = async () => {
//     try {
//       console.log(userId);
//       const res = await axios.get(`${backendUrl}/api/orders/user/${userId}`);
//       if (res.data.success) {
//         setOrders(res.data.orders);
//       } else {
//         toast.error("Failed to fetch orders");
//       }
//     } catch (error) {
//       toast.error("Error fetching orders");
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     if (userId) {
//       fetchOrders();
//     }
//   }, [userId]);

//   return (
//     <div className="max-w-6xl mx-auto p-6 md:p-10">
//       <h2 className="text-3xl font-bold mb-6 text-gray-800">Your Orders</h2>

//       {orders.length === 0 ? (
//         <div className="text-center text-gray-500 py-12 bg-gray-50 rounded-lg shadow-inner">
//           You haven’t placed any orders yet.
//         </div>
//       ) : (
//         <div className="space-y-6">
//           {orders.map((order) => (
//             <div
//               key={order._id}
//               className="bg-white p-6 rounded-xl shadow-md border border-gray-100"
//             >
//               <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
//                 <div>
//                   <h3 className="text-lg font-semibold text-gray-700">
//                     Order ID: <span className="text-gray-900">{order._id}</span>
//                   </h3>
//                   <p className="text-sm text-gray-500">
//                     Placed on: {moment(order.placedAt).format("MMMM Do YYYY, h:mm A")}
//                   </p>
//                   <p className="text-sm text-gray-500">
//                     Status:{" "}
//                     <span
//                       className={`font-medium ${
//                         order.paymentInfo.status === "paid" ? "text-green-600" : "text-yellow-600"
//                       }`}
//                     >
//                       {order.paymentInfo.status}
//                     </span>
//                   </p>
//                 </div>

//                 <div className="text-sm text-gray-600">
//                   <p>Total Amount: ₹{order.totalAmount}</p>
//                   <p>Phone: {order.deliveryAddress.phone}</p>
//                   <p>City: {order.deliveryAddress.city.trim()}</p>
//                 </div>
//               </div>

//               <div>
//                 <h4 className="font-semibold text-gray-800 mb-2">Books:</h4>
//                 <ul className="space-y-2 text-sm text-gray-700">
//                   {order.books.map((book) => (
//                     <li key={book._id} className="border-b pb-2 flex justify-between">
//                       <span>{book.title}</span>
//                       <span>
//                         Qty: {book.quantity} × ₹{book.price}
//                       </span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }


import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { UserAppContext } from "../context/UserAppContext";
import { useParams } from "react-router-dom";
import moment from "moment";

export default function OrderPage() {
  const { backendUrl } = useContext(UserAppContext);
  const { userId } = useParams();
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/orders/user/${userId}`);
      if (res.data.success) {
        setOrders(res.data.orders);
      } else {
        toast.error("Failed to fetch orders");
      }
    } catch (error) {
      toast.error("Error fetching orders");
      console.error(error);
    }
  };

  useEffect(() => {
    if (userId) fetchOrders();
  }, [userId]);

  return (
    <div className="max-w-7xl mx-auto p-6 md:p-12">
      <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">
        Your Orders
      </h2>

      {orders.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-2xl shadow-inner text-gray-500 text-lg">
          You haven’t placed any orders yet.
        </div>
      ) : (
        <div className="space-y-8">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 hover:shadow-2xl transition-shadow"
            >
              {/* Header */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-700">
                    Order ID:{" "}
                    <span className="text-gray-900 font-mono">{order._id}</span>
                  </h3>
                  <p className="text-sm text-gray-500">
                    Placed on: {moment(order.placedAt).format("MMMM Do YYYY, h:mm A")}
                  </p>
                  <p className="text-sm mt-1">
                    Status:{" "}
                    <span
                      className={`font-semibold px-2 py-1 rounded-lg text-sm ${
                        order.paymentInfo.status === "paid"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {order.paymentInfo.status.toUpperCase()}
                    </span>
                  </p>
                </div>

                <div className="text-sm text-gray-600 space-y-1">
                  <p>Total: <span className="font-semibold text-gray-800">₹{order.totalAmount}</span></p>
                  <p>Phone: {order.deliveryAddress.phone}</p>
                  <p>City: {order.deliveryAddress.city}</p>
                </div>
              </div>

              {/* Books List */}
              <div className="mt-4">
                <h4 className="text-gray-800 font-semibold mb-3 text-lg">Books</h4>
                <div className="divide-y divide-gray-200 border rounded-xl border-gray-100 overflow-hidden">
                  {order.books.map((book) => (
                    <div
                      key={book._id}
                      className="flex justify-between items-center p-3 bg-gray-50 hover:bg-gray-100 transition"
                    >
                      <span className="font-medium text-gray-700">{book.title}</span>
                      <span className="text-gray-600">
                        Qty: {book.quantity} × ₹{book.price}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
