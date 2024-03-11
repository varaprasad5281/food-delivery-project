import React, { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import {useParams} from 'react-router-dom'
import { MENU_CDN_URL } from "../constants";
import { MdStars } from "react-icons/md";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';


const RestaurantMenu=()=>{

    const[resInfo,setResInfo]=useState(null)
    const[addItem,setAddItem]=useState(0)

const {resId}=useParams()



    useEffect(()=>{
        fetchMenu()

    },[])

    const fetchMenu=async()=>{
        const data= await fetch(MENU_CDN_URL+resId)
        const json=await data.json()
        console.log(json)
        setResInfo(json.data)
    }

    const addItemMenu=(itemName)=>{
        setAddItem(addItem+1)
        alert(`${itemName} added Successfully`)
        // toast(`${itemName} added Successfully`)

    }
    if(resInfo===null) return <Shimmer/>;
    const{name,city,areaName,cuisines,avgRating,costForTwoMessage,availabilityServiceabilityMessage,description}=resInfo?.cards[2]?.card?.card?.info;
    const{itemCards}=resInfo?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card;
    console.log(itemCards)
    return(
        <div className="res-menu">
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div>
              <h2>{name}</h2>
              <h4>{city} - {areaName}</h4>
              <p>{cuisines.join(" , ")} - {costForTwoMessage}</p>
               {/* <p>{itemCards.info.sla.lastMileTravelString}</p> */}
              <p>{availabilityServiceabilityMessage}</p>
              <p>{description}</p>
            </div>
           <div style={{display:"flex",justifyContent:"center",alignItems:"center",gap:"5px",border: "1px solid #e9e9eb",padding:"8px",borderRadius:"6px",maxWidth:"60px"}}>
              <p style={{fontWeight:"bold"}} className="rating-icon">{avgRating} </p>
              <MdStars className="rating-icon"/>

           </div>
           {/* <h2>{addItem} {itemCards.MENU_CDN_URL}</h2> */}

            </div>
            
           <br>
           </br>
           <div className="divider"></div>
           <ul className="list-menu">
            {itemCards?(
                itemCards.map((item,index)=>(
                    <div key={`${item.card.info.id }-${index}`}>
                        <div className="menu-list">
                           <div className="menu-details">
                              <h4 className="badge">{item.card.info.ribbon.text}</h4>
                              <h3 className="item-name" key={item.card.info.id}>{item.card.info.name}</h3>
                              <p className="item-cost" key={item.card.info.id}>Rs. {(item.card.info.price/100) || item.card.info.price || "Not Available"}</p>
                              <p>{item.card.info.description}</p>
                            </div>
                            <div className="res-menu-image">
                            <div className="res-menu-img"><img src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/"+item.card.info.imageId} alt="menu-img" className="menu-image"></img></div>
                            <button className="add-item" onClick={()=>addItemMenu(item.card.info.name)}>ADD</button>
                            {/* <ToastContainer/> */}
                            </div>
                            
                        </div>
                        <div className="menu-divider"></div>

                    </div>

                )))
                :(
                    <h1 style={{textAlign:"center",color:"red"}}>This restaurant is not available at this moment</h1>
                )
            }

           </ul>
           
           
        </div>
    )
}
export default RestaurantMenu;