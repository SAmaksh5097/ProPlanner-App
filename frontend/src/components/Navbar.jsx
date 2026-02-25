import React from 'react'
import {LaptopMinimalCheck} from 'lucide-react'
import ThemeToggle from './ThemeToggle'
import {SignInButton, SignUpButton} from '@clerk/clerk-react'
const Navbar = () => {
  return (
    <div className='bg-white text-black flex items-center justify-between shadow-md p-4 dark:bg-gray-800 dark:text-white'>
        <div className='flex gap-2 text-2xl font-bold items-center'>
            <LaptopMinimalCheck className='w-10 h-10' />
            <h1 >ProPlanner</h1>
        </div>
        <div >
            <ul className='flex gap-4'>
                <li><a href="#features">Features</a></li>
                {/* <li>Features</li> */}
                <li>About</li>
            </ul>
        </div>
        <div className='flex gap-4 items-center'>
            <ThemeToggle />
            <SignInButton/>
            <SignUpButton/>
            {/* <button className=' text-black px-2 py-1 rounded-md hover:bg-gray-200 cursor-pointer dark:text-white dark:hover:bg-gray-700 '>Login</button> */}
                {/* <button className='bg-blue-500 text-white px-2 py-1 rounded-md ml-2 hover:bg-blue-600 cursor-pointer dark:bg-blue-600 dark:hover:bg-blue-700'>Sign Up</button> */}
        </div>
    </div>
  )
  
}

export default Navbar
