const axios = require("axios");

const baseUrl = process.env.REACT_APP_FGR_BUDGET_BACKEND_URL;

class Auth {

    constructor() {
        this.isAuthenticated = false;
    }

    login(email, password) {
        return new Promise(async (resolve, reject) => {
            try {
                let axiosConfig = {
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8',
                        "Access-Control-Allow-Origin": "*",
                    }
                };

                let response = await axios.post(baseUrl + "/auth/login", { email, password }, axiosConfig);

                sessionStorage.setItem('token', JSON.stringify(response.data.token));
                this.isAuthenticated = true;
                resolve({ "status": response.status, "data": response.data })

            } catch (e) {
                if (e.response && e.response.data) {
                    reject({ "Error": e.response.data })
                } else {
                    reject({ "Error": e })
                }
            }
        })
    }

    logout() {
        sessionStorage.removeItem('token');
        this.isAuthenticated = false;
    }

    is_Authenticate() {
        return this.isAuthenticated;
    }

    check_Authenticated() {
        return new Promise(async (resolve, reject) => {
            try {
                let axiosConfig = getAxiosConfig()
                let response = await axios.post(baseUrl + '/auth', {}, axiosConfig);
                if (response.data == null) resolve(null);
                if (response.status === '200') {
                    this.isAuthenticated = true
                    resolve(true)
                } else {
                    this.isAuthenticated = false
                    resolve(false)
                }
            } catch (e) {
                this.isAuthenticated = false
                reject(false)
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

export default new Auth();