 class AlphaError extends Error {
    constructor(error, request) {
        super()
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this)
          }
        this.name = 'AlphaError';
        this.message = error;
        this.request = request || null
    }
}
module.exports = AlphaError
