import React from 'react'
import { Hero, Companies, Features,Properties, Steps, Blog, Testimonials } from '../components/home/index'

const Home = () => {
  return (
    <div>
      <Hero />
      <Companies />
     <Features />
      <Properties />
       <Steps />
      <Testimonials />
      <Blog />
    </div>
  )
}

export default Home