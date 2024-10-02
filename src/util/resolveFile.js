const fs = require('fs');
const AlphaError = require('../errors/create')

module.exports = async function resolveFile(resource) {
    if (Buffer.isBuffer(resource) || resource instanceof stream.Readable) return resource;
    if (typeof resource === 'string') {
      if (/^https?:\/\//.test(resource)) {
        const res = await fetch(resource);
        return res.body;
      }

      return new Promise((resolve, reject) => {
        const file = path.resolve(resource);
        fs.stat(file, (err, stats) => {
          if (err) return reject(err);
          if (!stats.isFile()) return reject(new AlphaError('FILE_NOT_FOUND', file));
          return resolve(fs.createReadStream(file));
        });
      });
    }

    throw new TypeError('REQ_RESOURCE_TYPE');
  }