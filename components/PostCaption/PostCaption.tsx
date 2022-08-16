import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import Link from "next/link";

const PostCaption = ({ caption, author, className }) => (
  <div
    className={classNames("", {
      [className]: !!className,
    })}
  >
    <Link href="/[username]" as={`/${author.username}`}>
      <a className="font-bold text-sm float-left mr-2 flex gap-x-1 items-center">
        {author.username}
        {author.verified ? (
          <FontAwesomeIcon
            icon={["fas", "badge-check"]}
            color="#3E9AED"
            size="sm"
          />
        ) : null}
      </a>
    </Link>
    <p className="text-sm">{caption}</p>
  </div>
);

export default PostCaption;
