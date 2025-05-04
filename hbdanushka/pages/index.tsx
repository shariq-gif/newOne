// // pages/index.tsx
// import { useEffect, useState } from 'react'

// export default function Home() {
//   const [showMainPage, setShowMainPage] = useState(false)
//   const [timeLeft, setTimeLeft] = useState<string>('')

//   useEffect(() => {
//     const today = new Date()
//     const birthday = new Date(today.getFullYear(), 4, 15) // May is month 4 (0-indexed)

//     if (
//       today.getDate() === birthday.getDate() &&
//       today.getMonth() === birthday.getMonth()
//     ) {
//       setShowMainPage(true)
//     } else {
//       updateCountdown()
//       const interval = setInterval(updateCountdown, 1000)
//       return () => clearInterval(interval)
//     }

//     function updateCountdown() {
//       const now = new Date().getTime()
//       const countDown = birthday.getTime()
//       const distance = countDown - now

//       if (distance <= 0) {
//         setShowMainPage(true)
//         return
//       }

//       const days = Math.floor(distance / (1000 * 60 * 60 * 24))
//       const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
//       const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
//       const seconds = Math.floor((distance % (1000 * 60)) / 1000)

//       setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`)
//     }
//   }, [])

//   if (!showMainPage) {
//     return (
//       <div className="h-screen bg-gradient-to-br from-purple-300 to-pink-400 flex flex-col items-center justify-center text-white text-center p-6">
//         <h1 className="text-4xl md:text-6xl font-bold mb-4">Anushka's Birthday Countdown 🎉</h1>
//         <p className="text-2xl md:text-3xl">{timeLeft}</p>
//         <p className="mt-6 text-lg">Come back on May 15 for a surprise!</p>
//       </div>
//     )
//   }

//   return (
//     <div className="h-screen bg-pink-50 flex items-center justify-center text-center px-6">
//       <h1 className="text-5xl font-bold text-pink-600">🎂 Happy Birthday Anushka! 🎂</h1>
//     </div>
//   )
// }

export default function Home() {
   return ( 
   <div className="min-h-screen flex items-center justify-center bg-pink-100"> 
      <h1 className="text-4xl font-bold text-red-500">Hello !</h1> 
   </div> 
   ); 
   }