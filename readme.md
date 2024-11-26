# Spotify Developer App Setup

## 1. Create a Developer Account on Spotify

To get started, create a developer account on the [Spotify Developer Dashboard](https://developer.spotify.com/).

## 2. Create a New App

Once logged into your dashboard, follow these steps:

1. Click on **Create an App**.
2. Give your app a name.
3. Add a brief description of what your app does.
4. In the **Redirect URI** field, you can use `http://localhost` if you're working locally on your machine.

## 3. Obtain Your Credentials

After creating your app, you’ll be redirected to your dashboard where you can find the following essential information:

- **CLIENT_ID**: A unique identifier for your app.
- **CLIENT_SECRET**: A secret key to authenticate your app with Spotify’s API.

You will need these credentials for authentication when making API calls.

## 4. Add Credentials to Your Project

Copy and paste your **CLIENT_ID** and **CLIENT_SECRET** into your JavaScript file at the top to start testing. It should look something like this:

```js
const CLIENT_ID = 'your-client-id';
const CLIENT_SECRET = 'your-client-secret';
