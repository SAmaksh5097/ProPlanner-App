import { useState } from 'react'
import { LaptopMinimalCheck, Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import ThemeToggle from './ThemeToggle'
import { SignInButton, SignUpButton, UserButton } from '@clerk/clerk-react'
import { Link } from 'react-router-dom'
import { useCustomUser } from '../context/UserContext'

const Navbar = () => {
    const { user, loading } = useCustomUser();
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <motion.nav 
            initial={{ y: -60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className='w-full text-brand-dark bg-brand-light dark:bg-brand-dark dark:text-brand-light transition-colors duration-300 border-b border-brand-muted/30 dark:border-brand-muted/10 shadow-xl relative z-50'
        >
            {/* ─── Desktop & Mobile Top Bar ─── */}
            <div className="flex items-center justify-between px-4 py-3 sm:px-6">
                <Link to={'/'} onClick={() => setMobileOpen(false)}>
                    <motion.div 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className='flex gap-2 text-xl sm:text-2xl font-bold items-center'
                    >
                        <LaptopMinimalCheck className='w-8 h-8 sm:w-10 sm:h-10 text-brand-accent' />
                        <h1>ProPlanner</h1>
                    </motion.div>
                </Link>

                {/* Desktop Nav Links */}
                <div className="hidden md:block">
                    <ul className='flex gap-6 font-medium items-center'>
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

                {/* Desktop Auth + Theme */}
                <div className='hidden md:flex gap-4 items-center'>
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

                {/* Mobile: Theme + Hamburger */}
                <div className="flex md:hidden items-center gap-3">
                    <ThemeToggle />
                    {!loading && user && <UserButton afterSignOutUrl="/" />}
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="p-1.5 rounded-lg hover:bg-brand-muted/20 dark:hover:bg-brand-muted/10 transition-colors"
                        aria-label="Toggle menu"
                    >
                        {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* ─── Mobile Slide-down Menu ─── */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                        className="md:hidden overflow-hidden border-t border-brand-muted/20 dark:border-brand-muted/10"
                    >
                        <div className="flex flex-col gap-1 px-4 py-3">
                            <a
                                href="#features"
                                onClick={() => setMobileOpen(false)}
                                className="py-2.5 px-3 rounded-lg font-medium hover:bg-brand-muted/15 dark:hover:bg-brand-muted/10 hover:text-brand-accent transition-colors"
                            >
                                Features
                            </a>
                            {user && (
                                <Link
                                    to="/user-dashboard"
                                    onClick={() => setMobileOpen(false)}
                                    className="py-2.5 px-3 rounded-lg font-medium hover:bg-brand-muted/15 dark:hover:bg-brand-muted/10 hover:text-brand-accent transition-colors"
                                >
                                    Dashboard
                                </Link>
                            )}
                            
                            {!loading && !user && (
                                <div className="flex gap-3 pt-2 mt-1 border-t border-brand-muted/15 dark:border-brand-muted/10">
                                    <SignInButton mode="modal">
                                        <button className='flex-1 text-brand-dark dark:text-brand-light px-4 py-2.5 rounded-lg hover:bg-brand-muted/20 dark:hover:bg-brand-muted/10 font-medium transition-colors'>
                                            Login
                                        </button>
                                    </SignInButton>
                                    <SignUpButton mode="modal">
                                        <button className='flex-1 bg-brand-accent text-white px-4 py-2.5 rounded-lg hover:bg-brand-accent-hover font-medium transition-colors'>
                                            Sign Up
                                        </button>
                                    </SignUpButton>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    )
}

export default Navbar;