import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { MailIcon } from "@/shared/assets/icons";
import { Button, Input } from "@/shared/ui";
import Logo from "@/shared/assets/images/Logo.png";
import UkFlag from "@/shared/assets/images/uk-flag.png";
import Knowledge from "@/shared/assets/images/knowledge.png";
import Education from "@/shared/assets/images/education.png";
import Astronomy from "@/shared/assets/images/astronomy.png";
import { useMask } from "@react-input/mask";
import "./RegisterPage.css";

interface RegisterFormData {
  phone?: string;
  email?: string;
}

type AuthMode = "phone" | "email";

export const RegisterPage = () => {
  const [authMode, setAuthMode] = useState<AuthMode>("phone");

  const inputRef = useMask({
    mask: "(__) - ___-__-__",
    replacement: { _: /\d/ },
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<RegisterFormData>();

  const navigate = useNavigate();

  const onSubmit = (data: RegisterFormData) => {
    if (authMode === "phone") {
      console.log("Phone:", data.phone);
    } else {
      console.log("Email:", data.email);
    }
    navigate("/otp");
  };

  const handleAuthModeChange = (mode: AuthMode) => {
    setAuthMode(mode);
    reset();
  };

  const getValidationRules = () => {
    if (authMode === "phone") {
      return {
        required: "Phone number is required",
        pattern: {
          value: /^\(\d{2}\)\s-\s\d{3}-\d{2}-\d{2}$/,
          message: "Please enter valid phone format",
        },
      };
    }
    return {
      required: "Email is required",
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: "Please enter a valid email address",
      },
    };
  };

  return (
    <div className="register-page">
      {/* Noise texture overlay */}
      <div className="noise-overlay" />

      {/* Glassmorphism blur backgrounds */}
      <div className="blur-shape blur-shape-top-left" />
      <div className="blur-shape blur-shape-bottom-right" />

      <div className="register-content">
        <div className="register-card">
          <div className="flex justify-center mb-8">
            <img src={Logo} alt="logo" />
          </div>

          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Welcome to Wisdom Dictionary!
            </h1>
            <p className="text-gray-600 text-sm leading-relaxed">
              Please, enter your{" "}
              {authMode === "phone" ? "phone number" : "email address"} or
              choose other options to continue wisdom dictionary.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="mb-6">
            <div className="mb-4">
              {authMode === "phone" ? (
                <div className="flex gap-3">
                  <div className="flex items-center bg-gray-100 px-6 py-5 rounded-full border border-gray-200">
                    <span className="text-gray-700 font-medium">+998</span>
                  </div>
                  <Controller
                    name="phone"
                    control={control}
                    rules={getValidationRules()}
                    render={({ field }) => (
                      <Input
                        {...field}
                        ref={inputRef}
                        placeholder="( -- ) - --- -- --"
                        className="flex-1 px-6 py-5 bg-gray-100"
                        error={errors.phone?.message}
                      />
                    )}
                  />
                </div>
              ) : (
                <Controller
                  name="email"
                  control={control}
                  rules={getValidationRules()}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="email"
                      placeholder="Enter your email address"
                      className="w-full px-6 py-5 bg-gray-100"
                      error={errors.email?.message}
                    />
                  )}
                />
              )}
            </div>

            <Button
              type="submit"
              variant="primary"
              className="bg-primary-600 hover:bg-primary-500 transition-all duration-200"
            >
              Get a code
            </Button>
          </form>

          <div className="flex items-center mb-6">
            <div className="flex-1 border-t border-gray-200"></div>
            <span className="px-4 text-gray-500 text-sm">or</span>
            <div className="flex-1 border-t border-gray-200"></div>
          </div>

          <div className="space-y-3">
            <Button
              variant="icon"
              icon={<MailIcon />}
              onClick={() =>
                handleAuthModeChange(authMode === "phone" ? "email" : "phone")
              }
              className="transition-all duration-200 hover:bg-gray-50"
            >
              Continue with {authMode === "phone" ? "Email" : "Phone"}
            </Button>
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
