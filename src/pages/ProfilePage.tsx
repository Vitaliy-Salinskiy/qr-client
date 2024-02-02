import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import history_image from "../assets/images/qr-code-orange.png"
import shop_image from "../assets/images/shop-orange.png"
import { FaUser } from "react-icons/fa";

const ProfilePage = () => {
  return (
    <div className='h-screen w-full flex justify-center items-center'>
      <div className="max-w-screen-2xl w-full h-full flex flex-col justify-around items-center md:flex-row px-[10px] md:px-[0px] md:justify-between">
        <div className="md:h-full md:w-[250px] md:bg-[#2b2942] md:pt-[50px]">
          <div className="flex flex-col justify-center items-center gap-[10px]">
            <div className="h-[100px] w-[100px] bg-mainOrange flex justify-center items-center rounded-full">
              <div className="w-[80%] h-[80%] bg-white rounded-full flex justify-center items-center">
                <FaUser className="text-5xl text-midDarkGrey" />
              </div>
            </div>
            <h2 className="text-white text-lg font-medium">Yura Chyp</h2>
          </div>
          
          <div className="max-w-[640px] w-full flex justify-between items-center flex-wrap gap-[10px] md:px-[10px] md:mt-[20px] md:justify-center">
            <Link to="/users" className="h-[100px] w-[100px] p-[15px] bg-[#2b2942] md:bg-midDarkGrey rounded-lg">
              <img src={history_image} alt="" />
            </Link>
            <Link to="/shop" className="h-[100px] w-[100px] p-[15px] bg-[#2b2942] md:bg-midDarkGrey rounded-lg">
              <img src={shop_image} alt="" />
            </Link>
          </div>
        </div>
        
        <div className="max-w-[640px] w-full h-[400px] bg-white-opacity-50 rounded-t-xl flex flex-col justify-around gap-[10px] md:w-[400px] md:h-[350px] md:mr-[10%] lg:mr-[200px] xl:mr-[400px]">
          <h2 className="text-center mt-[20px] text-3xl font-medium text-midDarkGrey">Your SC points</h2>
          <div className="flex justify-around">
            <motion.div animate={{ scale: [0, 1] }}
					  	className={`bg-[#2b2942] text-mainOrange flex justify-center items-center rounded-xl text-[72px] xl:text-[90px] h-[90px] w-[90px]`}
					  >
              <p>9</p>
            </motion.div>
            <motion.div animate={{ scale: [0, 1] }}
					  	className={`bg-[#2b2942] text-mainOrange flex justify-center items-center rounded-xl text-[72px] xl:text-[90px] h-[90px] w-[90px]`}
					  >
              <p>9</p>
            </motion.div>
            <motion.div animate={{ scale: [0, 1] }}
					  	className={`bg-[#2b2942] text-mainOrange flex justify-center items-center rounded-xl text-[72px] xl:text-[90px] h-[90px] w-[90px]`}
					  >
              <p>9</p>
            </motion.div>
          </div>
          <div className="flex flex-col justify-center items-center gap-[10px]">
            <h2 className="mt-[20px] text-lg">Your last scan</h2>
            <p className="text-xl font-bold">20:30 02.02.2024</p>
          </div>
          <Link to="/" className="bg-midDarkGrey text-lg font-bold text-mainOrange w-full text-center py-2 uppercase cursor-pointer transition-all">
            Go to QR page
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage;