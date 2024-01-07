import * as React from "react";
import { withRouter } from "react-router-dom";
import { isTokenExpired } from "./helper";
export interface CheckSpaceBarProps { }

const CheckSpaceBar: React.SFC<CheckSpaceBarProps> = () => {
  return (
    <React.Fragment>
      {isTokenExpired() && <div style={{ height: 48 }} />}
    </React.Fragment>
  );
};

export default withRouter(CheckSpaceBar);
