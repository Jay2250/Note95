import axios from "axios";

const makeRequest = async (ReqUrl, method, payload) => {
    let reqConfig = {
        url: `${process.env.REACT_APP_API_URL}`+ReqUrl,
        method: method,
        headers: {
            Authorization: `Bearer ${localStorage.getItem('authKey')}` || ''
        }
    }

    if (method != 'get' && payload) {
        reqConfig.data = payload;
    }

    try {
        let response = await axios.request(reqConfig);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export default makeRequest;