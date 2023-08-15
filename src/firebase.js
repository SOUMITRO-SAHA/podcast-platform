import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import config from "./config";

const firebaseConfig = {
	apiKey: config.APIKEY,
	authDomain: config.AUTH_DOMAIN,
	projectId: config.PROJECTID,
	storageBucket: config.STORAGEBUCKET,
	messagingSenderId: config.MESSAGING_SENDERID,
	appId: config.APPID,
	measurementId: config.MEASUREMENTID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { auth, storage, db };
