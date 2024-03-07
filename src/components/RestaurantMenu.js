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
        const data= await fetch("https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=17.4367684&lng=78.40071019999999&restaurantId="+resId)
        const json=await data.json()
        console.log(json)
        setResInfo(json.data)
    }
    if(resInfo===null) return <Shimmer/>;
    const{name,city,areaName,cuisines,avgRating,costForTwoMessage,availabilityServiceabilityMessage}=resInfo?.cards[2]?.card?.card?.info;
    const{itemCards}=resInfo?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card
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
                    <React.Fragment>
                        <div className="menu-list">
                           <div className="menu-details">
                              <h4 className="badge">{item.card.info.ribbon.text}</h4>
                              <li key={item.card.info.id}>{item.card.info.name}</li>
                              <h3 key={item.card.info.id}>Rs. {(item.card.info.price/100) || item.card.info.price || "Not Available"}</h3>
                              <p>{item.card.info.description}</p>
                            </div>
                            <img src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/"+item.card.info.imageId} alt="menu-image" className="menu-image"></img>
                        </div>
                        <hr/>
                    </React.Fragment>
                    

                )
            })}

           </ul>
           
           
        </div>
    )
}
export default RestaurantMenu;