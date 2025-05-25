import AuthStore from "../actions";
import expertImage from "../assets/images/expert.webp";
import expertImage1 from "../assets/images/expert1.jpg";
import expertImage2 from "../assets/images/expert2.jpg";

const ExpertHomePage = () => {
  const { isEmployer } = AuthStore();
  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-800">
      <main className="flex-grow flex flex-col items-center justify-center p-8">
        {!isEmployer ? (
          <>
            <h1 className="text-4xl font-bold mb-8 text-gray-800">Welcome, Expert!</h1>
            <p className="text-lg leading-relaxed sm:text-xl md:text-2xl max-w-2xl mx-auto p-4 sm:p-6 md:p-8 text-gray-600">
              We are glad to have you onboard! This platform empowers experts
              like you to connect with opportunities, manage applications, and
              schedule interviews effortlessly. Explore the features designed to
              streamline your expertise and enhance your professional impact.
            </p>
          </>
        ) : (
          <>
            <h1 className="text-4xl font-bold mb-8 text-gray-800">Welcome, Employer!</h1>
            <p className="text-lg leading-relaxed sm:text-xl md:text-2xl max-w-2xl mx-auto p-4 sm:p-6 md:p-8 text-gray-600">
              We are glad to have you onboard! This platform empowers employers
              like you to connect with talented applicants, post job openings,
              and manage your hiring process effortlessly. Explore the features
              designed to streamline your recruitment efforts and enhance your
              organizational impact.
            </p>
          </>
        )}

        <div className="flex flex-wrap justify-center gap-8 mt-8">
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 flex justify-center">
            <img
              src={expertImage}
              alt="Illustration 1"
              className="w-full rounded-lg shadow-lg"
            />
          </div>
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 flex justify-center">
            <img
              src={expertImage1}
              alt="Illustration 2"
              className="w-full rounded-lg shadow-lg"
            />
          </div>
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 flex justify-center">
            <img
              src={expertImage2}
              alt="Illustration 3"
              className="w-full rounded-lg shadow-lg"
            />
          </div>
        </div>
      </main>
      
    </div>
  );
};

export default ExpertHomePage;
