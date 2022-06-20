/* eslint-disable import/no-named-as-default */


const axios = require('axios');

const baseUrl = process.env.REACT_APP_FGR_BUDGET_BACKEND_URL;

class Plaid {

    static linktokencreate() {
        return new Promise(async (resolve, reject) => {
            try {
                let axiosConfig = getAxiosConfig()
                let url = baseUrl + '/plaid/linktokencreate'
                if (process.env.REACT_APP_PROJECT_ENV === 'sandbox') {
                    url += '?env=sandbox'
                }
                // console.log("linktokencreate::url", url)

                let response = await axios.get(url, axiosConfig);
                if (response.data == null) resolve(null);
                resolve(response.data.link_token);
            } catch (e) {
                reject(e.response.data.detail)
            }
        })
    }

    static connectbank(public_token, metadata) {
        return new Promise(async (resolve, reject) => {
            try {
                let axiosConfig = getAxiosConfig()

                let url = baseUrl + '/plaid/connectbank'
                if (process.env.REACT_APP_PROJECT_ENV === 'sandbox') {
                    url += '?env=sandbox'
                }
                // console.log("connectbank::url", url)
                let response = await axios.post(url, { public_token, metadata }, axiosConfig);
                if (response.data == null) resolve(null);
                // console.log("connectbank response.data: ", response.data)
                resolve(response.data);
            } catch (e) {
                console.log("e.response.data: ", e.response.data)
                reject(e.response.data.detail)
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

export default Plaid;