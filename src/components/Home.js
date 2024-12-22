import React from "react";
import "../css/Home.css";
import { useSelector } from "react-redux";

export default function Home() {
  const myToken = useSelector(state => state.token.value.tok);
  const myId = useSelector(state => state.token.value.id);
  return (
    <div className="home">
      <h1>Welcome to the Certification Shop</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </p>
      {myToken !== "" && (
        <div>
          <h1>My Token</h1>
          <p>{myToken}</p>
          <h1>My Id</h1>
          <p>{myId}</p>
        </div>
      )}
    </div>
  );
}
