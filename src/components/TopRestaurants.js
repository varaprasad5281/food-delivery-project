import { useEffect, useState } from "react";

const TopRestaurants=()=>{
    const[topRest,setTopRest]=useState()

    useEffect(()=>{
        getTopRes()
    },[])

    const getTopRes=async()=>{
        const data=await fetch("")

    }
    return(
        <div>
            <h1>Top Restaurants</h1>
        </div>
    )
}
export default TopRestaurants;