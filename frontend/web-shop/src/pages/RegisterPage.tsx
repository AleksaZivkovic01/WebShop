import { useState } from "react";
import { registerUser } from "../services/AuthService";
import { Link, useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");

  const navigate = useNavigate();

   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {   
     e.preventDefault();
    if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
    }
    try {
        await registerUser({
            username: username,
            email: email,
            password: password
        });
        alert("Registration successful! Please log in.");   
        navigate("/login");
    } catch {
        alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-6">
      <div className="w-full max-w-md rounded-3xl border border-white/40 bg-slate-900/40 backdrop-blur-xl shadow-2xl p-8 text-white">
        
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">Create an Account</h2>
          <p className="text-white/70">Sign up for a new account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <div className="relative">
              <input
                type="text"
                required
                placeholder=" "
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="peer w-full rounded-2xl border border-white/20 bg-white/10 px-4 pt-6 pb-2 text-white outline-none transition focus:border-indigo-300"
              />

              <label className="absolute left-4 top-2 text-sm text-white/70 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-white/50 peer-focus:top-2 peer-focus:text-sm peer-focus:text-indigo-200">
                Username
              </label>
            </div>
          </div>

          <div>
            <div className="relative">
                <input
                type="email"
                required
                placeholder=" "
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="peer w-full rounded-2xl border border-white/20 bg-white/10 px-4 pt-6 pb-2 text-white outline-none transition focus:border-indigo-300"
                />

                <label className="absolute left-4 top-2 text-sm text-white/70 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-white/50 peer-focus:top-2 peer-focus:text-sm peer-focus:text-indigo-200">
                Email
                </label>
            </div>
          </div>

          <div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder=" "
                value={password}
                onChange= {(e) => setPassword(e.target.value)}
                className="peer w-full rounded-2xl border border-white/20 bg-white/10 px-4 pt-6 pb-2 text-white outline-none transition focus:border-indigo-300"
              />

              <label className="absolute left-4 top-2 text-sm text-white/70 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-white/50 peer-focus:top-2 peer-focus:text-sm peer-focus:text-indigo-200">
                Password
              </label>



              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-white/70 hover:text-white"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

          </div>

          <div>
            <div className="relative">
                <input
                type={showPassword ? "text" : "password"}
                required
                placeholder=" "
                value={confirmPassword}
                onChange={(e) =>
                    setConfirmPassword(e.target.value)
                }
                className="peer w-full rounded-2xl border border-white/20 bg-white/10 px-4 pt-6 pb-2 text-white outline-none transition focus:border-indigo-300"
                />

                <label className="absolute left-4 top-2 text-sm text-white/70 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-white/50 peer-focus:top-2 peer-focus:text-sm peer-focus:text-indigo-200">
                Confirm Password
                </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full rounded-2xl bg-indigo-500 py-3 font-semibold transition hover:bg-indigo-600"
          >
            Sign Up
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-white/70">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-500 hover:text-white">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;