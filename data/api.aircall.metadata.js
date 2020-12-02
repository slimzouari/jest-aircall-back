// follow the same structure as https://developer.aircall.io
module.exports = {
    contacts: {
        search : {
            base_url: global.aircall_base_url,
            url: "/contacts/search",
            method: "get",
            authorization: global.aircall_basic_auth_key
        }
    }
}