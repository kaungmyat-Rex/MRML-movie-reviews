import kpayQR from "../assets/kpayQR.jpg";

const Footer = () => {
  return (
    <div className="flex flex-row pt-16 pb-9 bg-gradient-to-r from-gradientColor1 to-gradientColor2">
      <div className="flex-1 ml-4 flex flex-col items-start text-left sm:items-center">
        <h1 className="bg-gradient-to-r from-purple-500 to-pink-500 inline-block text-2xl rounded-sm pl-2 pr-2 font-bold mb-7 md:text-3xl">
          MRMl
        </h1>
        <div className="md:flex gap-2">
          <p className="text-gray-400 font-Nunito font-extrabold mt-1 text-sm text-left md:text-base">
            ©2023 present
          </p>
          <p className="text-gray-400 font-Nunito font-extrabold mt-1  text-sm  text-left md:text-base">
            All Rights Reserved
          </p>
          <p className="text-gray-400 font-Nunito font-extrabold mt-1  text-sm  text-left md:text-base">
            By Kaung Myat
          </p>
        </div>
      </div>
      <div className="flex-1 flex flex-col items-start mr-4 md:items-center">
        <p className="bg-gradient-to-r from-purple-500 to-pink-500 inline-block bg-clip-text text-transparent text-base font-bold -mt-1 mb-7 md:text-xl">
          Donate for migrant and mocha rakhine state
        </p>
        <div className="flex flex-col md:flex-row-reverse md:items-center">
          <span className="text-gray-400 font-Nunito font-extrabold text-sm mb-5 ml-3">
            <p>KBZPay</p>
            <p>Aung Kaung Myat</p>
          </span>
          <img
            src={kpayQR}
            className="w-32 h-32 object-contain md:w-40 md:h-40"
            alt="kpay"
          />
        </div>
      </div>
    </div>
  );
};

export default Footer;
