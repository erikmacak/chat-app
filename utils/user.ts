import { DocumentSnapshot } from "firebase/firestore";
import { User } from "../models/User";

export const stripUid = ({ uid, ...data }: User) => data;