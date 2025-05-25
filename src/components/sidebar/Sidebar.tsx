import { Link, useLocation } from "wouter";
import { Button } from "@mui/material";
import "./styles.scss";

export const Sidebar = () => {
  const [currentPath] = useLocation();

  return (
    <nav className="sidebar">
      <ul className="sidebar__list">
        <li className={"sidebar__list-item"}>
          <Link to="/give-consent">
            <Button
              variant="outlined"
              sx={{
                backgroundColor:
                  currentPath === "/give-consent" ? "#dfe8fa" : undefined,
              }}
            >
              Give consent
            </Button>
          </Link>
        </li>
        <li className={"sidebar__list-item"}>
          <Link to="/consents">
            <Button
              variant="outlined"
              sx={{
                backgroundColor:
                  currentPath === "/consents" ? "#dfe8fa" : undefined,
              }}
            >
              Collected consents
            </Button>
          </Link>
        </li>
      </ul>
    </nav>
  );
};
