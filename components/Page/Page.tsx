import { ReactNode, useEffect } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import classNames from "classnames";
import Meta from "../Meta";
import Notification from "../Notification/Notification";
import useUser from "../../hooks/useUser";

const Header = dynamic(() => import("../Header/Header"));

type PageProps = {
  className?: string;
  children: ReactNode;
};

const Page = ({ className, children }: PageProps) => {
  const router = useRouter();
  const { pathname } = router;
  const { user, isError, isLoading } = useUser();

  const isUserAccessPage = pathname === "/sign-up" || pathname === "/sign-in";

  useEffect(() => {
    if (!isError && isLoading) {
      // still trying to fetch user - do nothing
      return;
    }

    if (!user) {
      if (isUserAccessPage) {
        // ufo is either trying to sign in/up - do nothing
        return;
      }

      // otherwise redirect anonymous to sign in page
      router.replace("/sign-in");
    }
  }, [user, pathname, isError, isLoading, isUserAccessPage]);

  const wrapperClass = classNames("min-h-screen grid", {
    "grid-rows-1": isUserAccessPage,
    "grid-rows-user-page-layout": !isUserAccessPage,
    [className]: className,
  });

  return (
    <div className={wrapperClass}>
      <Meta />
      {isUserAccessPage ? null : <Header className="h-20 col-span-1" />}
      <div className="flex flex-col flex-1 bg-gray-50">
        <main className="flex-1 flex flex-col">{children}</main>
        <Notification
          position="bottom-center"
          draggable
          hideProgressBar
          pauseOnHover
          autoClose={3000}
          closeOnClick={false}
        />
      </div>
    </div>
  );
};

export default Page;
