import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from "../../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Button from "../ui/button/Button";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { AuthServiceImpl } from "../../../infrastructure/services/AuthServiceImpl";
import { RegisterUseCase } from "../../../core/useCases/RegisterUseCase";

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);

  const defaultValues = {
    email: "",
    password: "",
    name: "",
  };

  const form = useForm({
    defaultValues,
    resolver: yupResolver(
      yup.object().shape({
        email: yup.string().email().required("This field is required"),
        password: yup.string().min(6).required("This field is required"),
        name: yup.string().required("This field is required"),
      })
    ),
  });

  const handleSubmit = async (data: { email: string; password: string; name: string }) => {
    const authService = new AuthServiceImpl();
    const registerUseCase = new RegisterUseCase(authService);
    const user = await registerUseCase.execute(data.email, data.password, data.name);
    if (user) {
      alert("Registration successful. Please sign in.");
      window.location.href = "/signin"; // Redirige a login
    } else {
      alert("Registration failed");
    }
  };

  return (
    <div className="flex flex-col flex-1">
      <div className="w-full max-w-md pt-10 mx-auto">
        <Link
          to="/"
          className="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          <ChevronLeftIcon className="size-5" />
          Back to dashboard
        </Link>
      </div>
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Sign Up
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Create an account by entering your details!
            </p>
          </div>
          <form>
            <div className="space-y-6">
              <div>
                <Label>
                  Name <span className="text-error-500">*</span>
                </Label>
                <Input
                  placeholder="John Doe"
                  error={form.formState.errors.name ? true : false}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    form.setValue("name", e.target.value)
                  }
                />
              </div>
              <div>
                <Label>
                  Email <span className="text-error-500">*</span>
                </Label>
                <Input
                  placeholder="info@gmail.com"
                  error={form.formState.errors.email ? true : false}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    form.setValue("email", e.target.value)
                  }
                />
              </div>
              <div>
                <Label>
                  Password <span className="text-error-500">*</span>
                </Label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    error={form.formState.errors.password ? true : false}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      form.setValue("password", e.target.value)
                    }
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                  >
                    {showPassword ? (
                      <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                    ) : (
                      <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                    )}
                  </span>
                </div>
              </div>
              <div>
                <Button
                  className="w-full"
                  size="sm"
                  onClick={form.handleSubmit(handleSubmit)}
                >
                  Sign Up
                </Button>
              </div>
            </div>
          </form>
          <div className="mt-5">
            <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
              Already have an account?{" "}
              <Link
                to="/signin"
                className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}