import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import OtpInput from "react-otp-input";
import { Button } from "@/shared/ui";
import Logo from "@/shared/assets/images/Logo.png";
import { LoadingIcon } from "@/shared/assets/icons";
import { useVerifyOtp } from "@/features/auth/hooks/useAuth";
import { type OtpFormData } from "@/features/auth/types";
import "./OtpPage.css";
import UkFlag from "@/shared/assets/images/uk-flag.png";
import Knowledge from "@/shared/assets/images/knowledge.png";
import Education from "@/shared/assets/images/education.png";
import Astronomy from "@/shared/assets/images/astronomy.png";

export const OtpPage = () => {
  const [countdown, setCountdown] = useState(54);
  const verifyMutation = useVerifyOtp();

  const {
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<OtpFormData>({
    defaultValues: {
      otp: "",
    },
  });

  const otp = watch("otp");
  const phoneNumber = localStorage.getItem("auth_phone");

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const onSubmit = (data: OtpFormData) => {
    if (data.otp.length === 5) {
      const phone = localStorage.getItem("auth_phone");
      if (!phone) {
        setError("otp", { message: "Session expired. Please try again." });
        return;
      }

      verifyMutation.mutate({
        phone: parseInt(phone, 10),
        verify_code: data.otp,
      });
    }
  };

  const handleResend = () => {
    setCountdown(54);
    setValue("otp", "");
    clearErrors();
    // TODO: Implement resend logic
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const handleOtpChange = (otpValue: string) => {
    setValue("otp", otpValue);
    clearErrors("otp");

    if (otpValue.length === 5) {
      handleSubmit(onSubmit)();
    }
  };

  const hasError = !!errors.otp || verifyMutation.isError;
  const errorMessage =
    errors.otp?.message ||
    (verifyMutation.isError ? "Invalid verification code" : "");

  return (
    <div className="otp-page">
      <div className="noise-overlay" />
      <div className="blur-shape blur-shape-top-left" />
      <div className="blur-shape blur-shape-bottom-right" />

      <div className="otp-content">
        <div className="otp-card">
          <div className="flex justify-center mb-8">
            <img src={Logo} alt="logo" />
          </div>

          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Enter verification code
            </h1>
            <p className="text-gray-600 text-sm leading-relaxed">
              We have sent a verification code to
              <span className="font-medium text-gray-900">+{phoneNumber}</span>
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-8">
              <OtpInput
                value={otp}
                onChange={handleOtpChange}
                numInputs={5}
                renderInput={(props) => <input {...props} />}
                inputStyle={{
                  width: "60px",
                  height: "60px",
                  margin: "0 4px",
                  fontSize: "24px",
                  borderRadius: "50%",
                  border: hasError ? "2px solid #ef4444" : "2px solid #e5e7eb",
                  backgroundColor: hasError ? "#fef2f2" : "#F2F4F7",
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
              {hasError && (
                <p className="text-red-500 text-sm text-center mt-3">
                  {errorMessage}
                </p>
              )}
            </div>

            <Button
              type="submit"
              variant="primary"
              disabled={otp.length !== 5 || verifyMutation.isPending}
              className="mb-6 bg-primary-600 hover:bg-primary-500 transition-all duration-200 disabled:opacity-50"
            >
              {verifyMutation.isPending ? (
                <div className="flex items-center justify-center gap-2">
                  <LoadingIcon className="animate-spin" />
                  Verifying...
                </div>
              ) : (
                "Verify"
              )}
            </Button>
          </form>

          <div className="text-center">
            <p className="text-gray-600 text-sm mb-4">
              Didn't receive the code?{" "}
              {countdown > 0 ? (
                <span className="text-gray-400">
                  Resend in {formatTime(countdown)}
                </span>
              ) : (
                <button
                  onClick={handleResend}
                  className="text-primary-600 hover:text-primary-500 font-medium transition-colors"
                >
                  Resend code
                </button>
              )}
            </p>
          </div>

          {/* Decorative images */}
          <img
            src={UkFlag}
            alt="UK Flag"
            className="absolute left-[-250px] top-10 opacity-90 transition-opacity duration-300 hover:opacity-100"
          />
          <img
            src={Education}
            alt="Education"
            className="absolute left-[-350px] bottom-10 opacity-90 transition-opacity duration-300 hover:opacity-100"
          />
          <img
            src={Astronomy}
            alt="Astronomy"
            className="absolute right-[-350px] top-10 opacity-90 transition-opacity duration-300 hover:opacity-100"
          />
          <img
            src={Knowledge}
            alt="Knowledge"
            className="absolute right-[-290px] bottom-10 opacity-90 transition-opacity duration-300 hover:opacity-100"
          />
        </div>
      </div>
    </div>
  );
};
