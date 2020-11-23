import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import Auth from '../../auth/auth'

export const ProtectedRoute = ({component:Component, ...rest}) => {
    return (
        <Route 
            {...rest}
            render ={  props =>{
                // console.log("")
                let token = sessionStorage.getItem('token');
                // console.log("ProtectedRoute before check Auth.isAuthenticated: ", Auth.isAuthenticated//)
                if (token != null) {
                    // console.log("ProtectedRoute Oh Look a token!! ", Auth.isAuthenticated)
                    Auth.check_Authenticated().then((authenticated)=>{
                        Auth.isAuthenticated = authenticated
                        // console.log("ProtectedRoute results after token check IN THEN ", Auth.isAuthenticated)
                    })
                    // console.log("ProtectedRoute results after token check ", Auth.isAuthenticated)//
                }else{
                    // console.log("ProtectedRoute No Token No Service ", Auth.isAuthenticated)
                    Auth.isAuthenticated = false
                }
                // console.log("ProtectedRoute after check Auth.isAuthenticated: ", Auth.isAuthenticated)
                if(Auth.isAuthenticated){
                    return <Component {...props}/>
                }else{
                    return <Redirect 
                    to="/"
                    />
                }
                
            }
        }
        />
    );
} 

// export const ProtectedRoute = async ({component:Component, ...rest}) => {

//     let isAuthenticated = await Auth.isAuthenticated
//     console.log("isAuthenticated: ",isAuthenticated)
//     if(isAuthenticated){
//         return (
//             <Route 
//                 {...rest}
//                 render ={ props =>{
//                     let token = sessionStorage.getItem('token');
//                     if (token != null) {
//                         Auth.isAuthenticated=true;
//                     }
//                         return <Component {...props}/>
                    
//                 }
//             }
//             />
//         );
//     }else{
//         return (
//             <Route 
//                 {...rest}
//                 render ={ props =>{
//                     let token = sessionStorage.getItem('token');
//                     if (token != null) {
//                         Auth.isAuthenticated=true;
//                     }
//                         return <Redirect 
//                         to="/"
//                         />
//                 }
//             }
//             />
//         );
//     }
    
// } 

export default ProtectedRoute;