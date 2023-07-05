import { useEffect, useState } from "react";
import {
  getAllUsers,
  updateUser,
} from "../../Redux/actions/actions";
import { useDispatch } from "react-redux";

const Usercard = ({ id, name, email }) => {
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    isAdmin: localStorage.getItem("isAdmin") === "true",
    isDelete: localStorage.getItem("isDelete") === "true",
  });

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("isAdmin", input.isAdmin);
    localStorage.setItem("isDelete", input.isDelete);
  }, [input.isAdmin, input.isDelete]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setInput((prevInput) => ({
      ...prevInput,
      isAdmin: name === "admin" ? value === "true" : prevInput.isAdmin,
      isDelete: name === "disable" ? value === "true" : prevInput.isDelete,
    }));

    if (name === "admin") {
      dispatch(updateUser({ isAdmin: value === "true" }, id));
      if (value === "false") {
        dispatch(updateUser({ isAdmin: false }, id));
      }
    }

    if (name === "disable") {
      dispatch(updateUser({ isDelete: value === "true" }, id));
      if (value === "false") {
        dispatch(updateUser({ isDelete: false }, id));
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(updateUser({ ...input }, id));
    setInput({
      isAdmin: false,
      isDelete: false,
    });
  };

  return (
    <tr className="flex justify-between w-full mr-20">
      <td className="mr-12 px-4 py-3 font-medium text-gray-900  dark:text-white max-w-[12rem]">
        {name}
      </td>
      <td className="mr-12 px-4 py-3 font-medium text-gray-900  dark:text-white max-w-[12rem]">
        {email}
      </td>
      <td className="px-4 py-3 flex justify-end items-start space-x-2">
        <form onSubmit={handleSubmit}>
          <label
            htmlFor="admin"
            className="block text-sm font-medium text-gray-700 mb-1 mx-4"
          >
            Admin
          </label>
          <select
            id="admin"
            name="admin"
            className="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={input.isAdmin}
            onChange={handleChange}
          >
            <option value={true}>Sí</option>
            <option value="false">No</option>
          </select>
        </form>

        <form onSubmit={handleSubmit}>
          <label
            htmlFor="disable"
            className="block text-sm font-medium text-gray-700 mb-1 mx-4"
          >
            Disable
          </label>
          <select
            id="disable"
            name="disable"
            className="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={input.isDelete}
            onChange={handleChange}
          >
            <option value={true}>Sí</option>
            <option value={false}>No</option>
          </select>
        </form>
      </td>
    </tr>
  );
};

export default Usercard;
