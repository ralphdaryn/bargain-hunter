import { useState } from "react";
import SearchContext from "../../components/SearchContext/SearchContext";

const SearchProvider = ({ children }) => {
  const [query, setQuery] = useState("");

  return (
    <SearchContext.Provider value={{ query, setQuery }}>
      {children}
    </SearchContext.Provider>
  );
};

export default SearchProvider;