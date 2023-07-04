import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import countries from "world-countries";
import ReactCountryFlag from "react-country-flag";
import Select from "react-select";
import { AiOutlineUser } from "react-icons/ai";
import { BsTelephone, BsHouse } from "react-icons/bs";
import { useAuth } from "../../context/authContex";
import { useNavigate } from "react-router-dom";
import { removefromCart, addtoCart, removeOneFromCart, postOrder, getUserByUid, removeAllFromCart } from "../../Redux/actions/actions";
import { getTotalPrice, calculateTotal } from "../../utils/totalprice";
import fedexLogo from "../../assets/image/Fedex-logo.jpeg";
import dhlLogo from "../../assets/image/DHL-Logo.png";
//import emailjs from "emailjs-com";

import "./ShoppingCart.css";

const Shopping = () => {
  const allShoppingCart = useSelector((state) =>
    state.shoppingCart && state.shoppingCart.length > 0
      ? state.shoppingCart.sort((a, b) => a.name.localeCompare(b.name))
      : []
  );
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({
    name: "",
    lastName: "",
    email: "",
    street: "",
    zip: "",
    city: "",
    state: "",
    phone: "",
  });
  const { user } = useAuth();
  const [userId, setUserId] = useState(null);

  const subTotal = allShoppingCart ? getTotalPrice(allShoppingCart) : 0;
  const shippingRate = 0;
  const total = calculateTotal(shippingRate, subTotal);
  const formattedTotal = total.toFixed(2);

  const [input, setInput] = useState({
    name: "",
    lastName: "",
    email: "",
    street: "",
    zip: "",
    city: "",
    state: "",
    phone: "",
  });

  const handleChange = (event) => {
    const property = event.target.name;
    const value = event.target.value;
    setInput({ ...input, [property]: value });

    if (property === "name") nameValidate({ ...input, [property]: value });
    else if (property === "lastName") {
      lastNameValidate({ ...input, [property]: value });
    } else if (property === "email") {
      emailValidate({ ...input, [property]: value });
    } else if (property === "street") {
      streetValidate({ ...input, [property]: value });
    } else if (property === "zip") {
      zipValidate({ ...input, [property]: value });
    } else if (property === "city") {
      cityValidate({ ...input, [property]: value });
    } else if (property === "state") {
      stateValidate({ ...input, [property]: value });
    } else if (property === "phone") {
      phoneValidate({ ...input, [property]: value });
    }
  };

  const nameValidate = (input) => {
    if (!input.name) {
      setErrors({ ...errors, name: "*First name is required." });
    } else if (!/^[a-zA-Z]+$/.test(input.name)) {
      setErrors({
        ...errors,
        name: "*No numbers or special characters are allowed in this field.",
      });
    } else {
      setErrors({ ...errors, name: "" });
    }
  };

  const lastNameValidate = (input) => {
    if (!input.lastName) {
      setErrors({ ...errors, lastName: "*Last name is required." });
    } else if (!/^[a-zA-Z]+$/.test(input.lastName)) {
      setErrors({
        ...errors,
        lastName:
          "*No numbers or special characters are allowed in this field.",
      });
    } else {
      setErrors({ ...errors, lastName: "" });
    }
  };

  const emailValidate = (input) => {
    if (!input.email) {
      setErrors({ ...errors, email: "*Email is required." });
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(input.email)
    ) {
      setErrors({ ...errors, email: "*Enter a valid email." });
    } else {
      setErrors({ ...errors, email: "" });
    }
  };

  const streetValidate = (input) => {
    if (!input.street) {
      setErrors({ ...errors, street: "*Address is required." });
    } else {
      setErrors({ ...errors, street: "" });
    }
  };

  const zipValidate = (input) => {
    if (!input.zip) {
      setErrors({ ...errors, zip: "*ZIP code is required." });
    } else if (!/^[0-9]+$/.test(input.zip)) {
      setErrors({ ...errors, zip: "*Only numbers allowed." });
    } else {
      setErrors({ ...errors, zip: "" });
    }
  };

  const phoneValidate = (input) => {
    if (!input.phone) {
      setErrors({ ...errors, phone: "*Phone is required." });
    } else if (!/^[0-9]+$/.test(input.phone)) {
      setErrors({ ...errors, phone: "*Only numbers allowed." });
    } else {
      setErrors({ ...errors, phone: "" });
    }
  };

  const cityValidate = (input) => {
    if (!input.city) {
      setErrors({ ...errors, city: "*City is required." });
    } else if (!/^[a-zA-Z]+$/.test(input.city)) {
      setErrors({
        ...errors,
        city: "*No numbers or special characters are allowed in this field.",
      });
    } else {
      setErrors({ ...errors, city: "" });
    }
  };

  const stateValidate = (input) => {
    if (!input.state) {
      setErrors({ ...errors, state: "*State is required." });
    } else if (!/^[a-zA-Z]+$/.test(input.state)) {
      setErrors({
        ...errors,
        state: "*No numbers or special characters are allowed in this field.",
      });
    } else {
      setErrors({ ...errors, state: "" });
    }
  };

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

  const [selectedMethod, setSelectedMethod] = useState("method1");
  const handleMethodSelection = (method) => {
    setSelectedMethod(method);
  };

  const handleDeleteFromCart = (productId) => {
    dispatch(removefromCart(productId));
  };

  const handleAddToCart = (product) => {
    dispatch(addtoCart(product));
  };

  const handleReduceFromCart = (product) => {
    dispatch(removeOneFromCart(product._id));
  };

  function handleSendOrder(event) {
    event.preventDefault();

    if (!user) {
      toast.warning("Please sign in before you continue.");
      return;
    } else if (allShoppingCart.length === 0) {
      toast.warning("Your shopping cart is empty.");
      return;
    } else {
      const productCounts = allShoppingCart.reduce((counts, product) => {
        if (counts[product._id]) {
          counts[product._id] += 1;
        } else {
          counts[product._id] = 1;
        }
        return counts;
      }, {});
      const order = {
        user: userId,
        products: Object.entries(productCounts).map(
          ([productId, quantity]) => ({
            product: productId,
            quantity: quantity,
          })
        ),
      };
      dispatch(removeAllFromCart());
      //emailjs
      //.sendForm("service_ndc6jsv", "template_hal256s", event.target, "_6alTseIIZ36HGhIC")
      dispatch(postOrder(order));
    }
  }

  const navigate = useNavigate();

  const navigateToRegister = () => {
    navigate("/register");
  };

  const productCounts = allShoppingCart.reduce((counts, product) => {
    if (counts[product._id]) {
      counts[product._id] += 1;
    } else {
      counts[product._id] = 1;
    }
    return counts;
  }, {});

  const [selectedCountry, setSelectedCountry] = useState(null);

  const countryOptions = countries.map((country) => ({
    label: country.name.common,
    value: country.name.common,
    flag: country,
    latlng: country.latlng,
    region: country.region,
  }));

  const handleCountryChange = (selectedOption) => {
    setSelectedCountry(selectedOption);
  };

  return (
    <>
      <div className="flex flex-col items-center border-b bg-white py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32">
        <a href="#" className="text-2xl font-bold text-gray-800">
          Checkout
        </a>
        <div className="mt-4 py-2 text-xs sm:mt-0 sm:ml-auto sm:text-base">
          <div className="relative"></div>
        </div>
      </div>
      <div className="flex flex-wrap justify-center items-stretch md:px-10 lg:grid-cols-2 lg:px-20 xl:px-32 lg:grid">
        <div className="px-4 pt-8">
          <p className="text-xl font-medium">Order Summary</p>
          <p className="text-gray-400">Check your items.</p>
          <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 md:px-6">
            {allShoppingCart?.length === 0 ? (
              <p className="text-gray-400 flex items-center justify-center">
                Your shopping cart is empty.
              </p>
            ) : (
              Object.entries(productCounts).map(([productId, count]) => {
                const product = allShoppingCart.find(
                  (prod) => prod._id === productId
                );
                const totalPrice = product.price * count;
                const formattedTotalPrice = totalPrice.toFixed(2);

                return (
                  <div
                    key={product._id}
                    className="flex flex-col rounded-lg bg-white sm:flex-row"
                  >
                    <img
                      className="m-2 h-24 w-28 rounded-md border object-cover object-center"
                      src={product.image}
                      alt=""
                    />
                    <div className="flex w-full flex-col px-4 py-4">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold">{product.name}</span>
                        <button
                          className="ml-auto"
                          onClick={() => handleDeleteFromCart(product._id)}
                        >
                          X
                        </button>
                      </div>
                      <p className="text-lg font-bold">${product.price}</p>
                      <div className="flex">
                        <p className="text-sm text-gray-500 mt-3">
                          Quantity: {count}
                        </p>
                        <button
                          className="mt-3 mb-5 ml-2 w-10 rounded-md bg-gray-900 px-0.5 py-.5 font-medium text-white"
                          onClick={() => handleAddToCart(product)}
                        >
                          +
                        </button>
                        <button
                          className="mt-3 mb-5 ml-2 w-10 rounded-md bg-gray-900 px-0.5 py-.5 font-medium text-white"
                          onClick={() => handleReduceFromCart(product)}
                        >
                          -
                        </button>
                      </div>
                      <p className="text-sm text-gray-500">
                        Total Price: ${formattedTotalPrice}
                      </p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
        <form onSubmit={handleSendOrder} action="">
          <div className="flex flex-wrap flex-col justify-center mt-10 bg-gray-50 px-4 pt-8 lg:mt-0 mr:auto h-full">
            <p className="text-xl font-medium">Shipping</p>
            <p className="text-gray-400 mt-2 text-m text-right">
              Dont have an account?{" "}
              <a
                className="text-blue-600"
                href="#"
                onClick={navigateToRegister}
              >
                Register
              </a>
            </p>
            <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              ></svg>
            </div>

            <label
              htmlFor="card-no"
              className="mt-4 mb-2 block text-sm font-medium"
            >
              Personal Info
            </label>
            <div className="flex flex-wrap">
              <div className="relative w-6/12 flex-shrink-0">
                <div className="input-container">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={input.name}
                    onChange={(event) => handleChange(event)}
                    className="mr-3 mb-1 w-full rounded-md border border-gray-200 px-2 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="First name"
                  />
                  {errors.name && (
                    <p className=" mb-1 error">
                      <strong>{errors.name}</strong>
                    </p>
                  )}
                  <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                    <svg
                      className="h-4 w-4 text-gray-400"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <AiOutlineUser />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="input-container">
                <input
                  type="text"
                  name="lastName"
                  value={input.lastName}
                  onChange={(event) => handleChange(event)}
                  className="w-full ml-3 rounded-md border border-gray-200 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Last Name"
                />

                {errors.lastName && (
                  <p className=" mb-1 error">
                    <strong>{errors.lastName}</strong>
                  </p>
                )}
              </div>
            </div>
            <br />
            <div className="relative">
              <input
                type="text"
                id="email"
                name="email"
                value={input.email}
                onChange={(event) => handleChange(event)}
                className=" mt-3 w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="Email"
              />
              {errors.email && (
                <p className=" mb-1 mt-2 error">
                  <strong>{errors.email}</strong>
                </p>
              )}
            </div>

            <div className="flex flex-wrap flex-col">
              <label
                htmlFor="billing-address"
                className="mt-4 mb-2 block text-sm font-medium"
              >
                Billing Address
              </label>

              <Select
                id="countries"
                className="mb-3"
                options={countryOptions}
                value={selectedCountry}
                onChange={handleCountryChange}
                formatOptionLabel={({ label, flag, region }) => (
                  <div className="flex flex-row items-center gap-3">
                    <ReactCountryFlag
                      className="w-[1em] h-[1em]"
                      countryCode={flag.cca2}
                      svg
                    />
                    <div>
                      {label},{" "}
                      <span className="text-neutral-500 ml-1">{region}</span>
                    </div>
                  </div>
                )}
              />
            </div>
            <div className="relative">
              <input
                type="text"
                id="billing-address"
                name="billing-address"
                className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="Street and house number"
              />

              {errors.street && (
                <p className=" mb-1 mt-2 error">
                  <strong>{errors.street}</strong>
                </p>
              )}
            </div>

            <div className="relative">
              <input
                type="text"
                name="appartment"
                className=" mt-3 w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="Appartment, suite, etc.(optional)"
              />
              <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                <svg
                  className="mt-3 h-4 w-4 text-gray-400"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <BsHouse />
                </svg>
              </div>
            </div>

            <div className="mt-3 relative flex-shrink-0 flex flex-wrap">
              <div className="input-container">
                <input
                  type="text"
                  id="zip"
                  name="zip"
                  value={input.zip}
                  onChange={(event) => handleChange(event)}
                  className="mr-1 mb-2 rounded-md border border-gray-200 px-3 py-3 text-sm shadow-sm outline-none sm:w-5/6 focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="ZIP"
                />
                {errors.zip && (
                  <p className=" mb-1 error">
                    <strong>{errors.zip}</strong>
                  </p>
                )}
              </div>
              <div className="input-container">
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={input.city}
                  onChange={(event) => handleChange(event)}
                  className="mr-1 rounded-md border border-gray-200 px-3 py-3 text-sm shadow-sm outline-none sm:w-7/8 focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="City"
                />

                {errors.city && (
                  <p className=" mb-1 mt-2 error">
                    <strong>{errors.city}</strong>
                  </p>
                )}
              </div>
              <div className="input-container">
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={input.state}
                  onChange={(event) => handleChange(event)}
                  className="mr-1 flex-shrink-0 rounded-md border border-gray-200 px-3 py-3 text-sm shadow-sm outline-none sm:w-7/8 focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="State"
                />
                {errors.state && (
                  <p className=" mb-1 mt-2 error">
                    <strong>{errors.state}</strong>
                  </p>
                )}
              </div>
            </div>

            <div className="relative flex flex-wrap">
              <input
                type="text"
                id="phone"
                name="phone"
                value={input.phone}
                onChange={(event) => handleChange(event)}
                className="mt-7 w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="Phone"
              />
              <div className="absolute inset-y-0 left-0 flex items-center px-3">
                <svg
                  className=" mt-7 h-4 w-4 text-gray-400"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <BsTelephone />
                </svg>
              </div>
            </div>
            {errors.phone && (
              <p className=" mb-1 mt-2 error">
                <strong>{errors.phone}</strong>
              </p>
            )}

            <p className="mt-8 text-lg font-medium">Shipping Methods</p>
            <div className="mt-5 grid gap-6">
              <div className="relative">
                <div
                  className={`shopping-method ${
                    selectedMethod === "method1" ? "selected" : ""
                  }`}
                  onClick={() => handleMethodSelection("method1")}
                >
                  <input
                    className="peer hidden"
                    id="radio_1"
                    type="radio"
                    name="radio"
                  />
                  <span
                    className={`method-label ${
                      selectedMethod === "method1" ? "selected" : ""
                    }`}
                  ></span>
                  <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
                  <label
                    className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                    htmlFor="radio_1"
                  >
                    <img
                      className="w-14 object-contain"
                      src={fedexLogo}
                      alt=""
                    />
                    <div className="ml-5">
                      <span className="mt-2 font-semibold">Fedex Delivery</span>
                      <p className="text-slate-500 text-sm leading-6">
                        Delivery: 8-14 Days
                      </p>
                    </div>
                  </label>
                </div>
              </div>
              <div className=" mb-3 relative">
                <div
                  className={`shopping-method ${
                    selectedMethod === "method2" ? "selected" : ""
                  }`}
                  onClick={() => handleMethodSelection("method2")}
                >
                  <input
                    className="peer hidden"
                    id="radio_2"
                    type="radio"
                    name="radio"
                  />
                  <span
                    className={`method-label ${
                      selectedMethod === "method2" ? "selected" : ""
                    }`}
                  ></span>
                  <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
                  <label
                    className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                    htmlFor="radio_2"
                  >
                    <img className="w-14 object-contain" src={dhlLogo} alt="" />
                    <div className="ml-5">
                      <span className="mt-2 font-semibold">DHL Delivery</span>
                      <p className="text-slate-500 text-sm leading-6">
                        Delivery: 10-18 Days
                      </p>
                    </div>
                  </label>
                </div>
              </div>
            </div>
            <div className="mb-3 mt-6 border-t border-b py-2">
              <div className="mt-6 flex items-center justify-between">
                <p name="Tito" className="text-sm font-medium text-gray-900">
                  Total
                </p>
                <p className="text-2xl font-semibold text-gray-900">
                  ${formattedTotal}
                </p>
              </div>
              <div className="flex items-center justify-between"></div>
            </div>
            <button
              type="submit"
              className="mt-auto mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white"
            >
              Place Order
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Shopping;
