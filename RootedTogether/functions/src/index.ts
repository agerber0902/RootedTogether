import { setGlobalOptions } from "firebase-functions";
import { onRequest } from "firebase-functions/https";
import * as logger from "firebase-functions/logger";
import admin from "firebase-admin";
// import { onSchedule } from "firebase-functions/scheduler";
import { Timestamp } from "firebase-admin/firestore";
import { onSchedule } from "firebase-functions/scheduler";

interface Affirmation {
  id?: string;
  message: string;
  displayDate: Timestamp | null;
  recipientId: string;
  creatorId: string;

  createdAt: Timestamp;
}

interface NotificationAffirmation {
  date: Timestamp;
  title?: string;
  body?: string;
  friendDisplayName?: string;
  affirmation?: Affirmation | Affirmation[];
}

const getRandomItem = <T>(array: T[]): T => {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};

const getAffirmationForCreator = (
  creatorId: string,
  allAffirmations: Affirmation[],
): Affirmation[] | undefined => {
  const today = new Date();
  const startOfDay = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
    0,
    0,
    0,
  );

  const endOfDay = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
    23,
    59,
    59,
  );

  // Filter affirmations by creator
  const creatorAffirmations = allAffirmations.filter(
    (a) => a.creatorId === creatorId,
  );

  if (creatorAffirmations.length === 0) {
    return undefined;
  }

  // Try to get today's affirmations
  const todaysAffirmations = creatorAffirmations.filter((a) => {
    if (!a.displayDate) return false;
    const d = new Date(a.displayDate.toDate());
    return d >= startOfDay && d <= endOfDay;
  });

  if (todaysAffirmations.length > 0) {
    return todaysAffirmations;
  }

  // Fallback to random affirmation
  return [getRandomItem(creatorAffirmations)];
};

const affirmationMap = (data: any, id: string): Affirmation => {
  return {
    id: id,
    message: data.message,
    displayDate: data.displayDate,
    recipientId: data.recipientId,
    creatorId: data.creatorId,
    createdAt: data.createdAt,
  };
};

setGlobalOptions({ maxInstances: 10 });

admin.initializeApp();

export const helloWorld = onRequest((request, response) => {
  logger.info("Hello logs!", { structuredData: true });
  response.send("Hello from Firebase!");
});

export const scheduledNotificationTest = onRequest(
  async (request, response) => {
    console.log("Triggering all user notification on scheduler...");

    const users = await getAllUsers();

    console.log("Iterating through users to send notifications..");
    const allMessages = await Promise.all(
      users.map(async (user) => {
        const notifications = await getUserNotifications(user);

        return notifications.map((n) => ({
          to: user.notificationToken,
          sound: "default",
          title: n.title,
          body: n.body,
          data: { date: n.date },
        }));
      }),
    );
    const messages = allMessages.flat();
    if (!messages.length) {
      console.log("No messages to send.");
      return;
    }

    console.log(`Preparing to send ${messages.length} messages...`);

    const res = await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(messages),
    });

    const data = await res.json();
    console.log("Expo response:", JSON.stringify(data, null, 2));
    console.log("Notifications sent");
  },
);

export const scheduledNotification = onSchedule(
  {
    schedule: "15 12 * * *",
    timeZone: "America/New_York",
  },
  async () => {
    console.log("Triggering all user notification on scheduler...");

    const users = await getAllUsers();

    console.log("Iterating through users to send notifications..");
    const messages = users.map((user) => ({
      ...getUserNotifications(user),
    }));

    console.log(`Preparing to send ${messages.length} messages...`);

    await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(messages),
    });

    console.log("Notifications sent");
  },
);

export const sendTestNotification = onRequest(async (request, response) => {
  try {
    console.log("Attempting to send a test notification.");

    const users = await getAllUsers();
    const user = users.find((u) => u.uid === "CefgXpU8ccf0Af2P0jo5RPI4GCl1");

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

// Get all the affirmations for the user
async function getUserNotifications(user: any) {
  console.log(`Attempting to get all the notifications for ${user.uid}...`);

  console.log(`Gathering affirmations where user is recipient`);
  try {
    const affirmationSnapShot = await admin
      .firestore()
      .collection("affirmations")
      .where("recipientId", "==", user.uid)
      .get();

    if (affirmationSnapShot.empty) {
      return [];
    }

    let affirmations: Affirmation[] = affirmationSnapShot.docs.map(
      (doc: any) => {
        const data = doc.data();
        return affirmationMap(data, doc.id);
      },
    );
    console.log(`Mapped affirmations:`, affirmations);

    const result: NotificationAffirmation[] = [];

    // Add user's affirmations first
    const userAffirmation = getAffirmationForCreator(user.uid, affirmations);
    if (userAffirmation) {
      result.push(
        ...userAffirmation.map((affirmation) => ({
          date: Timestamp.fromDate(new Date()),
          title: "Remind yourself",
          body: affirmation.message,
        })),
      );
      console.log(`User affirmations added.`);
    }

    // Add each friend's affirmations
    result.push(
      ...(await getUserAffirmationsFromFriends(
        user,
        affirmations.filter((a) => a.creatorId !== user.uid),
      )),
    );

    return result;
  } catch {
    console.error("An error occured gathering notifications");
    return [];
  }
}

async function getUserAffirmationsFromFriends(
  user: any,
  affirmations: Affirmation[],
): Promise<NotificationAffirmation[]> {
  console.log(
    `Gathering user affirmations for ${affirmations.length} affirmations...`,
  );
  try {
    console.log(`Gathering Friend data...`);

    const friendsSnapShot = await admin
      .firestore()
      .collection("friends")
      .where("friendIds", "array-contains", user.uid)
      .get();

    if (friendsSnapShot.empty) {
      return [];
    }
    const friends = friendsSnapShot.docs.map((doc) => doc.data());

    const notificationsFromFriends: NotificationAffirmation[] = [];

    console.log(`Iterating through affirmations to get data for notification`);

    notificationsFromFriends.push(
      ...affirmations.map((affirmation) => ({
        date: Timestamp.fromDate(new Date()),
        title:
          friends
            .find((f) =>
              f.friendDetails?.some((fd: any) => fd.userId === user.uid),
            )
            ?.friendDetails?.find((detail: any) => detail.userId === user.uid)
            ?.displayName ??
          user.first ??
          user.name,
        body: affirmation.message,
      })),
    );

    return notificationsFromFriends;
  } catch {
    return [];
  }
}

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
      if (
        user.notificationToken &&
        !user.notificationToken?.startsWith("ExponentPushToken")
      ) {
        // Filter out users that do not have notifications properly configured
        console.log(
          `User ${user.uid} does not have the proper notification token`,
        );
        return false;
      }
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
