// @flow
const crypto = require('crypto')

module.exports = function (size: number): Object {
  return {
    expand (data: Buffer): Buffer {
      let buf = crypto.randomBytes(data.length < size - 4 ? size : data.length + 4)
      buf.writeUInt32BE(data.length, 0)
      data.copy(buf, 4, 0)
      return buf
    },
    shrink (buf: Buffer): Buffer {
      const dataLen = buf.readUInt32BE(0)
      return buf.slice(4, dataLen + 4)
    }
  }
}
