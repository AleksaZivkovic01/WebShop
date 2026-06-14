import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/AuthService";
import { useAuth } from "../context/useAuth";
import { getRoleFromToken } from "../utilis/jwt";


const LoginPage = () => {

    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();

   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {   
     e.preventDefault();

    try {
        const data =await loginUser({
            username: username,
            password: password,
        });
        
        login(data.token);
        const role = getRoleFromToken(data.token);
        
        if(role.toLowerCase() === "admin") {
          navigate("/adminDashboard");
        } else {
          navigate("/products");
        }

    } catch {
        alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="min-h-screen w-fullv flex items-center justify-center p-6">
      <div className="w-full max-w-md rounded-3xl border border-white/40 bg-slate-900/40 backdrop-blur-xl shadow-2xl p-8 text-white">
        
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>
          <p className="text-white/70">Sign in to your account</p>
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
                type={showPassword ? "text" : "password"}
                required
                placeholder=" "
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="peer w-full rounded-2xl border border-white/20 bg-white/10 px-4 pt-6 pb-2 pr-14 text-white outline-none transition focus:border-indigo-300"
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

          <button
            type="submit"
            className="w-full rounded-2xl bg-indigo-500 py-3 font-semibold transition hover:bg-indigo-600"
          >
            Sign In
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-white/70">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="text-indigo-500 hover:text-white">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;