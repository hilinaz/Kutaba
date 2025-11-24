import { auth } from "../../../app/firebase";
import { updateProfile } from "firebase/auth";

export const uploadToCloudinary = async (file: File, userId: string) => {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "hilina_unsigned");
  data.append("public_id", `user_profiles/${userId}/profile`);
  data.append("folder", `user_profiles/${userId}`);

  const res = await fetch(
    "https://api.cloudinary.com/v1_1/dl6ahheds/image/upload",
    {
      method: "POST",
      body: data,
    }
  );

  if (!res.ok) throw new Error("Cloudinary upload failed");
  const json = await res.json();

  return json.secure_url;
};


export const editProfileService = async (name: string, file: File | null) => {
  if (!auth.currentUser) throw new Error("No authenticated user");

  let photoURL: string | null = null;


  if (file) {
    const CLOUD_NAME = "dl6ahheds"; 
    const PRESET = "user_profile_unsigned"; 
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", PRESET);
    formData.append("public_id", auth.currentUser.uid); 

    const uploadRes = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!uploadRes.ok) {
      const errorText = await uploadRes.text();
      console.error("Cloudinary Upload Error →", errorText);
      throw new Error("Cloudinary upload failed");
    }

    const data = await uploadRes.json();
    photoURL = data.secure_url;
  }

 
  await updateProfile(auth.currentUser, {
    displayName: name || auth.currentUser.displayName,
    photoURL: photoURL || auth.currentUser.photoURL || undefined,
  });

  return {
    name: name || auth.currentUser.displayName,
    photoURL: photoURL || auth.currentUser.photoURL || null,
  };
};
