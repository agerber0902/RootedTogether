/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import {onRequest} from "firebase-functions/https";
import * as functions from "firebase-functions";
import * as logger from "firebase-functions/logger";
import * as admin from "firebase-admin";

type User = {
  uid?: unknown;
  name?: unknown;
  email?: unknown;
  first?: unknown;
  last?: unknown;
};

exports.helloWorld = onRequest((request, response) => {
  logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});

admin.initializeApp();

functions.setGlobalOptions({maxInstances: 10});

exports.helloWorld = onRequest((request, response) => {
  logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});

exports.sendTestNotification = functions.https.onRequest(
  async (
    _req: functions.https.Request,
    res: any,
  ) => {
    try {
      //  Get all the users with their fcm tokens
      console.log("Attempting to send a test notification.");

      const users = await getAllUsers();

      const user = users.find(
        (u: User) => u.uid === "CefgXpU8ccf0Af2P0jo5RPI4GCl1",
      );
      console.log(`Total users returned: ${users.length}, 
      Test user: ${user.fcmToken} : ${user.uid}`);
      const message = {
        notification: {
          title: "Test",
          body: "Test Notification",
        },
        token: user.fcmToken,
      };

      admin.messaging().send(message);

      res.status(200).send("Notifications sent.");
    } catch (error) {
      res.status(500).send("Failed to send notifications.");
    }
  },
);

// export const generateTodaysAffirmations = functions.pubsub
//   .schedule("0 6 * * *")
//   .timezone("America/New_York")
//   .onRun(async () => {
//     const message = {
//       notification: {
//         title: "Test Notification",
//         body: "Soon to be affirmation message",
//       },
//       topic: "todays-affirmations",
//     };

//     await admin.messaging().send(message);
//     return;
//   });

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

    let users = usersSnapshot.docs.map((doc: any) => doc.data());
    console.log("Mapped users:", users);

    const seen = new Set();
    users = users.filter((user: User) => {
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
