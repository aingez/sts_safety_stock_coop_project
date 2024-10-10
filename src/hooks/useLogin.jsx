"use client";
import { useEffect } from "react";

const useLogin = () => {
  useEffect(() => {
    const login = async () => {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const k = urlParams.get("k");

      if (k != null) {
        const apiUrl =
          "https://devstm-euc.siamtoyota.co.th/GATEWAYLOCAL/api/v1/ssys/SSS010/VerifySubSystem?k=" +
          k;

        try {
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
          const welcomeApiUrl = `${process.env.NEXT_PUBLIC_STS_SAFETY_STOCK_FAST_API}/staff/welcome?id=${jsonData.UserName}&name=${jsonData.Email}`;
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
          console.error(
            "There was a problem with processing user operation:",
            error,
          );
        }
      }
    };

    login();
  }, []);
};

export default useLogin;
