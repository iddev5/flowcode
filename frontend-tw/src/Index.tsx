import { Mail } from "lucide-react";
import { Button } from "./components/ui/button";
import { getAdditionalUserInfo, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "./lib/firebase";
import { useAppDispatch } from "./lib/store";
import api from "./lib/api";
import { useAuth } from "@/components/auth-provider";
import { useNavigate } from "react-router";

export default function Index() {
  const { user, loading } = useAuth();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  if (!loading && user !== null) navigate("/home");

  const signIn = async () => {
    const res = await signInWithPopup(auth, googleProvider);
    const additionalInfo = getAdditionalUserInfo(res);

    dispatch(api.createUser());
    navigate("/home");
  };

  return (
    <div className="w-screen h-screen flex flex-col gap-10 items-center justify-center">
      <h1 className="font-bold text-9xl">Flowcode</h1>
      {loading && <p>Loading. Please wait...</p>}
      {!loading && (
        <Button onClick={signIn}>
          <Mail /> Sign in with Google
        </Button>
      )}
    </div>
  );
}
