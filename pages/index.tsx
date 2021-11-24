import { useEffect } from "react";
import { useRouter } from "next/router";
import useUser from "../hooks/useUser";

const IndexPage = () => {
  const router = useRouter();
  const { user, isLoading } = useUser();

  useEffect(() => {
    if (!isLoading) {
      if (user) {
        // if logged in redirect to user feed
        router.replace(
          {
            pathname: "/feed",
          },
          "/",
        );
      }
    }
  }, [user]);

  return null;
};

export default IndexPage;
