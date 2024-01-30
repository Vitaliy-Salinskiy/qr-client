import { useEffect, useState } from 'react';
import qrIcon from '../assets/images/scans-history.png';

const Loader = () => {
	const [imageDegVal, setImageDegVal] = useState(0);
	const [scaleVal, setScaleVal] = useState(100);
  
	useEffect(() => {
	  setImageDegVal(0);
	  setScaleVal(100);
	  showAnimation();
	  setInterval(() => {
		setImageDegVal(0);
		setScaleVal(100);
		showAnimation();  
	  }, 2000);
	}, []);
  
	const showAnimation = ():void => {
	  setTimeout(() => {
		setScaleVal(150);
		setImageDegVal(360);
	  }, 500);
	}
  
	return (
	  <div className='h-screen w-full flex justify-center items-center gap-[50px] bg-white-opacity-80 fixed top-0 left-0 right-0 bottom-0'>
		<img className={`h-[60px] w-[60px] transition-all duration-1000 scale-${scaleVal} rotate-[${imageDegVal}deg]`} src={qrIcon} alt="qr-image" />
	  </div>
	);
}

export default Loader