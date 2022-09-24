import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { SINGLE_USER_QUERY } from "../apollo/queries";
import Profile from "../components/Profile/Profile";
import Spinner from "../components/Spinner/Spinner";

const ProfilePage = () => {
  const router = useRouter();
  const { username } = router.query;

  const { loading: loadingUser, data: { user } = {} } = useQuery(
    SINGLE_USER_QUERY,
    {
      variables: { username },
    },
  );

  if (loadingUser) return <Spinner />;

  return (
    <div className="flex flex-col">
      <Profile user={user} />
    </div>
  );
};

export default ProfilePage;
