import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../context/authContex";
import { useEffect, useState } from "react";
import { getUserByUid } from "../../Redux/actions/actions";
import { useNavigate } from "react-router-dom";
import Stars from "../../components/Stars/Stars";
import {postReview} from "../../Redux/actions/actions";


const Puchases = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const userUid = user?.uid;

  useEffect(() => {
    if(user){
    dispatch(getUserByUid(userUid));
    }
  }, [dispatch, userUid]);

  const userData = useSelector((state) => state.user);
  const userOrders = userData?.userOrders || [];
  const [reviewNumber, setReviewNumber] = useState(0)
  const [reviewText, setReviewText] = useState("")
  const [productId, setProductId] = useState("")
  const navigate = useNavigate();


  const handleText = (e) => {
    setReviewText(e.target.value)
  }

 
 
  

  const handleSave = ()  => {
    let reviewProduct = {
      rating: reviewNumber,
      reviewText: reviewText,
      createdBy: userData._id,
      product: productId
    }
    dispatch(postReview(reviewProduct))
    navigate("/")
  }

 



  /*console.log("este es el id del usuario", userData._id);
  console.log("este es review number desde el purchase", reviewNumber);
  console.log("este es el review text", reviewText);
  */





  return (
    <div className="pt-8 flex flex-col items-center justify-center  bg-white w-full py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32">
      <div className="grid w-3/4">
        <p className="text-3xl font-medium mb-4">My purchases</p>
        {userOrders.length === 0 ? ( <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6"> <p className="text-gray-400 flex items-center justify-center">
                No purchases have been made with this account.
              </p></div>
            ) : userOrders.map((order) => (
          <div
            key={order._id}
            className="text-left mt-5 mb-5 m-4 bg-white pt-5 pb-5 border border-gray-200 rounded-lg"
          >
            <div className="border-b-1 border-gray-200">
              <cite className="ml-3 font-semibold text-gray-800 text-sm block mb-5">
                {new Date(order.paidAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </cite>
            </div>
            <div className="border border-gray-200 rounded-lg">
              {order.products?.map((product) => (
                <div
                  className="mt-5 flex mr-5 ml-5 flex-col rounded-lg bg-white sm:flex-row border-b border-gray-200 last:border-b-0"
                  key={product.product._id}
                >
                  <img
                    className="m-2 h-40 sm:h-40 w-40 sm:w-40 rounded-md border object-cover object-center"
                    src={product.product.image}
                    alt=""
                  />
                  <div className="flex w-full flex-col justify-between px-4 py-4">
                    <div>
                      <p className="text-sm text-green-500">Delivered</p>
                      <span className="font-semibold text-xl">
                        {product.product.name}
                      </span>
                      <p className="text-sm">
                        Price: $
                        {(product.product.price * product.quantity).toFixed(2)}
                      </p>
                      <p className="text-xs">Quantity: {product.quantity}</p>
                    </div>
                    <div className="mt-3">
                     <form onSubmit={handleSave}>
                     <Stars handleRating={setReviewNumber} />
                      <input type="text" 
                      name="reviewtext"
                      className="w-full ml-3 rounded-md border border-gray-200 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Insert your review"
                      onChange={handleText}/>
                      <button
                      type="submit"
                      className="rounded-lg border-2 border-transparent bg-blue-600 px-4 py-2 font-medium text-white focus:outline-none focus:ring hover:bg-blue-700"
                      onClick={() => setProductId(product.product._id)}
                >
                  Save
                </button>
                     </form>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-800 font-semibold mt-5 text-right mr-3">
              Total Price: ${order.totalPrice.toFixed(2)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Puchases;
