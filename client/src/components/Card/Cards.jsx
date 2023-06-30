import { addtoCart, getUserByUid, postShoppingCart } from "../../Redux/actions/actions.js";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useAuth } from "../../context/authContex.jsx";

const Cards = ({ _id, name, image, price, category }) => {
  const dispatch = useDispatch();
  const [, setInCart] = useState(false);

  const allShoppingCart = useSelector((state) => state.shoppingCart);
  const isProductInCart = allShoppingCart.some((product) => product.id === _id);

  useEffect(() => {
    setInCart(isProductInCart);
  }, [isProductInCart]);

  const { user } = useAuth();
  const [userId, setUserId] = useState(null);
  useEffect(() => {
    if (user) {
      dispatch(getUserByUid(user.uid));
    }
  }, [dispatch, user]);

  const userUid = user?.uid || null;

  useEffect(() => {
    if (userUid) {
      setUserId(userUid);
    }
  }, [userUid]);

const handleSubmit = () => {
    setInCart(true);
    dispatch(addtoCart({ _id, name, image, price }));
    if (userId) {
      const updatedCart = {
        user: userId,
        products: [
          {
            product: _id,
            quantity: 1,
          },
        ],
      };
      dispatch(postShoppingCart(updatedCart));
    } else {
      const newCart = {
        user: user.uid,
        products: [
          {
            product: _id,
            quantity: 1,
          },
        ],
      };
      dispatch(postShoppingCart(newCart));
    }
  }

  return (
    <div>
      <div className="max-w-md p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="aspect-w-3 aspect-h-4 mb-4">
          <Link to={`/products/${_id}`}>
            <div className="bg-gray-200 rounded-lg overflow-hidden">
              <img
                src={image}
                alt={name}
                className="object-cover object-center w-full h-full"
                style={{ aspectRatio: "1/1" }}
              />
            </div>
          </Link>
        </div>
        <div className="flex flex-col justify-between h-full">
          <div>
            <Link to={`/products/${_id}`}>
              <h5 className="text-2xl font-semibold text-gray-900 dark:text-white">
                {name}
              </h5>
            </Link>
            <p className="text-gray-500 dark:text-gray-400">{category}</p>
          </div>
          <div className="flex items-center justify-between mt-4">
            <span className="text-3xl font-bold text-gray-900 dark:text-white">
              ${price}
            </span>
            <button
              onClick={handleSubmit}
              href="#"
              className="text-white bg-black hover:bg-neutral-800 font-medium rounded-lg text-sm px-5 py-2.5 cursor-pointer select-none text-center"
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

Cards.propTypes = {
  _id: PropTypes.any.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  category: PropTypes.array.isRequired,
};

export default Cards;
