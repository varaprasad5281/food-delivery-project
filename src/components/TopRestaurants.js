import { useEffect, useState } from "react";
import { RES_CDN_URL } from "../utils/constants";

const TopRestaurants = () => {
  const [topRest, setTopRest] = useState([]);

  useEffect(() => {
    getTopRes();
  }, []);

  const getTopRes = async () => {
    const data = await fetch(RES_CDN_URL);
    const json = await data.json();
    console.log(json);
    setTopRest(json.data);
  };
  return (
    <div>
      <h1>Available Restaurants</h1>
    </div>
  );
};
export default TopRestaurants;
