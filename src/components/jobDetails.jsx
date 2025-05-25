export default function jobDetails({ job }) {
  return (
    <div className="p-4 space-y-4 flex flex-col items-stretch">
      {/* Job Description */}
      <strong className="text-lg text-gray-800">
        <span className=" text-lime-500 font-semibold">Description:</span>{" "}
        {job.jobDescription}
      </strong>
      {/* Job Type */}
      <p className="text-lg text-gray-800 capitalize">
        <span className=" text-lime-500 font-semibold">Type:</span>{" "}
        {job.jobType}
      </p>
      {/* Job Location */}
      <p className="text-lg text-gray-800">
        <span className=" text-lime-500 font-semibold">Location:</span>{" "}
        {job.jobLocation}
      </p>
      {/* Job Salary */}
      <p className="text-green-600 text-lg">
        <span className=" text-lime-500 font-semibold">Salary:</span>{" "}
        {job.jobSalary}
      </p>
      {/* Job Experience */}
      <p className="text-lg text-gray-800">
        <span className=" text-lime-500 font-semibold">Experience:</span>{" "}
        {job.jobExperience}
      </p>
      {/* Job Skills */}
      <p className="text-lg text-gray-800">
        <span className=" text-lime-500 font-semibold">Skills:</span>{" "}
        {job.jobSkills}
      </p>
      {/* Job Level */}
      <p className="text-red-800 text-lg capitalize">
        <span className=" text-lime-500 font-semibold">Level:</span>{" "}
        {job.jobLevel}
      </p>
    </div>
  );
}
