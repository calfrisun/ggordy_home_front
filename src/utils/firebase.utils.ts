// Import the functions you need from the SDKs you need
import { FirebaseApp, initializeApp } from "firebase/app";
import { onAuthStateChanged } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { IUser } from "../types";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

let app: FirebaseApp;

// const analytics = getAnalytics(app);


/**
 * 파이어베이스 앱 인스턴스를 반환합니다.
 * @returns 파이어베이스 앱 인스턴스
 */
export const getFirebaseApp = async () => {
    if (!app) {
        const firebaseConfig = {
            apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
            authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
            projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
            storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
            messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
            appId: import.meta.env.VITE_FIREBASE_APP_ID,
            measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
            databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
        };
        app = await initializeApp(firebaseConfig);
    }
    return app;
}

/**
 * 파이어베이스 데이터베이스 인스턴스를 반환합니다.
 * @returns 파이어베이스 데이터베이스 인스턴스
 */
export const getFireDatabase = async () => {
    const app = await getFirebaseApp();
    return getDatabase(app);
}


/**
 * 로그인된 사용자 정보를 반환합니다.
 * @returns 로그인된 사용자 정보
 */
export const getLoginUser = async (): Promise<IUser | null> => {
    const app = await getFirebaseApp();
    const auth = getAuth(app);

    return new Promise((resolve) => {
        onAuthStateChanged(auth, user => {
            if (!user) {
                resolve(null);
                return;
            }
            const { displayName, email, uid } = user;
            resolve({
                userUuid: uid,
                userName: displayName || '',
                userEmail: email || '',
            } as IUser);
        });
    });
}