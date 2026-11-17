
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { loginWithGoogle } from "./api/authApi";
import { loginUser } from "./api/userApi";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setServerError("");

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Normal Login
  const handleSubmit = async (e) => {
    e.preventDefault();

    setServerError("");
    setLoading(true);

    try {
      const data = await loginUser(formData);

      if (data.error) {
        setServerError(data.error);
        return;
      }

      navigate("/");
    } catch (err) {
      console.error("Login error:", err);

      setServerError(
        err.response?.data?.error || "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  // Google Login
  const handleGoogleSuccess = async (credentialResponse) => {
    setServerError("");
    setLoading(true);

    try {
      const data = await loginWithGoogle(
        credentialResponse.credential
      );

      if (data.error) {
        setServerError(data.error);
        return;
      }

      navigate("/");
    } catch (err) {
      console.error("Google login failed:", err);

      setServerError(
        err.response?.data?.error || "Google login failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-5">
      <h2 className="text-center text-2xl font-semibold mb-3">
        Login
      </h2>

      <form className="flex flex-col" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="block mb-1 font-bold">
            Email
          </label>

          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block mb-1 font-bold">
            Password
          </label>

          <input
            id="password"
            name="password"
            type="password"
            required
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        {serverError && (
          <p className="text-red-500 text-sm mb-3">
            {serverError}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white py-2 rounded w-full font-medium hover:opacity-90 disabled:opacity-50"
        >
          {loading ? "Please wait..." : "Login"}
        </button>
      </form>

      <p className="text-center mt-3">
        Don't have an account?{" "}
        <Link
          className="text-blue-600 hover:underline"
          to="/register"
        >
          Register
        </Link>
      </p>

      <div className="relative text-center my-5">
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[1px] bg-gray-300"></div>

        <span className="relative bg-white px-3 text-sm text-gray-600">
          Or continue with
        </span>
      </div>

      <div className="flex justify-center">
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={() => {
            setServerError("Google authentication failed.");
          }}
          theme="filled_blue"
          text="continue_with"
        />
      </div>
    </div>
  );
};

export default Login;
