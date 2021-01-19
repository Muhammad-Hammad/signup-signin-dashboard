import { useState } from "react";
import { css } from "@emotion/core";
import PuffLoader from "react-spinners/PuffLoader";

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
  //   border-color: red;
`;
const loading = true;

function Loader() {
  return (
    <div>
      <PuffLoader loading={loading} css={override} size={24} />
    </div>
  );
}

export default Loader;
