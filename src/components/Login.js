import React, { useState } from "react";
import axios from "axios";
import Profile from "./Profile";
import bcrypt from "bcryptjs";
import { useFormik } from "formik";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { FcBullish } from "react-icons/fc";
import bgimage from "./image/bgimage.jpg"
const validationSchema = yup.object().shape({
  email: yup.string().email("Invalid email format").required("Ex. sample@gmail.com"),
  password: yup.string().required("Password is required"),
});

const Login = () => {
  const [error, setError] = useState("");
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false); // New state for Remember Me checkbox
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:8000/users", {
        params: {
          email: values.email,
        },
      });

      if (response.data.length > 0) {
        const user = response.data[0];
        const isPasswordCorrect = await bcrypt.compare(values.password, user.password);

        if (isPasswordCorrect) {
          console.log("Login successful");
          setLoggedInUser(user);
          setError("");
          setLoading(false);
          navigate("/profile");
        } else {
          console.log("Invalid password");
          window.alert("Invalid Credentials");
          setLoading(false);
        }
      } else {
        console.log("User not found");
        window.alert("Invalid Credentials");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error logging in:", error);
      window.alert("Error logging in. Please try again.");
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (formik.errors.email) {
        window.alert(formik.errors.email);
      } else {
        formik.handleSubmit();
      }
    }
  };

  const handleUseMobileNumber = () => {
    navigate("/loginnum");
  };

  const handleRememberMeChange = () => {
    setRememberMe(!rememberMe);
  };

  return (
    <div>
      {loading ? (
        <p className="flex justify-center">Loading...</p>
      ) : loggedInUser ? (
        <Profile user={loggedInUser} />
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
                  <label className="block text-gray-700 text-base" htmlFor="email">
                    Email
                  </label>
                  <div className="flex flex-col items-start">
                    <input
                      className={`w-full mt-1 p-2 rounded-md border text-sm focus:border-indigo-500 focus:outline-none text-black ${
                        formik.touched.email && formik.errors.email ? "border-red-500" : "border-gray-300"
                      }`}
                      type="email"
                      id="email"
                      name="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      onKeyDown={handleKeyPress}
                      placeholder="Enter your email"
                      required
                    />
                    <button
                      className="text-green-500 text-sm mt-1 mb-1"
                      onClick={handleUseMobileNumber}
                    >
                      Use Mobile Number
                    </button>
                  </div>
                  {formik.touched.email && formik.errors.email ? (
                    <div className="text-red-500 text-xs ">{formik.errors.email}</div>
                  ) : null}
                </div>
                <div>
                  <label className="block text-gray-700 text-base mt-1" htmlFor="password">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    onKeyDown={handleKeyPress}
                    placeholder="Enter your password"
                    className={`w-full mt-1 p-2 rounded-md border text-sm focus:border-indigo-500 focus:outline-none text-black`}
                    required
                  />
                </div>
                {/* Remember Me Checkbox */}
                <div className="flex items-center mt-3">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    name="rememberMe"
                    checked={rememberMe}
                    onChange={handleRememberMeChange}
                    className="mr-2"
                  />
                  <label htmlFor="rememberMe" className="text-gray-700 text-sm">
                    Remember Me
                  </label>
                </div>
                {error && <p>{error}</p>}
                <div className="flex flex-col justify-center py-6">
                  <button
                     className={`w-full active:scale-[.98] active:duration-75 hover:scale-[1.01] easy-in-out transition-all py-3 rounded-xl bg-green-700 text-white text-md font-bold`}
                    type="submit"
                    disabled={!formik.isValid}
                  >
                    Sign in
                  </button>
                  <Link
                     className={`hover:no-underline flex justify-center w-full active:scale-[.98] active:duration-75 hover:scale-[1.01] easy-in-out transition-all py-3 mt-3 rounded-xl bg-black text-white text-md font-bold`}
                    to="/signup"
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

export default Login;
