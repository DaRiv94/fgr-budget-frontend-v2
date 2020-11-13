/* eslint-disable import/no-named-as-default */
const axios = require('axios');

//This is the backend url
// const baseUrl="http://localhost:4500/";
const baseUrl=process.env.REACT_APP_FGR_BUDGET_BACKEND_URL;
// const baseUrl="https://fgrbudgetapp.herokuapp.com/"

class Info{

    static triggerwebhook(item_id){
        return new Promise(async (resolve,reject)=>{
            try{
                let axiosConfig = getAxiosConfig()

                let response = await axios.post(baseUrl + 'triggerwebhook',{item_id},  axiosConfig);
                if (response.data==null) resolve(null) ;
                // console.log("response data",response.data);
                resolve(response.data);
                // resolve([]);
            }catch(e){
                reject(e)
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

export default Info;