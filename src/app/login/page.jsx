"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Login = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const { k } = router.query; // Get the 'k' parameter from the URL
      if (!k) return;

      const apiUrl = `https://devstm-euc.siamtoyota.co.th/GATEWAYLOCAL/api/v1/ssys/SSS010/VerifySubSystem?k=${k}`;

      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const jsonSSData = await response.json();

        const postData = { Id: jsonSSData.Id, Email: "", Password: "" };
        const apiUrlUserInfo = `https://devstm-euc.siamtoyota.co.th/GATEWAYLOCAL/api/v1/auth/SSS010/GetUserInfoById?Id=${jsonSSData.Id}`;

        const userResponse = await fetch(apiUrlUserInfo);
        if (!userResponse.ok) {
          throw new Error("Network response was not ok");
        }

        const jsonData = await userResponse.json();
        setUserData(jsonData); // Store user data
        // certerLogin(jsonData.UserName); // Implement your login logic here
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
        setError("Failed to login");
      }
    };

    fetchData();
  }, [router.query]); // Fetch data when the query params are available

  return (
    <div>
      <h1>Login Page</h1>
      {error && <p>Error: {error}</p>}
      {userData ? (
        <pre id="jsonOutput">{JSON.stringify(userData, null, 2)}</pre>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Login;
