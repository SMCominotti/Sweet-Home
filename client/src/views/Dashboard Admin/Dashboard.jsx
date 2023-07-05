import AdminCard from "./AdminCard";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProducts,
  getCategory,
  filterByCategory,
  filterByPrice,
  filterByName,
} from "../../Redux/actions/actions";
import { Link } from "react-router-dom";
import SearchBar from "../ShopNow/SearchBar";
import Pagination from "../../components/Pagination/Pagination";
import Chart from "./Chart";

const Dashboard = () => {
  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.products);
  const category = useSelector((state) => state.category);

  const [productPerPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastProduct = currentPage * productPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productPerPage;
  const productsToDisplay = allProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCategory());
    dispatch(filterByCategory());
    dispatch(filterByName());
    dispatch(filterByPrice());
    if (category?.length !== 0) {
      window.location.reload();
      dispatch(getCategory());
    }
  }, [dispatch]);

  function handleOrderName(event) {
    event.preventDefault();
    dispatch(filterByName(event.target.value));
    setCurrentPage(1);
  }

  function handleOrderPrice(event) {
    event.preventDefault();
    dispatch(filterByPrice(event.target.value));
    setCurrentPage(1);
  }

  return (
    <div className="">
      <div>
        <Chart />
      </div>
      <section className="bg-gray-50 dark:bg-gray-900 p-3 antialiased ">
        <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
          <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
              <div className="w-full md:w-1/2">
                <form className="flex items-center">
                  <SearchBar />
                  <div className="relative w-full">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <svg
                        aria-hidden="true"
                        className="w-5 h-5 text-gray-500 dark:text-gray-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      ></svg>
                    </div>
                  </div>
                </form>
              </div>
              <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                <Link to={"/createProduct"}>
                  <button
                    type="button"
                    className="flex items-center justify-center text-white bg-black hover:bg-green-700 font-medium rounded-lg text-sm px-3 py-1.5 cursor-pointer select-none text-center m-1"
                  >
                    <svg
                      className="h-3.5 w-3.5 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        clipRule="evenodd"
                        fillRule="evenodd"
                        d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                      />
                    </svg>
                    Add product
                  </button>
                </Link>
                <div className="flex items-center space-x-3 w-full md:w-auto">
                  <button
                    id="filterDropdownButton"
                    data-dropdown-toggle="filterDropdown"
                    className="w-full md:w-auto flex items-center justify-center text-white bg-black hover:bg-grey-700 font-medium rounded-lg text-sm px-3 py-1.5 cursor-pointer select-none text-center m-1"
                    type="button"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                      className="h-4 w-4 mr-2 text-gray-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Filter
                    <svg
                      className="-mr-1 ml-1.5 w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        clipRule="evenodd"
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      />
                    </svg>
                  </button>
                  <Link to="/adminDashboard/users">
                    <button className="text-white bg-black hover:bg-blue-700 font-medium rounded-lg text-sm px-3 py-1.5 cursor-pointer select-none text-center m-1">
                      View Users
                    </button>
                  </Link>
                  <div
                    id="filterDropdown"
                    className="z-10 hidden w-56 p-3 bg-white rounded-lg shadow dark:bg-gray-700"
                  >
                    <select
                      className="ordAndFil1 w-full text-white bg-black hover:bg-grey-700 font-medium rounded-lg text-sm px-3 py-1.5 cursor-pointer select-none text-center m-1"
                      onChange={(event) => handleOrderName(event)}
                    >
                      <option>Order by Name</option>
                      <option value="asc">A - Z</option>
                      <option value="desc">Z - A</option>
                    </select>
                    <select
                      className="ordAndFil2  w-full text-white bg-black hover:bg-grey-700 font-medium rounded-lg text-sm px-3 py-1.5 cursor-pointer select-none text-center m-1"
                      onChange={(event) => handleOrderPrice(event)}
                    >
                      <option>Price</option>
                      <option value="high">Low to high</option>
                      <option value="low">High to low</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <a className="mr-20 px-4 py-4 text-xs text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400">
                Product name
              </a>
              <a className="mx-28 px-4 py-4 text-xs text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400">
                Category
              </a>
              <a className="px-4 py-4 text-xs text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400">
                Description
              </a>
              <a className="ml-44 px-4 py-4 text-xs text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400">
                Price
              </a>
            </div>
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 table">
              <thead></thead>
              <tbody>
                {productsToDisplay.map((product) => (
                  <AdminCard
                    key={product._id}
                    id={product._id}
                    name={product.name}
                    price={product.price}
                    description={product.description}
                    image={product.image}
                    category={product.category.map((el) => el.name)}
                  />
                ))}
              </tbody>
            </table>
            <nav
              className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4"
              aria-label="Table navigation"
            >
              <Pagination
                productPerPage={productPerPage}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalProducts={allProducts.length}
              />
            </nav>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
