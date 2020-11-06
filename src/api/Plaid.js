/* eslint-disable import/no-named-as-default */
const axios = require('axios');

//This is the backend url
// const baseUrl="http://fgr-budget-backend-v2_web_1:4500/";
const baseUrl="http://localhost:4500/";
// const baseUrl="https://fgrbudgetapp.herokuapp.com/"

class Plaid{

    static linktokencreate(){
        return new Promise(async (resolve,reject)=>{
            try{
                let axiosConfig = getAxiosConfig()
                
                //This axios call goes to the backend which calls then auth service, 
                //the auth service responses to thebackend which responss to frontend
                //change this for backend route to just be /register
                let response = await axios.get(baseUrl + 'plaid/linktokencreate', axiosConfig);
                if (response.data==null) resolve(null) ;
                resolve(response.data.link_token);
            }catch(e){
                reject(e.response.data.detail)
            }
        })
    }

    static connectbank(public_token, metadata){
        return new Promise(async (resolve,reject)=>{
            try{
                let axiosConfig = getAxiosConfig()
                
                //This axios call goes to the backend which calls then auth service, 
                //the auth service responses to thebackend which responss to frontend
                //change this for backend route to just be /register
                let response = await axios.post(baseUrl + 'plaid/connectbank', {public_token, metadata}, axiosConfig);
                if (response.data==null) resolve(null) ;
                console.log("connectbank response.data: ", response.data)
                resolve(response.data);
            }catch(e){
                console.log("e.response.data: ",e.response.data)
                reject(e.response.data.detail)
            }
        })
    }
}

function getAxiosConfig(){
    let jwtStringToken = sessionStorage.getItem('token');
        let token = JSON.parse(jwtStringToken);

        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
                "x-auth-token":token
            }
        };
        return axiosConfig;
}

export default Plaid;