/* eslint-disable import/no-named-as-default */
const axios = require('axios');
const baseUrl=process.env.REACT_APP_FGR_BUDGET_BACKEND_URL;


class Categories{

    static getAllCategories(){
        return new Promise(async (resolve,reject)=>{
            try{
                let axiosConfig = getAxiosConfig()

                let response = await axios.get(baseUrl + 'category/', axiosConfig);
                if (response.data==null) resolve(null) ;
                console.log("getAllCategories response data",response.data);
                resolve(response.data);
            }catch(e){
                reject(e)
            }
        })
    }

    static CreateACategory(name,color){
        return new Promise(async (resolve,reject)=>{
            try{
                let axiosConfig = getAxiosConfig()

                let response = await axios.post(baseUrl + 'category/', {name,color}, axiosConfig);
                if (response.data==null) resolve(null) ;
                console.log("CreateACategory response data",response.data);
                resolve(response.data);
            }catch(e){
                reject(e)
            }
        })
    }

    static GetACategory(id){
        return new Promise(async (resolve,reject)=>{
            try{
                let axiosConfig = getAxiosConfig()

                let response = await axios.get(baseUrl + 'category/' + id, axiosConfig);
                if (response.data==null) resolve(null) ;
                console.log("GetACategory response data",response.data);
                resolve(response.data);
            }catch(e){
                reject(e)
            }
        })
    }

    static EditACategory(id,name,color){
        return new Promise(async (resolve,reject)=>{
            try{
                let axiosConfig = getAxiosConfig()

                let response = await axios.post(baseUrl + 'category/' + id, {name,color}, axiosConfig);
                if (response.data==null) resolve(null) ;
                console.log("EditACategory response data",response.data);
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