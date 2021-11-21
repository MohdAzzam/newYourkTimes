import authAxiosApi from "../authAxiosApi";

export const authHelper = {
    login: (data) => {
        return authAxiosApi.post('login', {
            email: data.email,
            password: data.password
        })
    },
    register: (data) => {
        return authAxiosApi.post('register', {
            email: data.email,
            password: data.password
        })
    }
}