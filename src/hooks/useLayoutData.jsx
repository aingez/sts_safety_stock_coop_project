// hooks/useLayoutData.js
import { useState, useEffect } from "react";

const useLayoutData = (plantType, plantId, isInitialized) => {
  const [layoutApiData, setLayoutApiData] = useState("");

  useEffect(() => {
    const fetchLayoutData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_STS_SAFETY_STOCK_FAST_API}/warehouse/layout/${plantType}/${plantId}`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
            },
          },
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setLayoutApiData(data["data"]);
      } catch (error) {
        console.error("Error fetching layout data:", error);
      }
    };

    if (isInitialized) {
      fetchLayoutData();
    }
  }, [isInitialized, plantType, plantId]);

  return layoutApiData;
};

export default useLayoutData;
