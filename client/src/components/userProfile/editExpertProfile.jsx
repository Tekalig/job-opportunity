import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Buffer } from "buffer";
import AuthStore from "../../actions";
import { ImageUp } from "lucide-react";


export default function EditExpertProfile() {
  const [subProfile, setSubProfile] = useState({
    firstName: "",
    lastName: "",
    oldPassword: "",
    newPassword: "",
    contactNumber: "",
    picture: null,
  });

  const navigate = useNavigate();

  const { editProfile, user } = AuthStore();

  useEffect(() => {
    const { firstName, lastName, contactNumber, profilePicture } = user;
    setSubProfile({
      firstName,
      lastName,
      contactNumber,
      oldPassword: "",
      newPassword: "",
      picture:profilePicture,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSubProfile({
      ...subProfile,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setSubProfile({
      ...subProfile,
      picture: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    await editProfile(subProfile);
    navigate("/profile");
  };

  return (
    <div>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="flex flex-col items-center">
          <label
            htmlFor="picture"
            className="mb-2 text-sm font-medium text-gray-200"
          >
            Profile Picture:
          </label>
          
          {subProfile.picture ? (
            <img
              src={subProfile.picture instanceof File ? URL.createObjectURL(subProfile.picture) : `data:image/jpeg;base64,${Buffer.from(subProfile.picture).toString('base64')}`}
              alt="Profile Preview"
              className="mt-4 w-32 h-32 rounded-full object-cover"
            />
          ) : (
            <div className="mt-4 w-32 h-32 rounded-full bg-black"></div>
          )}
          <input
            type="file"
            id="picture"
            name="picture"
            className="hidden"
            onChange={handleFileChange}
            accept="image/*"
          />
          <label htmlFor="picture" className="cursor-pointer mt-2">
            <ImageUp size={16} />
          </label>
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="firstName"
            className="mb-2 text-sm font-medium text-gray-200"
          >
            First Name:
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            className="p-2 rounded bg-gray-700 text-gray-200"
            value={subProfile.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="lastName"
            className="mb-2 text-sm font-medium text-gray-200"
          >
            Last Name:
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            className="p-2 rounded bg-gray-700 text-gray-200"
            value={subProfile.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="oldPassword"
            className="mb-2 text-sm font-medium text-gray-200"
          >
            Old Password:
          </label>
          <input
            type="password"
            id="oldPassword"
            name="oldPassword"
            className="p-2 rounded bg-gray-700 text-gray-200"
            value={subProfile.oldPassword}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="newPassword"
            className="mb-2 text-sm font-medium text-gray-200"
          >
            New Password:
          </label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            className="p-2 rounded bg-gray-700 text-gray-200"
            value={subProfile.newPassword}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="contactNumber"
            className="mb-2 text-sm font-medium text-gray-200"
          >
            Contact Number:
          </label>
          <input
            type="text"
            id="contactNumber"
            name="contactNumber"
            className="p-2 rounded bg-gray-700 text-gray-200"
            value={subProfile.contactNumber}
            onChange={handleChange}
            required
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 mt-4 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700"
        >
          Save
        </button>
      </form>
    </div>
  );
}