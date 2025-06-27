import React from 'react'
import { Hero } from '../Components/Hero/Hero'
import Stats from '../Components/Stats/Stats'
import ProjectList from '../Components/Project/ProjectList'

export const Home = () => {
  return (
      <div className=''>
      <Hero />
      <Stats />
      <ProjectList />
      </div>
  )
}
