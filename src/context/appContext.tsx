import { createContext } from "react";

const AppContext = createContext({
  showLeftNav: false,
  refreshFlag: false,
  setShowLeftNav: () => {},

  setRefreshFlag: () => {},
});

export default AppContext;
