import { useState, useEffect } from "react";
import { MENU_CDN_URL } from "../utils/constants";

const useRestaurantMenu = (resId) => {
  const [resInfo, setResInfo] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMenu();
  }, [resId]);

  const fetchMenu = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${MENU_CDN_URL}${resId}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const json = await response.json();
      console.log("Fetched menu data:", json);
      setResInfo(json.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { resInfo, error, loading };
};

export default useRestaurantMenu;
