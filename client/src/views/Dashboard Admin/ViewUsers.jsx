import Usercard from "./Usercard";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../Redux/actions/actions";
import { Link } from "react-router-dom";

const ViewUsers = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  return (
    <div>
      <div className="pt-8 flex flex-col items-center justify-center bg-white w-full py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32">
        <div className="text-left mt-5 mb-5 m-4 bg-white pt-5 pb-5 border border-gray-200 rounded-lg">
          <div>
            <a className="mr-20 px-4 py-4 text-xs text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400">
              Name
            </a>
            <a className="mx-28 px-4 py-4 text-xs text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400">
              Email
            </a>

            <a className="ml-44 px-4 py-4 text-xs text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400">
              Status
            </a>
          </div>
          {user?.map((user) => (
            <Usercard
              key={user._id}
              id={user._id}
              name={user.name}
              image={user.image}
              email={user.email}
            />
          ))}
        <div className="text-center mt-6">
          <Link to="/adminDashboard">
            <div
              type="button"
              className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
            >
              Back to Dashboard
            </div>
          </Link>
        </div>
        </div>
      </div>
    </div>
  );
};

export default ViewUsers;
