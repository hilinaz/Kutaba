import { updateProfile } from "firebase/auth";
import { auth } from "../../../app/firebase"; 

export async function editProfileService(name?: string, photo?: string) {
  try {
    if (auth.currentUser) {
      await updateProfile(auth.currentUser, {
        displayName: name || auth.currentUser.displayName,
        photoURL: photo || auth.currentUser.photoURL,
      });
      console.log("Profile updated successfully!");
    }
  } catch (error: any) {
    console.error("Error updating profile:", error);
  }
}
