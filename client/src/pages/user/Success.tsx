import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { logout } from "../../store/actions/user.actions";
import { useNavigate } from "react-router-dom";
import { removeLocalStorageItem } from "../../lib/localStorageUtils";

const Success: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [confettiDimensions, setConfettiDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const disableScroll = () => {
      document.body.style.overflow = "hidden";
    };

    const enableScroll = () => {
      document.body.style.overflow = "auto";
    };

    disableScroll();

    return () => {
      enableScroll();
    };
  }, []);

  useEffect(() => {
    const updateDimensions = () => {
      setConfettiDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", updateDimensions);
    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(logout);
      removeLocalStorageItem("workflowID");
      removeLocalStorageItem("userId");
      exitfromHere();
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const exitfromHere = () => {
    navigate("/login");
  };

  return (
    <div className="dark:bg-dark-bg dark:text-dark-text flex items-center justify-center min-h-screen">
      <Confetti
        width={confettiDimensions.width}
        height={confettiDimensions.height}
        tweenDuration={3000}
      />
      <div className="text-center">
        <h3 className="text-4xl font-semibold">OnBoarding Completed!</h3>
        <p className="my-2 text-xl">Thank you for completing.</p>
        <p className="text-lg">Have a great day! 😊</p>
      </div>
    </div>
  );
};

export default Success;
