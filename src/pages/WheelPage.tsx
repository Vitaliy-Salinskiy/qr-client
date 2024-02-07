import { useEffect, useState } from "react";
import { Wheel } from "react-custom-roulette";
import { motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";

const WheelPage = () => {
  const data = [
    { id: 1, option: "0", value: "You won 0" },
    { id: 2, option: "1", value: "You won 1" },
    { id: 3, option: "2", value: "You won 2" },
    { id: 4, option: "3", value: "You won 3" },
    { id: 5, option: "4", value: "You won 4" },
    { id: 6, option: "5", value: "You won 5" },
    { id: 7, option: "6", value: "You won 6" },
    { id: 8, option: "7", value: "You won 7" },
  ];

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
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 420px)" });

  useEffect(() => {
    if (isMobile) {
      setArrowPosition({ x: 12, y: 10, styles: { borderX: 15, borderY: 25 } });
    } else if (isTabletOrMobile) {
      setArrowPosition({ x: 12, y: 9, styles: { borderX: 20, borderY: 40 } });
    } else if (isLaptop) {
      setArrowPosition({ x: 12, y: 11, styles: { borderX: 30, borderY: 50 } });
    } else if (isDesktop) {
      setArrowPosition({ x: 15, y: 10, styles: { borderX: 40, borderY: 70 } });
    }
  }, [isTabletOrMobile, isDesktop, isMobile, isLaptop]);

  const handleSpinClick = () => {
    if (!mustSpin) {
      const newPrizeNumber = Math.floor(Math.random() * data.length);
      setPrizeNumber(newPrizeNumber);
      setMustSpin(true);
    }
  };

  const handlePrize = (prizeOption: any) => {
    console.log("prize ", prizeOption);
  };

  return (
    <div>
      <motion.div
        animate={{ x: ["-100%", "0%"], scale: [0.2, 1] }}
        transition={{ type: "spring", duration: 1 }}
        className="mt-20 text-[36px] sm:text-[50px] font-bold text-center leading-[110%] w-full bg-white text-midDarkGrey py-[20px]"
      >
        <motion.h1
          animate={{ scale: [0.8, 1] }}
          transition={{ type: "spring", delay: 0.5 }}
        >
          Lucky Wheel
        </motion.h1>
      </motion.div>

      <div className="appContainer mx-auto py-10">
        <div className="flex justify-center items-center flex-col gap-5 relative overflow-hidden">
          <div>
            <Wheel
              mustStartSpinning={mustSpin}
              prizeNumber={prizeNumber}
              data={data}
              spinDuration={0.1}
              onStopSpinning={() => {
                handlePrize(data[prizeNumber]);
                setMustSpin(false);
                handlePrize;
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
                onClick={handleSpinClick}
                className="hidden md:flex flex-col items-center justify-center py-5 px-[50px] lg:px-[75px] md:text-[28px] lg:text-[35px] leading-[120%] text-white bg-mainOrange rounded-[20px]"
              >
                Крутити
              </button>
            </div>
          </div>

          <div>
            <button
              onClick={handleSpinClick}
              className="md:hidden flex flex-col items-center justify-center py-5 px-[75px] md:text-[28px] leading-[120%] text-white bg-mainOrange rounded-[20px]"
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
