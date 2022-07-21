import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
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

  const handleClick = () => {
    if (status === 'authenticated') {
      router.push('/dashboard')
      // signOut()
    }else {
      router.push('/onboarding')
    }
    setShowModal(true)
    setIsSignUp(true)
  }
  return (
    <div className="w-screen h-screen fixed bg-[url('/bg.webp')] z-50">
    <div className='w-screen h-screen fixed bg-gradient-to-b from-black to-transparent z-30'>
      {/*<Nav*/}
      {/*  session={session}*/}
      {/*  minimal={false}*/}
      {/*  setShowModal={setShowModal}*/}
      {/*  showModal={showModal}*/}
      {/*  setIsSignUp={setIsSignUp}*/}
      {/*/>*/}
      <Layout>
      <div className='flex flex-col w-full mt-[30vh] items-center space-y-8'>
        <h1 className="text-4xl mb-6 md:text-9xl text-white font-bold tracking-thin hover:text-rose-500 duration-300">
          Swipe Bite
          <span className="font-light">&reg;</span>
        </h1>
        <h3 className="text-white text-xl font-bold uppercase tracking-widest">Swipe. Match. Eat.</h3>
            <button className='bg-gradient-to-r from-pink-600 to-yellow-500 rounded-full hover:bg-gray-200 py-4 px-16 block whitespace-no-wrap text-white font-bold uppercase'
                    onClick={handleClick}>
              {status === 'authenticated' ? 'Discover' : 'Create Account'}
            </button>
        {/*<p className="text-white font-bold mb-1">Explore top-rated places to eat in your area</p>*/}
      </div>

            {showModal && (
                <AuthModal setShowModal={setShowModal} isSignUp={isSignUp} />
                )}
      </Layout>
        </div>
      </div>
  )
}
