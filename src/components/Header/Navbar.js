import React from "react";
import "./Navbar.css";
import Icon from "@mdi/react";
import { mdiSearchWeb,mdiAccount,mdiSegment } from "@mdi/js";

export default function Navbar() {
  return (
    <header>
      <nav className="navbar">
        <ul className="navigation item-1">
          <li className="elem-1 "></li>
          <li className="elem-2">ORION</li>
          <li className="elem-3">
            <div className="navigation item-2">
              <input type="text" className="inp" />
              <i className="navbtn">
                <Icon path={mdiSearchWeb} size={0.8} />
              </i>
            </div>
          </li>
          <li className="elem-4">Statistics</li>
          <li className="elem-5">Overview</li>
          <li className="elem-6">Dashboard</li>
          <li className="elem-7">Analytics</li>

          <li className="elem-8"><Icon path={mdiAccount} size={1} /></li>

          <li className="elem-9"><Icon path={mdiSegment} size={1} /></li>
        </ul>
      </nav>
    </header>
  );
}
