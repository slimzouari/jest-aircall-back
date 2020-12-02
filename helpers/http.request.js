const axios = require('axios');


let http_request = function (api_config, api_input, extra) {
    let axiosConfig = {};

    const base_url = api_config.base_url.toLowerCase();
    const url = api_config.url.toLowerCase();
    const method = api_config.method.toLowerCase()
    const authorization = api_config.authorization;

    axiosConfig.baseURL = base_url;
    axiosConfig.url = url;
    axiosConfig.headers = {};
    if (authorization) axiosConfig.headers.Authorization = authorization;
    axiosConfig.method = method;
    axiosConfig.timeout = 60000;

    if (api_input.params) axiosConfig.params = api_input.params;
    if (api_input.body) axiosConfig.body = api_input.body;

    axiosConfig.validateStatus = function (status) {
        return status < 500;
    };
    
    return axios(axiosConfig);
};

module.exports = http_request;