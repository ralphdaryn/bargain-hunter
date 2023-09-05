import { createContext } from "react";

const SearchContext = createContext({
  query: "",
  setQuery: () => {},
});

export default SearchContext;
