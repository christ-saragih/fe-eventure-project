// logic aplikasi fitur register
import { useContext, useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { IRegister } from "@/types/Auth";
import authServices from "@/services/auth.service";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { ToasterContext } from "@/contexts/ToasterContext";

const registerSchema = yup.object().shape({
  fullName: yup.string().required("Please enter your full name"),
  username: yup.string().required("Please enter your username"),
  email: yup
    .string()
    .email("Email format not valid")
    .required("Please enter your email"),
  password: yup
    .string()
    .min(8, "Minimal 8 characters")
    .required("Please enter your password"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Confirm password does not match")
    .required("Please enter your confirm password"),
});

const useRegister = () => {
  const router = useRouter();

  const [visiblePassword, setVisiblePassword] = useState({
    password: false,
    confirmPassword: false,
  });
  const { setToaster } = useContext(ToasterContext);

  const handleVisiblePassword = (key: "password" | "confirmPassword") => {
    setVisiblePassword({
      ...visiblePassword,
      [key]: !visiblePassword[key],
    });
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const registerService = async (payload: IRegister) => {
    const result = await authServices.register(payload);
    return result;
  };

  const { mutate: mutateRegister, isPending: isPendingRegister } = useMutation({
    mutationFn: registerService,
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.message,
      });
    },
    onSuccess: () => {
      reset();
      setToaster({
        type: "success",
        message: "Register successful! Please check your email to verify.",
      });
      router.push("/auth/register/success");
    },
  });

  const handleRegister = (data: IRegister) => {
    mutateRegister(data);
  };

  return {
    visiblePassword,
    handleVisiblePassword,
    control,
    handleSubmit,
    handleRegister,
    errors,
    isPendingRegister,
  };
};

export default useRegister;
