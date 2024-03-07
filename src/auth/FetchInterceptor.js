import axios from 'axios'
import {API_BASE_URL} from 'configs/AppConfig'
import history from '../history'
import {AUTH_TOKEN} from 'redux/constants/Auth'
import {notification} from 'antd';

const service = axios.create({
    baseURL: API_BASE_URL,
    timeout: 60000
})

// Config
const ENTRY_ROUTE = '/auth/login'
const TOKEN_PAYLOAD_KEY = 'authorization'
const PUBLIC_REQUEST_KEY = 'public-request'

// API Request interceptor
service.interceptors.request.use(config => {
    const jwtToken = localStorage.getItem(AUTH_TOKEN);

    if (jwtToken) {
        config.headers[TOKEN_PAYLOAD_KEY] = jwtToken
    } else {
        // config.headers[TOKEN_PAYLOAD_KEY] = "Bearer " + "eyJhbGciOiJSUzI1NiIsImtpZCI6Ijc0QjA4MjlGN0VCMTE4OEU4Q0U2NDU2NDQyNDk1NEMwRkE0NDJGQjYiLCJ0eXAiOiJhdCtqd3QiLCJ4NXQiOiJkTENDbjM2eEdJNk01a1ZrUWtsVXdQcEVMN1kifQ.eyJuYmYiOjE3MDk3MjY5NTQsImV4cCI6MTcwOTczMDU1NCwiaXNzIjoiaHR0cHM6Ly8xMC4xMC4zMC4xNSIsImF1ZCI6IldlYlVJQVBJIiwiY2xpZW50X2lkIjoiV2ViVUkiLCJzdWIiOiIxYzA1ZTI1Zi04YzY3LTQ3ZTQtYjE4ZC1kYzQwYzMxYTYzNWYiLCJhdXRoX3RpbWUiOjE3MDk3MjY5NTQsImlkcCI6ImxvY2FsIiwibmFtZSI6InRlc3RAY3NlYy51eiIsInJvbGUiOiJBZG1pbmlzdHJhdG9yIiwic2NvcGUiOlsib3BlbmlkIiwicHJvZmlsZSIsIldlYlVJQVBJIl0sImFtciI6WyJwd2QiXX0.jp-EMWsmBCB-Vo7CEKfCZJvwZKPUaQnlRlZ0nTCj8DMVNg05Ly6Jnge7RhndPtJsSw68yfAr1VjygeT44fBjXBQhajzzLAMI-BJN4ygA9ydeIYLBV4VOcxtuhvtupxAOsyCzJgfa0dA9VoWRJRaNGav0FsxQJP_5O0HA2CkaCKKo35IO5MNcfE2L_WZRB0FMOmkxZLCQ5o26Ify1Iehr4O9mwOWHuiGb-VbACAKNl801Mt-G0z4EAXCRnPRmg6u04hVwZlNE6Vvh-UQf97x38hRxW2jdcaKdfFRWdUAoSCWTgbmoampje5Z0hLp-8KJuDQJL82NYDFGr2OrSGeAmdtLbI1etoMPmIRqtiLcuNidzhMZ2SHZd6RnoTs21DNa2NkMmI0pNTZpGhs-z3qimDvcpMqSW8OKAOo67SZNKcP8s45e1m2fxYGYJlZfKzQMDrA7zGwSzcyYLrbwzOTn1ltVIggB-XtR-ou3x71bTxx03IiljUriXfo-grfl9MrCDG-5SYGJUntZFkf-9Nnjc9dSIAhWNmOmUKJ5XNzoKxikAcXynTTuwxkNz5FO6xZXedNziKmJarwfCfkkI0eycBPdMi3h7K6B4aA3WAln7Vqywx5i7dl0gsBXWjxvvyTGqf-9UuXlBhoMkUwEqKCAJX4_5naxiGY0bUKWBqB37SXg"
    }

    // if (!jwtToken && !config.headers[PUBLIC_REQUEST_KEY]) {
    //     history.push(ENTRY_ROUTE)
    //     window.location.reload();
    // }

    return config
}, error => {
    // Do something with request error here
    notification.error({
        message: 'Error'
    })
    Promise.reject(error)
})

// API respone interceptor
service.interceptors.response.use((response) => {
    return response.data
}, (error) => {

    let notificationParam = {
        message: ''
    }

    // Remove token and redirect
    if (error.response.status === 400 || error.response.status === 403) {
        notificationParam.message = 'Authentication Fail'
        notificationParam.description = 'Please login again'
        // localStorage.removeItem(AUTH_TOKEN)
        // history.push(ENTRY_ROUTE)
        // window.location.reload();
    }

    if (error.response.status === 404) {
        notificationParam.message = 'Not Found'
    }

    if (error.response.status === 500) {
        notificationParam.message = 'Internal Server Error'
    }

    if (error.response.status === 508) {
        notificationParam.message = 'Time Out'
    }

    notification.error(notificationParam)

    return Promise.reject(error);
});

export default service