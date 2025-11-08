import React from "react";

const DateTime = () => {
  const date = new Date();
  const day = String(date.getDate()).padStart(2, "0");
  const month = date.toLocaleString("en-US", { month: "short" }); // e.g. "Nov"
  const year = date.getFullYear();

  const formattedDate = `${day}-${month}-${year}`;
  return <div>{formattedDate}</div>;
};

export default DateTime;
