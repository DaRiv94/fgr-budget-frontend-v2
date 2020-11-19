/* eslint-disable import/no-named-as-default */
const axios = require('axios');
const baseUrl=process.env.REACT_APP_FGR_BUDGET_BACKEND_URL;


class Categories{

    static getBudgets(){
        return new Promise(async (resolve,reject)=>{
            try{
                let axiosConfig = getAxiosConfig()

                let response = await axios.get(baseUrl + 'budget', axiosConfig);
                if (response.data==null) resolve(null) ;
                console.log("response data",response.data);  
                resolve(response.data);
                // resolve([]);
            }catch(e){
                reject(e)
            }
        })
    }

    static CreateABudget(name,budget_max,category_id){
        return new Promise(async (resolve,reject)=>{
            try{
                let axiosConfig = getAxiosConfig()

                let response = await axios.post(baseUrl + 'budget/', {name,budget_max,category_id}, axiosConfig);
                if (response.data==null) resolve(null) ;
                console.log("CreateABudget response data",response.data);
                resolve(response.data);
            }catch(e){
                reject(e)
            }
        })
    }

    static GetABudget(id){
        return new Promise(async (resolve,reject)=>{
            let response ={}
            try{
                let axiosConfig = getAxiosConfig()

                response = await axios.get(baseUrl + 'budget/' + id, axiosConfig);
                if (response.data==null) resolve(null) ;
                console.log("GetABudget response data",response.data);
                resolve(response.data);
            }catch(e){
                reject({Error:e,response:response})
            }
        })
    }

    static DeleteABudget(id){
        return new Promise(async (resolve,reject)=>{
            let response ={}
            try{
                let axiosConfig = getAxiosConfig()

                response = await axios.delete(baseUrl + 'budget/' + id, axiosConfig);
                if (response.data==null) resolve(null) ;
                console.log("GetABudget response data",response.data);
                resolve(response.data);
            }catch(e){
                reject({Error:e,response:response})
            }
        })
    }

    static EditABudget(id,name,budget_max,category_id){
        return new Promise(async (resolve,reject)=>{
            try{
                let axiosConfig = getAxiosConfig()

                let response = await axios.put(baseUrl + 'budget/' + id, {name,budget_max,category_id}, axiosConfig);
                if (response.data==null) resolve(null) ;
                console.log("EditABudget response data",response.data);
                resolve(response.data);
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

export default Categories;