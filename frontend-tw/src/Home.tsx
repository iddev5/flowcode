import { useEffect } from "react";
import api from "@/lib/api";
import { useAuth } from "@/components/auth-provider";
import { useNavigate } from "react-router";
import { Plus } from "lucide-react";
import { setCurrentProject } from "@/features/projectSlice";
import { ProfileTrigger } from "@/sections/Header";
import { useAppDispatch, useAppSelector, type RootState } from "./lib/store";

import { Button } from "@/components/ui/button";

export default function Home() {
  const { user, loading } = useAuth();
  const dispatch = useAppDispatch();
  const projects = useAppSelector(
    (state: RootState) => state.projects.projects,
  );
  const navigate = useNavigate();

  if (!loading && user === null) navigate("/");

  useEffect(() => {
    const T = async () => {
      if (!loading) {
        const uid = user.uid;
        dispatch(api.getProjects(uid));
      }
    };
    T();
  }, [loading]);

  const newProject = async () => {
    navigate("/project/new");
  };

  const setProject = (proj) => {
    navigate(`/project/${proj._id}`);
  };

  return (
    <>
      <div className="w-screen flex flex-col justify-center items-center">
        <div className="w-[40vw] flex items-center gap-5 mt-5 pb-5 border-b-1 border-black/10">
          <ProfileTrigger />
          <h1>{user?.displayName}</h1>
        </div>
        <div className="w-[40vw] m-8 flex flex-col">
          <Button className="w-min" onClick={newProject}>
            New Project
            <Plus />
          </Button>
          <div className="mt-4 flex flex-col gap-2 items-start">
            {projects.map((proj) => (
              <Button
                className="w-full justify-start"
                variant="secondary"
                onClick={() => setProject(proj)}
              >
                <p className="truncate">{proj.name}</p>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
