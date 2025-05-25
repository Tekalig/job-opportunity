import { useNavigate } from "react-router-dom";
import { Buffer } from "buffer";
import AuthStore from "../../actions";

export default function ProfileInfo() {
  const { user, isEmployer, logout } = AuthStore();
  const navigate = useNavigate();
  const userName = isEmployer
    ? user?.companyName
    : user?.firstName + " " + user?.lastName;

  const handleLogout = async () => {
    // Implement your logout logic here
    await logout();
    navigate("/");
  };

  return (
    <div className="text-neutral-100 p-6 rounded shadow-lg w-full max-w-2xl bg-gray-600">
      <div className="flex flex-col items-center mb-6">
        
      {user?.profilePicture ?<img
        src={`data:image/jpeg;base64,${Buffer.from(user?.profilePicture).toString('base64')}`}
        alt="Profile"
        className="w-32 h-32 rounded-full object-cover border-4 border-blue-500 mb-4"
      />:
      <img src="../assets/images/istockphoto-1337144146-1024x1024.jpg" alt="Profile" className="w-32 h-32 rounded-full border-4 border-blue-500 mb-4" />
      }
      </div>

      <div>
        <div className="mb-4">
          <p className="block text-gray-100 text-sm font-bold mb-2 capitalize">
            {isEmployer ? "Company" : "Full"} Name : {userName}
          </p>
        </div>

        {isEmployer && ( // Show only for employer
          <div className="mb-4">
            <p className="block text-gray-100 text-sm font-bold mb-2">
              Company Description: {user?.companyDescription}
            </p>
          </div>
        )}

        <div className="mb-4">
          <p className="block text-gray-100 text-sm font-bold mb-2">
            Phone Number: {user?.contactNumber}
          </p>
        </div>

        <div className="mb-4">
          <p className="block text-gray-100 text-sm font-bold mb-2">
            Email: {user?.email}
          </p>
        </div>

        <div className="mb-4">
          <p className="block text-gray-100 text-sm font-bold mb-2">
            Skills: javaScript, Python, Ml
          </p>
        </div>

        <div className="mb-4">
          <p className="block text-gray-100 text-sm font-bold mb-2">
            Certification: Aws cloud certification
          </p>
        </div>

        <div className="mb-4">
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
