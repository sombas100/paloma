import { Button } from "flowbite-react";
import React from "react";
import { AiFillGoogleCircle } from "react-icons/ai";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";

const OAuth: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleGoogleClick = async () => {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });

    try {
      const resultsFromGoogle = await signInWithPopup(auth, provider);
      const res = await fetch(
        "https://paloma-vo48.onrender.com/api/users/google",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: resultsFromGoogle.user.displayName,
            email: resultsFromGoogle.user.email,
            googlePhotoUrl: resultsFromGoogle.user.photoURL,
          }),
        }
      );

      if (res.ok) {
        const data = await res.json();
        // Ensure data has both user info and token
        if (data.token && data.user) {
          // Dispatch login action with user data and token
          dispatch(signInSuccess({ ...data.user, token: data.token }));
          navigate("/");
        } else {
          console.error("Unexpected response structure", data);
          throw new Error("Unexpected response structure");
        }
      } else {
        const errorData = await res.text();
        console.error("Error response from the server", errorData);
        throw new Error(errorData);
      }
    } catch (error) {
      console.error("Error signing in with Google", error);
    }
  };

  return (
    <Button onClick={handleGoogleClick} outline gradientDuoTone="redToYellow">
      <AiFillGoogleCircle style={{ marginRight: "5px" }} className="w-5 h-5" />
      Continue with Google
    </Button>
  );
};

export default OAuth;
