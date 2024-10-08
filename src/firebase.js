import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyBLZyqrrrIiqatzdc_lgjv2wtu-7JENixA",
    authDomain: "post-data-6a906.firebaseapp.com",
    databaseURL: "https://post-data-6a906-default-rtdb.firebaseio.com",
    projectId: "post-data-6a906",
    storageBucket: "post-data-6a906.appspot.com",
    messagingSenderId: "754264424991",
    appId: "1:754264424991:web:3ee2d4638240abc5d10b2a"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export const savePostsToFirebase = async (posts) => {
  await set(ref(database, 'posts/'), posts);
};
