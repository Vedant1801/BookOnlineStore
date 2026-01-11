// import React from "react";
// import aks from "../assets/pool house.jpg";
// import { Linkedin, Github, Instagram } from "lucide-react";

// export default function About() {
//   const data = [
//     {
//       name: "Vedant",
//       profession: "Software Engineer",
//       about:
//         "John is a passionate software engineer with 5 years of experience in developing scalable web applications. He loves working with modern technologies and solving complex problems.",
//       img: aks,
//       linkdin: "",
//       github: "https://github.com/johndoe",
//       instagram: "https://instagram.com/johndoe",
      

//     },
//     {
//       name: "vedant",
//       profession: "Digital Marketer",
//       about:
//         "Emma is an expert in digital marketing, specializing in SEO, content strategy, and social media marketing. She has helped numerous brands grow their online presence.",
//       img: aks,
//       linkdin: "",
//       github: "https://github.com/johndoe",
//       instagram: "https://instagram.com/johndoe",
//     },
//     {
//       name: "vedant",
//       profession: "UI/UX Designer",
//       about:
//         "Michael is a creative UI/UX designer with a keen eye for detail. He focuses on designing user-friendly interfaces that enhance user experience and engagement.",
//       img: aks,
//       linkdin: "",
//       github: "https://github.com/johndoe",
//       instagram: "https://instagram.com/johndoe",
//     },
//   ];

//   return (
//     <div className="mx-auto p-4 md:p-16 mt-6 max-w-7xl">
//       <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-6">
//         About Us
//       </h1>

//       {/* Introduction */}
//       <section className="mb-8">
//         <h2 className="text-2xl font-semibold text-gray-900 mb-3 border-l-4 border-blue-500 pl-3">
//           Who We Are
//         </h2>
//         <p className="text-gray-700 leading-relaxed">
//           Welcome to our platform! We are dedicated to providing top-notch
//           services for our customers. Our team of professionals works
//           passionately to deliver high-quality products and ensure complete
//           customer satisfaction.
//         </p>
//       </section>

//       {/* Mission Statement */}
//       <section className="mb-8">
//         <h2 className="text-2xl font-semibold text-gray-900 mb-3 border-l-4 border-green-500 pl-3">
//           Our Mission
//         </h2>
//         <p className="text-gray-700 leading-relaxed">
//           Our mission is to create an innovative and user-friendly experience,
//           making our services accessible to everyone. We continuously evolve and
//           adapt to the changing needs of our customers, ensuring we stay ahead
//           in the industry.
//         </p>
//       </section>

//       {/* Vision Statement */}
//       <section className="mb-8">
//         <h2 className="text-2xl font-semibold text-gray-900 mb-3 border-l-4 border-yellow-500 pl-3">
//           Our Vision
//         </h2>
//         <p className="text-gray-700 leading-relaxed">
//           We envision a world where technology bridges gaps and enhances lives.
//           Our goal is to be a leader in our industry by offering cutting-edge
//           solutions that make a real difference in people's lives.
//         </p>
//       </section>

//       {/* Why Choose Us */}
//       <section className="mb-12">
//         <h2 className="text-2xl font-semibold text-gray-900 mb-3 border-l-4 border-red-500 pl-3">
//           Why Choose Us?
//         </h2>
//         <ul className="list-disc list-inside text-gray-700 leading-relaxed space-y-2">
//           <li className="hover:text-blue-500 transition">
//             High-quality and reliable services
//           </li>
//           <li className="hover:text-blue-500 transition">
//             Customer-focused approach
//           </li>
//           <li className="hover:text-blue-500 transition">
//             Innovative and adaptive solutions
//           </li>
//           <li className="hover:text-blue-500 transition">
//             Experienced and passionate team
//           </li>
//           <li className="hover:text-blue-500 transition">
//             Commitment to excellence and integrity
//           </li>
//         </ul>
//       </section>

//       {/* Team Members */}
//       <h2 className="text-center text-3xl mb-8 text-gray-700 font-semibold ">
//         Our Team Leader{" "}
//       </h2>

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
//         {data.map((item, index) => (
//           <div
//             key={index}
//             className=" border-gray-500 p-6 rounded-lg shadow-lg bg-white transition-transform transform hover:scale-102 hover:shadow-xl"
//           >
//             <img
//               src={item.img}
//               alt={item.name}
//               className="w-full h-88 object-cover rounded-lg"
//             />

//             <div className="mt-4 text-center">
//               <h2 className="text-xl font-bold text-pink-600">{item.name}</h2>
//               <p className="text-green-500 font-medium  ">{item.profession}</p>
//               <p className="text-gray-600 mt-2">{item.about}</p>

//               <div className="flex justify-center space-x-4 mt-4">
//                 <a
//                   href={item.linkdin}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-blue-600 hover:text-blue-800 transition"
//                 >
//                   <Linkedin size={24} />
//                 </a>
//                 <a
//                   href={item.github}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-gray-700 hover:text-black transition"
//                 >
//                   <Github size={24} />
//                 </a>
//                 <a
//                   href={item.instagram}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-pink-500 hover:text-pink-700 transition"
//                 >
//                   <Instagram size={24} />
//                 </a>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

import React from "react";
import aks from "../assets/pool house.jpg";
import { Linkedin, Github, Instagram } from "lucide-react";

export default function About() {
  const data = [
    {
      name: "Vedant",
      profession: "Software Engineer",
      about:
        "Vedant is a passionate software engineer with years of experience in building scalable web applications. He loves working with modern technologies and solving complex problems.",
      img: aks,
      linkedin: "",
      github: "https://github.com/johndoe",
      instagram: "https://instagram.com/johndoe",
    },
    {
      name: "Emma",
      profession: "Digital Marketer",
      about:
        "Emma specializes in SEO, content strategy, and social media marketing. She has helped numerous brands grow their online presence effectively.",
      img: aks,
      linkedin: "",
      github: "https://github.com/johndoe",
      instagram: "https://instagram.com/johndoe",
    },
    {
      name: "Michael",
      profession: "UI/UX Designer",
      about:
        "Michael is a creative UI/UX designer with a keen eye for detail. He focuses on crafting user-friendly interfaces that enhance engagement.",
      img: aks,
      linkedin: "",
      github: "https://github.com/johndoe",
      instagram: "https://instagram.com/johndoe",
    },
  ];

  return (
    <div className="mx-auto p-6 md:p-16 mt-6 max-w-7xl bg-gray-50">
      <h1 className="text-4xl md:text-5xl font-extrabold text-center text-gray-800 mb-12">
        About Us
      </h1>

      {/* Introduction */}
      <section className="mb-12 space-y-4">
        <h2 className="text-3xl font-semibold text-gray-900 mb-2 border-l-4 border-blue-500 pl-3">
          Who We Are
        </h2>
        <p className="text-gray-700 leading-relaxed text-lg">
          Welcome to our platform! We are dedicated to providing top-notch
          services for our customers. Our team works passionately to deliver
          high-quality products ensuring complete satisfaction.
        </p>
      </section>

      {/* Mission & Vision */}
      <div className="grid md:grid-cols-2 gap-10 mb-12">
        <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all">
          <h3 className="text-2xl font-semibold text-blue-600 mb-3">Our Mission</h3>
          <p className="text-gray-700 leading-relaxed">
            Create innovative and user-friendly experiences. We evolve with the
            changing needs of our customers to stay ahead in the industry.
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all">
          <h3 className="text-2xl font-semibold text-green-600 mb-3">Our Vision</h3>
          <p className="text-gray-700 leading-relaxed">
            We envision a world where technology bridges gaps and enhances
            lives. Our goal is to offer cutting-edge solutions that make a
            real difference.
          </p>
        </div>
      </div>

      {/* Why Choose Us */}
      <section className="mb-12 bg-gradient-to-tr from-blue-50 to-purple-50 p-6 rounded-xl shadow-md">
        <h2 className="text-3xl font-semibold text-gray-900 mb-4 border-l-4 border-red-500 pl-3">
          Why Choose Us?
        </h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2 text-lg">
          {[
            "High-quality and reliable services",
            "Customer-focused approach",
            "Innovative and adaptive solutions",
            "Experienced and passionate team",
            "Commitment to excellence and integrity",
          ].map((item, idx) => (
            <li key={idx} className="hover:text-blue-500 transition-colors">
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* Team Members */}
      <h2 className="text-center text-4xl font-bold text-gray-800 mb-12">
        Meet Our Team
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {data.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
          >
            <img
              src={item.img}
              alt={item.name}
              className="w-full h-80 object-cover rounded-xl mb-4"
            />
            <div className="text-center">
              <h3 className="text-2xl font-bold text-pink-600">{item.name}</h3>
              <p className="text-green-500 font-medium mb-2">{item.profession}</p>
              <p className="text-gray-600 text-sm mb-4">{item.about}</p>

              <div className="flex justify-center gap-4">
                <a
                  href={item.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 p-3 rounded-full text-white hover:bg-blue-700 transition-all"
                >
                  <Linkedin size={20} />
                </a>
                <a
                  href={item.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-800 p-3 rounded-full text-white hover:bg-gray-900 transition-all"
                >
                  <Github size={20} />
                </a>
                <a
                  href={item.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-pink-500 p-3 rounded-full text-white hover:bg-pink-600 transition-all"
                >
                  <Instagram size={20} />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
