import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import { Phone, ShieldCheck, ShieldAlert, CheckCircle2, XCircle, Loader2 } from "lucide-react";
import api from "../../lib/api";
import { useAuth } from "../../context/AuthContext";

// TODO: confirm the real membership fee with the backend/admin team.
// This is intentionally a fixed constant, not a user-editable field —
// the backend does not currently validate or enforce this amount itself,
// so the frontend is the only thing stopping a tampered request from
// paying less than intended.
const ACTIVATION_FEE_KES = 10;

type FlowState = "idle" | "submitting" | "polling" | "success" | "failed";

const PHONE_REGEX = /^(?:\+254|254|0)?(7|1)\d{8}$/;
const POLL_INTERVAL_MS = 3000;
const MAX_POLL_ATTEMPTS = 30; // ~90 seconds

export function ActivatePage() {
  const navigate = useNavigate();
  const { user, refreshUser } = useAuth();

  const [phone, setPhone] = useState("");
  const [state, setState] = useState<FlowState>("idle");
  const [error, setError] = useState("");
  const [paymentId, setPaymentId] = useState<string | null>(null);

  const pollCountRef = useRef(0);
  const pollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (pollTimeoutRef.current) clearTimeout(pollTimeoutRef.current);
    };
  }, []);

  const isActive = user?.activation?.status === "active";

  const validatePhone = (value: string): string | null => {
    if (!PHONE_REGEX.test(value.trim())) {
      return "Enter a valid Kenyan phone number (e.g. 0712345678).";
    }
    return null;
  };

  const pollStatus = async (id: string) => {
    try {
      const response = await api.get(`/payments/${id}/status`);
      const payment = response.data.data;

      if (payment.status === "success") {
        setState("success");
        await refreshUser();
        return;
      }

      if (payment.status === "failed" || payment.status === "cancelled") {
        setState("failed");
        setError(
          payment.status === "cancelled"
            ? "The payment was cancelled on your phone."
            : "The payment failed. Please try again."
        );
        return;
      }

      // still pending
      pollCountRef.current += 1;
      if (pollCountRef.current >= MAX_POLL_ATTEMPTS) {
        setState("failed");
        setError(
          "We didn't hear back in time. If you completed the payment on your phone, it may still process shortly — check back on this page or your profile."
        );
        return;
      }

      pollTimeoutRef.current = setTimeout(() => pollStatus(id), POLL_INTERVAL_MS);
    } catch (err: any) {
      console.error(err);
      setState("failed");
      setError(
        err.response?.data?.message || "Could not check payment status. Please try again."
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const phoneError = validatePhone(phone);
    if (phoneError) {
      setError(phoneError);
      return;
    }

    try {
      setState("submitting");
      setError("");

      const response = await api.post("/payments/initiate", {
        type: "activation",
        phone: phone.trim(),
        amount: ACTIVATION_FEE_KES,
      });

      const payment = response.data.data;
      setPaymentId(payment.id);
      setState("polling");
      pollCountRef.current = 0;
      pollTimeoutRef.current = setTimeout(() => pollStatus(payment.id), POLL_INTERVAL_MS);
    } catch (err: any) {
      console.error(err);
      setState("failed");

      const validationErrors = err.response?.data?.errors;
      if (validationErrors) {
        const firstError = Object.values(validationErrors)[0] as string[];
        setError(firstError?.[0] || "Could not initiate payment.");
      } else {
        setError(
          err.response?.data?.message || "Could not initiate payment. Please try again."
        );
      }
    }
  };

  const resetFlow = () => {
    setState("idle");
    setError("");
    setPaymentId(null);
    pollCountRef.current = 0;
    if (pollTimeoutRef.current) clearTimeout(pollTimeoutRef.current);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12" style={{ backgroundColor: "#ade8f4" }}>
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="h-20 bg-gradient-to-r from-[#03045e] to-[#0077b6] flex items-center justify-center">
            <h1 className="text-xl font-bold text-white">Activate Membership</h1>
          </div>

          <div className="p-8">
            {/* Already active */}
            {isActive ? (
              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-green-100 flex items-center justify-center">
                  <ShieldCheck className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="text-lg font-bold text-gray-900">You're already active</h2>
                {user?.activation?.expires_at && (
                  <p className="text-sm text-gray-500">
                    Your membership is active until{" "}
                    {new Date(user.activation.expires_at).toLocaleDateString("en-KE", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                    .
                  </p>
                )}
                <button
                  onClick={() => navigate("/")}
                  className="w-full py-3 px-4 bg-[#0077b6] text-white rounded-lg hover:bg-[#03045e] transition-colors font-semibold"
                >
                  Back to Home
                </button>
              </div>
            ) : (
              <>
                {/* idle / submitting — the form */}
                {(state === "idle" || state === "submitting") && (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-[#ade8f4]/30">
                      <ShieldAlert className="w-5 h-5 text-[#03045e] flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-[#03045e]">
                        Activate your membership to unlock all platform features and enjoy the full alumni experience. Membership runs
                        through 31 December of this year.
                      </p>
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-lg border border-gray-200">
                      <span className="text-sm text-gray-500">Membership Fee</span>
                      <span className="text-xl font-bold" style={{ color: "#03045e" }}>
                        KES {ACTIVATION_FEE_KES.toLocaleString()}
                      </span>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        M-Pesa Phone Number
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="0712345678"
                          className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0077b6] focus:border-transparent text-sm"
                        />
                      </div>
                    </div>

                    {error && (
                      <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm">
                        {error}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={state === "submitting"}
                      className="w-full py-3 px-4 bg-[#0077b6] text-white rounded-lg hover:bg-[#03045e] transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {state === "submitting" ? "Sending request..." : "Pay with M-Pesa"}
                    </button>
                  </form>
                )}

                {/* polling — waiting on the phone */}
                {state === "polling" && (
                  <div className="text-center space-y-4 py-4">
                    <Loader2 className="w-10 h-10 mx-auto animate-spin" style={{ color: "#0077b6" }} />
                    <h2 className="text-lg font-bold text-gray-900">Check your phone</h2>
                    <p className="text-sm text-gray-500">
                      We've sent an M-Pesa prompt to <strong>{phone}</strong>. Enter
                      your M-Pesa PIN on your phone to complete the payment.
                    </p>
                  </div>
                )}

                {/* success */}
                {state === "success" && (
                  <div className="text-center space-y-4 py-4">
                    <div className="w-16 h-16 mx-auto rounded-full bg-green-100 flex items-center justify-center">
                      <CheckCircle2 className="w-8 h-8 text-green-600" />
                    </div>
                    <h2 className="text-lg font-bold text-gray-900">Membership Activated!</h2>
                    <p className="text-sm text-gray-500">
                      Your payment was successful and your account is now active.
                    </p>
                    <button
                      onClick={() => navigate("/profile")}
                      className="w-full py-3 px-4 bg-[#0077b6] text-white rounded-lg hover:bg-[#03045e] transition-colors font-semibold"
                    >
                      Go to Profile
                    </button>
                  </div>
                )}

                {/* failed */}
                {state === "failed" && (
                  <div className="text-center space-y-4 py-4">
                    <div className="w-16 h-16 mx-auto rounded-full bg-red-100 flex items-center justify-center">
                      <XCircle className="w-8 h-8 text-red-500" />
                    </div>
                    <h2 className="text-lg font-bold text-gray-900">Payment Not Completed</h2>
                    <p className="text-sm text-gray-500">{error}</p>
                    <button
                      onClick={resetFlow}
                      className="w-full py-3 px-4 bg-[#0077b6] text-white rounded-lg hover:bg-[#03045e] transition-colors font-semibold"
                    >
                      Try Again
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}