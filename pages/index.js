import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Script from 'next/script'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'
import AuthModal from '/components/AuthModal'
// import Nav from '/components/Nav'
import Layout from '/components/Layout'

export default function Home() {
  const [showModal, setShowModal] = useState(false)
  const [isSignUp, setIsSignUp] = useState(true)
  // const [isSignedIn, setIsSignedIn] = useState(false)
  const router = useRouter()
  const { data: session, status } = useSession()

  // let directionUrl = '/onboarding'
  //
  // if (status === 'authenticated') {
  //   setIsSignedIn(true)
  //   directionUrl = '/dashboard'
  // }

  // let directionUrl = isSignedIn ? {'/dashboard' : '/onboarding'}
  const whereAmI = router.pathname

  const handleClick = () => {
    if (status === 'authenticated') {
      router.push('/dashboard')
      // signOut()
    } else {
      setShowModal(true)
      setIsSignUp(true)
    }
  }
  return (
    <div className="w-screen h-screen fixed bg-[url('/bg.webp')] z-50">
      <div className="fixed z-30 w-screen h-screen bg-gradient-to-b from-black to-transparent">
        <Script src='https://maps.googleapis.com/maps/api/js?key=AIzaSyAgNo6ibYDfbtoLpNN23JZ0zgC4b1ntDGY&libraries=places' />
        <Layout>
          <div className="flex flex-col w-full mt-[30vh] items-center space-y-8">
            <h1 className="mb-6 text-4xl font-bold text-white duration-300 md:text-9xl tracking-thin hover:text-rose-500">
              Swipe Bite
              <span className="font-light">&reg;</span>
            </h1>
            <h3 className="text-xl font-bold tracking-widest text-white uppercase">
              Swipe. Match. Eat.
            </h3>
            <button
              className="block px-16 py-4 font-bold text-white uppercase whitespace-no-wrap rounded-full bg-gradient-to-r from-pink-600 to-yellow-500 hover:bg-gradient-to-l"
              onClick={handleClick}>
              {status === 'authenticated' ? 'Discover' : 'Create Account'}
            </button>
            {/*<p className="mb-1 font-bold text-white">Explore top-rated places to eat in your area</p>*/}
          </div>

          {showModal && (
            <AuthModal setShowModal={setShowModal} isSignUp={isSignUp} />
          )}
        </Layout>
      </div>
    </div>
  )
}
