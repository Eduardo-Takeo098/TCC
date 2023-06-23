import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, onSnapshot, off } from "firebase/firestore";
import { serverTimestamp } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "SEU_DOMINIO.firebaseapp.com",
  projectId: "SEU_PROJECT_ID",
  storageBucket: "SEU_BUCKET",
  messagingSenderId: "SEU_SENDER_ID",
  appId: "SEU_APP_ID",
  measurementId: "SEU_MEASUREMENT_ID"
};

class Fire {
  constructor() {
    this.init();
  }

  init = () => {
    if (!initializeApp.length) {
      initializeApp(firebaseConfig);
    }
  };

  send = async messages => {
    const db = getFirestore();
    const batch = [];

    messages.forEach(item => {
      const message = {
        text: item.text,
        timestamp: serverTimestamp(),
        user: {
          _id: item.user._id || '',
          name: item.user.name
        }
      };

      batch.push(addDoc(collection(db, "messages"), message));
    });

    try {
      await Promise.all(batch);
    } catch (error) {
      console.log("Erro ao enviar mensagem:", error);
    }
  };

  parse = doc => {
    const { user, text, timestamp } = doc.data();
    const { id: _id } = doc;
    const createdAt = timestamp ? new Date(timestamp.toMillis()) : new Date();

    return {
      _id,
      createdAt,
      text,
      user
    };
  };

  get = callback => {
    const db = getFirestore();
    const query = collection(db, "messages");

    const unsubscribe = onSnapshot(query, snapshot => {
      snapshot.docChanges().forEach(change => {
        if (change.type === "added") {
          callback(this.parse(change.doc));
        }
      });
    });

    return unsubscribe;
  };

  off(unsubscribe) {
    unsubscribe();
  }

  get db() {
    return getFirestore();
  }
}

export default new Fire();
