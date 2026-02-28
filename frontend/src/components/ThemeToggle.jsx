import {Moon, Sun} from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import { useTheme } from '../context/ThemeContext';
const ThemeToggle = () => {
    const {theme, toggle} = useTheme();

  return (
    <div className='flex'>
        <motion.button 
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.85, rotate: 180 }}
            className="rounded cursor-pointer p-1 text-brand-accent transition-all ease-in-out" 
            onClick={toggle}
        >
            <AnimatePresence mode="wait">
                {theme === "light" ? (
                    <motion.div
                        key="moon"
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <Moon className="h-6 w-6" />
                    </motion.div>
                ) : (
                    <motion.div
                        key="sun"
                        initial={{ rotate: 90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: -90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <Sun className="h-6 w-6" />
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.button>
    </div>
  )
}

export default ThemeToggle