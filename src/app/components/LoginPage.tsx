import { useState } from "react";
import { useNavigate } from "react-router";
import { Mail, Lock, User, Calendar } from "lucide-react";
import logo from "../../imports/Logo.jpeg";
import { useAuth } from "../../context/AuthContext";
import * as authService from "../../services/authService";

type Tab = "login" | "register";

export function LoginPage() {
  const navigate = useNavigate();
  const { login: setAuthSession } = useAuth();
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

  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  const [registerLoading, setRegisterLoading] = useState(false);
  const [registerError, setRegisterError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoginLoading(true);
      setLoginError("");

      const response = await authService.login(loginData.email, loginData.password);
      const { user, token } = response.data;

      setAuthSession(user, token);
      navigate("/");
    } catch (err: any) {
      console.error(err);
      setLoginError(
        err.response?.data?.message || "Invalid email or password."
      );
    } finally {
      setLoginLoading(false);
    }
  };

  const validateRegister = (): string | null => {
    if (registerData.password !== registerData.confirmPassword) {
      return "Passwords do not match.";
    }

    // Mirrors backend rule: min 8, mixed case, at least one number
    const passwordRules = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRules.test(registerData.password)) {
      return "Password must be at least 8 characters and include uppercase, lowercase, and a number.";
    }

    return null;
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationError = validateRegister();
    if (validationError) {
      setRegisterError(validationError);
      return;
    }

    try {
      setRegisterLoading(true);
      setRegisterError("");

      const response = await authService.register({
        name: `${registerData.firstName} ${registerData.lastName}`.trim(),
        email: registerData.email,
        password: registerData.password,
        password_confirmation: registerData.confirmPassword,
        graduation_year: Number(registerData.graduationYear),
      });

      const { user, token } = response.data;

      setAuthSession(user, token);
      navigate("/");
    } catch (err: any) {
      console.error(err);

      const validationErrors = err.response?.data?.errors;
      if (validationErrors) {
        const firstError = Object.values(validationErrors)[0] as string[];
        setRegisterError(firstError?.[0] || "Registration failed.");
      } else {
        setRegisterError(
          err.response?.data?.message || "Something went wrong. Please try again."
        );
      }
    } finally {
      setRegisterLoading(false);
    }
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
                  <a href="/forgot-password" className="text-[#0077b6] hover:underline">Forgot password?</a>
                </div>

                {loginError && (
                  <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm">
                    {loginError}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loginLoading}
                  className="w-full py-3 text-white rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ backgroundColor: "#0077b6" }}
                >
                  {loginLoading ? "Signing In..." : "Sign In"}
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
                      max={new Date().getFullYear()}
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

                <p className="text-xs text-gray-500 -mt-2">
                  Must be at least 8 characters, with uppercase, lowercase, and a number.
                </p>

                <label className="flex items-start gap-2 text-sm text-gray-600 cursor-pointer">
                  <input type="checkbox" required className="w-4 h-4 mt-0.5 rounded border-gray-300" />
                  <span>
                    I agree to the{" "}
                    <a href="#" className="text-[#0077b6] hover:underline">Terms of Service</a> and{" "}
                    <a href="#" className="text-[#0077b6] hover:underline">Privacy Policy</a>
                  </span>
                </label>

                {registerError && (
                  <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm">
                    {registerError}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={registerLoading}
                  className="w-full py-3 text-white rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ backgroundColor: "#0077b6" }}
                >
                  {registerLoading ? "Creating Account..." : "Create Account"}
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