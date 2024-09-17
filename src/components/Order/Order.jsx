import React from 'react'
import ItemOrderList from '../ItemOrderList/ItemOrderList'
import Checkout from '../Checkout/Checkout'

const Order = () => {
  return (
    <div className="w-full flex">
      <div className="w-2/3 border-2 border-white p-5 bg-slate-50">
        <ItemOrderList />
      </div>
      <div className="w-1/3 border-2 border-white p-5 bg-slate-50">
        <Checkout />
      </div>
    </div>
  )
}

export default Order