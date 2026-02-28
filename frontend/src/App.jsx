import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';

import Home from './pages/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import UserDashboard from './pages/UserDashboard';
import ProjectDashboard from './pages/ProjectDashboard';
import CreateProject from './pages/CreateProject';

const ProtectedRoute = ({ children }) => {
  return (
    <>
      <SignedIn>
        {children} 
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn /> 
      </SignedOut>
    </>
  );
};

const App = () => {
  return (
    <div className='bg-brand-light min-h-screen w-full flex flex-col dark:bg-brand-dark dark:text-brand-light transition-colors duration-300'>
      
      <Navbar />
      
      <main className='flex-grow'>
        <Routes>
          {/* Public Route - Anyone can see the landing page */}
          <Route path='/' element={<Home />} />
          
          {/* Protected Routes - Wrap the element in <ProtectedRoute> */}
          <Route 
            path='/user-dashboard' 
            element={
              <ProtectedRoute>
                <UserDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path='/project-dashboard/:id' 
            element={
              <ProtectedRoute>
                <ProjectDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path='/create-project' 
            element={
              <ProtectedRoute>
                <CreateProject />
              </ProtectedRoute>
            } 
          />
          
          {/* 404 Route */}
          <Route 
            path='*' 
            element={<div className="flex items-center justify-center h-full mt-20 text-2xl font-bold">404 - Page Not Found</div>} 
          />
        </Routes>
      </main>
      
      <Footer />
      
    </div>
  );
}

export default App;