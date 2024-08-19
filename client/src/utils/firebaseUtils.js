import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";


export const checkCredits = async (user, threshold) => {
    if (!user) return false;

    const user_doc_snapshot = await getDoc(doc(db, "users", user.uid))
    const user_data = user_doc_snapshot.data();
    if (user_data?.tokens >= threshold) {
        // Check whether the user has sufficient tokens
        return true;
    }


    return false;
}