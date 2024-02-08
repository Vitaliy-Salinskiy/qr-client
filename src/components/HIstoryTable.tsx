import { useEffect, useState } from "react";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import { motion } from "framer-motion";

import { getUser } from "../utils";
import { IScanHistory, IUser } from "../interfaces";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useStore } from "../store/store";

const HistoryTable = () => {
  const [data, setData] = useState<IScanHistory[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { id, setId } = useStore();

  useEffect(() => {
    if (!id) {
      FingerprintJS.load()
        .then((fp) => fp.get())
        .then((result) => {
          setId(result.visitorId);
        });
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      setIsLoading(true);
      getUser(id)
        .then((data: IUser) => setData(data.scanHistory.reverse()))
        .finally(() => {
          setTimeout(() => {
            setIsLoading(false);
          }, 1500);
        });
    }
  }, [id]);

  return (
    <div className="rounded-xl bg-white w-full py-5 px-3 flex gap-4 flex-col items-center border-[8px] border-white">
      <h2 className="text-[34px] text-darkGrey underline underline-offset-8 font-bold">
        Історія сканувань
      </h2>
      {isLoading ? (
        <div className="w-full flex flex-col gap-3">
          {Array(3)
            .fill(0)
            .map((_, index) => (
              <motion.div
                className="w-full flex flex-col"
                key={index}
                animate={{ opacity: [0, 1], height: [0, 52], scale: [0.8, 1] }}
                transition={{
                  opacity: { type: "spring", delay: 0.15 * index },
                  scale: { type: "spring", delay: 0.15 * index },
                  height: {
                    duration: 0.1 * index,
                    type: "spring",
                    delay: 0.075 * index,
                  },
                }}
              >
                <SkeletonTheme baseColor="#F5A006" highlightColor="#fadba7">
                  <Skeleton className="w-full flex font-medium justify-between text-[8px] sm:text-[10px] md:text-lg lg:text-xl py-3 px-4 rounded-xl" />
                </SkeletonTheme>
              </motion.div>
            ))}
        </div>
      ) : data.length > 0 ? (
        data.map((item, index) => (
          <motion.div
            animate={{ opacity: [0, 1], scale: [0.8, 1] }}
            transition={{ type: "spring", delay: 0.2 * index }}
            key={item._id}
            className="w-full font-medium bg-mainOrange flex justify-between text-[8px] sm:text-[10px] md:text-lg lg:text-xl py-3 px-4 rounded-xl"
          >
            <span>{index + 1}</span>
            <span>Загальні кількість: {item.totalScans}</span>
            <span>
              Дата: {item.date.slice(0, 10).split("-").reverse().join("/")}
            </span>
          </motion.div>
        ))
      ) : (
        <motion.p
          animate={{ scale: [0, 1] }}
          transition={{ type: "spring", duration: 0.5 }}
          className="text-mainOrange"
        >
          Немає даних
        </motion.p>
      )}
    </div>
  );
};

export default HistoryTable;
