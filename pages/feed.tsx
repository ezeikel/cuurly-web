import { useQuery } from "@apollo/client";
import { FEED_QUERY } from "../apollo/queries";
import Feed from "../components/Feed/Feed";
import Spinner from "../components/Spinner/Spinner";
import useUser from "../hooks/useUser";

const FeedPage = () => {
  const { user, isLoading: isLoadingUser } = useUser();

  const { data: { feed: posts } = {}, loading: isLoadingPosts } = useQuery(
    FEED_QUERY,
    {
      variables: { id: user?.id },
      skip: !user, // wait for user to be fetched
    },
  );

  if (isLoadingUser || isLoadingPosts)
    return (
      <div className="flex justify-center items-center h-full">
        <Spinner />
      </div>
    );

  if (!user) return null;

  return <Feed posts={posts} />;
};

export default FeedPage;
