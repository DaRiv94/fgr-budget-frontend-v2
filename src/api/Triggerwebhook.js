/* eslint-disable import/no-named-as-default */


const axios = require('axios');

const baseUrl = process.env.REACT_APP_FGR_BUDGET_BACKEND_URL;

class Info {

    static triggerwebhook(item_id) {
        return new Promise(async (resolve, reject) => {
            let response = {}
            try {
                let axiosConfig = getAxiosConfig()
                response = await axios.post(baseUrl + '/triggerwebhook', { item_id }, axiosConfig);
                if (response.data == null) resolve(null);
                // console.log("triggerwebhook response data",response.data);
                resolve(response.data);
            } catch (e) {
                reject({ Error: e, response: response })
            }
        })
    }

}

function getAxiosConfig() {
    let jwtStringToken = sessionStorage.getItem('token');
    let token = JSON.parse(jwtStringToken);

    let axiosConfig = {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*",
            "x-auth-token": token
        }
    };
    return axiosConfig;
}

export default Info;