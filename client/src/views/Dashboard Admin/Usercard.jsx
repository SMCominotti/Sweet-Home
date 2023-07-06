import { useEffect, useState } from "react";
import { getAllUsers, updateUser } from "../../Redux/actions/actions";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

const Usercard = ({ id, name, email }) => {
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    isAdmin: localStorage.getItem(`isAdmin_${id}`) === "true",
    isDelete: localStorage.getItem(`isDelete_${id}`) === "true",
  });

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem(`isAdmin_${id}`, input.isAdmin);
    localStorage.setItem(`isDelete_${id}`, input.isDelete);
  }, [input.isAdmin, input.isDelete, id]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setInput((prevInput) => ({
      ...prevInput,
      [name]: value === "true",
    }));

    if (name === "isAdmin") {
      dispatch(updateUser({ isAdmin: value === "true" }, id));
      toast.success("User updated successfully")
    }

    if (name === "isDelete") {
      dispatch(updateUser({ isDelete: value === "true" }, id));
      toast.success("User updated successfully")
    }
  };

  const handleSubmit = (event) => {
    event.prevendivefault();
    dispatch(updateUser({ ...input }, id));
    setInput({
      isAdmin: false,
      isDelete: false,
    });
  };

  return (
    <div className="flex justify-between w-full mr-20">
      <div className="mr-12 px-4 py-3 font-medium text-gray-900  dark:text-white max-w-[12rem]">
        {name}
      </div>
      <div className="mr-12 px-4 py-3 font-medium text-gray-900  dark:text-white max-w-[12rem]">
        {email}
      </div>
      <div className="px-4 py-3 flex justify-end items-start space-x-2">
        <form onSubmit={handleSubmit}>
          <label
            htmlFor={`admin_${id}`}
            className="block text-sm font-medium text-gray-700 mb-1 mx-4"
          >
            Admin
          </label>
          <select
            id={`admin_${id}`}
            name="isAdmin"
            className="text-white bg-black font-medium rounded-lg text-sm px-3 py-1.5 cursor-pointer select-none text-center m-1"
            value={input.isAdmin}
            onChange={handleChange}
          >
            <option value={true}>Sí</option>
            <option value={false}>No</option>
          </select>
        </form>

        <form onSubmit={handleSubmit}>
          <label
            htmlFor={`disable_${id}`}
            className="block text-sm font-medium text-gray-700 mb-1 mx-4"
          >
            Disable
          </label>
          <select
            id={`disable_${id}`}
            name="isDelete"
            className="text-white bg-black font-medium rounded-lg text-sm px-3 py-1.5 cursor-pointer select-none text-center m-1"
            value={input.isDelete}
            onChange={handleChange}
          >
            <option value={true}>Sí</option>
            <option value={false}>No</option>
          </select>
        </form>
      </div>
    </div>
  );
};

Usercard.propTypes = {
  id: PropTypes.any.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

export default Usercard;
