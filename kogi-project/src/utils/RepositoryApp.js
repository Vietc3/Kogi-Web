// utils/Repository.js

import axios from 'axios';
// import { getToken, getAuth } from '@/utils/Auth'
// import { Message } from 'element-ui'
// import store from '@/store'
// import router from '@/router'

import variables from "@/variables";

const baseDomain = variables.urlBase;
const baseUrl  =  `${baseDomain}`+'/app';


const service = axios.create({
	  baseURL: baseUrl,
	  headers: {
		Authorization: 'Bearer {token}'
	  }
  	/*timeout: 5000, // request timeout, */
});

// Request
// service.interceptors.request.use(
//   	(config) => {
//     	var token = getToken()
// 	    if (token) {
// 	      	config.headers['Authorization'] = 'Bearer ' + token
// 	    }
// 	    return config
//   	},
//   	(error) => {
//     	return Promise.reject(error)
//   	}
// )


// // Response
// service.interceptors.response.use(
//     (response) => {
//       	return response
//   	},
//     (error) => {
//     	const originalRequest = error.config
//        	// token expired
//        	if (error.response.status === 401 && error.response.data.message == "Expired JWT Token") {

//        		originalRequest._retry = true
// 	        store.dispatch('user/refreshToken').then((response) => {
// 	        	originalRequest._retry = true

// 			   	const hasToken = getToken()
// 				const hasAuth = getAuth()

// 				location.reload()

// 	        }).catch((error) => {

// 	        	/*store.dispatch('user/logout')
//             	router.push(`/login`)*/
// 	        })
// 	    }else if(error.response.status === 401 && error.response.data.message == "An authentication exception occurred."){

// 	    	/*store.dispatch('user/logout')
//         	router.push(`/login`)*/
// 	    }
//     	return Promise.reject(error)
//   	}
// )

export default service
