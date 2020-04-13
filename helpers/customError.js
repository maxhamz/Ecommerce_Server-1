function customError(code, msg) {
    let err = new Error()
    err.code = code
    err.message = msg

    return err
}


module.exports = {
    customError
}