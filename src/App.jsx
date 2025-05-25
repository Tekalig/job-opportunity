import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar.jsx";
import Footer from "./components/Footer.jsx";
import ApplicantStatus from "./components/applicantStatus.jsx";
import PostJob from "./components/postJob.jsx";
import AboutUs from "./pages/About.jsx";
import ContactUs from "./pages/ContactUs.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import AdminPanel from "./pages/AdminPanel.jsx";
import EmployerSignup from "./pages/EmployerSignup.jsx";
import HomePage from "./pages/HomePage.jsx";
import { default as ExpertSignUp } from "./pages/ExpertSignup.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import ProfilePage from "./pages/Profile.jsx";
import VerifyEmailPage from "./pages/VerifyEmailPage.jsx";
import AuthStore from "./actions/index.jsx";
import ApplyJob from "./components/applyJob.jsx";
import { useEffect } from "react";

function App() {
  const { isAuthenticated, isEmployer, checkUserAuth } = AuthStore();

  useEffect(() => {
    const path = isEmployer ? "/employer/checkAuth" : "/expert/checkAuth";
    checkUserAuth(path);
  }, [checkUserAuth, isEmployer]);

  return (
    <div>
      <div className="bg-gray-100 text-black dark:bg-gray-800 dark:text-gray-200 min-h-screen flex flex-col overflow-hidden space-y-16">
        <NavBar />
        <div className="flex-1">
          <Routes>
            <Route
              path="/"
              element={isAuthenticated ? <HomePage /> : <Home />}
            />
            {/* {Job routes } */}
            <Route path="/jobs" element={<Dashboard />} />
            <Route path="/postJob" element={<PostJob />} />
            <Route path="/applyJob/:jobId" element={<ApplyJob />} />
            <Route
              path="/applicantStatus/:jobId"
              element={<ApplicantStatus />}
            />
            {/* {Auth routes} */}
            <Route path="/expert/signup" element={<ExpertSignUp />} />
            <Route path="/employer/signup" element={<EmployerSignup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path={`/verify`} element={<VerifyEmailPage />} />

            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/admin" element={<AdminPanel />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
