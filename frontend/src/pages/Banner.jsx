import React, { Fragment } from "react";

const Banner = () => {
  const [show, hide] = React.useState(true);
  const [success, change] = React.useState(null);
  const Switch = () => change(!success);
  const Dismiss = () => {
    hide(!show);
  };
  return (
    <Fragment>
    {show ? (
      <div
        className={`${
          success ? "bg-green-500 border-green-500" : "bg-green-500 border-green-700"
        } h-30 flex items-center justify-center border-2 text-white`}
      >
        <p className="text-center">Fresh2door Order Anytime, From Anywhere</p>
      </div>
    ) : null}
  </Fragment>

  );
};

export default Banner;
