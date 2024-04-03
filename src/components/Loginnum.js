import React, { useState, useEffect } from "react";
import axios from "axios";
import Profile from "./Profile"; // Import the Profile component
import bcrypt from "bcryptjs"; // Import bcrypt library
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate, Link } from "react-router-dom"; // Import useNavigate and Link
import { FcBullish } from "react-icons/fc";
import bgimage from "./image/bgimage.jpg"
const validationSchema = yup.object().shape({
  phoneNumber: yup
    .string()
    .matches(/^[0-9()]+$/, "Only contain digits")
    .min(11, "At least 11 characters")
    .max(11, "11 characters only")
    .required("Ex. 09000000000"),
  password: yup.string().required("Password is required"),
});

const LoginNum = () => {
  const [error, setError] = useState("");
  const [loggedInUser, setLoggedInUser] = useState(null); // State to store logged-in user
  const [loading, setLoading] = useState(false); // State to track loading status
  const [rememberMe, setRememberMe] = useState(false); // State to manage "Remember Me" checkbox
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleSubmit = async (values) => {
    try {
      setLoading(true); // Set loading state to true while fetching user data
      const response = await axios.get("http://localhost:8000/users", {
        params: {
          phoneNumber: values.phoneNumber,
        },
      });

      if (response.data.length > 0) {
        const user = response.data[0];
        // Decrypt the password stored in the database and compare it with the entered password
        const isPasswordCorrect = await bcrypt.compare(
          values.password,
          user.password
        );

        if (isPasswordCorrect) {
          console.log("Login successful");
          setLoggedInUser(user); // Set the logged-in user
          setError("");
          setLoading(false); // Set loading state to false after successful login
          navigate("/profile"); // Navigate to /profile route after successful login
        } else {
          console.log("Invalid password");
          window.alert("Invalid Credentials");
          setLoading(false); // Set loading state to false if login fails
        }
      } else {
        console.log("User not found");
        window.alert("Invalid Credentials");
        setLoading(false); // Set loading state to false if user not found
      }
    } catch (error) {
      console.error("Error logging in:", error);
      window.alert("Error logging in. Please try again.");
      setLoading(false); // Set loading state to false if an error occurs
    }
  };

  const formik = useFormik({
    initialValues: {
      phoneNumber: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

  // Add event listener to the form for Enter key press
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        if (formik.isValid) {
          formik.handleSubmit();
        } else {
          window.alert("Invalid mobile number format");
        }
      }
    };
    document.addEventListener("keypress", handleKeyPress);
    return () => {
      document.removeEventListener("keypress", handleKeyPress);
    };
  }, [formik.isValid, formik.handleSubmit]);

  return (
    <div>
      {loading ? (
        <p className="flex justify-center">Loading...</p>
      ) : loggedInUser ? (
        <Profile user={loggedInUser} /> // Render Profile component if user is logged in
      ) : (
        <div>
          <form onSubmit={formik.handleSubmit}>
          <div className="flex flex-col justify-center items-center h-screen" style={{ backgroundImage: `url(${bgimage})`, backgroundSize: "cover" }}>
              <div className="absolute bg-neutral-100 px-10 py-10 rounded-xl border-1 ring-1 ring-black ring-opacity-5 border-gray-100 border border-gray-300">
                
                <div>
                <div className="flex justify-center items-center gap-2  py-3 mb-1">
                    <FcBullish className="text-green-700" fontSize={24} />
                    <span className="text-3xl text-green-700">MacoyShop</span>
                  </div>
                  <h3 className="justify-center text-black-600 flex mb-10 text-md">
                    Welcome back, input your credentials
                  </h3>
                  <label
                    className="block text-gray-700 text-base"
                    htmlFor="phoneNumber"
                  >
                    Mobile Number
                  </label>
                  <div className="flex flex-col">
                    <input
                      className={`mt-1 p-2 rounded-md border text-sm focus:border-indigo-500 focus:outline-none text-black ${
                        formik.errors.phoneNumber
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      type="text"
                      id="phoneNumber"
                      name="phoneNumber"
                      value={formik.values.phoneNumber}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="Enter your mobile number"
                      required
                    />
                    <div className="flex items-start ">
                      <Link
                        to="/"
                        className="text-green-500 text-sm mt-1 mb-1 hover:no-underline"
                      >
                        Use Email
                      </Link>
                    </div>
                  </div>
                  {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                    <div className="text-red-500 text-xs ">
                      {formik.errors.phoneNumber}
                    </div>
                  ) : null}
                </div>
                <div>
                  <label
                    className="block text-gray-700 text-base mt-1"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter your password"
                    className={`w-full mt-1 p-2 rounded-md border text-sm focus:border-indigo-500 focus:outline-none text-black`}
                    required
                  />
                </div>
                {error && <p>{error}</p>}
                <div className="flex items-center mt-3">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    name="rememberMe"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="mr-2"
                  />
                  <label htmlFor="rememberMe" className="text-gray-700 text-sm">
                    Remember Me
                  </label>
                </div>
                <div className="flex flex-col justify-center py-6">
                  <button
                     className={`w-full active:scale-[.98] active:duration-75 hover:scale-[1.01] easy-in-out transition-all py-3 rounded-xl bg-green-700 text-white text-md font-bold`}
                    type="submit"
                    disabled={!formik.isValid}
                  >
                    Sign in
                  </button>
                  
                  <Link to="/signup" 
                     className={`hover:no-underline flex justify-center w-full active:scale-[.98] active:duration-75 hover:scale-[1.01] easy-in-out transition-all py-3 mt-3 rounded-xl bg-black text-white text-md font-bold`}
                  >
                    Sign up
                  </Link>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default LoginNum;
