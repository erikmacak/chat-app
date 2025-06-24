import { collection, query, doc, getDoc, getDocs, setDoc, updateDoc, where, orderBy, startAt, endAt } from "firebase/firestore";
import { db } from "../../lib/firebase";

export type User = {
  uid: string;
  email: string | null;
  photoURL: string | null;
  nickname?: string;
};

export const getUserById = async (uid: string): Promise<User | null> => {
  console.log(`[UserRepository] Fetching user by uid: ${uid}`);
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    console.log(`[UserRepository] User with uid ${uid} not found`);
    return null;
  }

  const user = docSnap.data() as User;
  console.log(`[UserRepository] User found: `, user);
  return user;
};

export const createUser = async (user: User): Promise<void> => {
  console.log(`[UserRepository] Creating user with uid: ${user.uid}`);
  const docRef = doc(db, "users", user.uid);
  await setDoc(docRef, user);
  console.log(`[UserRepository] User created successfully`);
};

export const hasUserNickname = async (uid: string): Promise<boolean> => {
  console.log(`[UserRepository] Checking nickname for uid: ${uid}`);
  const user = await getUserById(uid);
  const hasNickname = !!user?.nickname;
  console.log(`[UserRepository] User has nickname: ${hasNickname}`);
  return hasNickname;
};

export const setUserNickname = async (uid: string, nickname: string): Promise<void> => {
  console.log(`[UserRepository] Setting nickname for uid: ${uid} to '${nickname}'`);
  const docRef = doc(db, "users", uid);
  await updateDoc(docRef, { nickname });
  console.log(`[UserRepository] Nickname set successfully`);
};

export const isNicknameTaken = async (nickname: string): Promise<boolean> => {
  console.log(`[UserRepository] Checking if nickname '${nickname}' is taken`);
  const usersRef = collection(db, "users");
  const q = query(usersRef, where("nickname", "==", nickname));
  const querySnapshot = await getDocs(q);
  const taken = !querySnapshot.empty;
  console.log(`[UserRepository] Nickname '${nickname}' taken: ${taken}`);
  return taken;
};

export const getUsersByNicknamePrefix = async (prefix: string): Promise<User[]> => {
  console.log(`[UserRepository] Searching users with nickname prefix: '${prefix}'`);
  const usersRef = collection(db, "users");

  const q = query(
    usersRef,
    orderBy("nickname"),
    startAt(prefix),
    endAt(prefix + '\uf8ff')
  );

  const querySnapshot = await getDocs(q);

  const users: User[] = querySnapshot.docs.map(doc => {
    const data = doc.data() as User;
    return {
      ...data,
      uid: doc.id 
    };
  });

  console.log(`[UserRepository] Found ${users.length} users`);
  return users;
};