import React, { useState } from "react";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(formData);
      alert("Registration Successful");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="w-full max-w-md p-8 space-y-4 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center">Create an Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full p-3 mt-1 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full p-3 mt-1 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full p-3 mt-1 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Create a password"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-3 mt-6 bg-green-600 rounded-lg hover:bg-green-500"
          >
            Register
          </button>
        </form>
        <p className="text-center text-gray-400">
          Already have an account?{" "}
          <a href="/login" className="text-green-400 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
