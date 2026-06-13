import { useState } from "react";
import { Heart, CheckCircle, Smartphone, CreditCard, Building2, X } from "lucide-react";

type PaymentMethod = "mpesa" | "card" | "bank";
type DonationType = "once" | "monthly";

const presetAmounts = [500, 1000, 2500, 5000, 10000, 25000];

function formatKES(amount: number) {
  return new Intl.NumberFormat("en-KE", { style: "currency", currency: "KES", maximumFractionDigits: 0 }).format(amount);
}

function SuccessModal({ amount, onClose }: { amount: number; onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-2xl">
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-9 h-9 text-emerald-500" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h2>
        <p className="text-gray-600 mb-1">Your donation of</p>
        <p className="text-3xl font-bold text-purple-600 mb-4">{formatKES(amount)}</p>
        <p className="text-gray-600 mb-6">has been received. A confirmation will be sent to your phone/email.</p>
        <button
          onClick={onClose}
          className="w-full py-3 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition-colors"
        >
          Done
        </button>
      </div>
    </div>
  );
}

export function DonationsPage() {
  const [donationType, setDonationType] = useState<DonationType>("once");
  const [amount, setAmount] = useState<number>(1000);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("mpesa");
  const [mpesaPhone, setMpesaPhone] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCVV, setCardCVV] = useState("");
  const [cardName, setCardName] = useState("");
  const [bankRef, setBankRef] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState("");

  const finalAmount = customAmount ? parseInt(customAmount) || 0 : amount;

  function handleAmountSelect(val: number) {
    setAmount(val);
    setCustomAmount("");
  }

  function handleCustomChange(e: React.ChangeEvent<HTMLInputElement>) {
    setCustomAmount(e.target.value.replace(/\D/g, ""));
    setAmount(0);
  }

  function validate() {
    if (finalAmount < 100) return "Minimum donation amount is KES 100.";
    if (paymentMethod === "mpesa" && !/^(07|01)\d{8}$/.test(mpesaPhone.replace(/\s/g, "")))
      return "Enter a valid Kenyan phone number (e.g. 0712345678).";
    if (paymentMethod === "card") {
      if (cardNumber.replace(/\s/g, "").length < 16) return "Enter a valid 16-digit card number.";
      if (!cardExpiry.match(/^\d{2}\/\d{2}$/)) return "Enter expiry as MM/YY.";
      if (cardCVV.length < 3) return "Enter a valid CVV.";
      if (!cardName.trim()) return "Enter the cardholder name.";
    }
    return "";
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const err = validate();
    if (err) { setError(err); return; }
    setError("");
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setShowSuccess(true);
    }, 2000);
  }

  function formatCardNumber(val: string) {
    return val.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
  }

  function formatExpiry(val: string) {
    const digits = val.replace(/\D/g, "").slice(0, 4);
    if (digits.length >= 3) return digits.slice(0, 2) + "/" + digits.slice(2);
    return digits;
  }

  function resetForm() {
    setShowSuccess(false);
    setMpesaPhone("");
    setCardNumber("");
    setCardExpiry("");
    setCardCVV("");
    setCardName("");
    setBankRef("");
    setCustomAmount("");
    setAmount(1000);
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-start py-16 px-4">
      {/* Hero */}
      <div className="text-center mb-10 max-w-xl">
        <div className="inline-flex items-center justify-center w-14 h-14 bg-purple-600 rounded-full mb-4">
          <Heart className="w-7 h-7 text-white" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-3">Donate to Make a Difference</h1>
        <p className="text-gray-500 text-lg">
          Your generosity supports the PUEA community. Every contribution, big or small, creates lasting impact.
        </p>
      </div>

      {/* Form card */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 w-full max-w-lg">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Donation frequency */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Donation Frequency</label>
            <div className="grid grid-cols-2 gap-2 bg-gray-100 p-1 rounded-lg">
              {(["once", "monthly"] as DonationType[]).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setDonationType(t)}
                  className={`py-2 rounded-md text-sm font-medium transition-all ${
                    donationType === t ? "bg-white text-purple-600 shadow-sm" : "text-gray-500"
                  }`}
                >
                  {t === "once" ? "One-time" : "Monthly"}
                </button>
              ))}
            </div>
          </div>

          {/* Amount selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Amount (KES)</label>
            <div className="grid grid-cols-3 gap-2 mb-3">
              {presetAmounts.map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => handleAmountSelect(val)}
                  className={`py-2 px-3 rounded-lg border text-sm font-semibold transition-all ${
                    amount === val && !customAmount
                      ? "border-purple-600 bg-purple-600 text-white"
                      : "border-gray-200 text-gray-700 hover:border-purple-400"
                  }`}
                >
                  {formatKES(val)}
                </button>
              ))}
            </div>
            <input
              type="text"
              placeholder="Enter custom amount"
              value={customAmount}
              onChange={handleCustomChange}
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Summary pill */}
          {finalAmount >= 100 && (
            <div className="bg-purple-50 border border-purple-200 rounded-lg px-4 py-3 text-sm text-purple-700 font-medium text-center">
              Donating {formatKES(finalAmount)}{donationType === "monthly" ? " every month" : ""}
            </div>
          )}

          {/* Payment method */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
            <div className="grid grid-cols-3 gap-2">
              {([
                { id: "mpesa", label: "M-Pesa", icon: <Smartphone className="w-4 h-4" /> },
                { id: "card", label: "Card", icon: <CreditCard className="w-4 h-4" /> },
                { id: "bank", label: "Bank", icon: <Building2 className="w-4 h-4" /> },
              ] as { id: PaymentMethod; label: string; icon: React.ReactNode }[]).map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setPaymentMethod(m.id)}
                  className={`flex items-center justify-center gap-2 py-2 rounded-lg border text-sm font-medium transition-all ${
                    paymentMethod === m.id
                      ? "border-purple-600 bg-purple-50 text-purple-700"
                      : "border-gray-200 text-gray-600 hover:border-purple-300"
                  }`}
                >
                  {m.icon} {m.label}
                </button>
              ))}
            </div>
          </div>

          {/* M-Pesa */}
          {paymentMethod === "mpesa" && (
            <div className="space-y-3">
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-sm text-green-800">
                You will receive an STK push on your phone to confirm the payment.
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">M-Pesa Phone Number</label>
                <input
                  type="tel"
                  placeholder="e.g. 0712 345 678"
                  value={mpesaPhone}
                  onChange={(e) => setMpesaPhone(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
          )}

          {/* Card */}
          {paymentMethod === "card" && (
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cardholder Name</label>
                <input
                  type="text"
                  placeholder="Name on card"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                <input
                  type="text"
                  placeholder="0000 0000 0000 0000"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Expiry</label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    value={cardExpiry}
                    onChange={(e) => setCardExpiry(formatExpiry(e.target.value))}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                  <input
                    type="text"
                    placeholder="123"
                    maxLength={4}
                    value={cardCVV}
                    onChange={(e) => setCardCVV(e.target.value.replace(/\D/g, ""))}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Bank */}
          {paymentMethod === "bank" && (
            <div className="space-y-3">
              <div className="bg-sky-50 border border-sky-200 rounded-lg p-4 text-sm text-sky-800 space-y-2">
                <p className="font-semibold">Bank Transfer Details</p>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
                  <span className="text-sky-600">Bank:</span><span className="font-medium">Equity Bank Kenya</span>
                  <span className="text-sky-600">Account Name:</span><span className="font-medium">PUEA Alumni Association</span>
                  <span className="text-sky-600">Account No.:</span><span className="font-medium">0140291234567</span>
                  <span className="text-sky-600">Branch:</span><span className="font-medium">Kikuyu Branch</span>
                  <span className="text-sky-600">Swift Code:</span><span className="font-medium">EQBLKENA</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Your Transaction Reference</label>
                <input
                  type="text"
                  placeholder="e.g. EFT202406-JOHN"
                  value={bankRef}
                  onChange={(e) => setBankRef(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <p className="text-xs text-gray-500 mt-1">Enter the reference you used so we can match your transfer.</p>
              </div>
            </div>
          )}

          {error && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-700">
              <X className="w-4 h-4 flex-shrink-0" /> {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading || finalAmount < 100}
            className="w-full py-3.5 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                Processing…
              </>
            ) : (
              <>
                <Heart className="w-4 h-4" />
                Donate {finalAmount >= 100 ? formatKES(finalAmount) : ""}
              </>
            )}
          </button>

          <p className="text-center text-xs text-gray-400">
            Your donation is secure and encrypted. PUEA Alumni Association is a registered non-profit.
          </p>
        </form>
      </div>

      {showSuccess && <SuccessModal amount={finalAmount} onClose={resetForm} />}
    </div>
  );
}
