import { useState, useEffect } from "react";
import OtpInput from "react-otp-input";
import { Button } from "../../../shared/ui";
import Logo from "../../../shared/assets/images/Logo.png";

interface OtpPageProps {
  phoneNumber?: string;
  onVerify?: (otp: string) => void;
  onResend?: () => void;
  error?: string;
}

export const OtpPage = ({
  phoneNumber = "+99890*******43",
  onVerify,
  onResend,
  error,
}: OtpPageProps) => {
  const [otp, setOtp] = useState("");
  const [countdown, setCountdown] = useState(54);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleVerify = () => {
    if (otp.length === 6) {
      onVerify?.(otp);
    }
  };

  const handleResend = () => {
    setCountdown(54);
    setOtp("");
    onResend?.();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="relative min-h-screen bg-primary-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-15 max-w-[655px] w-full shadow-2xl">
        <div className="flex justify-center mb-8">
          <img src={Logo} alt="logo" />
        </div>

        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Code verification
          </h1>
          <p className="text-gray-600 text-sm leading-relaxed">
            We sent a code to your phone number {phoneNumber},<br />
            please enter a code below.
          </p>
        </div>

        <div className="mb-8">
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            renderInput={(props) => <input {...props} />}
            inputStyle={{
              width: "60px",
              height: "60px",
              margin: "0 4px",
              fontSize: "24px",
              borderRadius: "50%",
              border: error ? "2px solid #ef4444" : "2px solid #e5e7eb",
              backgroundColor: error ? "#fef2f2" : "#F2F4F7",
              color: "#374151",
              fontWeight: "600",
              textAlign: "center",
              outline: "none",
            }}
            containerStyle={{
              display: "flex",
              justifyContent: "center",
              gap: "8px",
            }}
          />
          {error && (
            <p className="text-red-500 text-sm text-center mt-3">{error}</p>
          )}
        </div>

        <Button
          onClick={handleVerify}
          variant="primary"
          className="bg-primary-600 hover:bg-primary-500 mb-6"
          disabled={otp.length !== 6}
        >
          Verify
        </Button>

        <div className="text-center">
          {countdown > 0 ? (
            <p className="text-gray-600 text-sm">
              Send again in{" "}
              <span className="text-primary-600 font-medium">
                {formatTime(countdown)}
              </span>
            </p>
          ) : (
            <button
              onClick={handleResend}
              className="text-primary-600 text-sm font-medium hover:underline"
            >
              Send again
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
