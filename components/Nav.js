import whiteLogo from '../public/dinder-white_color.svg'
import colorLogo from '../public/dinder-flame-black.svg'
import Image from 'next/image'
import { useSession } from 'next-auth/react'

const Nav = ({ minimal, setShowModal, showModal, setIsSignUp }) => {
    const { data: session, status } = useSession()

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

                    {!session && !minimal && (
                        <button
                            className='ml-4 px-4 py-1 rounded-md bg-rose-600 hover:bg-rose-500 focus:outline-none focus:ring-4 focus:ring-rose-500 focus:ring-opacity-50 text-white transition'
                            onClick={handleClick}
                            disabled={showModal}
                        >
                            Log in
                        </button>
                    )}
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Nav