import React, { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import {useParams} from 'react-router-dom'


const RestaurantMenu=()=>{

    const[resInfo,setResInfo]=useState(null)

const {resId}=useParams()



    useEffect(()=>{
        fetchMenu()

    },[])

    const fetchMenu=async()=>{
        const data= await fetch("https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=17.37240&lng=78.43780&restaurantId="+resId)
        const json=await data.json()
        console.log(json)
        setResInfo(json.data)
    }
    if(resInfo===null) return <Shimmer/>;
    const{name,city,areaName,cuisines,avgRating,costForTwoMessage,availabilityServiceabilityMessage}=resInfo.cards[2].card.card.info;
    const{itemCards}=resInfo.cards[5].groupedCard.cardGroupMap.REGULAR.cards[2].card.card
    console.log(itemCards)
    return(
        <div>
           <h1>This is restaurant Menu</h1>
           <h1>{name}</h1>
           <h3>{city} - {areaName}</h3>
           <p>{cuisines.join(" , ")} - {costForTwoMessage}</p>
           <p>{avgRating}</p>
           <p>{availabilityServiceabilityMessage}</p>
           <ul>
            {itemCards.map((item)=>{
                return(
                    <li key={item.card.info.id}>{item.card.info.name} - Rs. {(item.card.info.price/100) || item.card.info.price || 0}</li>
                )
            })}

           </ul>
           
           
        </div>
    )
}
export default RestaurantMenu;