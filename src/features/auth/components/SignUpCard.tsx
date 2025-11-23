import { useEffect, useState } from "react";
import logo from "../../../assets/logo.png";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { signUpSrvice } from "../services/SignUpService";
import { useNavigate } from "react-router-dom"; 

const SignUpCard = () => {
  type SignUpData = {
    name: string;
    email: string;
    password: string;
  };

  const form = useForm<SignUpData>();
  const { register, formState, handleSubmit, reset } = form;
  const { isSubmitSuccessful } = formState;

  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (data: SignUpData) => {
    try {
      await signUpSrvice(data.email, data.name, data.password);
      setServerError("");
      navigate("/signin"); 
    } catch (error: any) {
      setServerError(error.message);
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="rounded-lg shadow-lg bg-white p-5">
      <div className="flex gap-2 justify-center items-center mb-5">
        <img className="rounded-full w-10" src={logo} alt="" />
        <p className="font-bold text-lg">BugIT</p>
      </div>

      <div className="m-3">
        <h1 className="text-2xl font-bold text-center mb-5">
          Create your BugIT account
        </h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            placeholder="Full Name"
            id="name"
            {...register("name", { required: "Enter your full name" })}
            className="border border-gray-200 p-2 rounded-md outline-none focus:ring-2 focus:ring-[#cea86b] focus:border-transparent transition duration-200 placeholder-gray-600"
          />
          {formState.errors.name && (
            <p className="text-red-500 text-sm">
              {formState.errors.name.message}
            </p>
          )}

          <input
            type="text"
            placeholder="Email Address"
            id="email"
            {...register("email", { required: "Enter your Email" })}
            className="border border-gray-200 p-2 rounded-md outline-none focus:ring-2 focus:ring-[#cea86b] focus:border-transparent transition duration-200 placeholder-gray-600"
          />
          {formState.errors.email && (
            <p className="text-red-500 text-sm">
              {formState.errors.email.message}
            </p>
          )}

          <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              id="password"
              {...register("password", { required: "Password Required" })}
              className="border border-gray-200 p-2 pr-10 rounded-md outline-none 
               focus:ring-2 focus:ring-[#cea86b] focus:border-transparent 
               transition duration-200 placeholder-gray-600 w-full"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#f77f0d]"
            >
              {showPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
            </button>
          </div>
          {formState.errors.password && (
            <p className="text-red-500 text-sm">
              {formState.errors.password.message}
            </p>
          )}

          <button
            type="submit"
            className="bg-[#fa7e09] py-2 rounded-lg text-white hover:bg-[#cea86b] transition duration-200"
          >
            Sign Up
          </button>
          <p className="text-sm text-center">
            Already have an account?{" "}
            <a href="/signin" className="text-[#fa7e09] hover:underline">
              Sign In
            </a>
          </p>
        </form>
        {serverError && <p className="text-red-500 mt-3">{serverError}</p>}
      </div>
    </div>
  );
};

export default SignUpCard;
