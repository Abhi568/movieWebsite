import React from "react";

export default function Footer() {
  return (
    <div>
      <h5
        className="py-2 py-2 position-absolute bottom text-center fs-4 "
        style={{ backgroundColor: "wheat", width: "100%" }}
      >
        ©{new Date().getFullYear()} All Rights are reserved{" "}
      </h5>
    </div>
  );
}
