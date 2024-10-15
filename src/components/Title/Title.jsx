import React from "react";
import transport from "../../assets/transport.png";
import freeship from '../../assets/free-shipping.png'
import quality from '../../assets/quality-product.png'
import delivery from '../../assets/delivery.png'
const Title = () => {
  return (
    <div className="w-full my-10">
      <div className="py-5">
        <p className="text-center font-bold text-2xl">Tại sao chọn TAKEOUT FOOD ?</p>
      </div>
      <div className=" flex justify-center items-center flex-wrap">
        <div className="flex flex-col items-center px-10">
          <img src={delivery} alt="" className="w-16" />
          <p className="font-bold text-xl">Giao hàng nhanh</p>
          <p className="font-medium text-lg text-gray-300">Nội thành TPHCM</p>
        </div>
        <div className="flex flex-col items-center px-10">
          <img src={freeship} alt="" className="w-16" />
          <p className="font-bold text-xl">Miễn phí Ship</p>
          <p className="font-medium text-lg text-gray-300">Đơn hàng từ 999k</p>
        </div>
        <div className="flex flex-col items-center px-10">
          <img src={quality} alt="" className="w-16" />
          <p className="font-bold text-xl">Hàng chính hãng</p>
          <p className="font-medium text-lg text-gray-300">An toàn, chất lượng</p>
        </div>
       
      </div>
    </div>
  );
};
export default Title;
