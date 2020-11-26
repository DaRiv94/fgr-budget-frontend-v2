/* eslint-disable import/no-named-as-default */
const axios = require('axios');

//This is the backend url
// const baseUrl="http://fgr-budget-backend-v2_web_1:4500/";
// const baseUrl="http://localhost:4500/";
const baseUrl=process.env.REACT_APP_FGR_BUDGET_BACKEND_URL;
// const baseUrl="https://fgrbudgetapp.herokuapp.com/"

class Register{

    static register(email, password, password2){
        return new Promise(async (resolve,reject)=>{
            try{
                let axiosConfig = getAxiosConfig()
                
                //This axios call goes to the backend which calls then auth service, 
                //the auth service responses to thebackend which responss to frontend
                //change this for backend route to just be /register
                let response = await axios.post(baseUrl + '/auth/register', {email, password, password2}, axiosConfig);
                if (response.data==null) resolve(null) ;
                resolve(response.data);
            }catch(e){
                reject(e.response.data.detail)
                // reject(e)
            }
        })
    }
}

function getAxiosConfig(){
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*"
            }
        };
        return axiosConfig;
}

export default Register;