import axios from 'axios';

const baseUrl = import.meta.env.VITE_USER_API_URL;


export const userRegister = async (body) => {
    try {

        const url = `${baseUrl}/register`;

        const {data} = await axios.post(url, body);

        return data;

    } catch (error) {
        console.log(error );
        throw new Error("Ocurrió un error al registrar al usuario")
    }
}

export const userLogin = async (body) => {
    try {

        const url = `${baseUrl}/login`;

        const {data} = await axios.post(url, body);

        return data;

    } catch (error) {
        console.log(error );
        throw new Error("Ocurrió un error al Loguear al usuario")
    }
}