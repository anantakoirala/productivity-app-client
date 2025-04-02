import Link from "next/link";
import React from "react";

type Props = {};

const Notfound = (props: Props) => {
  return (
    <div>
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <p>
        View <Link href={"/"}>Home page</Link>
      </p>
    </div>
  );
};

export default Notfound;
