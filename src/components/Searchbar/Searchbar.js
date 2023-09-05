import { useState, useContext } from "react";
import SearchContext from "../../components/SearchContext/SearchContext";
import { FaSearch } from "react-icons/fa";
import "./Searchbar.scss";

const SearchBar = () => {
  const [localQuery, setLocalQuery] = useState("");
  const { setQuery } = useContext(SearchContext); 

  const handleSearch = (event) => {
    event.preventDefault();
    setQuery(localQuery); 
  };

  return (
    <form className="search-bar" onSubmit={handleSearch}>
      <input
        type="text"
        value={localQuery}
        onChange={(e) => setLocalQuery(e.target.value)}
        placeholder="Search for deals..."
      />
      <button type="submit">
        <FaSearch />
      </button>
    </form>
  );
};

export default SearchBar;
