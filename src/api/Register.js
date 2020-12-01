/* eslint-disable import/no-named-as-default */
const axios = require('axios');

const baseUrl = process.env.REACT_APP_FGR_BUDGET_BACKEND_URL;

class Register {

    static register(email, password, password2) {
        return new Promise(async (resolve, reject) => {
            try {
                let axiosConfig = getAxiosConfig()
                let response = await axios.post(baseUrl + '/auth/register', { email, password, password2 }, axiosConfig);
                if (response.data == null) resolve(null);
                resolve(response.data);
            } catch (e) {
                reject(e.response.data.detail)
            }
        })
    }
}

function getAxiosConfig() {
    let axiosConfig = {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*"
        }
    };
    return axiosConfig;
}

export default Register;