import { LaptopMinimalCheck } from 'lucide-react'
import { motion } from 'motion/react'
import ThemeToggle from './ThemeToggle'
import { SignInButton, SignUpButton, UserButton } from '@clerk/clerk-react'
import { Link } from 'react-router-dom'
import { useCustomUser } from '../context/UserContext'

const Navbar = () => {
    const { user, loading } = useCustomUser();

    return (
        <motion.div 
            initial={{ y: -60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className='w-full text-brand-dark bg-brand-light flex items-center justify-between shadow-xl p-4 dark:bg-brand-dark dark:text-brand-light transition-colors duration-300 border-b border-brand-muted/30 dark:border-brand-muted/10'
        >
            
            <Link to={'/'}>
                <motion.div 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className='flex gap-2 text-2xl font-bold items-center'
                >
                    <LaptopMinimalCheck className='w-10 h-10 text-brand-accent' />
                    <h1>ProPlanner</h1>
                </motion.div>
            </Link>

            <div>
                <ul className='flex gap-6 font-medium items-center '>
                    <li>
                        <a href="#features" className="hover:text-brand-accent transition-colors">
                            Features
                        </a>
                    </li>
                    {user && (
                        <li>
                            <Link to={'/user-dashboard'} className="hover:text-brand-accent transition-colors">
                                Dashboard
                            </Link>
                        </li>
                    )}
                </ul>
            </div>

            <div className='flex gap-4 items-center'>
                <ThemeToggle />
                
                {loading ? (
                    <div className="w-8 h-8 rounded-full bg-brand-muted/50 dark:bg-brand-muted/20 animate-pulse"></div>
                ) : user ? (
                    <UserButton afterSignOutUrl="/" />
                ) : (
                    <>
                        <SignInButton mode="modal">
                            <motion.button 
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className='text-brand-dark px-4 py-2 rounded-md hover:bg-brand-muted/30 cursor-pointer dark:text-brand-light dark:hover:bg-brand-muted/10 font-medium transition-colors'
                            >
                                Login
                            </motion.button>
                        </SignInButton>
                        <SignUpButton mode="modal">
                            <motion.button 
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className='bg-brand-accent text-white px-4 py-2 rounded-md hover:bg-brand-accent-hover cursor-pointer font-medium transition-colors'
                            >
                                Sign Up
                            </motion.button>
                        </SignUpButton>
                    </>
                )}
            </div>
        </motion.div>
    )
}

export default Navbar;