import { Link } from "react-router-dom";
import { FlaskConical, Briefcase, Palette, BookOpen, Coffee, HardHat, Truck, Settings, DollarSign, Gavel, Monitor, Heart } from 'lucide-react';
import jobImage from '../assets/images/job.avif';
import jobImage1 from '../assets/images/job1.jpg';
import jobImage2 from '../assets/images/job2.jpg';
import jobImage3 from '../assets/images/job3.jpg';

const sectors = [
  {
    name: "Natural Science",
    icon: <FlaskConical />,
    positions: 37,
  },
  {
    name: "Business",
    icon: <Briefcase />,
    positions: 282,
  },
  {
    name: "Creative Arts",
    icon: <Palette />,
    positions: 14,
  },
  {
    name: "Education",
    icon: <BookOpen />,
    positions: 84,
  },
  {
    name: "Hospitality",
    icon: <Coffee />,
    positions: 17,
  },
  {
    name: "Low and Medium Skilled Worker",
    icon: <HardHat />,
    positions: 37,
  },
  {
    name: "Transportation & Logistics",
    icon: <Truck />,
    positions: 29,
  },
  {
    name: "Engineering",
    icon: <Settings />,
    positions: 112,
  },
  {
    name: "Finance",
    icon: <DollarSign />,
    positions: 156,
  },
  {
    name: "Legal Services",
    icon: <Gavel />,
    positions: 16,
  },
  {
    name: "ICT",
    icon: <Monitor />,
    positions: 28,
  },
  {
    name: "Health Care",
    icon: <Heart />,
    positions: 62,
  },
];

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800">
      <div className="text-center py-12">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">
          All Ethiopian Jobs in One Place.
        </h1>
        <p className="text-xl">Find career opportunities in Ethiopia</p>
      </div>

      <div className="flex flex-col items-center my-12 rounded w-1/2 shadow-md mx-auto bg-slate-200 dark:bg-gray-700">
        <p className="text-lg font-semibold my-6">Sign Up As</p>

        <div className="flex space-x-4">
          <Link
            to="/expert/signup"
            className="bg-teal-500 text-white px-6 py-3 rounded-xl
         hover:bg-teal-600 transition-all duration-300 transform hover:scale-105 mb-20 mr-2"
          >
            Expert
          </Link>
          <h1 className="text-xl text-red-400">or</h1>
          <Link
            to="/employer/signup"
            className="bg-teal-500 text-white px-6 py-3 rounded-xl
         hover:bg-teal-600 transition-all duration-300 transform hover:scale-105 mb-20"
          >
            Employer
          </Link>
        </div>
      </div>

      <div className="flex justify-center gap-8 px-4">
        <div className="w-1/4 flex justify-center">
          <img
            src={jobImage}
            alt="Illustration 1"
            className="w-full rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          />
        </div>
        <div className="w-1/4 flex justify-center">
          <img
            src={jobImage1}
            alt="Illustration 2"
            className="w-full rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          />
        </div>
        <div className="w-1/4 flex justify-center">
          <img
            src={jobImage2}
            alt="Illustration 3"
            className="w-full rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          />
        </div>
        <div className="w-1/4 flex justify-center">
          <img
            src={jobImage3}
            alt="Illustration 4"
            className="w-full rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          />
        </div>
      </div>

      <div className="py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Career Sectors</h2>
          <p className="text-lg mb-8">
            Based on the local labor market trend in Ethiopia we categorize our
            vacancies into fourteen sectors
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {sectors.map((sector, index) => (
              <div
                key={index}
                className="p-6 text-gray-800 dark:text-gray-100 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 bg-white dark:bg-gray-700"
              >
                <div className="h-16 w-16 mx-auto mb-4 text-teal-500">
                  {sector.icon}
                </div>
                <h3 className="text-xl font-semibold">{sector.name}</h3>
                <p className="text-gray-600 dark:text-gray-200">{sector.positions} Open positions</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
