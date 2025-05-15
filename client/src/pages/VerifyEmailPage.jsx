import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import AuthStore from "../actions";
function VerifyEmailPage() {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const codeRef = useRef([]);
  const navigate = useNavigate();
  const { isLoading, error, verifyEmail, isEmployer } = AuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const codeValue = code.join("");
    try {
      let path = isEmployer ? "/employer/verify" : "/expert/verify";

      await verifyEmail(codeValue, path);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleCodeChange = (index, value) => {
    const newCode = [...code];

    if (value.length > 1) {
      const postCode = value.splice(0, 6).split("");
      postCode.forEach((char, i) => {
        newCode[i] = char || "";
      });
      setCode(newCode);

      // focus on the last non-empty input
      const lastNonEmptyIndex = newCode.findLastIndex((char) => char !== "");
      const nextIndex = lastNonEmptyIndex < 5 ? lastNonEmptyIndex + 1 : 5;
      codeRef.current[nextIndex].focus();
    } else {
      newCode[index] = value;
      setCode(newCode);

      if (value && index < 5) {
        codeRef.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (index, value) => {
    if (value.key === "Backspace" && !code[index] && index > 0) {
      codeRef.current[index - 1].focus();
    }
  };

  useEffect(() => {
    if (code.every((char) => char !== "")) {
      handleSubmit(new Event("submit"));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 flex items-center justify-center relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-lg overflow-hidden"
      >
        <div className="p-8">
          <h1 className="text-2xl font-bold mb-6 bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-center text-transparent">
            Verify Email
          </h1>
          <p className="text-center text-gray-400 mb-6">
            Please enter the verification code sent to your email address.
          </p>
          <form onSubmit={handleSubmit}>
            <div className="flex justify-center space-x-4 mb-6">
              {code.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (codeRef.current[index] = el)}
                  type="text"
                  maxLength="6"
                  value={digit}
                  onChange={(e) => {
                    handleCodeChange(index, e.target.value);
                  }}
                  onKeyDown={(e) => {
                    handleKeyDown(index, e);
                  }}
                  className="w-12 h-12 text-center text-2xl text-white bg-gray-800 bg-opacity-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                />
              ))}
            </div>
            {error && <p className="text-red-500 text-sm mb-6">{error}</p>}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={isLoading || code.some((char) => !char)}
              className="w-full bg-gradient-to-r from-green-400 to-emerald-500 text-gray-900 p-3 rounded-md font-bold"
            >
              {isLoading ? "Verifing..." : "Verify Email"}
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

export default VerifyEmailPage;
