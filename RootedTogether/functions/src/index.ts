/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import { setGlobalOptions } from "firebase-functions";
import { onRequest } from "firebase-functions/https";
import * as logger from "firebase-functions/logger";
import admin from "firebase-admin";

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// For cost control, you can set the maximum number of containers that can be
// running at the same time. This helps mitigate the impact of unexpected
// traffic spikes by instead downgrading performance. This limit is a
// per-function limit. You can override the limit for each function using the
// `maxInstances` option in the function's options, e.g.
// `onRequest({ maxInstances: 5 }, (req, res) => { ... })`.
// NOTE: setGlobalOptions does not apply to functions using the v1 API. V1
// functions should each use functions.runWith({ maxInstances: 10 }) instead.
// In the v1 API, each function can only serve one request per container, so
// this will be the maximum concurrent request count.
setGlobalOptions({ maxInstances: 10 });

admin.initializeApp();

export const helloWorld = onRequest((request, response) => {
  logger.info("Hello logs!", { structuredData: true });
  response.send("Hello from Firebase!");
});

export const sendTestNotification = onRequest(async (request, response) => {
  try {
    console.log("Attempting to send a test notification.");

    const users = await getAllUsers();
    const user = users.find((u) => u.uid = 'CefgXpU8ccf0Af2P0jo5RPI4GCl1');

    if (!user || !user.notificationToken) {
      console.log("No valid user/token found");
      response.status(400).send("No token");
      return;
    }

    if (!user.notificationToken.startsWith("ExponentPushToken")) {
      console.log("Invalid Expo token");
      response.status(400).send("Invalid token");
      return;
    }

    const message = {
      to: user.notificationToken,
      sound: "default",
      title: "Test",
      body: "Test Notification",
      data: { test: true },
    };

    const res = await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });

    const data = await res.json();
    console.log("Expo response:", data);

    response.status(200).send("Notification sent.");
  } catch (error) {
    console.error(error);
    response.status(500).send("Failed to send notifications.");
  }
});

// Get All the users
// eslint-disable-next-line require-jsdoc
async function getAllUsers() {
  console.log("Attempting to get all users...");
  try {
    console.log("Calling firestore users collection...");
    const usersSnapshot = await admin.firestore().collection("users").get();
    console.log(`Call to Firestore has been completed. 
      Total users: ${usersSnapshot.size}. Converting to user objects...`);
    // Convert QuerySnapshot to an array of user data
    // Log details of each document for debugging
    // usersSnapshot.docs.forEach((doc, index) => {
    //   console.log(`User ${index + 1}:`, doc.id, doc.data());
    // });

    let users = usersSnapshot.docs.map((doc) => doc.data());
    console.log(`Mapped users:`, users);

    const seen = new Set();
    users = users.filter((user) => {
      if (seen.has(user.uid)) {
        return false; // Filter out if `uid` is already seen
      }
      seen.add(user.uid); // Add `uid` to the set
      return true; // Keep the user in the array
    });

    console.log("Filtered users:", users);

    console.log(`Converion complete. Total users: ${users.length}`);
    return users;
  } catch (error) {
    console.error("Error retrieving users:", error);
    return [];
  }
}
