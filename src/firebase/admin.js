import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();

// var admin = require("firebase-admin");

// // Fetch the service account key JSON file contents
// var serviceAccount = require("path/to/serviceAccountKey.json");

// // Initialize the app with a service account, granting admin privileges
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://signup-signin-dashboard-default-rtdb.firebaseio.com/"
// });

// // As an admin, the app has access to read and write all data, regardless of Security Rules
// var db = admin.database();
// var ref = db.ref("restricted_access/secret_document");
// ref.once("value", function(snapshot) {
// });
