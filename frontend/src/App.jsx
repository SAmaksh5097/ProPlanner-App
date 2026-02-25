import React from 'react'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

const App = () => {
  return (
    <div className='bg-gray-100 min-h-screen w-screen dark:bg-gray-900 dark:text-white'>
      <Navbar/>
      <Home/>
      <Footer/>
      
    </div>
  )
}

export default App
