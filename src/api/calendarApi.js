import axios from 'axios';
import { getEnvVariables } from '../helpers/getEnvVariable';


const {VITE_API_URL}=getEnvVariables();


const calendarApi=axios.create({
    baseURL:VITE_API_URL
})

//todo:CONFIGURAR INTERCEPTORES.

export default calendarApi;