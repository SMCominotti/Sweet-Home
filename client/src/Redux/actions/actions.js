import axios from "axios";
import {
  GET_CATEGORY,
  GET_USERS,
  GET_PRODUCTS,
  GET_PRODUCT_DETAIL,
  MOST_VALUED_FILTER,
  FILTER_BY_NAME,
  FILTER_BY_PRICE,
  FILTER_BY_CATEGORY,
  SEARCH_PRODUCTS,
  ADD_TO_CART,
  DELETE_FROM_CART,
  POST_USER,
  DELETE_ONE_FROM_CART,
  POST_SHOPPING_CART,
  POST_ORDER,
  POST_PRODUCT,
  UPLOAD_PRODUCT,
  DELETE_PRODUCT,
  POST_REVIEW,
  GET_ORDERS,
  GET_USER_BY_UID,
  GET_ORDER_BY_ID,
  PUT_REVIEW,
  DELETE_REVIEW,
  UPDATE_USER,
  GET_USER_BY_EMAIL,
  SOFT_DELETE,
  CLEAN_DETAIL,
  DELETE_ALL_FROM_CART,
} from "../../Redux/action-types/action-types";
// const VITE_HOST = "http://localhost:3001"
const VITE_HOST = import.meta.env.VITE_HOST; 

//--//--//--//--//--//  PRODUCT ACTIONS  //--//--//--//--//--//

export function getProducts() {
  return async function(dispatch) {
    let response = await axios.get(`${VITE_HOST}/api/product`);
    return dispatch({
      type: GET_PRODUCTS,
      payload: response.data,
    });
  };
}

export function getProductDetail(id) {
  return async function(dispatch) {
    try {
      let response = await axios.get(`${VITE_HOST}/api/product/${id}`);
      return dispatch({
        type: GET_PRODUCT_DETAIL,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export const postProduct = (product) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${VITE_HOST}/api/product`, product);
      dispatch({
        type: POST_PRODUCT,
        payload: response.data,
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  };
};

export function uploadProduct(data, id) {
  return async function(dispatch) {
    try {
      await axios.put(`${VITE_HOST}/api/product/${id}`, data);
      return dispatch({
        type: UPLOAD_PRODUCT,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
export function softDeleteProduct(id) {
  return async function(dispatch) {
    try {
      await axios.put(`${VITE_HOST}/api/product/${id}`, { isDelete: true });
      return dispatch({
        type: SOFT_DELETE,
        payload: { isDelete: true },
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function deleteProduct(id) {
  return async function(dispatch) {
    try {
      await axios.delete(`${VITE_HOST}/api/product/${id}`);
      return dispatch({
        type: DELETE_PRODUCT,
        payload: id,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export const searchProducts = (searchTerm) => {
  return {
    type: SEARCH_PRODUCTS,
    payload: searchTerm,
  };
};

export const cleanDetail = () => {
  return { type: CLEAN_DETAIL };
};

//--//--//--//--//--//  USER ACTIONS  //--//--//--//--//--//

export function getAllUsers() {
  return async function(dispatch) {
    try {
      const response = await axios.get(`${VITE_HOST}/api/users`);
      dispatch({
        type: GET_USERS,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getUserByUid(uid) {
  return async function(dispatch) {
    try {
      let response = await axios.get(`${VITE_HOST}/api/users/v1/${uid}`);
      return dispatch({
        type: GET_USER_BY_UID,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getUserByEmail(email) {
  return async function(dispatch) {
    try {
      let response = await axios.get(`${VITE_HOST}/api/users/${email}`);
      return dispatch({
        type: GET_USER_BY_EMAIL,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function postUser(payload) {
  return async function(dispatch) {
    try {
      const response = await axios.post(`${VITE_HOST}/api/users`, payload);
      dispatch({
        type: POST_USER,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function updateUser(data, id) {
  return async function(dispatch) {
    try {
      await axios.put(`${VITE_HOST}/api/users/${id}`, data);
      return dispatch({
        type: UPDATE_USER,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

//--//--//--//--//--//  CART ACTIONS  //--//--//--//--//--//

export const addtoCart = (product) => {
  return {
    type: ADD_TO_CART,
    payload: product,
  };
};

export function postShoppingCart(payload) {
  return async function(dispatch) {
    try {
      const response = await axios.post(`${VITE_HOST}/api/cart`, payload);
      dispatch({
        type: POST_SHOPPING_CART,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export const removefromCart = (id) => {
  return {
    type: DELETE_FROM_CART,
    payload: id,
  };
};

export const removeOneFromCart = (id) => {
  return {
    type: DELETE_ONE_FROM_CART,
    payload: id,
  };
};

export const removeAllFromCart = () => {
  localStorage.removeItem("cart"); // Eliminar el item 'cart' del Local Storage

  return {
    type: DELETE_ALL_FROM_CART,
  };
};

//--//--//--//--//--//  ORDER ACTIONS  //--//--//--//--//--//

export function getAllOrders() {
  return async function(dispatch) {
    try {
      const response = await axios.get(`${VITE_HOST}/api/order`);
      dispatch({
        type: GET_ORDERS,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getOrderById(id) {
  return async function(dispatch) {
    try {
      let response = await axios.get(`${VITE_HOST}/api/order/${id}`);
      return dispatch({
        type: GET_ORDER_BY_ID,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function postOrder(payload) {
  return async function(dispatch) {
    try {
      const response = await axios.post(`${VITE_HOST}/api/order`, payload);

      const initPoint = response.data;
      console.log(initPoint);
      window.location.href = initPoint;
      dispatch({
        type: POST_ORDER,
        payload: initPoint,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

//--//--//--//--//--//  REVIEW ACTIONS  //--//--//--//--//--//

export function getReviews() {
  return async function(dispatch) {
    let response = await axios.get(`${VITE_HOST}/api/review`);
    return dispatch({
      type: MOST_VALUED_FILTER,
      payload: response.data,
    });
  };
}

export function postReview(payload) {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${VITE_HOST}/api/review`, payload);
      return dispatch({
        type: POST_REVIEW,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function editReview(data, id) {
  return async function(dispatch) {
    try {
      await axios.put(`${VITE_HOST}/api/review/${id}`, data);
      return dispatch({
        type: PUT_REVIEW,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function deleteReview(id) {
  return async function(dispatch) {
    try {
      await axios.delete(`${VITE_HOST}/api/review/${id}`);
      return dispatch({
        type: DELETE_REVIEW,
        payload: id,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

//--//--//--//--//--//  OTHER ACTIONS  //--//--//--//--//--//

export const getCategory = () => {
  return async function(dispatch) {
    try {
      let response = await axios(`${VITE_HOST}/api/category`);

      return dispatch({
        type: GET_CATEGORY,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const filterByName = (payload) => {
  return {
    type: FILTER_BY_NAME,
    payload,
  };
};

export const filterByPrice = (payload) => {
  return {
    type: FILTER_BY_PRICE,
    payload,
  };
};

export const filterByCategory = (payload) => {
  return {
    type: FILTER_BY_CATEGORY,
    payload,
  };
};
