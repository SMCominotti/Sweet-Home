import {
  GET_PRODUCTS,
  GET_PRODUCT_DETAIL,
  MOST_VALUED_FILTER,
  FILTER_BY_CATEGORY,
  FILTER_BY_NAME,
  FILTER_BY_PRICE,
  GET_CATEGORY,
  ADD_TO_CART,
  DELETE_FROM_CART,
  SEARCH_PRODUCTS,
  DELETE_ONE_FROM_CART,
  GET_USERS,
  POST_SHOPPING_CART,
  POST_ORDER,
  UPLOAD_PRODUCT,
  DELETE_PRODUCT,
  POST_PRODUCT,
  POST_REVIEW,
  GET_ORDERS,
  GET_USER_BY_UID,
  GET_ORDER_BY_ID,
  PUT_REVIEW,
  DELETE_REVIEW,
  UPDATE_USER,
  GET_USER_BY_EMAIL
} from "../action-types/action-types.js";
import { productAVG } from "../../utils/logic-ratings";

const initialState = {
  products: [],
  getAllProducts: [],
  details: [],
  reviews: [],
  category: [],
  users: [],
  user: [],
  shoppingCart: localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [],
  loading: false,
  error: null,
  newCart: [],
  orders: [],
  order: []
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {

    //--//--//--//--//--//  Product actions  //--//--//--//--//--//

    case GET_PRODUCTS:
      if (state.products.length > 0) {
        return {
          products: state.products,
          getAllProducts: state.getAllProducts,
        };
      }
      return {
        ...state,
        products: payload,
        getAllProducts: payload,
        loading: false,
      };
    case GET_PRODUCT_DETAIL:
      return {
        ...state,
        details: payload,
      };

    case SEARCH_PRODUCTS: {
      const searchTerm = payload.toLowerCase();
      const filteredProducts = state.getAllProducts.filter((product) =>
        product.name.toLowerCase().includes(searchTerm)
      );
      return {
        ...state,
        products: filteredProducts,
      };
    }
    case DELETE_PRODUCT: {
      const updateProduct = state.getAllProducts.filter((product) => product._id !== payload)
      const removeProduct = state.products.filter((product) => product._id !== payload)
      return {
        ...state,
        getAllProducts: updateProduct,
        products: removeProduct
      }
    }
    case UPLOAD_PRODUCT:
      return {
        ...state,
        products: [...state.products, payload],
        getAllProducts: [...state.getAllProducts, payload],
      };

    case POST_PRODUCT:
      return {
        ...state,
        products: [...state.products, payload],
      }

    //--//--//--//--//--// Cart actions  //--//--//--//--//--//

    case ADD_TO_CART: {
      const updatedCart = [...state.shoppingCart, payload];
      window.localStorage.setItem('cart', JSON.stringify(updatedCart));
      return {
        ...state,
        shoppingCart: updatedCart,
      }
    }

    case DELETE_FROM_CART: {
      const updatedCarts = state.shoppingCart.filter(
        (product) => product._id !== payload
      );
      localStorage.setItem('cart', JSON.stringify(updatedCarts));
      return {
        ...state,
        shoppingCart: updatedCarts,
      }
    }

    case DELETE_ONE_FROM_CART: {
      const filterCart = state.shoppingCart.filter(
        (product) => product._id !== payload
      );
      const toBeDeleted = state.shoppingCart.filter(
        (product) => product._id === payload
      );
      const filterDeleted = [...toBeDeleted.slice(0, toBeDeleted.length - 1)];

      const updatedCart = [...filterCart, ...filterDeleted];
      localStorage.setItem('cart', JSON.stringify(updatedCart));

      return {
        ...state,
        shoppingCart: updatedCart,
      };
    }



    case POST_SHOPPING_CART:
      return {
        ...state,
      };

    //--//--//--//--//--//  Filter actions  //--//--//--//--//--//

    case FILTER_BY_NAME: {
      const sortedProducts = [...state.products];
      const sortOrder = payload === "asc" ? 1 : -1;
      sortedProducts.sort((productsA, productsB) => {
        if (productsA.name > productsB.name) {
          return 1 * sortOrder;
        }
        if (productsB.name > productsA.name) {
          return -1 * sortOrder;
        }
        return 0;
      });
      return {
        ...state,
        products: sortedProducts,
        getAllProducts: sortedProducts,
      };
    }

    case FILTER_BY_PRICE: {
      const filterProducts = [...state.products];
      const filterOrder = payload === "high" ? 1 : -1;
      filterProducts.sort((productsA, productsB) => {
        if (productsA.price > productsB.price) {
          return 1 * filterOrder;
        }
        if (productsB.price > productsA.price) {
          return -1 * filterOrder;
        }
        return 0;
      });
      return {
        ...state,
        products: filterProducts,
        getAllProducts: filterProducts,
      };
    }

    case FILTER_BY_CATEGORY: {
      const filteredCategory = state.getAllProducts.filter((element) => {
        if (element.category[0] && element.category[0].name) {
          return element.category[0].name.includes(payload);
        }
        return false;
      });
      return {
        ...state,
        products: filteredCategory
      };
    }

    //--//--//--//--//--//  Review actions  //--//--//--//--//--//

    case MOST_VALUED_FILTER:
      return {
        ...state,
        reviews: productAVG(payload),
      };

    case POST_REVIEW:
      return {
        ...state,
        reviews: [...state.reviews, payload]
      }

    case PUT_REVIEW:
      return {
        ...state,
        reviews: [...state.reviews, payload],
      };

    case DELETE_REVIEW:
      return {
        ...state,
        reviews: state.reviews.filter((review) => review._id !== payload),
      };


    //--//--//--//--//--//  User actions  //--//--//--//--//--//

    case GET_USERS:
      return {
        ...state,
        users: payload,
      };

    case GET_USER_BY_UID:
      return {
        ...state,
        user: payload,
      };

    case GET_USER_BY_EMAIL:
      return {
        ...state,
        user: payload
      }

    case UPDATE_USER:
      return {
        ...state,
        user: [...state.user, payload],

      };

    //--//--//--//--//--//  ORDER actions  //--//--//--//--//--//

    case POST_ORDER:
      return {
        ...state
      }
    case GET_ORDERS:
      return {
        ...state,
        orders: [...state.orders, payload]
      }
    case GET_ORDER_BY_ID:
      return {
        ...state,
        order: payload,
      };

    //--//--//--//--//--//  Other actions  //--//--//--//--//--//

    case GET_CATEGORY:
      return {
        ...state,
        category: payload,
      };

    default:
      return state;
  }
};

export default reducer;
