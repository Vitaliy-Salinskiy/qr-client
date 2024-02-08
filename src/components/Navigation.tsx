import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { motion } from "framer-motion";
import qrWhite from "../assets/images/qr-code-white.png";
import shopWhite from "../assets/images/shop-white.png";
import profileWhite from "../assets/images/profile.png";
import wheelWhite from "../assets/images/wheel.png";

const Navigation = ({ id } : { id: string | null}) => {
    const isMobile = useMediaQuery({
        query: "(max-width: 768px)",
    });

    return (
        <motion.div
            animate={{
            x: isMobile ? [] : ["220%", "0%"],
            y: isMobile ? ["100%", "0%"] : [],
            }}
            transition={{ type: "spring", duration: 1 }}
            className="w-[185px] flex justify-center gap-[5px] p-[5px] bg-white fixed shadow-mainOrange drop-shadow-lg rounded-t-3xl shadow-sm md:rounded-3xl bottom-0 left-[50%] ml-[-47.5px] md:bottom-[40px] md:right-[40px] md:left-auto"
        >
            <Link
                to={`statistic/${id}`}
                className="nav-item hover:scale-125 hover:translate-y-[-15px] hover:translate-x-[-8px]"
            >
                <img height={25} width={25} src={qrWhite} alt="qr image" />
            </Link>
            <Link
                to="profile"
                className="nav-item hover:scale-125 hover:translate-y-[-15px]"
            >
                <img
                    height={25}
                    width={25}
                    src={profileWhite}
                    alt="profile image"
                />
            </Link>
            <Link
            to="wheel"
            className="nav-item hover:scale-125 hover:translate-y-[-15px]"
            >
                <img height={25} width={25} src={wheelWhite} alt="wheel image" />
            </Link>
            <Link
            to="shop"
            className="nav-item hover:scale-125 hover:translate-y-[-15px] hover:translate-x-[8px]"
            >
                <img height={25} width={25} src={shopWhite} alt="shop image" />
            </Link>
        </motion.div>
    )
}

export default Navigation;