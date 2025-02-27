import {env} from './env'

export const environment = {
  appName: "Localess",
  firebase: {
    projectId: env.LOCALESS_FIREBASE_PROJECT_ID,
    appId: env.LOCALESS_FIREBASE_APP_ID,
    storageBucket: env.LOCALESS_FIREBASE_STORAGE_BUCKET,
    apiKey: env.LOCALESS_FIREBASE_API_KEY,
    authDomain: env.LOCALESS_FIREBASE_AUTH_DOMAIN,
    messagingSenderId: env.LOCALESS_FIREBASE_MESSAGING_SENDER_ID,
  },
  auth: {
    customDomain: env.LOCALESS_AUTH_CUSTOM_DOMAIN,
    providers: env.LOCALESS_AUTH_PROVIDERS
  },
  production: true,
  test: false,
  useEmulators: false,
};
