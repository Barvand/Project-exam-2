import { useState, useEffect } from "react";
import { IoMdArrowRoundUp } from "react-icons/io";

function ButtonToTop(): JSX.Element {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div>
      {isVisible && (
        <button
          className="fixed bottom-5 right-0 p-2 sm:right-5 bg-accentColor text-white text-xl sm:text-3xl lg:text-4xl rounded-full sm:p-3 shadow-lg hover:scale-110 transition-transform"
          onClick={scrollToTop}
        >
          <IoMdArrowRoundUp />
        </button>
      )}
    </div>
  );
}

export default ButtonToTop;
