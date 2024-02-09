import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { motion } from "framer-motion";
import { shopWhite, profile, wheel, qrCodeWhite } from "../assets/images/index";

const Navigation = ({ id }: { id: string | null }) => {
  const isMobile = useMediaQuery({
    query: "(max-width: 768px)",
  });

  const navItems = [
    {
      to: `statistic/${id}`,
      src: qrCodeWhite,
      alt: "qr image",
      className:
        "nav-item hover:scale-125 hover:translate-y-[-15px] hover:translate-x-[-8px]",
    },
    {
      to: "profile",
      src: profile,
      alt: "profile image",
      className: "nav-item hover:scale-125 hover:translate-y-[-15px]",
    },
    {
      to: "wheel",
      src: wheel,
      alt: "wheel image",
      className: "nav-item hover:scale-125 hover:translate-y-[-15px]",
    },
    {
      to: "shop",
      src: shopWhite,
      alt: "shop image",
      className:
        "nav-item hover:scale-125 hover:translate-y-[-15px] hover:translate-x-[8px]",
    },
  ];

  return (
    <motion.div
      animate={{
        x: isMobile ? [] : ["220%", "0%"],
        y: isMobile ? ["100%", "0%"] : [],
      }}
      transition={{ type: "spring", duration: 1 }}
      className="w-[185px] flex justify-center gap-[5px] p-[5px] bg-white fixed shadow-mainOrange drop-shadow-lg rounded-t-3xl shadow-sm md:rounded-3xl bottom-0 left-[50%] ml-[-92.5px] md:bottom-[40px] md:right-[40px] md:left-auto"
    >
      {navItems.map((item, index) => (
        <Link key={index} to={item.to} className={item.className}>
          <img height={25} width={25} src={item.src} alt={item.alt} />
        </Link>
      ))}
    </motion.div>
  );
};

export default Navigation;
