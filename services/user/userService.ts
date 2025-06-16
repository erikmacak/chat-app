import { createUser, 
        getUserById, 
        hasUserNickname as repoHasUserNickname, 
        setUserNickname as repoSetUserNickname, 
        User } from "../../repositories/user/userRepository";

export const createUserIfNotExists = async (user: User): Promise<void> => {
  console.log(`[UserService] Checking if user exists with uid: ${user.uid}`);
  const existingUser = await getUserById(user.uid);
  if (!existingUser) {
    console.log(`[UserService] User not found, creating user`);
    await createUser(user);
  } else {
    console.log(`[UserService] User already exists`);
  }
};

export const hasUserNickname = async (uid: string): Promise<boolean> => {
  console.log(`[UserService] Checking if user has nickname for uid: ${uid}`);
  return repoHasUserNickname(uid);
};

export const setUserNickname = async (uid: string, nickname: string): Promise<void> => {
  console.log(`[UserService] Setting user nickname for uid: ${uid}`);
  await repoSetUserNickname(uid, nickname);
};