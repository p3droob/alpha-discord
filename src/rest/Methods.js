const methods = ['get', 'post', 'delete', 'put', 'patch'];
const options = ['guilds', 'channels', 'users']
const invalid = () => {};

module.exports = function method(requestHandler) {
  const handler = {
    get(name) {
      if (options.includes(name)) {
        return (path, method) => requestHandler.request(path, {
          method: method,
          body: body
        })
      }
      return new Proxy(invalid, handler);
    }
  }
  return new Proxy(invalid, handler);
}