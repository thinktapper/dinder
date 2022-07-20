import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'
import AuthModal from '/components/AuthModal'
// import Nav from '/components/Nav'
import Layout from '/components/Layout'

export default function Home() {
  const [showModal, setShowModal] = useState(false)
  const [isSignUp, setIsSignUp] = useState(true)

  const { data: session, status } = useSession()

  const handleClick = () => {
    if (status === 'authenticated') {
      signOut()
    }
    setShowModal(true)
    setIsSignUp(true)
  }
  return (
    <div className="w-screen h-screen fixed bg-[url('/bg.webp')]">
    <div className='w-screen h-screen fixed bg-gradient-to-b from-black to-transparent'>
      {/*<Nav*/}
      {/*  session={session}*/}
      {/*  minimal={false}*/}
      {/*  setShowModal={setShowModal}*/}
      {/*  showModal={showModal}*/}
      {/*  setIsSignUp={setIsSignUp}*/}
      {/*/>*/}
      <Layout />
      <div className='flex flex-col w-full h-full justify-center'>
        <div className="relative flex flex-col w-full h-full min-h-200 items-center">
          <div className="flex w-full justify-center items-center">
            <h1 className='lg:text-9xl sm:text-6xl text-4xl mx-auto font-extrabold text-white hover:text-rose-500 duration-300'>Swipe Bite®</h1>
          </div>
            <button className='bg-white uppercase text-sm bg-gradient-[45deg] from-[rgb(254, 48, 114)] to-[rgb(255, 89, 64)] px-30 py-12 rounded hover:bg-gradient-[260deg]' onClick={handleClick}>
              {status === 'authenticated' ? 'Sign Out' : 'Create Account'}
            </button>

            {showModal && (
                <AuthModal setShowModal={setShowModal} isSignUp={isSignUp} />
                )}
        </div>
      </div>
    </div>
    </div>
  )
}
