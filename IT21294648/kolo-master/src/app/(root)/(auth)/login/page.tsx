"use client";
import { ILoginUser } from "@/interfaces/user.interface";
import { useForm } from "react-hook-form";

// Login component
const Login = () => {
  const queryClient = useQueryClient();

  // login user hook
  const { mutateAsync: loginUser } = useLoginUser(queryClient);

  const { register, handleSubmit, formState } = useForm<ILoginUser>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // calls loginuser function asynchronously
  const onSubmit = (data: ILoginUser) => {
    try {
      await loginUser(data);
    } catch (error) {
      console.error("🚀 ~ onSubmit ~ error", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        className="w-1/3 p-6 bg-base-300 rounded shadow"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mb-4">
          <label
            className="block text-neutral-100 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="w-full px-3 py-2 border bg-slate-900 border-gray-300 rounded focus:outline-none focus:border-indigo-500"
            type="email"
            id="email"
            {...register("email", {
              required: { message: "Please enter an email", value: true },
              maxLength: {
                message: "Email has to be lower than 100 characters",
                value: 100,
              },
              pattern: {
                value: /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/,
                message: "Please enter an valid email",
              },
            })}
          />
          <p className="pl-3 text-red-500">{formState.errors.email?.message}</p>
        </div>
        <div className="mb-4">
          <label
            className="block text-neutral-100 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="w-full px-3 py-2 border bg-slate-900 border-gray-300 rounded focus:outline-none focus:border-indigo-500"
            type="password"
            id="password"
            {...register("password", {
              required: {
                message: "Password is required",
                value: true,
              },
              minLength: {
                message: "Password must have atleast 8 charcters",
                value: 8,
              },
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
                message:
                  "Password must include at least one uppercase letter, one lowercase letter, one digit, and one special character",
              },
            })}
          />
          <p className="pl-3 text-red-500">
            {formState.errors.password?.message}
          </p>
        </div>
        <div className="flex justify-end">
          <button
            className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700"
            type="submit"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
