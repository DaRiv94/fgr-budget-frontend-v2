const axios = require("axios");

//This is the backend url
// const baseUrl="http://localhost:4500/";
const baseUrl=process.env.REACT_APP_FGR_BUDGET_BACKEND_URL;
// const baseUrl="https://fgrbudgetapp.herokuapp.com/"

class Auth{

    

    constructor(){
        this.isAuthenticated = false;
    }

    login(email, password){
        return new Promise(async (resolve,reject)=>{
            try{
                // console.log("in login");
                let axiosConfig = {
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8',
                        "Access-Control-Allow-Origin": "*",
                    }
                  };
    
                //This axios call goes to the backend which calls then auth service, 
                //the auth service responses to thebackend which responss to frontend
                let response = await axios.post(baseUrl+"auth/login", {email,password}, axiosConfig );
                    
                    sessionStorage.setItem('token', JSON.stringify(response.data.token));
                    this.isAuthenticated = true;
                    // console.log("Authenticated:", this.isAuthenticated)
                    resolve({"status":response.status, "data":response.data})
                
            }catch(e){
                if(e.response && e.response.data){
                    reject({"Error":e.response.data})
                }else{
                    reject({"Error":e})
                }
                
            }
            
        })
    }

    logout(){
        sessionStorage.removeItem('token');
        this.isAuthenticated = false;
        // console.log("Authenticated:", this.isAuthenticated)
        
    }

    isAuthenticated(){
        
            // return new Promise(async (resolve,reject)=>{
            //     try{
            //         let axiosConfig = getAxiosConfig()
    
            //         let response = await axios.get(baseUrl + 'info/user', axiosConfig);
            //         if (response.data==null) resolve(null) ;
            //         console.log("getUserData response data",response.data);
            //         if(response.status=='200'){
            //             resolve(true)
            //         }else{
            //             resolve(false)
            //         }
            //     }catch(e){
            //         console.log("isAuthenticated: e", e)
            //         reject(e)
            //     }
            // })
        
        return this.isAuthenticated;
    }
}

// function getAxiosConfig(){
//     let jwtStringToken = sessionStorage.getItem('token');
//         let token = JSON.parse(jwtStringToken);

//         let axiosConfig = {
//             headers: {
//                 'Content-Type': 'application/json;charset=UTF-8',
//                 "Access-Control-Allow-Origin": "*",
//                 "x-auth-token":token
//             }
//         };
//         return axiosConfig;
// }

export default new Auth();