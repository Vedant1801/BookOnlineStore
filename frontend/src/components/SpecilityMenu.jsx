// import { Link } from "react-router-dom";
// import { categorires } from "../assets/assets";
// // import { useContext } from "react";
// // import { UserAppContext } from "../context/UserAppContext";
// // import { useEffect } from "react";

// export default function SpecilityMenu() {
  

//   return (
//     <div
//       id="category"
//       className="flex flex-col items-center gap-4 py-16 text-gray-800"
//     >
//       <h1 className="text-3xl font-medium">Find by Category</h1>
//       <p className="sm:w-1/3 text-center text-sm">
//         Simply browse through our extensive list of trusted doctors, schedule
//         your appointment hassle-free.
//       </p>
//       <div className="flex sm:justify-center   items-center gap-4 pt-5 w-full overflow-scroll">
//         {categorires.map((item, index) => (
//           <Link
//             onClick={() => scrollTo(0, 0)}
//             className="flex flex-col items-center text-xs cursor-pointer flex-shrink-0 p-3 rounded-lg transition-all duration-300 ease-in-out hover:bg-blue-200/50 hover:-translate-y-2"
//             key={index}
//             to={`/books/${item.category}`}
//           >
//             <img
//               className="w-16 sm:w-24 mb-2"
//               src={item.image}
//               alt={item.category}
//             />
//             <p className="font-medium">{item.category}</p>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// }


import { Link } from "react-router-dom";
import { categorires } from "../assets/assets";

export default function SpecilityMenu() {
  return (
    <div
      id="category"
      className="flex flex-col items-center gap-6 py-16 px-4 md:px-16 bg-gradient-to-b from-blue-50 to-white"
    >
      <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-2">
        Find Your Next Read
      </h1>
      <p className="sm:w-2/3 text-center text-gray-600 text-sm md:text-base mb-8">
        Navigate through categories and pick from our handpicked selection of must-read books.
      </p>

      <div className="flex sm:justify-center items-center gap-6 w-full overflow-x-auto scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-blue-100 py-2">
        {categorires.map((item, index) => (
          <Link
            onClick={() => scrollTo(0, 0)}
            key={index}
            to={`/books/${item.category}`}
            className="flex flex-col items-center text-xs sm:text-sm cursor-pointer flex-shrink-0 w-28 sm:w-32 p-4 rounded-xl bg-white shadow-md hover:shadow-[0_0_12px_#3AAFA9] border-2 border-transparent  transform hover:-translate-y-1 hover:scale-105 transition-all duration-300 ease-in-out"
          >
            <img
              className="w-16 sm:w-20 h-16 sm:h-20 object-cover mb-3 rounded-lg"
              src={item.image}
              alt={item.category}
            />
            <p className="font-semibold text-gray-800 text-center">{item.category}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

