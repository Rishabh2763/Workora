import NavBar from '@/components/navbar'
import { Button } from '@/components/ui/button'
import React from 'react'
import Hero from '@/components/hero';
import CareerGuide from '@/components/career-guide';
const Home = () => {
  return (
    <div>
      <Hero/>
      <CareerGuide/>
    </div>
    
  )
}

export default Home