import { useState, useEffect } from "react";
import OtpInput from "react-otp-input";
import { Button } from "../../../shared/ui";
import Logo from "../../../shared/assets/images/Logo.png";
import { LoadingIcon } from "@/shared/assets/icons";
import "./OtpPage.css";
import UkFlag from "../../../shared/assets/images/uk-flag.png";
import Knowledge from "../../../shared/assets/images/knowledge.png";
import Education from "../../../shared/assets/images/education.png";
import Astronomy from "../../../shared/assets/images/astronomy.png";

interface OtpPageProps {
  phoneNumber?: string;
  onVerify?: (otp: string) => void;
  onResend?: () => void;
}

export const OtpPage = ({
  phoneNumber = "+99890*******43",
  onVerify,
  onResend,
}: OtpPageProps) => {
  const [otp, setOtp] = useState("");
  const [countdown, setCountdown] = useState(54);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

  const handleChange = (otpValue: string) => {
    setOtp(otpValue);

    if (otpValue.length === 6) {
      if (otpValue === "111111") {
        setLoading(true);
        setError("");
      } else {
        setError("OTP is wrong");
      }
      console.log("finished");
    }
  };

  return (
    <div className="otp-page">
      {/* Noise texture overlay */}
      <div className="noise-overlay" />

      {/* Glassmorphism blur backgrounds */}
      <div className="blur-shape blur-shape-top-left" />
      <div className="blur-shape blur-shape-bottom-right" />

      <div className="otp-content">
        <div className="otp-card">
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
              onChange={handleChange}
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
            className="bg-primary-600 hover:bg-primary-500 mb-6 flex justify-center items-center transition-all duration-200"
            disabled={otp.length !== 6}
          >
            {loading && !error ? <LoadingIcon /> : "Send again"}
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
                className="text-primary-600 text-sm font-medium hover:underline transition-all duration-200"
              >
                Send again
              </button>
            )}
          </div>
          <img
            src={UkFlag}
            alt="UK Flag"
            className="absolute left-[-220px] top-4 opacity-90 transition-opacity duration-300 hover:opacity-100"
          />
          <img
            src={Education}
            alt="Education"
            className="absolute left-[-320px] bottom-1 opacity-90 transition-opacity duration-300 hover:opacity-100"
          />
          <img
            src={Astronomy}
            alt="Astronomy"
            className="absolute right-[-260px] top-[-55px] opacity-90 transition-opacity duration-300 hover:opacity-100"
          />
          <img
            src={Knowledge}
            alt="Knowledge"
            className="absolute right-[-290px] bottom-1 opacity-90 transition-opacity duration-300 hover:opacity-100"
          />
        </div>
      </div>
    </div>
  );
};
