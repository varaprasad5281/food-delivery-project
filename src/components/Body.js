import React, { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";

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
            const response = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=17.37240&lng=78.43780&page_type=DESKTOP_WEB_LISTING");
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
            <div className="res-list">
            
            {displayList.map((item) => (
                <Link className="res-link" to={"/restaurants/"+item.info.id} key={item.info.id}><div className="res-card">
                    <img className="res-images" alt="res-img" src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_100,h_100,c_fill/"+item.info.cloudinaryImageId} ></img>
                    <h3>{item.info.name}</h3>
                    <h4 key={item.id}> {item.info.areaName}</h4>
                    <h2 className="offer"> {item.info.aggregatedDiscountInfoV2.header}</h2>
                    <div className="card-bottom">
                        <h4> {item?.info?.avgRating}</h4>
                        <h4> {item.info.costForTwo}</h4>
                    <h4>{item.info.sla.deliveryTime} Mins</h4>

                    </div>
                    <p>{item.info.cuisines.join(", ")}</p>

                </div>
                </Link>
            ))}
        </div>
        </div>
        
    );
};

export default Body;
