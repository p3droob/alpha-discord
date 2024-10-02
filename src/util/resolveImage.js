const resolveBase64 = require('./resolveBase64');
const resolveFileAsBuffer = require('./resolveFileAsBuffer')
module.exports = async function resolveImage(image) {
    if (!image) return null;
    if (typeof image === 'string' && image.startsWith('data:')) {
      return image;
    }
    const file = await resolveFileAsBuffer(image);
    return resolveBase64(file);
  }