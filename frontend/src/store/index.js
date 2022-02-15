import { createStore } from 'vuex'


const axios = require('axios');
const instance = axios.create({
   baseURL: 'http://localhost:3000/api/'
});

 let user = localStorage.getItem('user');
  if (!user) {
   user = {
     userId: -1,
     token: '',
    }; 
 } else {
    try {
     user = JSON.parse(user);
     instance.defaults.headers.common['Authorization'] = user.token;
   } catch (ex) {
     user = {
      userId: -1,
       token: '',
      };
   }
 }

export default createStore ({
   state: {
    status: '',
    user: user,
    userInfos: {
    },
    post: [],
    postInfos: {
    },
    comment: [],
    commentInfos: {
    }
},
    mutations: {
    SET_STATUS: function(state, status) {
       state.status = status;
    },
    LOGIN: function(state, user) {
       instance.defaults.headers.common['Authorization'] = user.token;
       localStorage.setItem('user', JSON.stringify(user));
       state.user = user;
    },
    LOGOUT: function (state) {
       state.user = {
        userId: -1,
        token: '',
    }
       localStorage.removeItem('user');
     }
   },
   actions: {
    createAccount: ({commit}, userInfos) => {
        return new Promise((resolve, reject) => {
           instance.post('/user/signup', userInfos)
                .then(function (response) {
                  commit('SET_STATUS', 'created');
                  resolve(response);
                 })
                .catch(function (error) {
                  commit('SET_STATUS', 'error_create');
                  reject(error);
                });
              });
            },
    login: ({commit}, userInfos) => {
      return new Promise((resolve, reject) => {
       instance.post('/user/login', userInfos)
       .then(function (response) {
         commit('SET_STATUS', '');
         commit('LOGIN', response.data);
         resolve(response);
       })
       .catch(function (error) {
         commit('SET_STATUS', 'error_login');
         reject(error);
      });
     });
    }, 
 }
})




    
    

