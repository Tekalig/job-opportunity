import { useEffect } from "react";
import JobCard from "../components/jobs";
import SearchJob from "../components/Search";
import AuthStore from "../actions";

const Dashboard = () => {
  const { jobs, getJobs } = AuthStore();

  useEffect(() => {
    getJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="p-4">
      <SearchJob />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {jobs.map((job) => (
          <JobCard key={job.jobId} jobId={job.jobId} job={job} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
