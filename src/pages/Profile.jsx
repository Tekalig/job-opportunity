import { useState } from "react";
import ProfileInfo from "../components/userProfile/ProfileInfo";
import Settings from "../components/userProfile/Settings";
import SkillCertification from "../components/userProfile/SkillCertification";
const ProfilePage = () => {
  const [state, setState] = useState(1);
  return (
    <div className="min-h-screen flex flex-col items-center p-8">
      <div>
        <ul className="flex gap-4">
          <li
            onClick={() => setState(1)}
            className={`cursor-pointer border shadow-md shadow-gray-800 border-gray-700 rounded-tl-md rounded-tr-md p-2 ${
              state === 1 && "bg-gray-600 -mb-1"
            }`}
          >
            ProfileInfo
          </li>
          <li
            onClick={() => setState(2)}
            className={`cursor-pointer border shadow-md shadow-gray-700 border-gray-600 rounded-tl-md rounded-tr-md p-2 ${
              state === 2 && "bg-gray-600 -mb-1"
            }`}
          >
            Setting
          </li>
          <li
            onClick={() => setState(3)}
            className={`cursor-pointer border-x border-t shadow-md shadow-gray-700 border-gray-600 rounded-tl-md rounded-tr-md p-2 ${
              state === 3 && "bg-gray-600 -mb-1"
            }`}
          >
            Skills & Certification
          </li>
        </ul>
      </div>
      <div className="flex justify-center items-center w-full">
        {state === 1 && <ProfileInfo />}
        {state === 2 && <Settings />}
        {state === 3 && <SkillCertification />}
      </div>
    </div>
  );
};

export default ProfilePage;
