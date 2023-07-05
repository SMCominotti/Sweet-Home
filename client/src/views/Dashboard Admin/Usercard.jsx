import { useEffect, useState } from "react";
import {
  getAllUsers,
  updateUser,
} from "../../Redux/actions/actions";
import { useDispatch } from "react-redux";

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
  }

  if (name === "isDelete") {
    dispatch(updateUser({ isDelete: value === "true" }, id));
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
            htmlFor={`admin_${id}`}
            className="block text-sm font-medium text-gray-700 mb-1 mx-4"
          >
            Admin
          </label>
          <select
            id={`admin_${id}`}
            name="isAdmin"
            className="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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