import React from 'react'
import { useAppSelector } from '../../redux/hooks'
import Link from 'next/link'

const CartMenu = () => {
    const resCart = useAppSelector(state => state.cart)
    const items = resCart.cart
    const totalItems = resCart.totalItems
    const subTotal = resCart.subTotal

    return (
        <div className="absolute top-7 border-2 border-gray-800  p-6 mt-4 bg-white w-[320px] z-40" style={{ right: -2 }}>
            <div className="relative">
                {(items && totalItems > 0) ? (
                    <div>
                        {items && items.map(item => (
                            <div key={item._id} className="flex mt-2 border-b pb-2">
                                <div className="flex-none">
                                    <img src={item.image} alt={item.name} className="w-[80px]" />
                                </div>
                                <div className="pl-2 max-w-[190px]">
                                    <h2 className="text-center font-bold text truncate">{item.name}</h2>
                                    <p className="font-bold text-red-500">${item.price}</p>
                                    <p>Color: <span className="capitalize">{item.variant}</span></p>
                                    <p>Size: <span className="uppercase">{item.size}</span></p>
                                    <p>Quantity: <span className="font-bold">{item.quantity}</span></p>
                                </div>
                            </div>
                        ))}
                        <div>
                            <div className="flex justify-between items-center mt-4">
                                <p className="text-base">Subtotal ({totalItems} items):</p>
                                <p className="text-base font-poppins font-semibold tracking-wider">${subTotal}</p>
                            </div>
                            <Link href="/user/cart"><a className="btn mt-4">Shopping Cart</a></Link>
                        </div>
                    </div>
                ) : (
                    <div>
                        <h2 className="text-center font-bold text-lg">YOUR BAG IS EMPTY</h2>
                        <p className="text-center text-gray-500 mt-2">Go. Go fill it up with all your fashion hopes and dreams.</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default CartMenu
