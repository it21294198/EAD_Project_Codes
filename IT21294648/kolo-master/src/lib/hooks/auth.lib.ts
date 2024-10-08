import api from "@/config/axios.config";
import { ICreateUserDTO } from "@/interfaces/user.interface";
import { QueryClient, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

// function for creating user accounts. Payload as ICreateUserDTO
const createUser = async (data: ICreateUserDTO) => {
  const response = await api.post("/auth/register", data);
  return response.data;
};

// hook for creating user accounts. Payload as ICreateUserDTO. Cals createUser function
export const useCreateUser = (queryClient: QueryClient) => {
  return useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users", "register"],
      });
      toast.success("Account created successfully");
    },
  });
};
