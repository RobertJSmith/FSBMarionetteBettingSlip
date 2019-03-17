import "./index.css";
import "babel-polyfill";
import App from './Application';
if (module.hot) module.hot.accept(); //	Allow hot module reloading

const callApi = async () => {
    const response = await fetch('http://localhost:5000/rest/selections');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
};

callApi()
    .then(res => {
        const app = new App(res.response.selections);
        app.start();
    })
    .catch(err => console.log(err));