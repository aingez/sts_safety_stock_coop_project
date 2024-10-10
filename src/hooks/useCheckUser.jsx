import { useEffect } from "react";

const useAuthRedirect = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const userEmail = sessionStorage.getItem("userEmail");
      const userId = sessionStorage.getItem("userId");

      // Check if userEmail or userId is missing
      if (!userEmail || !userId) {
        // Redirect to login page
        window.location.href =
          "https://devstm-euc.siamtoyota.co.th/scs/#/s/home";
      }
    }
  }, []);
};

export default useAuthRedirect;
