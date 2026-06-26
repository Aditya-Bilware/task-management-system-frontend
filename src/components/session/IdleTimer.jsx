import { useEffect, useRef, useState } from "react";
import { LOGOUT_TIME, WARNING_TIME } from "../../utils/idleConstants";
import IdleWarningModal from "./IdleWarningModal";
import { logoutUser } from "../../utils/logOutUser";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const IdleTimer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [countdown, setCountDown] = useState(
    (LOGOUT_TIME - WARNING_TIME) / 1000,
  );

  const lastActivity = useRef(Date.now());
  const warningShown = useRef(false);
  const logoutDone = useRef(false);

  const isOpenRef = useRef(open);

  useEffect(() => {
    isOpenRef.current = open;
  }, [open]);

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) return;

    const now = Date.now();

    lastActivity.current = now;
    localStorage.setItem("lastActivity", now.toString());
  }, [user]);

  const handleStayLoggedIn = () => {
    const now = Date.now();
    lastActivity.current = now;

    localStorage.setItem("lastActivity", now.toString());

    warningShown.current = false;
    logoutDone.current = false;

    setCountDown((LOGOUT_TIME - WARNING_TIME) / 1000);
    setOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("lastActivity");
    setOpen(false);
    logoutDone.current = true;
    logoutUser(dispatch, navigate);
  };

  useEffect(() => {
    const updateActivity = () => {
      if (isOpenRef.current || warningShown.current) return;
      const now = Date.now();
      lastActivity.current = now;

      localStorage.setItem("lastActivity", Date.now().toString());

      // logoutDone.current = false;

      // setOpen(false);

      // console.log("User Active :", new Date().toLocaleTimeString());
    };

    const checkInactivity = () => {
      const lastActivityTime =
        Number(localStorage.getItem("lastActivity")) || lastActivity.current;

      const inactiveTime = Date.now() - lastActivityTime;

      const reamainingSeconds = Math.max(
        0,
        Math.ceil((LOGOUT_TIME - inactiveTime) / 1000),
      );

      if (inactiveTime >= WARNING_TIME && !warningShown.current) {
        warningShown.current = true;
        // console.log("session expiring in 5 sec");
        setOpen(true);
      }

      if (warningShown.current) {
        setCountDown(reamainingSeconds);
      }

      if (inactiveTime >= LOGOUT_TIME && !logoutDone.current) {
        localStorage.removeItem("lastActivity");
        setOpen(false);
        logoutDone.current = true;
        logoutUser(dispatch, navigate);
      }
    };

    const handleStorageChange = (e) => {
      if (e.key === "lastActivity") {
        warningShown.current = false;
        setOpen(false);
      }
    };

    window.addEventListener("focus", checkInactivity);
    window.addEventListener("storage", handleStorageChange);
    document.addEventListener("visibilitychange", checkInactivity);

    // const handleVisibilityChange = () => {
    //   if (document.visibilityState === "visible") {
    //     checkInactivity();
    //   }
    // };

    const events = [
      "mousemove",
      "mousedown",
      "keydown",
      "scroll",
      "click",
      "touchstart",
    ];

    events.forEach((event) => {
      window.addEventListener(event, updateActivity);
    });

    const interval = setInterval(checkInactivity, 1000);

    return () => {
      clearInterval(interval);
      window.removeEventListener("focus", checkInactivity);
      window.removeEventListener("storage", handleStorageChange);
      document.removeEventListener("visibilitychange", checkInactivity);

      events.forEach((event) => {
        window.removeEventListener(event, updateActivity);
      });
    };
  }, [user, dispatch, navigate]);

  if (!user) {
    return null;
  }
  return (
    <>
      <IdleWarningModal
        open={open}
        countdown={countdown}
        onStayLoggedIn={handleStayLoggedIn}
        onLogout={handleLogout}
      />
    </>
  );
};

export default IdleTimer;
