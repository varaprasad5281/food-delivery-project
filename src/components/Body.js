import React, { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import { MdStars } from "react-icons/md";
import { RES_CDN_URL } from "../constants";
import TopRestaurnats from "./TopRestaurants"


const Body = () => {
    const [resList, setRestaurantList] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredResList, setFilteredResList] = useState(null);

    useEffect(() => {
        getRestaurant();
    }, []); //If there is no dependency array then it will called after every render : If it is empty then it will be called once(only initial Render):if there is a dependency array then it will called every update inside the dependency array
    useEffect(() => {
        if (resList) {
            filterRestaurants();
        }else{
            <h1>Oh No! There is No Results Found</h1>
        }
    }, [resList, searchQuery]);

    async function getRestaurant() {
        try {
            const response = await fetch(RES_CDN_URL);
            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }
            const json = await response.json();
            console.log(json)
            setRestaurantList(json.data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    function filterRestaurants() {
        const filteredList = resList?.cards[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants?.filter(item =>
            item.info.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredResList(filteredList);
    }

    function handleSearchInputChange(event) {
        setSearchQuery(event.target.value);
    }

    if (loading) {
        return <Shimmer/>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    // Determine which list of restaurants to display based on search query
    const displayList = searchQuery.length > 0 ? filteredResList : resList?.cards[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants;

    return (
        <div className="main">
            < input className="input"
                type="text"
                placeholder="Search restaurant..."
                value={searchQuery}
                onChange={handleSearchInputChange}
            />
            <TopRestaurnats/>
            <div className="res-list">
            {displayList && displayList.map((item) => (

                <Link className="res-link" to={"/restaurants/"+item.info.id} key={item.info.id}>
                    <div className="res-card">
                       <div className="res-image-container"><img className="res-images" alt="res-img" src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/"+item.info.cloudinaryImageId} ></img></div>
                       <div className="card-body">
                          <p className="res-name">{item.info.name}</p>
                          <p className="res-rating"><MdStars className="rating-icon" /> {item?.info?.avgRating} - {item.info.sla.slaString}</p>
                          <h2 className="offer"> {item.info.aggregatedDiscountInfoV2?.header}</h2>
                          <p className="res-cuisines">{item.info.cuisines.join(", ")}</p>
                          <p className="res-area" key={item.id}> {item.info.areaName}</p>
                       </div>
                       
                    </div>
                </Link>
                
            ))}
        </div>
        </div>
        
    );
};

export default Body;
