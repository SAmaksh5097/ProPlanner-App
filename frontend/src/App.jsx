import React from 'react'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import UserDashboard from './pages/UserDashboard'
import PlanDashboard from './pages/PlanDashboard'
import CreateProject from './pages/CreateProject'

const App = () => {
  return (
    <div className='bg-gray-100 min-h-screen w-screen dark:bg-gray-900 dark:text-white'>
      <div>
        <Navbar/>
      </div>
      <div>
        {/* <UserDashboard/> */}
        {/* <PlanDashboard/> */}
        <CreateProject/>
      </div>
      <div>
        <Footer/>
      </div>
      {/* <Home/> */}
      
    </div>
  )
}

export default App
