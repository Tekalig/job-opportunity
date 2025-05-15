import { Search, Plus } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import AuthStore from "../actions";
function SearchJob() {
  const [searchParams, setSearchParams] = useState({
    query: "",
    type: "All",
    level: "All",
  });
  const { isEmployer } = AuthStore();
  const onChange = (e) => {
    const { name, value } = e.target;
    setSearchParams((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="grid gap-6 rounded-xl dark:bg-gray-800 py-6 text-gray-200 px-4 shadow-lg">
      <form action="">
        <div className="flex justify-between items-center gap-3 bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 shadow-md p-4 rounded-md">
          <div className="flex gap-2 items-center w-full">
            <Search className="cursor-pointer text-[25px] text-gray-700 dark:text-gray-200" />
            <input
              type="text"
              name="query"
              value={searchParams.query}
              onChange={onChange}
              className="bg-transparent w-full focus:outline-none text-gray-800 dark:text-gray-200 placeholder-gray-500"
              placeholder="Search here..."
            />
          </div>
          <button
            className="px-8 rounded-lg bg-blue-600 hover:bg-blue-500 transition-colors h-full py-2 text-white font-semibold"
            onClick={handleSubmit}
          >
            Search
          </button>
        </div>
      </form>

      <div className="flex gap-8 justify-center items-center text-gray-800 dark:text-gray-200">
        <div className="flex gap-2 items-center">
          <label className="font-medium" htmlFor="type">
            Type:
          </label>
          <select
            name="type"
            id="type"
            value={searchParams.type}
            onChange={onChange}
            className="dark:bg-gray-700 dark:text-gray-200 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500"
          >
            <option>All</option>
            <option>internship</option>
            <option>fulltime</option>
            <option>contract</option>
            <option>parttime</option>
          </select>
        </div>
        <div className="flex gap-2 items-center">
          <label className="font-medium" htmlFor="level">
            Level:
          </label>
          <select
            name="level"
            value={searchParams.level}
            onChange={onChange}
            id="level"
            className="dark:bg-gray-700 dark:text-gray-200 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500"
          >
            <option>All</option>
            <option>Entry</option>
            <option>intermediate</option>
            <option>Senior</option>
          </select>
        </div>
      </div>
      {isEmployer && (
        <Link className="flex justify-center mt-6" to={"/postJob"}>
          <span className="text-md font-bold p-2 underline text-blue-400 hover:text-blue-300">
            Post a New Job
          </span>
          <button className="p-2 mx-4 rounded-lg bg-green-600 text-gray-200 hover:bg-green-500 transition-colors">
            <Plus />
          </button>
        </Link>
      )}
    </div>
  );
}

export default SearchJob;
