import { useState, useEffect, useRef } from "react";
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
import { useDispatch } from "react-redux";
import { getUserByUid } from "../../Redux/actions/actions";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [completeUser, setCompleteUser] = useState({ photoURL: "" });
  const dispatch = useDispatch();
  const menuRef = useRef(null);

  useEffect(() => {
    if (user) {
      dispatch(getUserByUid(user.uid)).then((response) => {
        setCompleteUser(response.payload);
        
      });
    }
  }, [dispatch, user]);
  


  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutsideMenu = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        closeMenu();
      }
    };

    document.addEventListener("click", handleClickOutsideMenu);

    return () => {
      document.removeEventListener("click", handleClickOutsideMenu);
    };
  }, []);

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
      closeMenu();
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
      closeMenu();
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
      closeMenu();
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
      closeMenu();
      navigate("/");
      setTimeout(() => {
        scrollToSection("mostValuedSection");
      }, 500);
    } else {
      scrollToSection("mostValuedSection");
    }
  };


  const handlePuchases = () => {
    closeMenu();
    navigate("/my_puchases");
    setIsMenuOpen(false);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const handleProfile = () => {
    closeMenu();
    navigate("/my_profile");
    setIsMenuOpen(false);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const handleReviews = () => {
    closeMenu();
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
    
    if (isMenuOpen) {
      closeMenu();
    } else {
      setIsMenuOpen(true);
    }
  };

  const handleAbout = () => {
    closeMenu();
    navigate("/about");
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleFavorite = () => {
    navigate("/favorite");
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleShopNow = () => {
    closeMenu();
    navigate("/products");
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleHome = () => {
    closeMenu();
    navigate("/");
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const handleDashboard = () => {
    navigate("/adminDashboard");
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleShoppingCart = () => {
    closeMenu();
    navigate("/checkout");
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };



  return (
    <div ref={menuRef} className="sticky top-0 w-full bg-neutral-200 z-50 shadow-sm select-none">
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
            <div className="flex flex-row items-center justify-end">
              <div
                onClick={handleProfileClick}
                className="p-2 md:py-1 md:px-2 border-[1px] flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition self-center select-none"
              >
                {user ? (
                  <>
                    {completeUser?.photoURL ? (
                      <img
                        src={completeUser.photoURL}
                        alt={completeUser.name || "user"}
                        className="rounded-full w-8 h-8"
                      />
                    ) : (
                      <img
                        src={userPlaceholder}
                        alt={completeUser?.name}
                        className="rounded-full w-8 h-8"
                      />
                    )}
                    <div className="md:py-1 md:px-2 flex flex-row items-center gap-3 cursor-pointer">
                      <h1 className="text-sm md:text-base hidden md:block">
                        Hi {completeUser.name || completeUser.email}
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
                <div className="relative select-none">
                  <div className="absolute rounded-b-lg bg-white py-2 mt-1 w-36 right-3 shadow-md z-10 hidden md:block" style={{ top: 'calc(100% + 5px)' }}>
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
                        Purchases
                      </button>
                      <button
                        onClick={handleReviews}
                        className="block px-4 py-2 hover:bg-gray-100 font-medium text-gray-600"
                      >
                        Reviews
                      </button>
                      <button
                          onClick={handleFavorite}
                        className="block px-4 py-2 hover:bg-gray-100 font-medium text-gray-600"
                      >
                        Favorites
                      </button>
                      {completeUser.isAdmin && (
                        <button
                          onClick={handleDashboard}
                          className="block px-4 py-2 hover:bg-gray-100 font-medium text-gray-600"
                        >
                          Dashboard
                        </button>
                      )}
                      <button className="bloc text-zinc-200" disabled={true}>
                        ──────────
                      </button>
                      <button
                        className="block px-4 py-2 hover:bg-gray-100 font-medium text-gray-600"
                        onClick={handleLogout}
                      >
                        Log out
                      </button>
                    </div>
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
                    ───────────────────────────────
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
                  {completeUser.isAdmin && (
                    <button
                      onClick={handleDashboard}
                      className="block px-4 py-2 hover:bg-gray-100 font-medium text-gray-600"
                    >
                      Dashboard
                    </button>
                  )}
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