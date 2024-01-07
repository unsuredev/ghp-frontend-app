import * as React from "react";
import { Tooltip } from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import { Link } from "react-router-dom";

export interface CustomMenuItemProps {
  to: string;
  selectedIndex: number;
  onClick: Function;
  index: number;
  titleText: string;
  tooltipText?: string;
  icon: any;
  class: string;
}

const CustomMenuItem: React.FC<CustomMenuItemProps> = (props) => {
  return (
    <React.Fragment>
      <ListItem
        button
        component={Link}
        to={props.to}
        className={props.class}
        selected={props.selectedIndex === props.index}
        onClick={() => props.onClick(props.index)}
      >
        <Tooltip title={props.tooltipText || props.titleText} placement="right">
          <ListItemIcon>{props.icon}</ListItemIcon>
        </Tooltip>
        <ListItemText className="">{props.titleText}</ListItemText>
      </ListItem>
    </React.Fragment>
  );
};

export default CustomMenuItem;
