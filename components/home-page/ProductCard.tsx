import { NextPage } from 'next'
import Image from 'next/image'
import React from 'react'
import { IProduct } from '../../redux/slices/productSlice'
import { IVariant } from '../../redux/slices/optionsSlice'
import { useRouter } from 'next/router'

const imageNotAvailable = 'https://res.cloudinary.com/dzaxf70c4/image/upload/v1636620809/img-not-available_exqzad.png'

const ProductCard: NextPage<{ product: IProduct }> = ({ product }) => {
    const router = useRouter()
    return (
        <div className="text-center hover:cursor-pointer border hover:shadow-lg transition duration-500 " onClick={() => {
            router.push('/product/' + product._id)
        }}>
            <div className="w-full flex justify-center overflow-hidden pt-4">
                <img src={product.images[0] || imageNotAvailable} alt={product.name} className="object-cover object-center hover:transform transition duration-700 hover:scale-110 w-[260px] h-[300px]" />
            </div>
            <div className="pb-4 px-4">
                <h2 className="truncate text-gray-500 font-poppins text-sm mt-2 mb-1 text-center">{product.name}</h2>
                <p className="font-semibold text-lg font-poppins text-center mt-2">{product.price}€</p>
                <div className="flex justify-center mt-2 space-x-1">
                    {product.variants.map(variant => (
                        <div key={variant._id} className="h-[14px] w-[14px] border rounded" style={{ backgroundColor: variant.colorHex }} />
                    ))}
                </div>
                <div className="flex justify-center mt-2 space-x-2 uppercase font-semibold font-poppins text-gray-500 underline">
                    {product.sizes.map(size => (
                        <p key={size._id} className="">{size.name}</p>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ProductCard
