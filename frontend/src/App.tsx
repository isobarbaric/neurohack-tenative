import { GoogleLogin } from "@react-oauth/google";
import { User, OAuthUser } from "./types/user";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { Dashboard } from "./Dashboard";
import AppBar from "./components/AppBar";
import Recorder from "./components/Recorder";

const App = () => {
  const [user, setUser] = useState<User | null>(null);

  const handleSuccess = (credentialResponse: any) => {
    if (credentialResponse.credential) {
      const decodedUser = jwtDecode(credentialResponse.credential) as OAuthUser;
      setUser({
        email: decodedUser.email! || "DNE",
        lastName: decodedUser.family_name! || "DNE",
        firstName: decodedUser.given_name! || "DNE",
        image: decodedUser.picture! || "DNE",
      });
    }
  };

  const handleError = () => {
    console.log("Login failed");
  };

  return (
    <>
      {!user && (
        <GoogleLogin
          onSuccess={handleSuccess}
          onError={handleError}
          useOneTap
        />
      )}
      {/* put dashboard component below */}
      {user && <Dashboard user={user} />}
      <Recorder />
    </>
  );
};

export default App;
