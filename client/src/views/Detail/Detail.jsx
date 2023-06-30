import { useParams } from "react-router-dom";
import { FaStarHalfAlt, FaStar, FaRegStar } from "react-icons/fa";
import { getProductDetail, addtoCart, postShoppingCart, getUserByUid } from "../../Redux/actions/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/authContex";
import { detailAVG } from "../../utils/rating-detail";
import placeHolder from "../../assets/image/person-placeholder-400x400.png";

const Detail = () => {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.details);
  const { id } = useParams();
  const ratingAVG = detailAVG(product);

  const renderRatingStars = (rating) => {
    const maxRating = 5;
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = maxRating - fullStars - (hasHalfStar ? 1 : 0);
    const stars = [];
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} />);
    }
    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" />);
    }
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} />);
    }
    return stars;
  };

  useEffect(() => {
    dispatch(getProductDetail(id));
  }, [dispatch, id]);

  const handleShoppingCart = () => {
    dispatch(addtoCart(product));
  };

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (userId) {
      const updatedCart = {
        user: userId,
        products: [
          {
            product: id,
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
            product: id,
            quantity: 1,
          },
        ],
      };
      dispatch(postShoppingCart(newCart));
    }
  };

  function handleClick(event) {
    handleSubmit(event);
    handleShoppingCart();
  }

  const [selectedSection, setSelectedSection] = useState("description");

  const handleSection = (section) => {
    setSelectedSection(section);
  };
  return (
    <section className="py-4 sm:py-4">
      <div className="container mx-auto px-4">
        <nav className="flex">
          <ol role="list" className="flex items-center">
            <li className="text-left">
              <div className="-m-1">
                <a
                  href="/"
                  className="rounded-md p-1 text-sm font-medium text-gray-600 focus:text-gray-900 focus:shadow hover:text-gray-800"
                >
                  {" "}
                  Home{" "}
                </a>
              </div>
            </li>

            <li className="text-left">
              <div className="flex items-center">
                <span className="mx-2 text-gray-400">/</span>
                <div className="-m-1">
                  <a
                    href="/products"
                    className="rounded-md p-1 text-sm font-medium text-gray-600 focus:text-gray-900 focus:shadow hover:text-gray-800"
                  >
                    {" "}
                    Products{" "}
                  </a>
                </div>
              </div>
            </li>

            <li className="text-left">
              <div className="flex items-center">
                <span className="mx-2 text-gray-400">/</span>
                <div className="-m-1">
                  <a
                    href="/products"
                    className="rounded-md p-1 text-sm font-medium text-gray-600 focus:text-gray-900 focus:shadow hover:text-gray-800"
                    aria-current="page"
                  >
                    {product.category?.map((el) => el.name)}{" "}
                  </a>
                </div>
              </div>
            </li>
          </ol>
        </nav>

        <div className="lg:col-gap-12 xl:col-gap-16 mt-8 grid grid-cols-1 gap-12 lg:mt-12 lg:grid-cols-5 lg:gap-16">
          <div className="lg:col-span-3 lg:row-end-1">
            <div className="lg:flex lg:items-start">
              <div className="lg:order-2 lg:ml-5">
                <div className="max-w-xl overflow-hidden rounded-lg">
                  <img
                    className="h-full w-full max-w-full object-cover"
                    src={product.image}
                    alt={product.name}
                  />
                </div>
              </div>

              <div className="mt-2 w-full lg:order-1 lg:w-32 lg:flex-shrink-0"></div>
            </div>
          </div>

          <div className="lg:col-span-2 lg:row-span-2 lg:row-end-2">
            <h1 className="sm: text-2xl font-bold text-gray-900 sm:text-3xl">
              {product.name}
            </h1>

            <div className="mt-5 flex items-center">
              <div className="flex items-center mt-2">
                <div className="rating-stars flex mr-3">
                  {renderRatingStars(ratingAVG)}
                </div>
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-auto ">
                  {ratingAVG.toFixed(1)}
                </span>
              </div>
              <p className=" mt-2 ml-2 text-sm font-medium text-gray-500">
                {product.review?.length || 0} Reviews
              </p>
            </div>
            <h2 className="mt-8 text-base text-gray-900">
              Extension your warranty
            </h2>
            <div className="mt-3 flex select-none flex-wrap items-center gap-1">
              <label className="">
                <input
                  type="radio"
                  name="subscription"
                  value="4 Months"
                  className="peer sr-only"
                />
                <p className="peer-checked:bg-black peer-checked:text-white rounded-lg border border-black px-6 py-2 font-bold">
                  4 Months
                </p>
                <span className="mt-1 block text-center text-xs">$80/mo</span>
              </label>
              <label className="">
                <input
                  type="radio"
                  name="subscription"
                  value="8 Months"
                  className="peer sr-only"
                  defaultChecked
                />
                <p className="peer-checked:bg-black peer-checked:text-white rounded-lg border border-black px-6 py-2 font-bold">
                  8 Months
                </p>
                <span className="mt-1 block text-center text-xs">
                  ${product.price}
                </span>
              </label>
              <label className="">
                <input
                  type="radio"
                  name="subscription"
                  value="12 Months"
                  className="peer sr-only"
                />
                <p className="peer-checked:bg-black peer-checked:text-white rounded-lg border border-black px-6 py-2 font-bold">
                  12 Months
                </p>
                <span className="mt-1 block text-center text-xs">$40/mo</span>
              </label>
            </div>

            <div className="mt-10 flex flex-col items-center justify-between space-y-4 border-t border-b py-4 sm:flex-row sm:space-y-0">
              <div className="flex items-end">
                <h1 className="text-3xl font-bold">${product.price}</h1>
              </div>

              <button
                onClick={handleClick}
                type="button"
                className="inline-flex items-center justify-center rounded-md border-2 border-transparent bg-gray-900 bg-none px-12 py-3 text-center text-base font-bold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="shrink-0 mr-3 h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                Add to cart
              </button>
            </div>

            <ul className="mt-8 space-y-2">
              <li className="flex items-center text-left text-sm font-medium text-gray-600">
                <svg
                  className="mr-2 block h-5 w-5 align-middle text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    className=""
                  ></path>
                </svg>
                Free shipping worldwide
              </li>

              <li className="flex items-center text-left text-sm font-medium text-gray-600">
                <svg
                  className="mr-2 block h-5 w-5 align-middle text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                    className=""
                  ></path>
                </svg>
                Cancel Anytime
              </li>
            </ul>
          </div>
          <div className="lg:col-span-3">
            <div className="border-b border-gray-300">
              <nav className="flex gap-4">
                <a
                  title=""
                  className={`cursor-pointer py-4 text-sm font-medium text-gray-900 hover:text-gray-800 ${
                    selectedSection === "description"
                      ? "border-b-2 border-gray-900"
                      : ""
                  }`}
                  onClick={() => handleSection("description")}
                >
                  Description
                </a>

                <a
                  title=""
                  className={`inline-flex cursor-pointer items-center py-4 text-sm font-medium text-gray-600 ${
                    selectedSection === "reviews"
                      ? "border-b-2 border-gray-900"
                      : ""
                  }`}
                  onClick={() => handleSection("reviews")}
                >
                  Reviews
                  <span className="ml-2 block rounded-full bg-gray-500 px-2 py-px text-xs font-bold text-gray-100">
                    {product.review?.length || 0} Reviews
                  </span>
                </a>
              </nav>
            </div>

            <div className="mt-8 flow-root sm:mt-12">
              {selectedSection === "description" ? (
                <>
                  <h1 className="text-3xl font-bold">Product Description</h1>
                  <p className="mt-4">{product.description}.</p>
                </>
              ) : (
                <>
                  <h1 className="text-2xl font-semibold">Reviews</h1>
                  {product?.review?.length === 0 ? ( <p className="text-gray-400 flex items-center justify-center">
                No reviews available for this product.
              </p>
            ) :  product?.review?.map((review) => (
                    <div
                      className="py-8 text-left border px-4 m-2"
                      key={review._id}
                    >
                      <figure className="max-w-screen-md">
                        <div className="mb-3 flex items-center">
                          <div className="text-yellow-300 text-m flex mr-3">
                            {renderRatingStars(review.rating)}
                          </div>
                          <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">
                            {review.rating}
                          </span>
                        </div>

                        <blockquote>
                          <p className="text-l font-normal text-gray-900 dark:text-white">
                            {review.reviewText}
                          </p>
                        </blockquote>
                        <figcaption className="flex items-center mt-6 space-x-3">
                          <img
                            className="w-6 h-6 rounded-full"
                            src={review.createdBy.photoURL || placeHolder}
                            alt={review.createdBy.name}
                          />
                          <div className="flex items-center divide-x-2 divide-gray-300 dark:divide-gray-700">
                            <cite className="pr-3 font-medium text-gray-900 dark:text-white">
                              {review.createdBy.name}
                            </cite>
                            <cite className="pl-3 text-sm text-gray-500 dark:text-gray-400">
                              {new Date(review.createdAt).toLocaleDateString(
                                "en-US",
                                {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                }
                              )}
                            </cite>
                          </div>
                        </figcaption>
                      </figure>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
        <div className="text-center mt-6"></div>
      </div>
    </section>
  );
};

export default Detail;
