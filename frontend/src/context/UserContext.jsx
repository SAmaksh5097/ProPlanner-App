// src/context/UserContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';

// 1. Create the Context
const UserContext = createContext();

// 2. Create the Provider Component
export const UserProvider = ({ children }) => {
  // Grab the user data built into Clerk
  const { isLoaded, isSignedIn, user: clerkUser } = useUser();
  
  // Our custom state that we can expand later with MongoDB data
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isLoaded) {
      if (isSignedIn && clerkUser) {
        // Here, we just store the Clerk user. 
        // LATER: We can fetch MongoDB data here using clerkUser.id and merge them!
        setUser({
          id: clerkUser.id,
          fullName: clerkUser.fullName,
          firstName: clerkUser.firstName,
          imageUrl: clerkUser.imageUrl,
          email: clerkUser.primaryEmailAddress?.emailAddress,
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    }
  }, [isLoaded, isSignedIn, clerkUser]);

  return (
    <UserContext.Provider value={{ user, loading }}>
      {children}
    </UserContext.Provider>
  );
};

// 3. Create a Custom Hook to make using this context super easy
export const useCustomUser = () => {
  return useContext(UserContext);
};