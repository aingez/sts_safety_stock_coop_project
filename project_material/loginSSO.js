document.addEventListener("DOMContentLoaded",
    async function () {
        // get variable k from current url, append to api url
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const k = urlParams.get('k');
        const apiUrl = 'https://devstm-euc.siamtoyota.co.th/GATEWAYLOCAL/api/v1/ssys/SSS010/VerifySubSystem?k=' + k;

        try {
            // call api to get json data
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const jsonSSData = await response.json();

            const postData = { "Id": jsonSSData.Id, "Email": "", "Password": "" };

            // append json data to api url
            const apiUrlUserInfo = 'https://devstm-euc.siamtoyota.co.th/GATEWAYLOCAL/api/v1/auth/SSS010/GetUserInfoById?Id=' + jsonSSData.Id;
            // call api to get user info
            const userResponse = await fetch(apiUrlUserInfo);
            if (!userResponse.ok) {
                throw new Error('Network response was not ok');
            }
            // get json user info data
            const jsonData = await userResponse.json();
            certerLogin(jsonData.UserName)

            document.getElementById('jsonOutput').textContent = JSON.stringify(jsonData, null, 2);
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    }
);
