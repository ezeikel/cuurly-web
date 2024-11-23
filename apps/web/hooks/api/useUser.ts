import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "@/app/actions";
import type { DbUserType } from "@cuurly/db";

type UserResponse = DbUserType | null;

const useUser = () =>
  useQuery<UserResponse>({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });

export default useUser;
