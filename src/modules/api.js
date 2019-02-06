import { Config } from "../config"

export function login(username, password) {
    console.log("LOGIN")
    fetch(Config.DemoAPI.baseURL + Config.DemoAPI.Endpoints.Login,
        {
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: username, password: password })
        }
    )
        .then(res => res.json())
        .then(res => console.log(res))

        
        .catch(error => console.error(error));
}