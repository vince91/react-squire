import * as React from "react";

interface Props {
  onClick: (event: any) => void;
}

const Action: React.SFC<Props> = props => (
  <button className="squire-action" onClick={props.onClick}>
    {props.children}
  </button>
);

export default Action;
