/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { List, Typography } from "@material-ui/core";
import {
  AccountGroup,
  BrightnessPercent,
} from "mdi-material-ui";
import Divider from '@material-ui/core/Divider';
import FingerprintIcon from '@material-ui/icons/Fingerprint';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import FolderSpecialIcon from '@material-ui/icons/FolderSpecial';
import { BarChart, CloudUpload, Dashboard, Search, TrendingUp, Storefront, NoteAdd, Face, FolderSpecial, Error, Settings } from '@material-ui/icons';

import CustomMenuItem from "./CustomMenuItem";
import { getRole, getShortName } from "../helper";

interface SideMenuProps {
  isMenuOpened?: boolean;
}

const SideMenu: React.FC<SideMenuProps> = ({ isMenuOpened }) => {
  //   const userData = parseJwt();
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [today, setDate] = useState(new Date());

  const hour = today.getHours();
  const wish = `Good ${(hour < 12 && "Morning") || (hour < 17 && "Afternoon") || "Evening"
    }, `;
  const userGreetings = () => {
    return (
      <div>
        <h4>{wish}{getShortName()}</h4>
        <Divider />
      </div>
    );
  };

  React.useLayoutEffect(() => {
    const ROUTES: string[] = [

      "/Home",
      "/customer",
      "/dash",
      "/olddatamanagement",
      "/reports",
      "/connection",
      "/delivery",
      "/refillsales",
      "/transaction",
      "/completefinger",
      "/agentlist",
      "/member",

      "/customerdocs",
      "/dailycustomer",
      "/trash",
      "/profile",
      "/reset",
      "/agentdash",
      "/fingerprint",
      "/agentdashboard"
    ];
    let index = -1;
    ROUTES.forEach((d, i) => {
      if (window.location.pathname.includes(d)) {
        index = i;
      }
      if (index !== -1) {
        setSelectedIndex(index);
      }
    });
  }, [window.location.pathname]);

  return (
    <div style={{ height: "100vh" }}>

      <div style={{
        paddingTop: "1rem", textAlign: "center"
      }}>

        <Typography style={{ backgroundColor: "#004e8e", color: "white" }}>
          {userGreetings()}
        </Typography>

      </div>
      <div style={{ paddingTop: "3rem", backgroundColor: "#004e8e", color: "white" }}>

        <List
          className={`side-menu-list custom-side-menu ${isMenuOpened ? "menu-opened" : "menu-closed"
            }`}
        >
          {getRole() !== "user" && (
            <div >
              <CustomMenuItem
                index={1}
                selectedIndex={selectedIndex}
                to="/customer"
                onClick={setSelectedIndex}
                titleText="New Registration"
                class={`menu-link fs-16 fw-medium ${selectedIndex === 8 ? "selected-menu" : ""
                  }`}
                icon={<PersonAddIcon color="secondary" fontSize="large" />}
              />
              <CustomMenuItem
                index={0}
                selectedIndex={selectedIndex}
                to="/home"
                onClick={setSelectedIndex}
                titleText="Find Customer"
                class={`menu-link fs-16 fw-medium ${selectedIndex === 0 ? "selected-menu" : ""
                  }`}
                icon={<Search color="secondary" fontSize="large" />}
              />
              <CustomMenuItem
                index={3}
                selectedIndex={selectedIndex}
                to="/olddatamanagement"
                onClick={setSelectedIndex}
                titleText="Old Consumer"
                class={`menu-link fs-16 fw-medium ${selectedIndex === 8 ? "selected-menu" : ""
                  }`}
                icon={<FolderSpecialIcon color="secondary" fontSize="large" />}
              />

              <CustomMenuItem
                index={2}
                selectedIndex={selectedIndex}
                to="/customerdocs"
                onClick={setSelectedIndex}
                titleText="Docs  Management"
                class={`menu-link fs-16 fw-medium ${selectedIndex === 8 ? "selected-menu" : ""
                  }`}
                icon={<CloudUpload color="secondary" fontSize="large" />}
              />


              <CustomMenuItem
                index={4}
                selectedIndex={selectedIndex}
                to="/reports"
                onClick={setSelectedIndex}
                titleText="Dashboard"
                class={`menu-link fs-16 fw-medium ${selectedIndex === 2 ? "selected-menu" : ""
                  }`}
                icon={<Dashboard color="secondary" fontSize="large" />}
              />

              <CustomMenuItem
                index={5}
                selectedIndex={selectedIndex}
                to="/connection"
                onClick={setSelectedIndex}
                titleText="Sales & Connection"
                class={`menu-link fs-16 fw-medium ${selectedIndex === 3 ? "selected-menu" : ""
                  }`}
                icon={<TrendingUp color="secondary" fontSize="large" />}
              />
              <CustomMenuItem
                index={6}
                selectedIndex={selectedIndex}
                to="/delivery"
                onClick={setSelectedIndex}
                titleText="NC Dashboard"
                class={`menu-link fs-16 fw-medium ${selectedIndex === 4 ? "selected-menu" : ""
                  }`}
                icon={<BarChart color="secondary" fontSize="large" />}
              />

              <CustomMenuItem
                index={7}
                selectedIndex={selectedIndex}
                to="/refillsales"
                onClick={setSelectedIndex}
                titleText="Refill Sales "
                class={`menu-link fs-16 fw-medium ${selectedIndex === 6 ? "selected-menu" : ""
                  }`}
                icon={<Storefront color="secondary" fontSize="large" />}
              />
              <CustomMenuItem
                index={8}
                selectedIndex={selectedIndex}
                to="/transaction"
                onClick={setSelectedIndex}
                titleText="Transaction"
                class={`menu-link fs-16 fw-medium ${selectedIndex === 7 ? "selected-menu" : ""
                  }`}
                icon={<BrightnessPercent color="secondary" fontSize="large" />}
              />
              <CustomMenuItem
                index={9}
                selectedIndex={selectedIndex}
                to="/completefinger"
                onClick={setSelectedIndex}
                titleText="Fingerprint Pending"
                class={`menu-link fs-16 fw-medium ${selectedIndex === 8 ? "selected-menu" : ""
                  }`}
                icon={<FingerprintIcon color="secondary" fontSize="large" />}
              />
              <CustomMenuItem
                index={10}
                selectedIndex={selectedIndex}
                to="/agentlist"
                onClick={setSelectedIndex}
                titleText="User Management"
                class={`menu-link fs-16 fw-medium ${selectedIndex === 5 ? "selected-menu" : ""
                  }`}
                icon={<Settings color="secondary" fontSize="large" />}
              />
              <CustomMenuItem
                index={11}
                selectedIndex={selectedIndex}
                to="/member"
                onClick={setSelectedIndex}
                titleText="User Management"
                class={`menu-link fs-16 fw-medium ${selectedIndex === 5 ? "selected-menu" : ""
                  }`}
                icon={<AccountGroup color="secondary" fontSize="large" />}
              />

            </div>
          )}
          {getRole() === "user" && (
            <div>


              <CustomMenuItem
                index={1}
                selectedIndex={selectedIndex}
                to="/home"
                onClick={setSelectedIndex}
                titleText="Find Consumer"
                class={`menu-link fs-16 fw-medium ${selectedIndex === 8 ? "selected-menu" : ""
                  }`}
                icon={<Search color="secondary" fontSize="large" />}
              />
              <CustomMenuItem
                index={2}
                selectedIndex={selectedIndex}
                to="/agentdashboard"
                onClick={setSelectedIndex}
                titleText="Dashbaord"
                class={`menu-link fs-16 fw-medium ${selectedIndex === 8 ? "selected-menu" : ""
                  }`}
                icon={<BarChart color="secondary" fontSize="large" />}
              />
              <CustomMenuItem
                index={3}
                selectedIndex={selectedIndex}
                to="/olddatamanagement"
                onClick={setSelectedIndex}
                titleText="Old Consumer"
                class={`menu-link fs-16 fw-medium ${selectedIndex === 8 ? "selected-menu" : ""
                  }`}
                icon={<FolderSpecial color="secondary" fontSize="large" />}
              />
              <CustomMenuItem
                index={4}
                selectedIndex={selectedIndex}
                to="/connection"
                onClick={setSelectedIndex}
                titleText="Sales & Connection"
                class={`menu-link fs-16 fw-medium ${selectedIndex === 8 ? "selected-menu" : ""
                  }`}
                icon={<TrendingUp color="secondary" fontSize="large" />}
              />
              <CustomMenuItem
                index={5}
                selectedIndex={selectedIndex}
                to="/fingerprint"
                onClick={setSelectedIndex}
                titleText="Fingerprint Pending"
                class={`menu-link fs-16 fw-medium ${selectedIndex === 8 ? "selected-menu" : ""
                  }`}
                icon={<NoteAdd color="secondary" fontSize="large" />}
              />

              <CustomMenuItem
                index={6}
                selectedIndex={selectedIndex}
                to="/completefinger"
                onClick={setSelectedIndex}
                titleText="Reject & Return Doc"
                class={`menu-link fs-16 fw-medium ${selectedIndex === 8 ? "selected-menu" : ""
                  }`}
                icon={<Error color="secondary" fontSize="large" />}
              />
              <CustomMenuItem
                index={7}
                selectedIndex={selectedIndex}
                to="/profile"
                onClick={setSelectedIndex}
                titleText="Profile"
                class={`menu-link fs-16 fw-medium ${selectedIndex === 8 ? "selected-menu" : ""
                  }`}
                icon={<Face color="secondary" fontSize="large" />}
              />


            </div>
          )}


        </List>
      </div>
    </div>
  );
};

export default SideMenu;
