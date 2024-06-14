const admin = require('firebase-admin');
const firebaseConfig = require('../config/firebase.config');

admin.initializeApp({
  credential: admin.credential.cert(firebaseConfig),
});

module.exports = admin;
