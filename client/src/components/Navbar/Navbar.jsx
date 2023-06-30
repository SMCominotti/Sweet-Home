import { useState } from "react";
import { useAuth } from "../../context/authContex";
import { useNavigate } from "react-router-dom";
import ShopNowNav from "./Buttons/ShopNowNav";
import AboutNav from "./Buttons/AboutNav";
import RecommendationsNav from "./Buttons/RecommendationsNav";
import Inspiration from "./Buttons/Inspiration";
import TopWeekNav from "./Buttons/TopWeekNav";
import MostValuedNav from "./Buttons/MostValueNav";
import ShoppingCart from "./Buttons/ShoppingCart";
import LoginNav from "./Buttons/LoginNav";
import RegisterNav from "./Buttons/RegisterNav";
import Logo from "./Logo/Logo";
import userPlaceholder from "../../assets/image/person-placeholder-400x400.png";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUserByUid } from "../../Redux/actions/actions";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [completeUser, setCompleteUser] = useState({ photoURL: "" });
  const dispatch = useDispatch();
  useEffect(() => {
    if (user) {
      dispatch(getUserByUid(user.uid)).then((response) => {
        setCompleteUser(response.payload);
      });
    }
  }, [dispatch, user]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleRecommendationsClick = () => {
    if (window.location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        scrollToSection("recommendationsSection");
      }, 500);
    } else {
      scrollToSection("recommendationsSection");
    }
  };

  const handleInspirationClick = () => {
    if (window.location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        scrollToSection("inspirationSection");
      }, 500);
    } else {
      scrollToSection("inspirationSection");
    }
  };

  const handleTopWeekClick = () => {
    if (window.location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        scrollToSection("topWeekSection");
      }, 500);
    } else {
      scrollToSection("topWeekSection");
    }
  };

  const handleMostValuedClick = () => {
    if (window.location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        scrollToSection("mostValuedSection");
      }, 500);
    } else {
      scrollToSection("mostValuedSection");
    }
  };

  const handlePuchases = () => {
    navigate("/my_puchases");
    setIsMenuOpen(false);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const handleProfile = () => {
    navigate("/my_profile");
    setIsMenuOpen(false);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const handleReviews = () => {
    navigate("/my_reviews");
    setIsMenuOpen(false);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleProfileClick = () => {
    if (user === null) {
      return;
    }
    setIsMenuOpen(!isMenuOpen);
  };

  const handleAbout = () => {
    navigate("/about");
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleShopNow = () => {
    navigate("/products");
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleHome = () => {
    navigate("/");
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleShoppingCart = () => {
    navigate("/checkout");
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="sticky top-0 w-full bg-neutral-200 z-50 shadow-sm">
      <div className="py-1 border-b-[1px]">
        <div className="max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4">
          <div className="flex flex-col md:flex-row md:flex-wrap md:items-center md:justify-between gap-3 md:gap-0">
            <button onClick={handleHome} className="order-first">
              <Logo className="order-first" />
            </button>
            <div className="hidden md:flex md:flex-wrap md:items-center md:gap-3">
              <div onClick={handleShopNow}>
                <ShopNowNav />
              </div>
              <div onClick={handleAbout}>
                <AboutNav />
              </div>
              <div onClick={handleRecommendationsClick}>
                <RecommendationsNav />
              </div>
              <button onClick={handleInspirationClick}>
                <Inspiration />
              </button>
              <button onClick={handleTopWeekClick}>
                <TopWeekNav />
              </button>
              <button onClick={handleMostValuedClick}>
                <MostValuedNav />
              </button>
              <button onClick={handleShoppingCart}>
                <ShoppingCart />
              </button>
            </div>
            <div className="flex-row items-center gap-3">
              <div
                onClick={handleProfileClick}
                className="p-4 md:py-1 md:px-2 border-[1px] flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition self-center select-none"
              >
                {user ? (
                  <>
                    {completeUser?.photoURL ? (
                      <img
                        src={completeUser?.photoURL}
                        alt={completeUser?.name || "user"}
                        className="rounded-full w-8 h-8"
                      />
                    ) : (
                      <img
                        src={userPlaceholder}
                        alt={completeUser?.name}
                        className="rounded-full w-8 h-8"
                      />
                    )}
                    <div className="p-4 md:py-1 md:px-2 flex flex-row items-center gap-3 cursor-pointer">
                      <h1 className="text-sm md:text-base">
                        Hi {completeUser?.name || completeUser?.email}
                      </h1>
                    </div>
                  </>
                ) : (
                  <LoginNav />
                )}
                <div className="hidden md:block cursor-pointer select-none">
                  {user ? null : <RegisterNav />}
                </div>
              </div>
              {isMenuOpen && (
                <div className="absolute rounded-b-lg bg-white py-2 mt-1 w-48 right-0 shadow-md z-10">
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={handleProfile}
                      className="block px-4 py-2 hover:bg-gray-100 font-medium text-gray-600"
                    >
                      My Profile
                    </button>
                    <button
                      onClick={handlePuchases}
                      className="block px-4 py-2 hover:bg-gray-100 font-medium text-gray-600"
                    >
                      Pucharses
                    </button>
                    <button
                      onClick={handleReviews}
                      className="block px-4 py-2 hover:bg-gray-100 font-medium text-gray-600"
                    >
                      Reviews
                    </button>
                    <button
                      onClick={handlePuchases}
                      className="block px-4 py-2 hover:bg-gray-100 font-medium text-gray-600"
                    >
                      Favorites
                    </button>
                    <button className="bloc text-zinc-200" disabled={true}>
                      ───────────────
                    </button>
                    <button
                      className="block px-4 py-2 hover:bg-gray-100 font-medium text-gray-600"
                      onClick={handleLogout}
                    >
                      Log out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          {isMenuOpen && (
            <div className="md:hidden absolute bg-white py-2  w-full right-0 shadow-md">
              <div className="flex flex-col gap-2">
                <button
                  onClick={handleShopNow}
                  className="block px-4 py-2 hover:bg-gray-100 font-medium text-gray-600"
                >
                  Shop Now
                </button>
                <button
                  onClick={handleAbout}
                  className="block px-4 py-2 hover:bg-gray-100 font-medium text-gray-600"
                >
                  About
                </button>
                <button
                  onClick={handleRecommendationsClick}
                  className="block px-4 py-2 hover:bg-gray-100 font-medium text-gray-600"
                >
                  Recommendations
                </button>
                <button
                  onClick={handleInspirationClick}
                  className="block px-4 py-2 hover:bg-gray-100 font-medium text-gray-600"
                >
                  Inspiration
                </button>
                <button
                  onClick={handleTopWeekClick}
                  className="block px-4 py-2 hover:bg-gray-100 font-medium text-gray-600"
                >
                  Top of Week
                </button>
                <button
                  onClick={handleMostValuedClick}
                  className="block px-4 py-2 hover:bg-gray-100 font-medium text-gray-600"
                >
                  Most Valued
                </button>
                <button
                  onClick={handleShoppingCart}
                  className="block px-4 py-2 hover:bg-gray-100 font-medium text-gray-600"
                >
                  My Cart
                </button>
              </div>
              {user && (
                <div className="flex flex-col gap-2">
                  <button
                    className="block px-4 py-2 text-zinc-200"
                    disabled={true}
                  >
                    ───────────────────────────────────────────────────────────────
                  </button>
                  <button
                    onClick={handleProfile}
                    className="block px-4 py-2 hover:bg-gray-100 font-medium text-gray-600"
                  >
                    My Profile
                  </button>
                  <button
                    onClick={handlePuchases}
                    className="block px-4 py-2 hover:bg-gray-100 font-medium text-gray-600"
                  >
                    Pucharses
                  </button>
                  <button
                    onClick={handleReviews}
                    className="block px-4 py-2 hover:bg-gray-100 font-medium text-gray-600"
                  >
                    Reviews
                  </button>
                  <button
                    onClick={handlePuchases}
                    className="block px-4 py-2 hover:bg-gray-100 font-medium text-gray-600"
                  >
                    Favorites
                  </button>
                  <button
                    className="block px-4 py-2 hover:bg-gray-100 font-medium text-gray-600"
                    onClick={handleLogout}
                  >
                    Log out
                  </button>
                </div>
              )}
              {!user && (
                <div className="flex flex-col gap-2">
                  <LoginNav />
                  <RegisterNav />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
