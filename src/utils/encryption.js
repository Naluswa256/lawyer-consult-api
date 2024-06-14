const crypto = require('crypto');

const encryptSymmetric = (plaintext, lawyerId) => {
  const iv = crypto.randomBytes(12).toString('base64');
  const lawyerKey = crypto.createHash('sha256').update(lawyerId).digest('base64');
  const cipher = crypto.createCipheriv('aes-256-gcm', Buffer.from(lawyerKey, 'base64'), Buffer.from(iv, 'base64'));
  let ciphertext = cipher.update(plaintext, 'utf8', 'base64');
  ciphertext += cipher.final('base64');
  const tag = cipher.getAuthTag();

  return { ciphertext, iv, tag };
};

const decryptSymmetric = (ciphertext, iv, tag, lawyerId) => {
  const lawyerKey = crypto.createHash('sha256').update(lawyerId).digest('base64');
  const decipher = crypto.createDecipheriv('aes-256-gcm', Buffer.from(lawyerKey, 'base64'), Buffer.from(iv, 'base64'));

  decipher.setAuthTag(Buffer.from(tag, 'base64'));

  let plaintext = decipher.update(ciphertext, 'base64', 'utf8');
  plaintext += decipher.final('utf8');

  return plaintext;
};

module.exports = {
  encryptSymmetric,
  decryptSymmetric,
};
