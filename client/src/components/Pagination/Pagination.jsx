import PropTypes from "prop-types";

const Pagination = ({
  productPerPage,
  currentPage,
  setCurrentPage,
  totalProducts,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalProducts / productPerPage); i++) {
    pageNumbers.push(i);
  }

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const onPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  const onNextPage = () => {
    const totalPages = Math.ceil(totalProducts / productPerPage);
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <div>
      <nav className="mb-4">
        <ul className="list-style-none flex">
          <li>
            <button
              className={`relative block rounded bg-transparent px-3 py-1.5 text-base ${
                currentPage === 1
                  ? "text-neutral-500 dark:text-neutral-400 opacity-50 cursor-not-allowed"
                  : "text-neutral-600 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
              }`}
              onClick={onPreviousPage}
              disabled={currentPage === 1}
            >
              Previous
            </button>
          </li>
          {pageNumbers.map((noPage) => (
            <li key={noPage}>
              <button
                className={`relative block rounded bg-transparent px-3 py-1.5 text-base ${
                  currentPage === noPage
                    ? "bg-neutral-800 text-neutral-50"
                    : "text-neutral-600 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
                }`}
                onClick={() => handlePageClick(noPage)}
              >
                {noPage}
              </button>
            </li>
          ))}
          <li>
            <button
              className={`relative block rounded bg-transparent px-3 py-1.5 text-base ${
                currentPage === Math.ceil(totalProducts / productPerPage)
                  ? "text-neutral-600 dark:text-white opacity-50 cursor-not-allowed"
                  : "text-neutral-600 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
              }`}
              onClick={onNextPage}
              disabled={
                currentPage === Math.ceil(totalProducts / productPerPage)
              }
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

Pagination.propTypes = {
  productPerPage: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
  totalProducts: PropTypes.number.isRequired,
};

export default Pagination;
