import { LaptopMinimalCheck } from 'lucide-react'
import ThemeToggle from './ThemeToggle'
import { SignInButton, SignUpButton, UserButton } from '@clerk/clerk-react'
import { Link } from 'react-router-dom'
import { useCustomUser } from '../context/UserContext'

const Navbar = () => {
    const { user, loading } = useCustomUser();

    return (
        <div className='w-full text-black bg-gray-100 flex items-center justify-between shadow-xl p-4 dark:bg-gray-800 dark:text-white transition-colors duration-300'>
            
            <Link to={'/'}>
                <div className='flex gap-2 text-2xl font-bold items-center hover:opacity-80 transition-opacity'>
                    <LaptopMinimalCheck className='w-10 h-10' />
                    <h1>ProPlanner</h1>
                </div>
            </Link>

            <div>
                <ul className='flex gap-6 font-medium items-center '>
                    <li>
                        <a href="#features" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                            Features
                        </a>
                    </li>
                    {/* Conditionally render Dashboard link ONLY if user is logged in */}
                    {user && (
                        <li>
                            <Link to={'/user-dashboard'} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                Dashboard
                            </Link>
                        </li>
                    )}
                </ul>
            </div>

            <div className='flex gap-4 items-center'>
                <ThemeToggle />
                
                {/* Conditional Rendering based on Context */}
                {loading ? (
                    // 1. Loading State (Prevents layout shift while Clerk checks auth)
                    <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600 animate-pulse"></div>
                ) : user ? (
                    // 2. Logged In State (Shows Clerk Profile Dropdown)
                    <UserButton afterSignOutUrl="/" />
                ) : (
                    // 3. Logged Out State (Shows Sign In / Sign Up)
                    <>
                        <SignInButton mode="modal">
                            <button className='text-black px-4 py-2 rounded-md hover:bg-gray-200 cursor-pointer dark:text-white dark:hover:bg-gray-700 font-medium transition-colors'>
                                Login
                            </button>
                        </SignInButton>
                        <SignUpButton mode="modal">
                            <button className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 cursor-pointer dark:bg-blue-600 dark:hover:bg-blue-700 font-medium transition-colors'>
                                Sign Up
                            </button>
                        </SignUpButton>
                    </>
                )}
            </div>
        </div>
    )
}

export default Navbar;