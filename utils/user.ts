import { DocumentSnapshot } from "firebase/firestore";
import { User } from "../models/User";

export const stripUid = ({ uid, ...data }: User) => data;

export const deserializeUser = (docSnap: DocumentSnapshot): User => {
  const data = docSnap.data()!;
  return {
    ...data,
    uid: docSnap.id
  } as User;
};