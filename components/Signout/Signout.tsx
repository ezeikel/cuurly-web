import { withRouter } from "next/router";
import { useMutation } from "@apollo/client";
import { SIGNOUT_MUTATION, CURRENT_USER_QUERY } from "../../apollo/queries";

const Signout = ({ router }) => {
  const [signout] = useMutation(SIGNOUT_MUTATION, {
    update(cache) {
      // manually writing to cache to fix homepage conditional redirect not working
      cache.writeQuery({
        query: CURRENT_USER_QUERY,
        data: { currentUser: null },
      });
    },
    onCompleted() {
      router.push(`/`);
    },
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  return (
    <button type="button" onClick={() => signout()}>
      Sign Out
    </button>
  );
};

export default withRouter(Signout);
