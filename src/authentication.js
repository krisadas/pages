import firebase from "firebase";
import { useAuthState } from "react-firebase-hooks/auth";

// FIrebase Config from your firebase project.
const firebaseConfig = {
  apiKey: "AIzaSyApP76zDvHyXDP0HMLi31o1Hw90OFy2Wh0",
  authDomain: "testauth-c81fe.firebaseapp.com",
  projectId: "testauth-c81fe",
  storageBucket: "testauth-c81fe.appspot.com",
  messagingSenderId: "215145452734",
  appId: "1:215145452734:web:077d4e7c0fde262cfe7aef",
};

const app = firebase.initializeApp(firebaseConfig);
const auth = app.auth();

const googleProvider = new firebase.auth.GoogleAuthProvider();
const useCurrentUser = (props) => {
  const [user, loading, error] = useAuthState(firebase.auth());
  return [user, loading, error];
};

const signInWithGoogle = async () => {
  try {
    const res = await auth.signInWithPopup(googleProvider);

    const user = res.user;
    console.log("user > ", user);
    // Save user to DB here
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const signInWithEmailAndPassword = async (email, password) => {
  try {
    console.log("email > ", email);
    console.log("REACT_APP_API_URL > ", process.env.REACT_APP_API_URL);

    const res = await auth.signInWithEmailAndPassword(email, password);
    return res;
  } catch (err) {
    console.error(err);
    return err;
  }
};

const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await auth.createUserWithEmailAndPassword(email, password);
    const user = res.user;
    console.log("user > ", user);
    // Save User to DB here.
    return res;
  } catch (err) {
    console.error(err);
    return err;
  }
};

const logout = () => {
  console.log("logout");
  auth.signOut();
};

export {
  auth,
  useCurrentUser,
  signInWithGoogle,
  signInWithEmailAndPassword,
  registerWithEmailAndPassword,
  logout,
};
