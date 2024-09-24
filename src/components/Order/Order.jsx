import React from "react";
import OrderDetailList from "../OrderDetailList/OrderDetailList";
import OrderDetail from "../OrderDetail/OrderDetail";

const Order = () => {
  const orders = [
    {
      id: 11,
      accountId: 7,
      totalprice: 1292000.0,
      date: "24-09-2024 11:47:06",
      checkout: {
        id: 1,
        method: "Thanh toán COD khi nhận hàng",
      },
      orderStatus: {
        id: 1,
        status: "Chờ xác nhận",
      },
      deliveryInformation: {
        id: 16,
        recipientName: "Kiên",
        phoneNumber: "0707710485",
        commune: "Xã Đông Bình",
        district: "Thị xã Bình Minh",
        province: "Tỉnh Vĩnh Long",
        description: "Đường 3/2",
      },
      itemOrdereds: [
        {
          id: 25,
          productId: 10,
          quantity: 1,
          price: 640000.0,
          productName: "Bánh trung thu KiDo đặc biệt",
          productPrice: 640000.0,
          productImage:
            "https://picture.miafood.vn/Gallery/ThumbPhone_20240807171732953.png",
        },
        {
          id: 26,
          productId: 9,
          quantity: 1,
          price: 416000.0,
          productName: "Bánh trung thu KiDo",
          productPrice: 416000.0,
          productImage:
            "https://picture.miafood.vn/Gallery/ThumbPhone_20240807174734671.png",
        },
        {
          id: 27,
          productId: 8,
          quantity: 1,
          price: 236000.0,
          productName: "Khô bò miếng mềm",
          productPrice: 236000.0,
          productImage:
            "https://picture.miafood.vn/Gallery/ThumbPhone_20240705013022546.jpg",
        },
      ],
    },
    {
      id: 12,
      accountId: 7,
      totalprice: 1292000.0,
      date: "24-09-2024 11:47:06",
      checkout: {
        id: 1,
        method: "Thanh toán COD khi nhận hàng",
      },
      orderStatus: {
        id: 2,
        status: "Đang giao hàng",
      },
      deliveryInformation: {
        id: 16,
        recipientName: "Kiên",
        phoneNumber: "0707710485",
        commune: "Xã Đông Bình",
        district: "Thị xã Bình Minh",
        province: "Tỉnh Vĩnh Long",
        description: "Đường 3/2",
      },
      itemOrdereds: [
        {
          id: 25,
          productId: 10,
          quantity: 1,
          price: 640000.0,
          productName: "Bánh trung thu KiDo đặc biệt",
          productPrice: 640000.0,
          productImage:
            "https://picture.miafood.vn/Gallery/ThumbPhone_20240807171732953.png",
        },
        {
          id: 26,
          productId: 9,
          quantity: 1,
          price: 416000.0,
          productName: "Bánh trung thu KiDo",
          productPrice: 416000.0,
          productImage:
            "https://picture.miafood.vn/Gallery/ThumbPhone_20240807174734671.png",
        },
        {
          id: 27,
          productId: 8,
          quantity: 1,
          price: 236000.0,
          productName: "Khô bò miếng mềm",
          productPrice: 236000.0,
          productImage:
            "https://picture.miafood.vn/Gallery/ThumbPhone_20240705013022546.jpg",
        },
      ],
    },
    {
      id: 13,
      accountId: 7,
      totalprice: 1292000.0,
      date: "24-09-2024 11:47:06",
      checkout: {
        id: 1,
        method: "Thanh toán COD khi nhận hàng",
      },
      orderStatus: {
        id: 3,
        status: "Đã nhận hàng",
      },
      deliveryInformation: {
        id: 16,
        recipientName: "Kiên",
        phoneNumber: "0707710485",
        commune: "Xã Đông Bình",
        district: "Thị xã Bình Minh",
        province: "Tỉnh Vĩnh Long",
        description: "Đường 3/2",
      },
      itemOrdereds: [
        {
          id: 25,
          productId: 10,
          quantity: 1,
          price: 640000.0,
          productName: "Bánh trung thu KiDo đặc biệt",
          productPrice: 640000.0,
          productImage:
            "https://picture.miafood.vn/Gallery/ThumbPhone_20240807171732953.png",
        },
        {
          id: 26,
          productId: 9,
          quantity: 1,
          price: 416000.0,
          productName: "Bánh trung thu KiDo",
          productPrice: 416000.0,
          productImage:
            "https://picture.miafood.vn/Gallery/ThumbPhone_20240807174734671.png",
        },
        {
          id: 27,
          productId: 8,
          quantity: 1,
          price: 236000.0,
          productName: "Khô bò miếng mềm",
          productPrice: 236000.0,
          productImage:
            "https://picture.miafood.vn/Gallery/ThumbPhone_20240705013022546.jpg",
        },
      ],
    },
    {
      id: 14,
      accountId: 7,
      totalprice: 1292000.0,
      date: "24-09-2024 11:47:06",
      checkout: {
        id: 1,
        method: "Thanh toán COD khi nhận hàng",
      },
      orderStatus: {
        id: 4,
        status: "Đã hủy",
      },
      deliveryInformation: {
        id: 16,
        recipientName: "Kiên",
        phoneNumber: "0707710485",
        commune: "Xã Đông Bình",
        district: "Thị xã Bình Minh",
        province: "Tỉnh Vĩnh Long",
        description: "Đường 3/2",
      },
      itemOrdereds: [
        {
          id: 25,
          productId: 10,
          quantity: 1,
          price: 640000.0,
          productName: "Bánh trung thu KiDo đặc biệt",
          productPrice: 640000.0,
          productImage:
            "https://picture.miafood.vn/Gallery/ThumbPhone_20240807171732953.png",
        },
        {
          id: 26,
          productId: 9,
          quantity: 1,
          price: 416000.0,
          productName: "Bánh trung thu KiDo",
          productPrice: 416000.0,
          productImage:
            "https://picture.miafood.vn/Gallery/ThumbPhone_20240807174734671.png",
        },
        {
          id: 27,
          productId: 8,
          quantity: 1,
          price: 236000.0,
          productName: "Khô bò miếng mềm",
          productPrice: 236000.0,
          productImage:
            "https://picture.miafood.vn/Gallery/ThumbPhone_20240705013022546.jpg",
        },
      ],
    }
  ];
  return (
    <div>
      <OrderDetailList orders={orders} />
    </div>
  );
};

export default Order;
