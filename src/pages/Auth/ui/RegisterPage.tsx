import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { MailIcon } from "@/shared/assets/icons";
import { Button, Input } from "@/shared/ui";
import Logo from "@/shared/assets/images/Logo.png";
import UkFlag from "@/shared/assets/images/uk-flag.png";
import Knowledge from "@/shared/assets/images/knowledge.png";
import Education from "@/shared/assets/images/education.png";
import Astronomy from "@/shared/assets/images/astronomy.png";
import { useMask } from "@react-input/mask";
import { useLogin } from "@/features/auth/hooks/useAuth";
import { type AuthFormData } from "@/features/auth/types";
import "./RegisterPage.css";

type AuthMode = "phone" | "email";

const PHONE_REGEX = /^\(\d{2}\)\s-\s\d{3}-\d{2}-\d{2}$/;
const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

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
    watch,
  } = useForm<AuthFormData>({
    mode: "onChange",
    defaultValues: {
      phone: "",
      email: "",
    },
  });
  const loginMutation = useLogin({
    phoneNumber: `998${watch("phone")?.replace(/\D/g, "")}`,
  });

  const watchedValues = watch();

  const onSubmit = async (data: AuthFormData) => {
    if (authMode === "phone" && data.phone) {
      const phoneNumber = data.phone.replace(/\D/g, "");
      const fullPhone = `998${phoneNumber}`;

      loginMutation.mutate({
        phone: parseInt(fullPhone, 10),
      });
    } else if (authMode === "email" && data.email) {
      console.log("Email auth not implemented yet:", data.email);
    }
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
          value: PHONE_REGEX,
          message: "Please enter valid phone format",
        },
      };
    }
    return {
      required: "Email is required",
      pattern: {
        value: EMAIL_REGEX,
        message: "Please enter a valid email address",
      },
    };
  };

  const isFormValid =
    authMode === "phone"
      ? watchedValues.phone && PHONE_REGEX.test(watchedValues.phone)
      : watchedValues.email && EMAIL_REGEX.test(watchedValues.email || "");

  return (
    <div className="register-page">
      <div className="noise-overlay" />
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
              disabled={!isFormValid || loginMutation.isPending}
              className="w-full bg-primary-600 hover:bg-primary-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loginMutation.isPending ? "Sending..." : "Get a code"}
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
              className="w-full transition-all duration-200 hover:bg-gray-50"
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
