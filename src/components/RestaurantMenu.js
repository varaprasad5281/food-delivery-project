import React, { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import { MENU_CDN_URL } from "../constants";
import { MdStars } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RestaurantMenu = () => {
  const [resInfo, setResInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { resId } = useParams();

  useEffect(() => {
    fetchMenu();
  }, [resId]); // Run the effect when resId changes

  const fetchMenu = async () => {
    try {
      setLoading(true); // Set loading to true before fetching data
      const response = await fetch(`${MENU_CDN_URL}${resId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch menu");
      }
      const json = await response.json();
      console.log(json);
      setResInfo(json.data);
      setLoading(false); // Set loading to false after data is fetched
    } catch (error) {
      console.error("Error fetching menu:", error);
      setError(error.message);
      setLoading(false); // Set loading to false in case of error
    }
<<<<<<< HEAD
    
=======
  };
>>>>>>> 324756d408265cdb6a034d65a857dd33ec16b7c2

  const addItemMenu = (itemName) => {
    toast(`${itemName} Added Successfully`);
  };

  if (loading) return <Shimmer />;
  if (error) return <div>Error: {error}</div>;

  // Safely access nested properties with optional chaining
  const {
    name,
    city,
    areaName,
    cuisines = [],
    avgRating,
    costForTwoMessage,
    availabilityServiceabilityMessage,
    description,
  } = resInfo?.cards[2]?.card?.card?.info || {};

  const itemCards =
    resInfo?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card
      ?.itemCards || [];

  return (
    <div className="res-menu">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <h2>{name}</h2>
          <h4>
            {city} - {areaName}
          </h4>
          <p>
            {cuisines.join(", ")} - {costForTwoMessage}
          </p>
          <p>{availabilityServiceabilityMessage}</p>
          <p>{description}</p>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "5px",
            border: "1px solid #e9e9eb",
            padding: "8px",
            borderRadius: "6px",
            maxWidth: "60px",
          }}
        >
          <p style={{ fontWeight: "bold" }} className="rating-icon">
            {avgRating}{" "}
          </p>
          <MdStars className="rating-icon" />
        </div>
      </div>
      <br />
      <div className="divider"></div>
      <ul className="list-menu">
        {itemCards.length > 0 ? (
          itemCards.map((item, index) => (
            <div key={`${item.card.info.id}-${index}`}>
              <div className="menu-list">
                <div className="menu-details">
                  {item.card.info.ribbon?.text && (
                    <h4 className="badge">{item.card.info.ribbon.text}</h4>
                  )}
                  <h3 className="item-name">{item.card.info.name}</h3>
                  <p className="item-cost">
                    Rs.{" "}
                    {item.card.info.price / 100 ||
                      item.card.info.price ||
                      "Not Available"}
                  </p>
                  <p>{item.card.info.description}</p>
                </div>
                <div className="res-menu-image">
                  <div className="res-menu-img">
                    {item.card.info.imageId && (
                      <img
                        src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${item.card.info.imageId}`}
                        alt="menu-img"
                        className="menu-image"
                      />
                    )}
                  </div>
                  <button
                    className="add-item"
                    onClick={() => addItemMenu(item.card.info.name)}
                  >
                    ADD
                  </button>
                  <ToastContainer className="toast-container" />
                </div>
              </div>
              <div className="menu-divider"></div>
            </div>
          ))
        ) : (
          <h1 style={{ textAlign: "center", color: "red" }}>
            This restaurant is not available at this moment
          </h1>
        )}
      </ul>
    </div>
  );
};

export default RestaurantMenu;
