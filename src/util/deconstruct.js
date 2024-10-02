function idToBinary(num) {
    let bin = '';
    let high = parseInt(num.slice(0, -10)) || 0;
    let low = parseInt(num.slice(-10));
    while (low > 0 || high > 0) {
      bin = String(low & 1) + bin;
      low = Math.floor(low / 2);
      if (high > 0) {
        low += 5_000_000_000 * (high % 2);
        high = Math.floor(high / 2);
      }
    }
    return bin;
  }

module.exports = function deconstruct(snowflake) {
    const BINARY = idToBinary(snowflake).toString(2).padStart(64, '0');
    return {
      timestamp: parseInt(BINARY.substring(0, 42), 2) + 1_420_070_400_000,
      get date() {
        return new Date(this.timestamp);
      },
      workerId: parseInt(BINARY.substring(42, 47), 2),
      processId: parseInt(BINARY.substring(47, 52), 2),
      increment: parseInt(BINARY.substring(52, 64), 2),
      binary: BINARY,
    };
  }