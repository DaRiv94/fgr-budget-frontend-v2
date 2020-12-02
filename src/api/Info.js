/* eslint-disable import/no-named-as-default */
const axios = require('axios');

const baseUrl = process.env.REACT_APP_FGR_BUDGET_BACKEND_URL;

class Info {

    static getbackendhealth(api_url) {
        return new Promise(async (resolve, reject) => {
            console.log("getbackendhealth api_url: ", api_url)
            let response = {}
            try {
                let axiosConfig = {
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8',
                        "Access-Control-Allow-Origin": "*"
                    }
                };

                response = await axios.get(api_url, axiosConfig);
                if (response.data == null) resolve(null);
                resolve(response.data);
            } catch (e) {
                reject({ Error: e, response: response })
            }
        })
    }

    static getUserData() {
        return new Promise(async (resolve, reject) => {
            let response = {}
            try {
                let axiosConfig = getAxiosConfig()
                response = await axios.get(baseUrl + '/info/user', axiosConfig);
                if (response.data == null) resolve(null);
                // console.log("getUserData response data",response.data);
                resolve(response.data);
            } catch (e) {
                reject({ Error: e, response: response })
            }
        })
    }

    static getAllBanks() {
        return new Promise(async (resolve, reject) => {
            let response = {}
            try {
                let axiosConfig = getAxiosConfig()
                response = await axios.get(baseUrl + '/info/banks', axiosConfig);
                if (response.data == null) resolve(null);
                // console.log("response data",response.data);
                resolve(response.data);
            } catch (e) {
                reject({ Error: e, response: response })
            }
        })
    }

    static getBudgets() {
        return new Promise(async (resolve, reject) => {
            let response = {}
            try {
                let axiosConfig = getAxiosConfig()
                response = await axios.get(baseUrl + '/budget', axiosConfig);
                if (response.data == null) resolve(null);
                // console.log("response data",response.data);  
                resolve(response.data);
            } catch (e) {
                reject({ Error: e, response: response })
            }
        })
    }

    static getAllTransactions() {
        return new Promise(async (resolve, reject) => {
            let response = {}
            try {
                let axiosConfig = getAxiosConfig()
                response = await axios.get(baseUrl + '/info/transactions', axiosConfig);
                if (response.data == null) resolve(null);
                // console.log("response data",response.data);
                resolve(response.data);
            } catch (e) {
                reject({ Error: e, response: response })
            }
        })
    }



    static getSummary(month = null) {
        return new Promise(async (resolve, reject) => {
            let response = {}
            try {
                let axiosConfig = getAxiosConfig()
                response = await axios.get(baseUrl + '/info/monthly-summary?month=' + month, axiosConfig);
                if (response.data == null) resolve(null);
                // console.log("response data",response.data);
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