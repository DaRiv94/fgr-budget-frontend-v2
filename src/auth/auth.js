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
        // console.log("login : beginning: this.isAuthenticated:", this.isAuthenticated)
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
                    // console.log("login :end: this.isAuthenticated:", this.isAuthenticated)
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
        // console.log("logout this.isAuthenticated:", this.isAuthenticated)
        
    }

    is_Authenticate(){
        return this.isAuthenticated;
    }

    check_Authenticated(){
        // console.log("isAuthenticated this.isAuthenticated:", this.isAuthenticated)
            return new Promise(async (resolve,reject)=>{
                try{
                    let axiosConfig = getAxiosConfig()
    
                    let response = await axios.post(baseUrl + 'auth', {}, axiosConfig);
                    if (response.data==null) resolve(null) ;
                    // console.log("getUserData response data",response.data);
                    if(response.status=='200'){
                        this.isAuthenticated =true
                        // console.log("isAuthenticated Will Be auth", this.isAuthenticated)
                        resolve(true)
                    }else{
                        this.isAuthenticated = false
                        resolve(false)
                    }
                }catch(e){
                    // console.log("isAuthenticated: e", e)
                    this.isAuthenticated = false
                    reject(false)
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

export default new Auth();