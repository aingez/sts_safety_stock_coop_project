"use client";

import React, { useState, useEffect } from "react";
import QuantityDisplay from "../components/qtyDisp";
import ReusableTable from "../components/alertTable";
import LayoutDisplay from "../components/warehouseDisp";
import LatestUnpack from "../components/latestUnpack";
import LatestPack from "../components/latestPack";

const login = async () => {
  // get variable k from current url, append to api url
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const k = urlParams.get("k");
  const apiUrl =
    "https://devstm-euc.siamtoyota.co.th/GATEWAYLOCAL/api/v1/ssys/SSS010/VerifySubSystem?k=" +
    k;

  try {
    // call api to get json data
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const jsonSSData = await response.json();
    const postData = { Id: jsonSSData.Id, Email: "", Password: "" };
    const apiUrlUserInfo =
      "https://devstm-euc.siamtoyota.co.th/GATEWAYLOCAL/api/v1/auth/SSS010/GetUserInfoById?Id=" +
      jsonSSData.Id;
    const userResponse = await fetch(apiUrlUserInfo);
    if (!userResponse.ok) {
      throw new Error("Network response was not ok");
    }
    const jsonData = await userResponse.json();
    sessionStorage.setItem("userEmail", jsonData.Email);
    sessionStorage.setItem("userId", jsonData.UserName);
    const welcomeApiUrl = `http://127.0.0.1:8000/staff/welcome?id=${jsonData.UserName}&name=${jsonData.Email}`;
    const welcomeResponse = await fetch(welcomeApiUrl, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });
    if (!welcomeResponse.ok) {
      throw new Error("Network response was not ok");
    }
    const welcomeData = await welcomeResponse.json();
    console.log("Welcome data:", welcomeData);
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
};

function HomePage() {
  const [isMobile, setIsMobile] = useState(false);
  const [layoutApiData, setLayoutApiData] = useState("");
  const [plantType, setPlantType] = useState("Engine");
  const [plantId, setPlantId] = useState(1);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    login();
    if (typeof window !== "undefined") {
      const storedPlantType = localStorage.getItem("plantType") || "Engine";
      const storedPlantId = Number(localStorage.getItem("plantId")) || 1;
      setPlantType(storedPlantType);
      setPlantId(storedPlantId);
    }
    setIsInitialized(true);
  }, []);

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

  useEffect(() => {
    if (isInitialized) {
      fetchLayoutData();
    }
  }, [isInitialized, plantType, plantId]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1440);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!isInitialized) {
    return <div className="min-h-screen pb-20">Loading...</div>;
  }

  return (
    <div className="min-h-screen pb-20">
      <div
        className={`flex ${isMobile ? "flex-col space-x-0" : "flex-row space-x-5"}`}
      >
        <div className={`custom-box-3`}>
          <h2 className="custom-title-2">Overview</h2>
          <div className="flex-none overflow-scroll">
            <QuantityDisplay />
          </div>
        </div>
        <div className="custom-box-3 flex w-full flex-col overflow-scroll">
          <h2 className="custom-title-2">Reminder :</h2>
          <ReusableTable pageSize={3} />
        </div>
      </div>
      <div className="custom-box-2">
        <div className="flex flex-row space-x-10"></div>
        {layoutApiData !== "" ? (
          <div>
            <div className="flex-none">
              <LayoutDisplay
                key={JSON.stringify(layoutApiData)}
                inputData={layoutApiData}
              />
            </div>
            {/* <div className="custom-box-title-1">for debug</div>
            {JSON.stringify(layoutApiData)} */}
          </div>
        ) : (
          <div className="flex-none">Loading . . .</div>
        )}
      </div>
      <div
        className={`custom-box-3 flex ${isMobile ? "flex-col space-x-0" : "flex-row space-x-5"}`}
      >
        <LatestUnpack />
        <LatestPack />
      </div>
    </div>
  );
}

export default HomePage;
