import { useEffect, useState } from "react";
import { Wheel } from "react-custom-roulette";
import { motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";
import FingerprintJS from "@fingerprintjs/fingerprintjs";

import { addScansByPrize, getUser } from "../utils";
import { useStore } from "../store/store";
import { IUser } from "../interfaces";
import { wheelOptions } from "../constants";
import Popup from "../components/Popup";
import { Link } from "react-router-dom";

const WheelPage = () => {
  const { id, setResponse } = useStore();
  const [user, setUser] = useState<IUser>();
  const [allowedToSpin, setAllowedToSpin] = useState<boolean>(false);
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [arrowPosition, setArrowPosition] = useState({
    x: 15,
    y: 10,
    styles: {
      borderX: 35,
      borderY: 60,
    },
  });

  const isLaptop = useMediaQuery({ query: "(max-width: 1024px)" });
  const isDesktop = useMediaQuery({ query: "(min-width: 768px)" });
  const isTablet = useMediaQuery({ query: "(max-width: 768px)" });
  const isSmallTablet = useMediaQuery({ query: "(max-width: 640px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 420px)" });

  useEffect(() => {
    if (isMobile) {
      setArrowPosition({ x: 12, y: 10, styles: { borderX: 15, borderY: 25 } });
    } else if (isSmallTablet) {
      setArrowPosition({ x: 14, y: 10, styles: { borderX: 18, borderY: 32 } });
    } else if (isTablet) {
      setArrowPosition({ x: 14, y: 10, styles: { borderX: 24, borderY: 43 } });
    } else if (isLaptop) {
      setArrowPosition({ x: 12, y: 11, styles: { borderX: 30, borderY: 50 } });
    } else if (isDesktop) {
      setArrowPosition({ x: 13, y: 10, styles: { borderX: 36, borderY: 65 } });
    }
  }, [isTablet, isSmallTablet, isDesktop, isMobile, isLaptop]);

  useEffect(() => {
    if (!id) {
      FingerprintJS.load()
        .then((fp) => fp.get())
        .then(async (result) => {
          const data = await getUser(result.visitorId);
          setUser(data);
        });
    } else {
      getUser(id).then((data) => setUser(data));
    }
  }, []);

  useEffect(() => {
    if (!user?.wheelSpinDate) {
      setAllowedToSpin(true);
    } else {
      const initialDate = new Date(user?.wheelSpinDate);

      const diff = new Date().getTime() - initialDate.getTime();

      const days = diff / (1000 * 60 * 60 * 24);

      if (Number(days.toFixed(0)) >= 3) {
        setAllowedToSpin(true);
      } else {
        setAllowedToSpin(false);
      }
    }
  }, [user]);

  const handleSpinClick = () => {
    if (!mustSpin) {
      setAllowedToSpin(false);
      const newPrizeNumber = Math.floor(Math.random() * wheelOptions.length);
      setPrizeNumber(newPrizeNumber);
      setMustSpin(true);
    }
  };

  const handlePrize = (prizeOption: any) => {
    if (user && prizeOption.value > 0) {
      addScansByPrize(user.id, Number(prizeOption.value));
    }
    setResponse(prizeOption.message);
  };

  return (
    <div>
      <Popup />

      <div className="w-full appContainer flex justify-between items-center px-2 my-5">
        <Link
          to="/"
          className="outline-none text-[14px] font-bold text-center leading-[110%] bg-white text-midDarkGrey p-2 rounded-xl cursor-pointer"
        >
          На головну
        </Link>
      </div>

      <motion.div
        animate={{ x: ["-100%", "0%"], scale: [0.2, 1] }}
        transition={{ type: "spring", duration: 1 }}
        className="text-[36px] sm:text-[50px] font-bold text-center leading-[110%] w-full bg-white text-midDarkGrey py-[20px]"
      >
        <motion.h1
          animate={{ scale: [0.8, 1] }}
          transition={{ type: "spring", delay: 0.5 }}
        >
          Колесо Фортуни
        </motion.h1>
      </motion.div>

      <div className="appContainer mx-auto py-10">
        <div className="flex justify-center items-center flex-col gap-5 relative overflow-hidden">
          <motion.div
            animate={{ scale: [0.5, 1], rotate: [-360, 0] }}
            transition={{
              scale: { type: "spring", duration: 0.5 },
              rotate: { type: "spring", duration: 1 },
            }}
          >
            <Wheel
              mustStartSpinning={mustSpin}
              prizeNumber={prizeNumber}
              data={wheelOptions}
              spinDuration={0.1}
              onStopSpinning={() => {
                handlePrize(wheelOptions[prizeNumber]);
                setMustSpin(false);
              }}
              backgroundColors={["#262534"]}
              outerBorderColor="#F5A006"
              textColors={["#F5A006"]}
              textDistance={81}
              innerBorderWidth={125}
              innerBorderColor="#3F3D56"
              innerRadius={10}
              outerBorderWidth={0.75}
              perpendicularText={true}
              radiusLineColor="#3F3D56"
              radiusLineWidth={3}
              pointerProps={{
                src: "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
                style: {
                  width: 0,
                  height: 0,
                  top: `${arrowPosition.y}%`,
                  right: `${arrowPosition.x}%`,
                  rotate: "230deg",
                  borderLeft: `${arrowPosition.styles.borderX}px solid transparent`,
                  borderRight: `${arrowPosition.styles.borderX}px solid transparent`,
                  borderBottom: `${arrowPosition.styles.borderY}px solid #F5A006`,
                },
              }}
            />

            <div className="absolute z-10 top-[40%] sm:top-[42%] md:top-1/2 left-1/2 -translate-x-1/2 -translate-y-[50%] flex flex-col  md:gap-5 lg:gap-10">
              <h2 className="text-mainOrange text-[28px] xsm:text-[36px] sm:text-[40px] md:text-[55px] lg:text-[70px] leading-[110%] text-center font-bold">
                Рулетка <br /> ScPoints
              </h2>

              <button
                disabled={!allowedToSpin || !user?.name}
                onClick={handleSpinClick}
                className={`disabled:opacity-60 disabled:hover:!scale-100 hidden md:flex flex-col items-center justify-center py-3 px-[50px] lg:px-[68px] md:text-[26px] lg:text-[33px] leading-[120%] text-white bg-mainOrange rounded-[25px] transition-all duration-300 hover:scale-110 hover:shadow-sm hover:shadow-mainOrange`}
              >
                Крутити
              </button>
            </div>
          </motion.div>

          <div className="w-full flex justify-center">
            <button
              disabled={!allowedToSpin || !user?.name}
              onClick={handleSpinClick}
              className="disabled:opacity-60 disabled:hover:!scale-0 mb-[10px] md:hidden flex flex-col items-center justify-center py-3 w-[80%] outline-none md:text-[28px] leading-[120%] text-white bg-mainOrange rounded-[20px] transition-all duration-300 hover:scale-110 hover:shadow-sm hover:shadow-mainOrange"
            >
              Крутити
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WheelPage;
