module.exports = params => {
    let page = params.param.page
    let https = require("https")
    return new Promise(res => {
        https.get(`https://en.wikipedia.org/w/api.php?action=parse&format=json&origin=*&page=${page}`, resp => {
            let data = ""
            resp.on("data", chunk => {
                data += chunk
            })

            resp.on("end", () => {
                res({
                    body: data
                })
            })
        })
    })
}