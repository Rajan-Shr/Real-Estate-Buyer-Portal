import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        form
      );
      localStorage.setItem("token", res.data.user.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const isDisabled =
    loading ||
    !form.firstName ||
    !form.lastName ||
    !form.email ||
    !form.password;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-4 py-10 gap-6">
      
      <div className="w-full max-w-sm bg-white border border-slate-100 rounded-2xl shadow-sm p-8 flex flex-col">

        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Create an account
          </h1>
          <p className="text-sm text-slate-500 mt-1.5">
            Join the Real Estate Buyer Portal
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-100 text-red-600 text-sm px-4 py-3 rounded-lg mb-6 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">

          <div className="grid grid-cols-2 gap-4">
            <input
              name="firstName"
              type="text"
              placeholder="First name"
              value={form.firstName}
              onChange={handleChange}
              required
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-slate-400 focus:bg-white transition-all"
            />

            <input
              name="lastName"
              type="text"
              placeholder="Last name"
              value={form.lastName}
              onChange={handleChange}
              required
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-slate-400 focus:bg-white transition-all"
            />
          </div>

          <div>
            <input
              name="email"
              type="email"
              placeholder="Email address"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-slate-400 focus:bg-white transition-all"
            />
          </div>

          <div>
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-slate-400 focus:bg-white transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={isDisabled}
            className="w-full mt-2 bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium py-2.5 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
          >
            {loading ? "Signing up..." : "Sign up"}
          </button>
        </form>
      </div>

      <div className="w-full max-w-sm text-center">
        <p className="text-sm text-slate-500">
          Have an account?{" "}
          <Link to="/login" className="font-medium text-slate-900 hover:underline">
            Log in
          </Link>
        </p>
      </div>

    </div>
  );
}