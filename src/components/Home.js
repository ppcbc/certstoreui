
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom"; 
import "../css/Home.css";

export default function Home() {
  const myToken = useSelector(state => state.token.value.tok);
  const myId = useSelector(state => state.token.value.id);
  const myRole = useSelector(state => state.token.value.role);
  const availableCertifications = [
    {
      id: 1,
      name: "SQL Certification",
      price: 50,
      description:
        "Master SQL to manage and query relational databases effectively in modern applications."
    },
    {
      id: 2,
      name: "C# Certification",
      price: 60,
      description:
        "Learn C# for building powerful and scalable applications across various platforms, including .NET."
    },
    {
      id: 3,
      name: "JavaScript Certification",
      price: 40,
      description:
        "Develop dynamic web applications by mastering JavaScript, the cornerstone of modern front-end development."
    }
  ];

  const truncateDescription = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + '...';
    }
    return text;
  };

  return (
      <div className="my-home">
        <h1>Welcome to the Certification Shop</h1>
        <hr className="divider"/>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
          veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
          commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
          velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
          occaecat cupidatat non proident, sunt in culpa qui officia deserunt
          mollit anim id est laborum.
        </p>
        {/* {myToken !== "" && (
        <div>
          <h1>My Token</h1>
          <p>{myToken}</p>
          <h1>My Id</h1>
          <p>{myId}</p>
          <h1>My Role</h1>
          <p>{myRole}</p>
        </div>
      )} */}


        <div className="preview-certifications">
          <h1>Available Certifications</h1>
          <ul>
            {availableCertifications.map(certification => (
                <li key={certification.id}>
                  <Link to="/detailed-certifications" className="certification-link">
                    <div>
                      <h2>{certification.name}</h2>
                      <p>{truncateDescription(certification.description, 100)}</p>
                      <p>Price: ${certification.price}</p>
                    </div>
                  </Link>
                    <button
                        onClick={() =>
                            alert(`Bought voucher for ${certification.name}`)
                        }
                  >
                    Buy Voucher
                  </button>
                </li>
            ))}
          </ul>
          {/* "EXPLORE ALL CERTIFICATIONS" link */}
          <Link to="/certifications" className="explore-link">
            Explore all Certifications →
          </Link>
        </div>


        {/*<div className="certifications">*/}
        {/*  <h1>Available Certifications</h1>*/}
        {/*  <ul>*/}
        {/*    {certifications.map((certification) => (*/}
        {/*        <li key={certification.id} className="certification-box">*/}
        {/*          <Link to="/detailed-certifications" className="certification-link">*/}
        {/*            <div>*/}
        {/*              <h2>{certification.name}</h2>*/}
        {/*              <p>{truncateDescription(certification.description, 100)}</p>*/}
        {/*              <p>Price: ${certification.price}</p>*/}
        {/*            </div>*/}
        {/*          </Link>*/}
        {/*          <button onClick={() => handleBuy(certification)}>Buy Voucher</button>*/}
        {/*        </li>*/}
        {/*    ))}*/}
        {/*  </ul>*/}
        {/*</div>*/}


      </div>
  );
}
