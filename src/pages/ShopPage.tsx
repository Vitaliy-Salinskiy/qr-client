import { useEffect, useRef, useState } from "react";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useMediaQuery } from "react-responsive";

import { GoodItem } from "../components/GoodItem";
import { IProduct, IUser } from "../interfaces";
import { getProducts, getUser, createRequest, playPop } from "../utils";
import Popup from "../components/Popup";
import { useStore } from "../store/store";

const ShopPage = () => {
  const { setResponse, id, setId, resetResponse } = useStore();

  const [user, setUser] = useState<IUser>();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [currentItem, setCurrentItem] = useState<IProduct | null>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const initialRender = useRef<boolean>(true);

  useEffect(() => {
    if (!id) {
      FingerprintJS.load()
        .then((fp) => fp.get())
        .then((result) => {
          setId(result.visitorId);
          getUserData(result.visitorId);
        });
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      getUserData(id);
    }
  }, [isLoading]);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      fetchData();
    }

    return () => {
      resetResponse();
    };
  }, []);

  const isTwoXlScreen = useMediaQuery({
    query: "(min-width: 1530px)",
  });

  const isXlScreen = useMediaQuery({
    query: "(min-width: 1024px) and (max-width: 1530px)",
  });

  const isMobile = useMediaQuery({
    query: "(max-width: 768px)",
  });

  const fetchData = async () => {
    setIsLoading(true);
    await getProducts()
      .then((data) => setProducts(data))
      .finally(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, 2250);
      });
  };

  const getUserData = async (id: string) => {
    await getUser(id)
      .then((data) => setUser(data))
      .catch(() => {});
  };

  const handleRequestSend = async (
    userId: string | null,
    productId: string
  ) => {
    if (userId) {
      try {
        await createRequest(userId, productId);
        setResponse("Запит успішно відправлено");
      } catch (error) {
        setResponse("Вам не вистачає балів");
        setCurrentItem(null);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleYesClick = async () => {
    playPop();
    await handleRequestSend(user?.id as string, currentItem?._id as string);
    await getUserData(user?.id as string);
    setCurrentItem(null);
  };

  const handleNoClick = () => {
    playPop();
    setCurrentItem(null);
  };

  const skeletonCount = isMobile
    ? 4
    : isXlScreen && !isTwoXlScreen
    ? 8
    : isTwoXlScreen
    ? 8
    : 6;

  return (
    <div className="pt-5">
      <Popup />

      <div className="w-full appContainer flex justify-between items-center px-2">
        <Link
          to="/"
          className="outline-none text-[14px] font-bold text-center leading-[110%] bg-white text-midDarkGrey p-2 rounded-xl cursor-pointer"
        >
          На головну
        </Link>

        {user?.name && user?.surname && (
          <div className="text-midDarkGrey text-sm sm:text-lg bg-white py-1 px-2 rounded-lg font-bold shadow-white shadow-sm">
            <span className="text-mainOrange">
              {user?.name} {user?.surname}{" "}
            </span>
            : {user?.timesScanned} points
          </div>
        )}
      </div>

      <h2 className="text-[36px] sm:text-[50px] font-bold text-center leading-[110%] w-full bg-white text-midDarkGrey mt-6 py-[20px]">
        Магазин
      </h2>

      {currentItem ? (
        <div className="w-full h-screen flex items-center justify-center backdrop-blur-sm fixed top-0 z-20">
          <div className="max-w-[300px] bg-white shadow-sm shadow-white rounded-lg flex flex-col justify-around items-center gap-[20px] p-[20px]">
            <h2 className="max-w-[280px] text-center whitespace-normal">
              Ви впевнені, що купите{" "}
              <span className="text-mainOrange">{currentItem.name}</span>?
            </h2>
            <div className="flex gap-[20px]">
              <button
                className="w-[70px] h-[30px] border-2 border-mainOrange bg-mainOrange hover:bg-transparent outline-none text-white hover:text-mainOrange rounded-md transition-colors disabled:opacity-75"
                onClick={handleYesClick}
              >
                Так
              </button>
              <button
                className="w-[70px] h-[30px] border-2 border-midDarkGrey bg-midDarkGrey hover:bg-transparent outline-none text-white hover:text-midDarkGrey rounded-md transition-colors disabled:opacity-75"
                onClick={handleNoClick}
              >
                Ні
              </button>
            </div>
          </div>
        </div>
      ) : null}

      <div className="appContainer mt-20 mb-10 flex justify-center">
        <div className="flex flex-wrap justify-around items-center gap-[20px] md:gap-[30px] px-[20px] md:max-w-[768px] lg:max-w-[1024px]">
          <SkeletonTheme baseColor="#fff" highlightColor="#3F3D56">
            {isLoading ? (
              Array(skeletonCount)
                .fill(0)
                .map((_, index) => (
                  <motion.div
                    key={index}
                    animate={{ scale: [0, 1], opacity: [0.5, 1] }}
                    transition={{ type: "spring", delay: 0.1 * index }}
                  >
                    <Skeleton className="h-[230px] w-[190px] bg-white flex flex-col justify-around items-center rounded-xl cursor-pointer" />
                  </motion.div>
                ))
            ) : products && products.length > 0 ? (
              products.map((item: IProduct, index: number) => (
                <motion.div
                  animate={{ scale: [0, 1], opacity: [0.5, 1] }}
                  transition={{ type: "spring", duration: 0.3 }}
                  key={index + "product"}
                >
                  <GoodItem product={item} setCurrItem={setCurrentItem} />
                </motion.div>
              ))
            ) : (
              <motion.h2
                animate={{ scale: [0, 1] }}
                transition={{ type: "spring", duration: 0.5 }}
                className="text-[34px] text-white font-bold"
              >
                There are no products so far
              </motion.h2>
            )}
          </SkeletonTheme>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
