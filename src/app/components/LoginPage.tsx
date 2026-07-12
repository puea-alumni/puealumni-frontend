import { useState } from "react";
import { useNavigate } from "react-router";
import { Mail, Lock, User, Calendar } from "lucide-react";
import logo from "../../imports/Logo.jpeg";

type Tab = "login" | "register";

export function LoginPage() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>("login");

  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    graduationYear: "",
    password: "",
    confirmPassword: "",
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/");
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/");
  };

  const inputClass =
    "w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0077b6] focus:border-transparent text-sm";

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12" style={{ backgroundColor: "#ade8f4" }}>
      <div className="w-full max-w-lg">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <img src={logo} alt="PUEA Alumni Logo" className="w-20 h-20 object-contain mb-3" />
          <h1 className="text-2xl font-bold text-[#03045e]">PUEA Alumni</h1>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Tabs */}
          <div className="grid grid-cols-2">
            <button
              onClick={() => setTab("login")}
              className={`py-4 text-sm font-semibold transition-colors ${
                tab === "login"
                  ? "text-white"
                  : "text-[#0077b6] bg-white hover:bg-[#ade8f4]/30"
              }`}
              style={tab === "login" ? { backgroundColor: "#0077b6" } : {}}
            >
              Sign In
            </button>
            <button
              onClick={() => setTab("register")}
              className={`py-4 text-sm font-semibold transition-colors ${
                tab === "register"
                  ? "text-white"
                  : "text-[#0077b6] bg-white hover:bg-[#ade8f4]/30"
              }`}
              style={tab === "register" ? { backgroundColor: "#0077b6" } : {}}
            >
              Register
            </button>
          </div>

          <div className="p-8">
            {/* LOGIN FORM */}
            {tab === "login" && (
              <form onSubmit={handleLogin} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="email"
                      required
                      value={loginData.email}
                      onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                      className={inputClass}
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="password"
                      required
                      value={loginData.password}
                      onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                      className={inputClass}
                      placeholder="Enter your password"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 text-gray-600 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 rounded border-gray-300" />
                    Remember me
                  </label>
                  <a href="#" className="text-[#0077b6] hover:underline">Forgot password?</a>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: "#ade8f4", color: "#03045e" }}
                >
                  Sign In
                </button>

                <p className="text-center text-sm text-gray-500">
                  Don't have an account?{" "}
                  <button type="button" onClick={() => setTab("register")} className="text-[#0077b6] font-semibold hover:underline">
                    Register here
                  </button>
                </p>
              </form>
            )}

            {/* REGISTER FORM */}
            {tab === "register" && (
              <form onSubmit={handleRegister} className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        required
                        value={registerData.firstName}
                        onChange={(e) => setRegisterData({ ...registerData, firstName: e.target.value })}
                        className={inputClass}
                        placeholder="John"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        required
                        value={registerData.lastName}
                        onChange={(e) => setRegisterData({ ...registerData, lastName: e.target.value })}
                        className={inputClass}
                        placeholder="Doe"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="email"
                      required
                      value={registerData.email}
                      onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                      className={inputClass}
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Graduation Year</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="number"
                      required
                      min="1950"
                      max="2030"
                      value={registerData.graduationYear}
                      onChange={(e) => setRegisterData({ ...registerData, graduationYear: e.target.value })}
                      className={inputClass}
                      placeholder="2020"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="password"
                        required
                        value={registerData.password}
                        onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                        className={inputClass}
                        placeholder="Create password"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="password"
                        required
                        value={registerData.confirmPassword}
                        onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                        className={inputClass}
                        placeholder="Confirm password"
                      />
                    </div>
                  </div>
                </div>

                <label className="flex items-start gap-2 text-sm text-gray-600 cursor-pointer">
                  <input type="checkbox" required className="w-4 h-4 mt-0.5 rounded border-gray-300" />
                  <span>
                    I agree to the{" "}
                    <a href="#" className="text-[#0077b6] hover:underline">Terms of Service</a> and{" "}
                    <a href="#" className="text-[#0077b6] hover:underline">Privacy Policy</a>
                  </span>
                </label>

                <button
                  type="submit"
                  className="w-full py-3 text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: "#0077b6" }}
                >
                  Create Account
                </button>

                <p className="text-center text-sm text-gray-500">
                  Already have an account?{" "}
                  <button type="button" onClick={() => setTab("login")} className="text-[#0077b6] font-semibold hover:underline">
                    Sign in here
                  </button>
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
