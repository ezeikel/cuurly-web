import { withRouter } from "next/router";
import { useMutation } from "@apollo/client";
import { SIGNOUT_MUTATION, CURRENT_USER_QUERY } from "../../apollo/queries";
import { Wrapper } from "./Signout.styled";

const Signout = ({ router }) => {
  const [signout, { data, loading, error }] = useMutation(SIGNOUT_MUTATION, {
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

  return <Wrapper onClick={signout}>Sign Out</Wrapper>;
};

export default withRouter(Signout);
