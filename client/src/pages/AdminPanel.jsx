import { useEffect } from "react";
import { BarChart, Users, Building2, FileText, Trash2, CheckCircle, UserPlus } from "lucide-react";
import AuthStore from "../actions";

const AdminDashboard = () => {
  const { jobs, getJobs, applicants, deleteJob, experts, companies, getExperts, getCompanies, getApplicants } = AuthStore();

  useEffect(() => {
    getJobs();
    getExperts();
    getCompanies();
    getApplicants();
  }, []);

  // Calculate statistics
  const totalJobs = jobs?.length;
  const totalExperts = applicants?.length;
  const totalCompanies = [...new Set(jobs.map(job => job.Employer?.companyName))].length;
  const totalApplications = applicants?.length;
  const verifiedUsers = experts?.filter(e => e.isVerified).length + companies?.filter(c => c.isVerified).length;
  const totalUsers = experts?.length + companies?.length;

  return (
    <div className="p-8 bg-gray-100 dark:bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-gray-100">Admin Dashboard</h1>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Total Jobs</p>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">{totalJobs}</h3>
            </div>
            <BarChart className="text-blue-500 w-8 h-8" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Total Experts</p>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">{totalExperts}</h3>
            </div>
            <Users className="text-green-500 w-8 h-8" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Total Companies</p>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">{totalCompanies}</h3>
            </div>
            <Building2 className="text-purple-500 w-8 h-8" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Total Applications</p>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">{totalApplications}</h3>
            </div>
            <FileText className="text-orange-500 w-8 h-8" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Verified Users</p>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">{verifiedUsers}</h3>
            </div>
            <CheckCircle className="text-green-500 w-8 h-8" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Total Users</p>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">{totalUsers}</h3>
            </div>
            <Users className="text-blue-500 w-8 h-8" />
          </div>
        </div>
      </div>

      {/* Jobs List */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Jobs Management</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Job Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Company</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700 text-gray-800 dark:text-gray-100">
              {jobs.map((job) => (
                <tr key={job.jobId}>
                  <td className="px-6 py-4">{job.jobTitle}</td>
                  <td className="px-6 py-4">{companies.map((company) => {
                    if (company.companyId == job.companyId) return company.companyName;
                  })}</td>
                  <td className="px-6 py-4">{job.jobLocation}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => deleteJob(job.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Applicants List */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Applicants Management</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700 text-gray-800 dark:text-gray-100">
              {applicants.map((applicant) => (
                <tr key={applicant.applicationId}>
                  <td className="px-6 py-4">{`${applicant.firstName} ${applicant.lastName}`}</td>
                  <td className="px-6 py-4">{applicant.email}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      applicant.applicationStatus === 'accepted' ? 'bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-100' :
                      applicant.applicationStatus === 'rejected' ? 'bg-red-100 dark:bg-red-800 text-red-800 dark:text-red-100' :
                      'bg-yellow-100 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-100'
                    }`}>
                      {applicant.applicationStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => {/* Add delete applicant function */}}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => {/* Add request function */}}
                      className="text-blue-500 hover:text-blue-700 ml-2"
                    >
                      <UserPlus className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;