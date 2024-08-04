import React, { useState } from 'react'
import ItemList from './ItemList'
import { useSearchParams } from 'react-router-dom'

const RestaurantCategory = ({ data,showItems,setShowIndex }) => {
    // const[showMenu,setShowMenu]=useState(false)
    const handleClick=()=>{
        setShowIndex()

    }
    return (
        <div className='item-category'>
            <div onClick={handleClick}>
                <span>{data.title} ({data.itemCards.length})</span>
                <span>🔻</span>
            </div>

            {showItems && <ItemList items={data.itemCards} />}
        </div>
    )
}

export default RestaurantCategory