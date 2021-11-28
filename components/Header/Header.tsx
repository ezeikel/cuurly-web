import { useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import NProgress from "nprogress";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import useUser from "../../hooks/useUser";
import Logo from "../Logo/Logo";
import SearchForm from "../form/forms/SearchForm/SearchForm";

const Header = ({ className }) => {
  const router = useRouter();
  const { user } = useUser();

  useEffect(() => {
    NProgress.configure({
      showSpinner: false,
    });

    const handleRouteChangeStart = () => {
      NProgress.start();
    };

    const handleRouteChangeComplete = () => {
      NProgress.done();
    };

    const handleRouteChangeError = () => {
      NProgress.done();
    };

    router.events.on("routeChangeStart", handleRouteChangeStart);
    router.events.on("routeChangeComplete", handleRouteChangeComplete);
    router.events.on("routeChangeError", handleRouteChangeError);

    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart);
      router.events.off("routeChangeComplete", handleRouteChangeComplete);
      router.events.off("routeChangeError", handleRouteChangeError);
    };
  }, []);

  const wrapperClass = classNames("flex justify-between items-center p-4", {
    [className]: className,
  });

  if (!user) return null;

  return (
    <header className={wrapperClass}>
      <Link href="/">
        <a>
          <Logo />
        </a>
      </Link>
      <nav className="flex-1 flex justify-around items-center">
        <SearchForm />
        <ul className="flex">
          <li>
            <Link href={`/explore?id=${user.id}`}>
              <a>
                <FontAwesomeIcon
                  icon={["fal", "compass"]}
                  color="#333"
                  size="lg"
                />
              </a>
            </Link>
          </li>
          <li className="ml-8">
            <Link href="/">
              <a>
                <FontAwesomeIcon
                  icon={["fal", "bell"]}
                  color="#333"
                  size="lg"
                />
              </a>
            </Link>
          </li>
          <li className="ml-8">
            <Link href="/">
              <a>
                <FontAwesomeIcon
                  icon={["fal", "paper-plane"]}
                  color="#333"
                  size="lg"
                />
              </a>
            </Link>
          </li>
          <li className="ml-8">
            <Link href="/[username]" as={`/${user.username}`}>
              <a>
                <FontAwesomeIcon
                  icon={["fal", "user"]}
                  color="#333"
                  size="lg"
                />
              </a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
