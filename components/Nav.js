import whiteLogo from '../public/dinder-white_color.svg'
import colorLogo from '../public/dinder-flame-black.svg'
import AuthModal from '/components/AuthModal'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { Fragment, useState } from 'react'
import { Transition } from '@headlessui/react'

const Nav = ({ minimal, setShowModal, showModal, setIsSignUp }) => {
    const { data: session, status } = useSession()
    const user = session?.user
    const isLoadingUser = status === 'loading'
    // const [showModal, setShowModal] = useState(false);

    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    const handleClick = () => {
        setShowModal(true)
        setIsSignUp(false)
    }

    return (
        <nav>
            <div className='h-16 w-full shadow-md'>
                <div className='h-full container mx-auto'>
                    <div className='h-full mt-4 px-1 flex justify-between items-center space-x-4'>
                    <div className='w-[170px] m-[15px]'>
                        <Image src={minimal ? colorLogo : whiteLogo} alt='Dinder logo' />
                    </div>
                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                    {!user && !minimal && (
                        <button
                            className='ml-4 px-4 py-1 rounded-md bg-rose-600 hover:bg-rose-500 focus:outline-none focus:ring-4 focus:ring-rose-500 focus:ring-opacity-50 text-white transition'
                            onClick={handleClick}
                            disabled={showModal}
                        >
                            Log in
                        </button>
                    )}
                    </Transition>

                    <AuthModal show={openModal} onClose={closeModal} />
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Nav