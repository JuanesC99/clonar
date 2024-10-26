import HeaderLayoutDefault from "./LayoutDefault";
import HeaderLayoutComing from "./LayoutComing";

const Header = ({ layout }) => {
  switch (layout) {
    case 1:
      return;

    case "coming":
      return(
        <HeaderLayoutComing />
      );

    default:
      return (
        <HeaderLayoutDefault />
      );
  }
};
export default Header;
