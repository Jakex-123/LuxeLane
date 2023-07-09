import React from 'react'
import CartMenu from '../Global/CartMenu'
import Item from '../../Components/Item'
import MCarousel from './MCarousel'
import ShoppingList from '../Global/ShoppingList'
import Subscribe from './Subscribe'
import Footer from '../Global/Footer'

function Home() {
    return (
        <div className='home'>
            <MCarousel />
            <ShoppingList/>
            <Subscribe/>
            <Footer/>
        </div>

    )
}

export default Home