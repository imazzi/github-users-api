const axios = require('axios').default;

const GET_USERS_URL = 'https://api.github.com/users';

function getUsers() {
   return   axios.get(GET_USERS_URL)
}


function getUserByLogin(login) {
    return  axios.get(GET_USERS_URL + '/' + login);
}

function getUserFollowers(followersUrl) {
    return axios.get(followersUrl)
}

module.exports = { getUsers, getUserByLogin, getUserFollowers }