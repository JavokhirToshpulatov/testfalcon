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
        config.headers[TOKEN_PAYLOAD_KEY] = "Bearer " + "eyJhbGciOiJSUzI1NiIsImtpZCI6Ijc0QjA4MjlGN0VCMTE4OEU4Q0U2NDU2NDQyNDk1NEMwRkE0NDJGQjYiLCJ0eXAiOiJhdCtqd3QiLCJ4NXQiOiJkTENDbjM2eEdJNk01a1ZrUWtsVXdQcEVMN1kifQ.eyJuYmYiOjE3MDk3MTczMTEsImV4cCI6MTcwOTcyMDkxMSwiaXNzIjoiaHR0cHM6Ly8xMC4xMC4zMC4xNSIsImF1ZCI6IldlYlVJQVBJIiwiY2xpZW50X2lkIjoiV2ViVUkiLCJzdWIiOiIxYzA1ZTI1Zi04YzY3LTQ3ZTQtYjE4ZC1kYzQwYzMxYTYzNWYiLCJhdXRoX3RpbWUiOjE3MDk3MTczMTEsImlkcCI6ImxvY2FsIiwibmFtZSI6InRlc3RAY3NlYy51eiIsInJvbGUiOiJBZG1pbmlzdHJhdG9yIiwic2NvcGUiOlsib3BlbmlkIiwicHJvZmlsZSIsIldlYlVJQVBJIl0sImFtciI6WyJwd2QiXX0.DgrL4Sv3rL6oeO34gpGBDk42TwlF1kJE86T39eusrwGYCpg8JvbZwi55J1j8c8LzTjRsYIqQShCDfGUigUHMA6mp6u0X52sDciyyN4vDDIbVBpuCPjcRv7DgC9CtYQyB48XbMrQm56pMhHPdbfm5Hwk5TfWU9-pvbHqiPVBaMT5odqeNveVk3Z6NkMl1h01IMQL2Ifey-0jWI0p4yU7WXLmQPEKNsCY2G-790DhnCr8yQE8h8Yn9zWGQpKc94BI5BJ8jvXqUA_xrXYPCpZbmauJejfLp9WJNT_vSlXAIX3Gft-cGkbp1rX4x7vdgON77wAljggkMscHqvZKUvahe4A5rb181_-tfh0QBXINbwq-qs-RwhkR040-m_wMMqfxLCCVOeUg6SfWh6E2Wn_KISChdi3UbdqcpCUPweGEBdnyBL4Mi3kGwEtXl9kulahdoNi7_YEPy9d9xdMMIqy-zLNyjRtpvV0relT3NxJMtxK7XbWDd1nQKMTSz6IUD_Az7QLget_N2J2lAf3DC_4N3tI2xf3exNQ4kOdWGi0Fx7g-sSxa9hFphG0X_GSXTPPqd38HSQlolKQCUkGyDAQNb6KqIlBss_KcSRYfHsaVdGpds5DVl7OoAP2SIm4AtJF-KssCsguKlWrtBeS-UPVpl2yUBRe7eQRl3Hq2Ob3Yc1rc"
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