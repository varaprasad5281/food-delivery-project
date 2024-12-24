import React from "react";
import { useLocation } from "react-router-dom";

const ItemList = ({ items, handleAddItem }) => {
  const currentLocation = useLocation();
  const isPath = currentLocation.pathname === "/cart";
  console.log(isPath);
  console.log(currentLocation);
  const totalPrice = items.reduce(
    (acc, curr) => acc + (curr?.card?.info?.price || 0),
    0
  );
  if (items.filter) console.log("Total price", totalPrice);
  return (
    <div>
      <div className="item-description">
        {items &&
          items.map((item, index) => (
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
                    onClick={() => handleAddItem(item)}
                  >
                    ADD
                  </button>
                </div>
              </div>
              <div className="menu-divider"></div>
            </div>
          ))}
        {isPath ? (
          <>
            <div className="price-bar">
              <h2>Total Price: </h2>
              <h2>Rs. {totalPrice / 100}</h2>
            </div>
          </>
        ) : null}

        <div className="menu-divider"></div>
      </div>
    </div>
  );
};

export default ItemList;
