import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-5dbc0.firebaseio.com/'
});

export default instance