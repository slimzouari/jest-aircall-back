const env = process.env.NODE_ENV || 'test';


let environment = {
    test: {
        aircall_base_url : "https://api.aircall.io/v1/",
        aircall_api_id: "beec76ee5edfc13b0cfe111887caf411",
        aircall_api_token: "b1b490bfb1e9d70b0a33beafef43090d"
    },
    stage: {
    }
}

module.exports = environment[env];