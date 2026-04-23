# RootedTogether

RootedTogether is a cross-platform React Native application (Web, iOS, and Android) designed to help users build meaningful connections through daily affirmations.

## Features

### Authentication

* Email and password authentication powered by Firebase Authentication
* Secure user account creation and login

### Today Screen (Home)

* Default landing page after login
* Displays a curated list of daily affirmations for the user
* Dynamic welcome message based on time of day

### Create Screen

* Create affirmations for yourself or others
* Optional fields:

  * **Date**: Schedule affirmations for a specific day
  * **Recipient**: Send affirmations to friends
* If no recipient is selected, the affirmation defaults to the current user

### Account Screen

* View and edit basic account information
* Update display name
* Invite friends via email
* Manage connections with other users

### Friend Connections

* Users can invite friends via email
* Invited users can accept connections via an "Accept" button
* User that does the inviting will see "Pending" until accepted
* Enables sharing affirmations between connected users

### Daily Affirmation Engine

* Runs automatically every day at **6:00 AM**
* Process:

  1. Fetch all affirmations where `recipientId == currentUserId`
  2. Extract unique creator (friend) IDs
  3. Select **one affirmation per friend**
  4. Prioritize affirmations scheduled for the current day
  5. If none exist for today, select a random affirmation

---

## 🛠️ Tech Stack

* **React Native** (Web, iOS, Android)
* **TypeScript**
* **Redux** for state management
* **React Hooks** for component logic
* **Firebase Authentication** for user management

---

## Future Improvments

* Push notifications for daily affirmations
* Enhanced friend management
* Rich media affirmations (images, audio)
* Improved scheduling and reminders
