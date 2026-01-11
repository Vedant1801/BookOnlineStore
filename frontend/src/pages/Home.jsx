// import React from 'react'
// import Header from '../components/Header'
// import SpecilityMenu from '../components/SpecilityMenu'
// import Recommended from '../components/Recommended'
// import Banner from '../components/Banner'
// import TrendingBooks from '../components/TrendingBooks'

// export default function Home() {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
//       <Header/>
//       <SpecilityMenu/>
//       <TrendingBooks/>
//       <Recommended/>
//       <Banner/>
//     </div>
//   )
// }

import React from 'react'
import Header from '../components/Header'
import SpecilityMenu from '../components/SpecilityMenu'
import Recommended from '../components/Recommended'
import Banner from '../components/Banner'
import TrendingBooks from '../components/TrendingBooks'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E8F6F5] via-[#FDFDFD] to-[#DFF3F2]">
      <Header />
      <SpecilityMenu />
      <TrendingBooks />
      <Recommended />
      <Banner />
    </div>
  )
}
