import { useEffect } from "react";
import {
  deleteProduct,
  getCategory,
  getProducts,
} from "../../Redux/actions/actions";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

const AdminCard = ({ id, name, price, description, image, category }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCategory());
  }, [dispatch]);

  function handleDelete(event) {
    event.preventDefault();
    dispatch(deleteProduct(event.target.value))
      .then(() => {
        toast.success("Deleted successfully");
        
      })
      .catch((error) => {
        toast.error("Error deleting product");
      });
  }

  return (
    <tr className="flex justify-between w-full mr-20">
      <td className="mr-12 px-4 py-3 font-medium text-gray-900  dark:text-white max-w-[12rem]">
        {name}
      </td>
      <td className="px-4 py-3 max-w-[5rem]">{category}</td>
      <td className="px-4 py-3 max-w-[12rem] truncate items-start">{description}</td>
      <td className="px-4 py-3 t">{price}</td>
      <td className="px-4 py-3 flex justify-end items-start space-x-2">
        <Link to={`/editProduct/${id}`}>
          <button className="text-white bg-black hover:bg-blue-700 font-medium rounded-lg text-sm px-3 py-1.5 cursor-pointer select-none text-center m-1">
            Edit
          </button>
        </Link>
        <button
          className="text-white bg-black hover:bg-danger-700 font-medium rounded-lg text-sm px-3 py-1.5 cursor-pointer select-none text-center m-1"
          value={id}
          onClick={(event) => handleDelete(event)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

AdminCard.propTypes = {
  id: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  category: PropTypes.array.isRequired,
};

export default AdminCard;
