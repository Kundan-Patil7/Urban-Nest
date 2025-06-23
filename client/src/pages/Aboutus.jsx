import React, { useEffect } from 'react';
import {Hero, Mission, Values, Benefits,Team, Milestones} from '../components/about/index';


const About = () => {
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
  
    return (
      <div className="overflow-hidden">
        <Hero />
        <Mission />
        <Values />
        <Team />
        <Benefits />
        <Milestones />
      </div>
    )
  }
  
  export default About