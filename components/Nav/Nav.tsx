import { getCurrentUser } from "@/app/actions";
import NavItems from "./NavItems";
import AuthButton from "../buttons/AuthButton/AuthButton";

const Nav = async () => {
  const user = await getCurrentUser();

  return (
    <nav className="md:flex-1 flex justify-between items-center sm:justify-end gap-x-5">
      {user ? <NavItems user={user} /> : null}
      <AuthButton />
    </nav>
  );
};

export default Nav;
