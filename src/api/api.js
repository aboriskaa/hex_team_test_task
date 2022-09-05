const baseURL = "http://79.143.31.216/"

export const authAPI = {
    async register(username, password) {
        const requestOptions = {
            method: 'POST',
            headers: { 'accept': 'application/json' },
            // body: JSON.stringify({ "username": username, "password": password })
        };
        const res = {
            status: 0,
            data: {},
            ethError: null
        }
        await fetch(baseURL + `register?username=${username}&password=${password}`, requestOptions).then(response => {
            res.status = response.status;
            return response.json()
        }).then((data) => {
            res.data = data
            console.log(res.data)
        }).catch((e) => { res.ethError = e })
        return res;
    },

    async login(username, password) {
        const requestOptions = {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `?grant_type=&username=${username}&password=${password}&scope=&client_id=&client_secret=`
        };
        const res = {
            status: 0,
            data: {},
            ethError: null
        }
        await fetch(baseURL + `login`, requestOptions).then(response => {
            res.status = response.status;
            return response.json()
        }).then((data) => {
            res.data = data
            // console.log(res.data)
        }).catch((e) => { res.ethError = e })
        return res;
    },
    async uriAdd(uri) {
        const requestOptions = {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'Authorization': localStorage.getItem('token_type') + " " + localStorage.getItem('access_token')
            }
        };
        const res = {
            status: 0,
            data: {},
            ethError: null
        }
        await fetch(baseURL + `squeeze?link=${uri}}`, requestOptions).then(response => {
            res.status = response.status;
            return response.json()
        }).then((data) => {
            res.data = data
        }).catch((e) => { res.ethError = e })
        return res;
    },
    async showLinks(order = "asc_counter", offset, limit = 10) {
        const requestOptions = {
            method: 'GET',
            headers: {
                'accept': 'application/json',
                'Authorization': localStorage.getItem('token_type') + " " + localStorage.getItem('access_token')
            }
        };
        const res = {
            status: 0,
            data: {},
            ethError: null
        }
        await fetch(baseURL + `statistics?order=${order}&offset=${offset}&limit=${limit}`, requestOptions).then(response => {
            res.status = response.status;
            return response.json()
        }).then((data) => {
            res.data = data;
        }).catch((e) => { res.ethError = e })
        return res;
    }
}