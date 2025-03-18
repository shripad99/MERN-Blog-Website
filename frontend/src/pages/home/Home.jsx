import React, {useState, useEffect} from 'react'
import Navbar from '../../components/header/Navbar'
import { Footer } from '../../components/footer/Footer'
import { Category } from '../../components/category/Category'
import { Card } from "../../components/blog/Card"

const Home = () => {
  return (
    <>
     <Navbar />
     <Category />
     <Card />
     <Footer />
    </>
  )
}

export default Home