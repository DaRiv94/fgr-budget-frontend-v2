/* eslint-disable import/no-named-as-default */


const axios = require('axios');


const baseUrl = process.env.REACT_APP_FGR_BUDGET_BACKEND_URL;

class CategoryTransaction {

    static getAllCategoryTransaction() {
        return new Promise(async (resolve, reject) => {
            let response = {}
            try {
                let axiosConfig = getAxiosConfig()
                response = await axios.get(baseUrl + '/categorytransaction/', axiosConfig);
                if (response.data == null) resolve(null);
                // console.log("getAllCategoryTransaction response data",response.data);
                resolve(response.data);
            } catch (e) {
                reject({ Error: e, response: response })
            }
        })
    }

    static CreateACategoryTransaction(category_id, transaction_id) {
        return new Promise(async (resolve, reject) => {
            let response
            try {
                let axiosConfig = getAxiosConfig()
                response = await axios.post(baseUrl + '/categorytransaction/', { category_id, transaction_id }, axiosConfig);
                if (response.data == null) resolve(null);
                // console.log("CreateACategoryTransaction response data",response.data);
                resolve(response.data);
            } catch (e) {
                console.log("Error:", e)
                reject({ Error: e, response: response })

            }
        })
    }

    static DeleteACategoryTransaction(id) {
        return new Promise(async (resolve, reject) => {
            let response = {}
            try {
                let axiosConfig = getAxiosConfig()
                response = await axios.delete(baseUrl + '/categorytransaction/' + id, axiosConfig);
                if (response.data == null) resolve(null);
                // console.log("DeleteACategoryTransaction response data",response.data);
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

export default CategoryTransaction;