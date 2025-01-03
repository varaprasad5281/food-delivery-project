import React, { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import { MdStars } from "react-icons/md";
import { RES_CDN_URL } from "../utils/constants";
import TopRestaurants from "./TopRestaurants";
import useOnline from "../utils/useOnline";
import useGeoLocation from "../utils/useGeoLocation";

const Body = () => {
  const [resList, setRestaurantList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredResList, setFilteredResList] = useState([]);
  const [showTopRated, setShowTopRated] = useState(false);

  const onlineStatus = useOnline();

  // User Location Custom
  const location = useGeoLocation();
  console.log("location deatils", location);

  useEffect(() => {
    getRestaurant();
  }, []);

  useEffect(() => {
    if (resList.length > 0) {
      filterRestaurants();
    }
  }, [resList, searchQuery, showTopRated]);

  async function getRestaurant() {
    try {
      const response = await fetch(RES_CDN_URL);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const json = await response.json();
      console.log("Fetched restaurant data:", json);

      const restaurants =
        json?.data?.cards?.find(
          (card) => card?.card?.card?.gridElements?.infoWithStyle?.restaurants
        )?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];
      setRestaurantList(restaurants);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching restaurant data:", error);
      setError(error.message);
      setLoading(false);
    }
  }

  function filterRestaurants() {
    let filteredList = resList;
    if (searchQuery) {
      filteredList = filteredList.filter((item) =>
        item.info.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (showTopRated) {
      filteredList = filteredList.filter((item) => item.info.avgRating > 4.2);
    }
    console.log("Filtered restaurants:", filteredList);
    setFilteredResList(filteredList);
  }

  function handleSearchInputChange(event) {
    setSearchQuery(event.target.value);
  }

  function handleShowTopRated() {
    setShowTopRated((prevState) => !prevState);
  }

  if (loading) {
    return <Shimmer />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const displayList =
    searchQuery.length > 0 || showTopRated ? filteredResList : resList;

  if (displayList.length === 0) {
    return <h1>Oh No! There are No Results Found</h1>;
  }

  if (onlineStatus === false) {
    return (
      <h1 className="online-status">
        Looks like you are offline, Please check your Internet Connection !!
      </h1>
    );
  }

  return (
    <div className="main">
      <div className="filter-section">
        <input
          className="input"
          type="text"
          placeholder="Search restaurant..."
          value={searchQuery}
          onChange={handleSearchInputChange}
        />
        <button className="filter-btn" onClick={handleShowTopRated}>
          {showTopRated ? "Show All Restaurants" : "Show Top Rated Restaurants"}
        </button>
      </div>

      <TopRestaurants />
      <div className="res-list">
        {displayList.map((item) => (
          <Link
            className="res-link"
            to={"/restaurants/" + item.info.id}
            key={item.info.id}
          >
            <div className="res-card">
              <div className="res-image-container">
                <img
                  className="res-images"
                  alt="res-img"
                  loading="lazy"
                  src={
                    "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/" +
                    item.info.cloudinaryImageId
                  }
                />
              </div>
              <div className="card-body">
                <p className="res-name">{item.info.name}</p>
                <p className="res-rating">
                  <MdStars className="rating-icon" /> {item?.info?.avgRating} -{" "}
                  {item.info.sla.slaString}
                </p>
                <h2 className="offer">
                  {item.info.aggregatedDiscountInfoV2?.header}
                </h2>
                <p className="res-cuisines">{item.info.cuisines.join(", ")}</p>
                <p className="res-area" key={item.id}>
                  {item.info.areaName}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;
