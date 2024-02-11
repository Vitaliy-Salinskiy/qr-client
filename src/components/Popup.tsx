import { useState, useEffect, useRef } from "react";

import { useStore } from "../store/store";

import { mail } from "../assets/images/index";

const Popup = () => {
  const { response, removeResponse } = useStore();
  const [isVisible, setIsVisible] = useState(false);
  const timeoutId = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setIsVisible(false);

    if (response.length > 0 && !isVisible) {
      setIsVisible(true);
      timeoutId.current = setTimeout(() => {
        setIsVisible(false);
        timeoutId.current = setTimeout(() => {
          removeResponse();
        }, 400);
      }, 3000);
    }

    return () => {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
        timeoutId.current = null;
      }
    };
  }, [response]);

  useEffect(() => {
    if (response.length > 1) {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
        timeoutId.current = null;
      }
      setIsVisible(false);
      timeoutId.current = setTimeout(() => {
        removeResponse();
      }, 200);
    }
  }, [response]);

  return (
    <div
      className="z-20 w-[80%] sm:min-w-[320px] sm:max-w-[355px] min-h-[85px] p-[10px] cursor-pointer bg-white fixed transition-all overflow-hidden duration-500 bottom-[30px] right-[-100%] rounded-lg shadow-white drop-shadow-sm shadow-sm flex items-center gap-[20px]"
      style={!isVisible ? { right: "-100%" } : { right: "20px" }}
    >
      <div className="w-[85px] h-[55px] flex justify-center items-center">
        <img height={50} width={50} src={mail} alt="mail" />
      </div>
      <div className=" flex flex-col transition-all duration-1000 justify-between items-start">
        {response && (
          <p className="h-[48px] text-md text-midDarkGrey font-medium text-ellipsis">
            {response[0]}
          </p>
        )}
      </div>
    </div>
  );
};

export default Popup;
