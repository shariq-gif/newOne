import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import Head from 'next/head'

const affectionMessages = [
  "You're the best part of my day.",
  "You make the world a softer place.",
  "Even your silence makes me feel heard.",
  "You're my favorite person, and it's not even close.",
  "I love you more than coffee (and that's saying something).",
  "You're not just loved - you're cherished.",
  "Every part of you is poetry to me.",
  "You are the reason I smile without trying.",
  "Your laughter is my favorite sound.",
  "Being with you makes everything feel right.",
  "You brighten up my darkest days.",
  "You make life feel so much sweeter.",
  "Your kindness makes the world a better place.",
  "I fall in love with you more every day.",
  "You are the sunshine that lights up my life.",
  "You are my dream come true.",
  "Your love makes everything feel possible.",
  "I'm so lucky to have you by my side.",
  "You are the calm in my storm.",
  "I never knew what happiness was until I met you.",
  "You make even the ordinary feel extraordinary.",
  "I'm completely mesmerized by everything you do.",
  "You bring a sparkle to my life that no one else can.",
  "Every moment spent with you feels like a beautiful memory.",
  "You're the reason my heart is full of joy.",
  "I adore everything about you, from your smile to your heart.",
  "You're more beautiful than words can ever describe.",
  "I can't imagine a world without you in it.",
  "I love you with all my heart, pookie.",
  "Your presence is a gift I cherish every day.",
  "Poookiee I Love You, Remember that",
  "I probably miss you, Cause you're this amazing firl"
]

export default function AffectionPage() {
  const [input, setInput] = useState("")
  const [receivedAffection, setReceivedAffection] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)  // To handle loading state
  const [message, setMessage] = useState<string>("")  // To hold the affection message

  // Randomly pick a message on client-side only after mount
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * affectionMessages.length)
    setMessage(affectionMessages[randomIndex])
  }, [])  // Empty dependency array ensures this runs only once on client mount

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setIsLoading(true) // Set loading to true when submission starts

    try {
      const response = await fetch('/api/sendAffection', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: input,
          from: 'Anushka'
        }),
      })

      if (response.ok) {
        setReceivedAffection(input)
        setInput('')  // Clear the input after successful submission
      } else {
        console.error('Error sending affection:', response)
      }
    } catch (error) {
      console.error('Error sending affection:', error)
    } finally {
      setIsLoading(false) // Reset loading state after operation completes
    }
  }

  return (
    <>
      <Head>
        <title>Daily Affection for Anushka 💖</title>
      </Head>

      <main className="min-h-screen bg-pink-50 flex flex-col items-center justify-center p-6 space-y-12">
        {/* Affection Message Block */}
        <motion.div
          className="bg-white p-10 sm:p-16 rounded-3xl shadow-2xl w-full max-w-3xl text-center text-neutral-800 border-4 border-rose-200"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl font-bold mb-6 text-pink-600">💌 Today’s Affection</h1>
          <p className="text-2xl leading-relaxed">{message}</p>
          <div className="mt-8 text-sm text-neutral-500">
            Reload for a new one 🫶
          </div>
        </motion.div>

        {/* Send Me an Affection Section */}
        <motion.div
          className="w-full max-w-2xl bg-pink-100 p-6 rounded-xl shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}

        >
          <h2 className="text-2xl font-semibold text-rose-600 mb-4">✨ Send Me Something Too, You Meanie</h2>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <textarea
              className="w-full p-4 rounded-lg border border-rose-300 text-neutral-700 resize-none"
              rows={4}
              placeholder="Write something sweet…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              required
            />
            <button
              type="submit"
              className="self-end bg-rose-400 text-white px-6 py-2 rounded-full hover:bg-rose-500 transition"
              disabled={isLoading} // Disable button while submitting
            >
              {isLoading ? 'Sending...' : 'Send 💖'}
            </button>
          </form>

          {receivedAffection && (
            <div className="mt-6 bg-white p-4 rounded-lg border text-neutral-700 shadow">
              <strong>She said:</strong>
              <p className="mt-2 italic">"{receivedAffection}"</p>
            </div>
          )}
        </motion.div>
      </main>
    </>
  )
}
