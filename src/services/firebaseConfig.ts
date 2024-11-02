const config = {
  apiKey: "AIzaSyDBph54Brl4-HJTRW5S0vJlZMM-nc-nkdg",
  authDomain: "reboostify-f18db.firebaseapp.com",
  databaseURL: "https://reboostify-f18db-default-rtdb.firebaseio.com",
  projectId: "reboostify-f18db",
  storageBucket: "reboostify-f18db.appspot.com",
  messagingSenderId: "870800978453",
  appId: "1:870800978453:web:cffcfca384b9d1de3f141c",
  measurementId: "G-Z86QKJ0ND8"
};

type IConfig = typeof config;

export function getFirebaseConfig(): IConfig {
  if (Object.values(config).some((value) => !value))
    throw new Error('Firebase config is not set or incomplete');
  else return config;
}
