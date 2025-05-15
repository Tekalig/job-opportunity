import { useEffect, useState } from "react";
import AuthStore from "../actions";
import { useNavigate, useLocation } from "react-router-dom";

const PostJob = () => {
  const [jobData, setPostData] = useState({
    jobTitle: "",
    jobDescription: "",
    jobSkills: "",
    jobLocation: "",
    jobSalary: "",
    jobType: "",
    jobLevel: "",
    jobExperience: "",
  });

  const { postJob, jobs, editJob } = AuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const { jobId } = location.state || {};

  useEffect(() => {
    if (jobId) {
      const job = jobs.filter((job) => job.jobId === jobId)[0];
      setPostData(job);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPostData({
      ...jobData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!jobId) {
      await postJob(jobData);
    } else {
      await editJob(jobData, jobId);
    }
    navigate("/jobs");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-6 bg-slate-300 text-black shadow-md rounded-md"
    >
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Job Title:</label>
        <input
          type="text"
          name="jobTitle"
          value={jobData.jobTitle}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">
          Job Description:
        </label>
        <textarea
          name="jobDescription"
          value={jobData.jobDescription}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">
          Required Skills:
        </label>
        <input
          type="text"
          name="jobSkills"
          value={jobData.jobSkills}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">
          Job Location:
        </label>
        <input
          type="text"
          name="jobLocation"
          value={jobData.jobLocation}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Salary:</label>
        <input
          type="text"
          name="jobSalary"
          value={jobData.jobSalary}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">
          Required Experience:
        </label>
        <input
          type="text"
          name="jobExperience"
          value={jobData.jobExperience}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Job Type:</label>
        <select
          name="jobType"
          value={jobData.jobType}
          onChange={handleChange}
          className="w-full px-3 py-2 text-black border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="">Select Job Type</option>
          <option value="fulltime">Full-time</option>
          <option value="parttime">Part-time</option>
          <option value="contract">Contract</option>
          <option value="internship">Internship</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Job Level:</label>
        <select
          name="jobLevel"
          value={jobData.jobLevel}
          onChange={handleChange}
          className="w-full px-3 py-2 border text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="">Select Job Level</option>
          <option value="entry">Entry</option>
          <option value="intermediate">Mid</option>
          <option value="senior">Senior</option>
        </select>
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {jobId ? "Save" : "Post"}
      </button>
    </form>
  );
};

export default PostJob;
