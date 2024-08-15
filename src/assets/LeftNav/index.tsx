import { v4 as uuidv4 } from "uuid";
import "./index.css";
import NavLinkButtons from "../NavLinkButtons";
import AppContext from "../../context/appContext";

const leftNavBtnLinks = [
  {
    id: uuidv4(),
    imageUrl:
      "https://res.cloudinary.com/dr2jqbir9/image/upload/v1723019691/home_2_cfybcc.png",
    text: "Dashboard",
    path: "/",
  },
  {
    id: uuidv4(),
    imageUrl:
      "https://res.cloudinary.com/dr2jqbir9/image/upload/v1690628482/b42tult1rl43bqjrtwr3.svg",
    text: "Transactions",
    path: "/transactions",
  },
  {
    id: uuidv4(),
    imageUrl:
      "https://res.cloudinary.com/dr2jqbir9/image/upload/v1690628694/ecfhmtfjizqnpjyxrmno.svg",
    text: "Reports",
    path: "/Reports",
  },
];

const LeftNav = () => {
  return (
    <AppContext.Consumer>
      {(value) => {
        const { showLeftNav } = value;
        const isAddClassToLeft = showLeftNav ? "left-nav-show" : "";
        return (
          <div className={`left-nav ${isAddClassToLeft}`}>
            <h1 className="left-nav-logo">
              <img
                src="https://res.cloudinary.com/dr2jqbir9/image/upload/v1723014610/Group_tzbtvp.png"
                alt="leftLogo"
              />
              Financial Portfolio
            </h1>

            <ul style={{ marginTop: "50px" }}>
              {leftNavBtnLinks.map((each) => (
                <NavLinkButtons single={each} key={each.id} />
              ))}
            </ul>
          </div>
        );
      }}
    </AppContext.Consumer>
  );
};

export default LeftNav;
