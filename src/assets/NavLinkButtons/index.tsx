import "./index.css";
import { Link } from "react-router-dom";

type navBtnType = {
  id: string;
  imageUrl: string;
  text: string;
  path: string;
};

type navProps = {
  single: navBtnType;
};

const NavLinkButtons = (props: navProps) => {
  const { single } = props;
  const { imageUrl, text, path } = single;
  return (
    <li style={{ listStyle: "none", marginTop: "20px" }}>
      <Link to={path} className="left-navlinks">
        <img src={imageUrl} alt={text} />
        {text}
      </Link>
    </li>
  );
};

export default NavLinkButtons;
