import Cards from "../../components/Card/Cards";
import Pagination from "../../components/Pagination/Pagination";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterByCategory,
  filterByPrice,
  filterByName,
  getCategory,
  getProducts,
} from "../../Redux/actions/actions.js";
import SearchBar from "./SearchBar";
import "./Products.css";

const Products = () => {
  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.products);
  const category = useSelector((state) => state.category);

  const [productPerPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCategory());
    dispatch(filterByCategory());
  }, [dispatch]);

  const indexOfLastProduct = currentPage * productPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productPerPage;
  const productsToDisplay = allProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

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

  function handleFilterCategory(event) {
    event.preventDefault();
    dispatch(filterByCategory(event.target.value));
    setCurrentPage(1);
  }

  function handleClick(event) {
    event.preventDefault();
    setCurrentPage(1);
    dispatch(getProducts());
    window.location.reload();
  }

  return (
    <div className="all">
      {productsToDisplay.length === 0 ? (
        <div></div>
      ) : (
        <div className="flex flex-wrap justify-center pt-2">
          <SearchBar />
          <button
            className="text-gray-900 cursor-pointer select-none bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 mt-2 mr-4 ml-2"
            onClick={(event) => handleClick(event)}
          >
            Reload filter
          </button>

          <div className="flex flex-wrap cursor-pointer select-none justify-center h-16 items-center">
            <div className="grid text-gray-900 cursor-pointer select-none bg-white border border-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-1 py-0 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700 grid-cols-3">
              <select
                className="ordAndFil1"
                onChange={(event) => handleOrderName(event)}
              >
                <option>Name</option>
                <option value="asc">A - Z</option>
                <option value="desc">Z - A</option>
              </select>
              <select
                className="ordAndFil2"
                onChange={(event) => handleOrderPrice(event)}
              >
                <option>Price</option>
                <option value="high">Low to high</option>
                <option value="low">High to low</option>
              </select>
              <select
                className="ordAndFil3"
                onChange={(event) => handleFilterCategory(event)}
                defaultValue={"default"}
              >
                <option value="default" disabled>
                  Category
                </option>
                {category?.map((el) => (
                  <option key={el._id} value={el.name}>
                    {el.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex flex-wrap cursor-pointer select-none justify-center h-16 items-center"></div>
        </div>
      )}
      <div className="cards pt-2 select-none">
        {productsToDisplay.length > 0 ? (
          productsToDisplay.map((product) => (
            <div key={product._id} className="flex justify-center">
              <Cards
                _id={product._id}
                name={product.name}
                price={product.price}
                image={product.image}
                category={product.category.map((el) => el.name)}
              />
            </div>
          ))
        ) : (
          <div
            className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status"
          >
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Loading...
            </span>
          </div>
        )}
      </div>
      <br />
      {productsToDisplay.length === 0 ? (
        <div></div>
      ) : (
        <div className="flex justify-center">
          <Pagination
            productPerPage={productPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalProducts={allProducts.length}
          />
        </div>
      )}
    </div>
  );
};

export default Products;
