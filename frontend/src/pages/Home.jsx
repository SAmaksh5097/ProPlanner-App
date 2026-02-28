import React from 'react'
import AnimatedBackground from '../components/AnimatedBackground'
import HeroSection from '../components/HeroSection'
import Features from '../components/Features'

const Home = () => {
  return (
    <AnimatedBackground>
      <HeroSection/>
      <Features/>
    </AnimatedBackground>
  )
}

export default Home
