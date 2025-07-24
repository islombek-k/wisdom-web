import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import {
  AppleIcon,
  FaceBookIcon,
  GoogleIcon,
  MailIcon,
} from "../../../shared/assets/icons";
import { Button, Input } from "../../../shared/ui";
import Logo from "../../../shared/assets/images/Logo.png";
import UkFlag from "../../../shared/assets/images/uk-flag.png";
import Knowledge from "../../../shared/assets/images/knowledge.png";
import Education from "../../../shared/assets/images/education.png";
import Astronomy from "../../../shared/assets/images/astronomy.png";
import { useMask } from "@react-input/mask";

interface RegisterFormData {
  phone: string;
}

export const RegisterPage = () => {
  const inputRef = useMask({
    mask: "(__) - ___-__-__",
    replacement: { _: /\d/ },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();
  const navigate = useNavigate();

  const onSubmit = (data: RegisterFormData) => {
    console.log("Phone:", data.phone);
    navigate("/otp");
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`Continue with ${provider}`);
  };

  return (
    <div className="relative overflow-hidden min-h-screen bg-primary-500">
      {/* <div className="absolute rounded-full backdrop-blur-3xl w-[1004px] h-[1004px] -top-[560px] -left-[539px] opacity-70 bg-white bg-opacity-50" />
      <div className="absolute rounded-full backdrop-blur-3xl w-[1004px] h-[1004px] top-[444px] left-[912px] opacity-70 bg-white bg-opacity-70"></div> */}

      <div className="flex items-center justify-center p-4">
        <div className="relative bg-white rounded-3xl p-15 max-w-[655px] w-full shadow-2xl ">
          <div className="flex justify-center mb-8">
            <img src={Logo} alt="logo" />
          </div>

          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Welcome to Wisdom Dictionary!
            </h1>
            <p className="text-gray-600 text-sm leading-relaxed">
              Please, enter your phone number or choose other options to
              continue wisdom dictionary.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="mb-6">
            <div className="mb-4">
              <div className="flex gap-3">
                <div className="flex items-center bg-gray-100 px-6 py-5 rounded-full border border-gray-200">
                  <span className="text-gray-700 font-medium">+998</span>
                </div>
                <Input
                  {...register("phone", {
                    required: "Phone number is required",
                    pattern: {
                      value: /^\(\d{2}\)\s\d{3}-\d{2}-\d{2}$/,
                      message: "Please enter valid phone format",
                    },
                  })}
                  ref={inputRef}
                  placeholder="( -- ) --- -- --"
                  // error={errors.phone?.message}
                  className="flex-1 px-6 py-5 bg-gray-100"
                />
              </div>
              {errors && errors.phone && (
                <p className="m-1 text-sm text-red-500">
                  {errors.phone.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              variant="primary"
              className="bg-primary-600 hover:bg-primary-500"
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
              onClick={() => handleSocialLogin("Email")}
            >
              Continue with Email
            </Button>

            {/* <Button
              variant="icon"
              icon={<GoogleIcon />}
              onClick={() => handleSocialLogin("Google")}
            >
              Continue with Google
            </Button>

            <Button
              variant="icon"
              icon={<FaceBookIcon />}
              onClick={() => handleSocialLogin("Facebook")}
            >
              Continue with Facebook
            </Button>

            <Button
              variant="icon"
              icon={<AppleIcon />}
              onClick={() => handleSocialLogin("Apple")}
            >
              Continue with Apple
            </Button> */}
          </div>
          <img
            src={UkFlag}
            alt="flag"
            className="absolute left-[-250px] top-10"
          />
          <img
            src={Education}
            alt="flag"
            className="absolute left-[-350px] bottom-10"
          />
          <img
            src={Astronomy}
            alt="flag"
            className="absolute right-[-350px] top-10"
          />
          <img
            src={Knowledge}
            alt="flag"
            className="absolute right-[-290px] bottom-10"
          />
        </div>
      </div>
    </div>
  );
};
