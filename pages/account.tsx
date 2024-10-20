import { useRouter } from "next/router";
import Account from "../components/Account/Account";

const AccountPage = () => {
  const router = useRouter();
  const { mode } = router.query;

  return (
    <div className="grid p-[var(--padding-page-wrap)]">
      <Account mode={mode} />
    </div>
  );
};

export default AccountPage;
