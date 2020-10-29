const axios = require("axios");


//const baseUrl="http://localhost:4000/";
const baseUrl="https://fgrbudgetapp.herokuapp.com/"

class Auth{

    

    constructor(){
        this.isAuthenticated = false;
    }

    login(password){
        return new Promise(async (resolve,reject)=>{
            try{
                console.log("in login");
                let axiosConfig = {
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8',
                        "Access-Control-Allow-Origin": "*",
                    }
                  };
    
    
                let response = await axios.post(baseUrl+"auth", {password}, axiosConfig );
                    
                    sessionStorage.setItem('token', JSON.stringify(response.data.token));
                    this.isAuthenticated = true;
                    console.log("Authenticated:", this.isAuthenticated)
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
        console.log("Authenticated:", this.isAuthenticated)
        
    }

    isAuthenticated(){
        return this.isAuthenticated;
    }

}


export default new Auth();