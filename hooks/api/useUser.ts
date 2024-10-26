import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "@/app/actions";
import { User } from "@prisma/client";

type UserResponse = User | null;

const useUser = () =>
  useQuery<UserResponse>({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });

export default useUser;
