import React from 'react';
import { useParams } from 'react-router-dom';
import { MdStars } from 'react-icons/md';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useRestaurantMenu from '../utils/useResturantMenu';
import Shimmer from './Shimmer';
import useOnline from '../utils/useOnline';
import ItemList from './ItemList'; // Import the new ItemList component
import { useDispatch } from 'react-redux';
import { addItem } from '../utils/cartSlice';

const RestaurantMenu = () => {
  const { resId } = useParams();
  const { resInfo, error, loading } = useRestaurantMenu(resId);
  const onlineStatus = useOnline();
  const dispatch = useDispatch();

  const handleAddItem = (item) => {
    dispatch(addItem(item));
    toast(`${item.card.info.name} Added Successfully`);
  };

  if (loading) return <Shimmer />;
  if (error) return <div>Error: {error}</div>;

  const {
    name,
    city,
    areaName,
    cuisines = [],
    avgRating,
    costForTwoMessage,
    availabilityServiceabilityMessage,
    description,
  } = resInfo?.cards?.find(card => card?.card?.card?.info)?.card?.card?.info || {};

  const itemCards =
    resInfo?.cards?.find(card => card?.groupedCard?.cardGroupMap?.REGULAR)?.groupedCard?.cardGroupMap?.REGULAR?.cards?.find(card => card?.card?.card?.itemCards)?.card?.card?.itemCards || [];

  if (onlineStatus === false) {
    return <h1 className="online-status">Looks like you are offline, Please check your internet connection</h1>;
  }

  return (
    <div className="res-menu">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2>{name}</h2>
          <h4>{city} - {areaName}</h4>
          <p>{cuisines.join(', ')} - {costForTwoMessage}</p>
          <p>{availabilityServiceabilityMessage}</p>
          <p>{description}</p>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '5px', border: '1px solid #e9e9eb', padding: '8px', borderRadius: '6px', maxWidth: '60px' }}>
          <p style={{ fontWeight: 'bold' }} className="rating-icon">{avgRating} </p>
          <MdStars className="rating-icon" />
        </div>
      </div>
      <br />
      <div className="divider"></div>
      <ItemList items={itemCards} handleAddItem={handleAddItem} />
      <ToastContainer className="toast-container" />
    </div>
  );
};

export default RestaurantMenu;
