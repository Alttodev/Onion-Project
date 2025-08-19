import React from "react";
import { Link } from "react-router-dom";

function ErrorPage() {
  return (
    <div className="flex bg-white items-center justify-center min-h-screen ">
      <Link to="/home">
        <img
          src="/src/assets/404_image.png"
          alt="404_image"
          className="h-70 w-100 object-cover"
        />
      </Link>
    </div>
  );
}

export default ErrorPage;
