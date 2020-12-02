const basic_auth_key_generator = function(username, password) {
    return "Basic " + Buffer.from(username+":"+password).toString('base64')
}

module.exports = {
    basic_auth_key_generator : basic_auth_key_generator
}