import { Handshake, Lightbulb, Users, User } from "lucide-react";

function AboutUs() {
  return (
    <div className="bg-white dark:bg-gray-800 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-extrabold text-center text-green-700 mb-6">
          About Us
        </h2>
        <p className="text-lg text-gray-800 dark:text-gray-300 mb-4 text-center leading-relaxed">
          At JobFinder, we believe in connecting talent with opportunity. Our
          mission is to empower job seekers and employers by providing a
          user-friendly platform that simplifies the job search process. We
          strive to create a community where individuals can discover their
          passions and companies can find the perfect fit for their teams.
        </p>
        <p className="text-lg text-gray-800 dark:text-gray-300 mb-8 text-center leading-relaxed">
          With our innovative features and extensive job listings, we are
          committed to helping you find your dream job or the ideal candidate.
          Whether you are a recent graduate, a seasoned professional, or an
          employer looking to grow your team, JobFinder is here to assist you
          every step of the way.
        </p>

        <div className="mt-8 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
            Our Values
          </h3>
          <ul className="list-disc list-inside text-lg text-gray-800 dark:text-gray-300 space-y-4">
            <li className="flex items-start">
              <Handshake className="inline-block text-green-700 mr-2 mt-1" />
              <strong>Integrity:</strong> We uphold the highest standards of
              honesty and transparency.
            </li>
            <li className="flex items-start">
              <Lightbulb className="inline-block text-green-700 mr-2 mt-1" />
              <strong>Innovation:</strong> We embrace creativity and continually
              improve our platform.
            </li>
            <li className="flex items-start">
              <Users className="inline-block text-green-700 mr-2 mt-1" />
              <strong>Community:</strong> We are dedicated to fostering a
              supportive environment for job seekers and employers alike.
            </li>
          </ul>
        </div>

        <div className="mt-8">
          <h3 className="text-2xl font-semibold text-center mb-4 text-gray-900 dark:text-gray-100">
            Meet Our Team
          </h3>
          <p className="text-lg text-gray-800 dark:text-gray-300 mb-4 text-center leading-relaxed">
            Our team is made up of passionate professionals with diverse
            backgrounds in technology, recruitment, and user experience.
            Together, we work tirelessly to enhance our platform and provide the
            best experience for our users.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Team Member 1 */}
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-md text-center transition-transform transform hover:scale-105">
              <User className="w-24 h-24 text-green-700 mx-auto mb-4" />
              <h4 className="font-bold text-xl mb-2 text-gray-900 dark:text-gray-100">
                Aklilu Beyero
              </h4>
              <p className="text-gray-700 dark:text-gray-300">Co-Founder & CTO</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                Aklilu is a tech enthusiast with over 10 years of experience in
                software development and a passion for innovation.
              </p>
            </div>
            {/* Team Member 2 */}
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-md text-center transition-transform transform hover:scale-105">
              <User className="w-24 h-24 text-green-700 mx-auto mb-4" />
              <h4 className="font-bold text-xl mb-2 text-gray-900 dark:text-gray-100">
                Tekalign Mesfin
              </h4>
              <p className="text-gray-700 dark:text-gray-300">Co-Founder & CEO</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                Tekalign has a strong background in business management and is
                dedicated to driving the company's vision forward.
              </p>
            </div>
            {/* Team Member 3 */}
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-md text-center transition-transform transform hover:scale-105">
              <User className="w-24 h-24 text-green-700 mx-auto mb-4" />
              <h4 className="font-bold text-xl mb-2 text-gray-900 dark:text-gray-100">
                New Member
              </h4>
              <p className="text-gray-700 dark:text-gray-300">Chief Marketing Officer</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                Our newest team member brings a wealth of experience in
                marketing and is excited to help grow our community.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
