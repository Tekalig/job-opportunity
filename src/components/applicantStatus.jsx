import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AuthStore from "../actions";
import { Buffer } from "buffer";

const JobDetails = () => {
  const [selectedCategory, setSelectedCategory] = useState("shortlisted");
  const [status, setStatus] = useState("");
  const { jobId } = useParams();
  const { getApplicant, applicants, examineApplicant } = AuthStore();

  useEffect(() => {
    getApplicant(jobId);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  const applicant = applicants.filter(
    (applicant) => applicant.applicationStatus === selectedCategory
  );

  const handleClick = (category) => {
    setSelectedCategory(category);
  };

  const handleStatusChange = (applicantId) => {
    examineApplicant(applicantId, status, jobId);
    setStatus("");
  };

  return (
    <div className="p-6 bg-gray-100 h-full flex flex-col items-center">
      <div className="space-x-4 mb-6">
        <button
          onClick={() => handleClick("shortlisted")}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Shortlisted
        </button>
        <button
          onClick={() => handleClick("interview scheduled")}
          className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
        >
          Interview Scheduled
        </button>
        <button
          onClick={() => handleClick("accepted")}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Accepted
        </button>
        <button
          onClick={() => handleClick("rejected")}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Rejected
        </button>
      </div>

      {applicant && (
        <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">
            {selectedCategory} Applicants
          </h3>
          <ul className="list-disc list-inside">
            {applicant.map((applicant, index) => (
              <li
                key={index}
                className="text-gray-700 mb-4 shadow-sm border-green-300 border p-4 rounded"
              >
                <div>
                  <strong>Name:</strong> {applicant.firstName}{" "}
                  {applicant.lastName}
                </div>
                <div>
                  <strong>Email:</strong> {applicant.email}
                </div>
                <div>
                  <strong>Resume:</strong>
                  <button
                    onClick={() => {
                      const newWindow = window.open();
                      newWindow.document.write(
                        `<iframe src="data:application/pdf;base64,${Buffer.from(
                          applicant.resume
                        ).toString(
                          "base64"
                        )}" width="100%" height="100%"></iframe>`
                      );
                    }}
                    className="text-blue-500 underline"
                  >
                    View Fullscreen
                  </button>
                </div>
                {["shortlisted", "interview scheduled"].includes(
                  selectedCategory
                ) && (
                  <div className="mt-4 grid-cols-2">
                    <select
                      onChange={(e) => setStatus(e.target.value.toLowerCase())}
                      className="px-4 py-2 bg-white border rounded m-2"
                    >
                      <option value="" disabled>
                        Select Action
                      </option>
                      {selectedCategory === "shortlisted" && (
                        <option value="interview scheduled">
                          Schedule Interview
                        </option>
                      )}
                      {selectedCategory === "interview scheduled" && (
                        <option value="accepted">Accept</option>
                      )}
                      <option value="rejected">Reject</option>
                    </select>
                    <button
                      onClick={() =>
                        handleStatusChange(applicant.applicationId)
                      }
                      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Submit
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default JobDetails;
