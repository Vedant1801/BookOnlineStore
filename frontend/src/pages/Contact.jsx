// import React, { useState } from "react";
// import emailjs from "@emailjs/browser";
// import { Phone, Mail, MapPin } from "lucide-react"; // Import Lucide icons
// import contact2 from "../assets/contact2.avif";

// export default function Contact() {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     message: "",
//   });
//   const [isSending, setIsSending] = useState(false);
//   const [success, setSuccess] = useState(null);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSending(true);

//     emailjs
//       .send(
//         import.meta.env.VITE_EMAILJS_SERVICE_ID,
//         import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
//         {
//           from_name: formData.name,
//           from_email: formData.email,
//           message: formData.message,
//         },
//         import.meta.env.VITE_EMAILJS_PUBLIC_KEY
//       )
//       .then(
//         () => {
//           setSuccess(true);
//           setFormData({ name: "", email: "", message: "" });
//         },
//         () => {
//           setSuccess(false);
//         }
//       )
//       .finally(() => setIsSending(false));
//   };

//   return (
//     <div className="relative flex flex-col items-center justify-center min-h-screen p-6">
//       <div className="mt-2 mb-10 ">
//         <h2 className="text-3xl font-bold text-gray-700 text-center mb-2">
//           Contact Us
//         </h2>
//         <p className="text-gray-500 text-center max-w-2xl mx-auto">
//           Have any questions or concerns? We're here to help! Reach out to us
//           for inquiries, support, or collaboration opportunities. We’d love to
//           hear from you and will respond as soon as possible.
//         </p>
//       </div>
//       <div className="border border-gray-300 shadow-lg rounded-xl overflow-hidden flex w-full max-w-4xl">
//         {/* Left Side - Contact Form */}
//         <div className="w-full md:w-1/2 p-8">
//           <h2 className="text-3xl font-bold text-gray-700 mb-4">
//             Get in Touch
//           </h2>
//           <p className="text-gray-600 mb-6">
//             We'd love to hear from you! Fill out the form and we'll get back to
//             you soon.
//           </p>
//           <form onSubmit={handleSubmit} className="space-y-3">
//             <div>
//               <label className="block text-gray-700 font-semibold">Name</label>
//               <input
//                 type="text"
//                 name="name"
//                 placeholder="Enter your name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block text-gray-700 font-semibold">Email</label>
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Enter your email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block text-gray-700 font-semibold">
//                 Message
//               </label>
//               <textarea
//                 name="message"
//                 placeholder="Your message ..."
//                 value={formData.message}
//                 onChange={handleChange}
//                 className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
//                 rows="4"
//                 required
//               ></textarea>
//             </div>
//             <button
//               type="submit"
//               className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-all transform hover:scale-103 disabled:bg-gray-400"
//               disabled={isSending}
//             >
//               {isSending ? "Sending..." : "Send Message"}
//             </button>
//             {success === true && (
//               <p className="text-green-600 mt-3 text-center">
//                 Message sent successfully!
//               </p>
//             )}
//             {success === false && (
//               <p className="text-red-600 mt-3 text-center">
//                 Failed to send message.
//               </p>
//             )}
//           </form>
//         </div>

//         {/* Right Side - Image */}
//         <div className="hidden md:block md:w-1/2">
//           <img
//             src={contact2}
//             alt="Contact Us"
//             className="w-full h-full center object-cover"
//           />
//         </div>
//       </div>

//       {/* Contact Details Section */}
//       <div className="mt-12 w-full max-w-2xl p-8 rounded-lg">
//         <h3 className="text-2xl font-bold text-gray-800 mb-4">
//           Contact Information
//         </h3>
//         <div className="space-y-4">
//           <p className="text-gray-600 flex items-center">
//             <Phone className="text-blue-500 mr-2" size={18} />
//             <strong className="mr-2">Phone:</strong> +91 6388037163
//           </p>
//           <p className="text-gray-600 flex items-center">
//             <Mail className="text-blue-500 mr-2" size={18} />
//             <strong className="mr-2">Email:</strong> vedantguptajhansi18@gmail.com
//           </p>
//           <p className="text-gray-600 flex items-center">
//             <MapPin className="text-blue-500 mr-2" size={18} />
//             <strong className="mr-2">Location:</strong> HBTU kanpur
//           </p>
//           <div className="w-full h-64 bg-gray-300 rounded-md overflow-hidden">
//   <iframe
//     src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.197445255733!2d80.30295507453802!3d26.5135092771419!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399c38e01edb1a4d%3A0xdeb01e02ac4362ac!2sHarcourt%20Butler%20Technical%20University%20(HBTU)%2C%20Kanpur!5e0!3m2!1sen!2sin!4v1726558434359!5m2!1sen!2sin"
//     width="600"
//     height="450"
//     style={{ border: 0 }}
//     allowFullScreen=""
//     loading="lazy"
//     referrerPolicy="no-referrer-when-downgrade"
//   ></iframe>
// </div>
//         </div>
//       </div>
//     </div>
//   );
// }




// import React, { useState } from "react";
// import emailjs from "@emailjs/browser";
// import { Phone, Mail, MapPin } from "lucide-react";
// import contact2 from "../assets/contact2.avif";

// export default function Contact() {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     message: "",
//   });
//   const [isSending, setIsSending] = useState(false);
//   const [success, setSuccess] = useState(null);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSending(true);

//     emailjs
//       .send(
//         import.meta.env.VITE_EMAILJS_SERVICE_ID,
//         import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
//         {
//           from_name: formData.name,
//           from_email: formData.email,
//           message: formData.message,
//         },
//         import.meta.env.VITE_EMAILJS_PUBLIC_KEY
//       )
//       .then(
//         () => {
//           setSuccess(true);
//           setFormData({ name: "", email: "", message: "" });
//         },
//         () => setSuccess(false)
//       )
//       .finally(() => setIsSending(false));
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-6 md:px-16">
//       <h1 className="text-4xl md:text-5xl font-extrabold text-center text-gray-800 mb-12">
//         Contact Us
//       </h1>

//       <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto shadow-2xl rounded-2xl overflow-hidden">
//         {/* Contact Form */}
//         <div className="md:w-1/2 bg-white p-8 md:p-12 flex flex-col justify-center">
//           <h2 className="text-3xl font-bold text-gray-700 mb-6">Get in Touch</h2>
//           <p className="text-gray-600 mb-6 text-lg">
//             We'd love to hear from you! Fill out the form and we'll get back to you promptly.
//           </p>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <input
//               type="text"
//               name="name"
//               placeholder="Your Name"
//               value={formData.name}
//               onChange={handleChange}
//               className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
//               required
//             />
//             <input
//               type="email"
//               name="email"
//               placeholder="Your Email"
//               value={formData.email}
//               onChange={handleChange}
//               className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
//               required
//             />
//             <textarea
//               name="message"
//               placeholder="Your Message"
//               value={formData.message}
//               onChange={handleChange}
//               rows="5"
//               className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
//               required
//             ></textarea>
//             <button
//               type="submit"
//               disabled={isSending}
//               className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white p-3 rounded-lg font-semibold hover:scale-105 transform transition-all disabled:opacity-50"
//             >
//               {isSending ? "Sending..." : "Send Message"}
//             </button>
//             {success === true && (
//               <p className="text-green-600 mt-3 text-center font-medium">
//                 Message sent successfully!
//               </p>
//             )}
//             {success === false && (
//               <p className="text-red-600 mt-3 text-center font-medium">
//                 Failed to send message.
//               </p>
//             )}
//           </form>
//         </div>

//         {/* Image Side */}
//         <div className="md:w-1/2 hidden md:block">
//           <img
//             src={contact2}
//             alt="Contact Us"
//             className="w-full h-full object-cover"
//           />
//         </div>
//       </div>

//       {/* Contact Info Section */}
//       <div className="mt-12 max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
//         <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Contact Information</h2>
//         <div className="grid md:grid-cols-3 gap-8 text-gray-700 text-lg">
//           <div className="flex items-center gap-3 hover:text-blue-500 transition">
//             <Phone size={20} className="text-blue-500" />
//             <span>+91 6388037163</span>
//           </div>
//           <div className="flex items-center gap-3 hover:text-blue-500 transition">
//             <Mail size={20} className="text-blue-500" />
//             <span>vedantguptajhansi18@gmail.com</span>
//           </div>
//           <div className="flex items-center gap-3 hover:text-blue-500 transition">
//             <MapPin size={20} className="text-blue-500" />
//             <span>HBTU Kanpur, India</span>
//           </div>
//         </div>

//         <div className="mt-8 w-full h-72 rounded-xl overflow-hidden shadow-inner">
//           <iframe
//             src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.197445255733!2d80.30295507453802!3d26.5135092771419!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399c38e01edb1a4d%3A0xdeb01e02ac4362ac!2sHarcourt%20Butler%20Technical%20University%20(HBTU)%2C%20Kanpur!5e0!3m2!1sen!2sin!4v1726558434359!5m2!1sen!2sin"
//             width="100%"
//             height="100%"
//             style={{ border: 0 }}
//             allowFullScreen=""
//             loading="lazy"
//             referrerPolicy="no-referrer-when-downgrade"
//             className="rounded-xl"
//           ></iframe>
//         </div>
//       </div>
//     </div>
//   );
// }


import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import { Phone, Mail, MapPin } from "lucide-react";
import contact2 from "../assets/contact2.avif";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSending, setIsSending] = useState(false);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);

    try {
      // Ensure you are using PUBLIC_KEY, SERVICE_ID, TEMPLATE_ID correctly
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      setSuccess(true);
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      console.error("EmailJS Error:", err);
      setSuccess(false);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-6 md:px-16">
      <h1 className="text-4xl md:text-5xl font-extrabold text-center text-gray-800 mb-12">
        Contact Us
      </h1>

      <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto shadow-2xl rounded-2xl overflow-hidden">
        {/* Contact Form */}
        <div className="md:w-1/2 bg-white p-8 md:p-12 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-gray-700 mb-6">Get in Touch</h2>
          <p className="text-gray-600 mb-6 text-lg">
            We'd love to hear from you! Fill out the form and we'll get back to you promptly.
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3AAFA9] outline-none transition"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3AAFA9] outline-none transition"
              required
            />
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              rows="5"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3AAFA9] outline-none transition"
              required
            ></textarea>
            <button
              type="submit"
              disabled={isSending}
              className="w-full bg-[#3AAFA9] text-white p-3 rounded-lg font-semibold hover:bg-[#2E8C87] transition disabled:opacity-50"
            >
              {isSending ? "Sending..." : "Send Message"}
            </button>
            {success === true && (
              <p className="text-green-600 mt-3 text-center font-medium">
                Message sent successfully!
              </p>
            )}
            {success === false && (
              <p className="text-red-600 mt-3 text-center font-medium">
                Failed to send message.
              </p>
            )}
          </form>
        </div>

        {/* Image Side */}
        <div className="md:w-1/2 hidden md:block">
          <img
            src={contact2}
            alt="Contact Us"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Contact Info Section */}
      <div className="mt-12 max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Contact Information</h2>
        <div className="grid md:grid-cols-3 gap-8 text-gray-700 text-lg">
          <div className="flex items-center gap-3 hover:text-[#3AAFA9] transition">
            <Phone size={20} className="text-[#3AAFA9]" />
            <span>+91 6388037163</span>
          </div>
          <div className="flex items-center gap-3 hover:text-[#3AAFA9] transition">
            <Mail size={20} className="text-[#3AAFA9]" />
            <span>vedantguptajhansi18@gmail.com</span>
          </div>
          <div className="flex items-center gap-3 hover:text-[#3AAFA9] transition">
            <MapPin size={20} className="text-[#3AAFA9]" />
            <span>HBTU Kanpur, India</span>
          </div>
        </div>

        <div className="mt-8 w-full h-72 rounded-xl overflow-hidden shadow-inner">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.197445255733!2d80.30295507453802!3d26.5135092771419!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399c38e01edb1a4d%3A0xdeb01e02ac4362ac!2sHarcourt%20Butler%20Technical%20University%20(HBTU)%2C%20Kanpur!5e0!3m2!1sen!2sin!4v1726558434359!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded-xl"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
