// pages/index.tsx
import { useEffect, useState } from 'react'

export default function Home() {
  const [showMainPage, setShowMainPage] = useState(false)
  const [timeLeft, setTimeLeft] = useState<string>('')

  useEffect(() => {
    const today = new Date()
    const birthday = new Date(today.getFullYear(), 4, 15) // May 15

    if (
      today.getDate() === birthday.getDate() &&
      today.getMonth() === birthday.getMonth()
    ) {
      setShowMainPage(true)
    } else {
      updateCountdown()
      const interval = setInterval(updateCountdown, 1000)
      return () => clearInterval(interval)
    }

    function updateCountdown() {
      const now = new Date().getTime()
      const countDown = birthday.getTime()
      const distance = countDown - now

      if (distance <= 0) {
        setShowMainPage(true)
        return
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24))
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((distance % (1000 * 60)) / 1000)

      setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`)
    }
  }, [])

  if (!showMainPage) {
    return (
      <div className="h-screen bg-gradient-to-br from-purple-300 to-pink-400 flex flex-col items-center justify-center text-white text-center p-6">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Anushka's Birthday Countdown 🎉</h1>
        <p className="text-2xl md:text-3xl">{timeLeft}</p>
        <p className="mt-6 text-lg">Come back on May 15 for a surprise!</p>
      </div>
    )
  }


  return (
    <div className="min-h-screen relative flex flex-col gap-6 items-center justify-center bg-gradient-to-b from-pink-100 to-pink-200 p-6 text-center overflow-hidden">
      
      {/* Floating Balloons (Decorative) */}
      

      <h1 className="text-4xl md:text-5xl font-bold text-red-500 animate-pulse drop-shadow-lg">
        🎂 Happy Birthday Anushka! 🎂
      </h1>

      <button
        onClick={() => (window.location.href = '/birthday/index.html')}
        className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-6 rounded-2xl shadow-xl transition duration-300 text-lg border-4 border-pink-200 hover:border-white glow"
      >
        🎉 Open Birthday Surprise (Use a Laptop)
      </button>
    </div>
  );
}

// export default function Home() {
//    return ( 
//    <div className="min-h-screen flex items-center justify-center bg-pink-100"> 
//       <h1 className="text-4xl font-bold text-red-500">Hello !</h1> 
//       <button
//   onClick={() => (window.location.href = '/birthday/index.html')}
//   className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-6 rounded-2xl shadow-md transition duration-300 text-lg"
// >
//   🎉 Open Birthday Surprise
// </button>

//    </div> 

//    ); 
//    }
