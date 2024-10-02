const resolveFile = require('./resolveFile')

module.exports = async function resolveFileAsBuffer(resource) {
    const file = await resolveFile(resource);
    if (Buffer.isBuffer(file)) return file;

    const buffers = [];
    for await (const data of file) buffers.push(data);
    return Buffer.concat(buffers);
  }