import React, { useEffect, useState } from 'react'
// import { GetStaticProps, GetServerSideProps, GetStaticPaths, NextPage, NextPageContext, GetStaticPropsContext } from 'next'
import Head from 'next/head'
import fetchApi from '../../utils/fetchApi'
import useSWR from 'swr'
import { useRouter } from 'next/router'
import ReactLoading from 'react-loading'
import { useAppSelector, useAppDispatch } from '../../redux/hooks'
import { IProduct } from '../../redux/slices/productSlice'
import ProductCard from '../../components/home-page/ProductCard'
import { useFormik } from 'formik'
import { ICartItem, addToCart } from '../../redux/slices/cartSlice'
import axios from 'axios'


const imageNotAvailable: string = 'https://res.cloudinary.com/dzaxf70c4/image/upload/v1636620809/img-not-available_exqzad.png'

//const ProductDetailPage: NextPage<{ product: IProduct }> = ({ product }) => {
const ProductDetailPage = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const _id = router.asPath.split('product/')[1]
    const { data: productData, error } = useSWR(`/products/${_id}`, fetchApi)

    const [selectImg, setSelectImg] = useState<string>(imageNotAvailable)
    const [selectColor, setSelectColor] = useState<string>('')
    const [selectSize, setSelectSize] = useState<string>('')

    const product = productData?.data.product as IProduct
    const productsSuggess = productData?.data.productsSuggess as IProduct[]

    const initialValues: ICartItem = {
        _id: '',
        name: '',
        image: '',
        price: 0,
        discount: 0,
        quantity: 1,
        variant: '',
        size: '',
    }

    const { values, setValues, handleChange, handleSubmit, errors, setErrors } = useFormik<ICartItem>({ initialValues, onSubmit })

    async function onSubmit(values: ICartItem) {

        if (values.size === '') {
            setErrors({ size: 'Please select a size' })
            return
        }
        try {
            dispatch(addToCart(values))
        } catch (error) {
            console.log('ERROR: ', error?.response.data.message)
        }

    }

    useEffect(() => {
        if (product) {
            const initValues = {
                _id: product._id as string,
                name: product.name,
                image: product.images[0],
                price: product.price,
                discount: product.discount,
                quantity: 1,
                variant: product.variants[0].name,
            }
            setSelectImg(product.images[0])
            setSelectColor(product.variants[0].name)
            setValues({ ...values, ...initValues })
        }
    }, [product])

    if (error) return <p>Something went wrong. Please try again.</p>
    if (!productData) return (<div className="w-full flex justify-center items-center mt-2 min-h-[calc(100vh-64px-64px-272px-90px-32px-25px)]">
        <div className="flex flex-col items-center justify-center">
            <p className="text-gray-600">LOADING PRODUCT</p>
            <ReactLoading type="bars" color="#6B7280" />
        </div>
    </div>)

    return (
        <main className="container py-4">
            <Head>
                <title>Ecommerce Website: {product.name}</title>
                <meta name="description" content="Ecommerce Website" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="grid grid-cols-12 h-full mt-8">
                {/* left side: show list of thumb images */}
                <div className="col-span-12 md:col-span-6 flex">
                    <div className="flex-none flex flex-col space-y-4 mr-4 cursor-pointer">
                        {product.images && product.images.map((image, index) => (
                            <img key={index} src={image} alt={product.name} className={`w-[80px] sm:w-[100px] border-gray-700 ${image === selectImg ? 'border shadow-lg' : ''}`} onClick={() => setSelectImg(image)} />
                        ))}
                    </div>
                    {/* center side: show big image, it is result of selected image in left side */}
                    <div className=" flex-auto overflow-hidden">
                        <img src={selectImg} className="w-full object-center object-cover" />
                    </div>
                </div>

                {/* right side: information of product: name, description, price, colors, sizes, add to cart,... */}
                <div className="col-span-12 mt-4 md:col-span-6 md:pl-4 md:mt-0">
                    <form onSubmit={handleSubmit}>
                        <h1 className="font-poppins text-xl md:text-2xl font-bold tracking-wide">{product.name}</h1>
                        <p className="text-xl mt-2 font-semibold">{product.price}€</p>
                        <p className="text-sm text-gray-500 mt-2">{product.description}</p>
                        <p className="text-sm mt-4 ">Color: <span className="font-bold">{values.variant}</span></p>

                        {/* color */}
                        <div className="flex space-x-3 mt-2 ml-1">
                            {product.variants.map(variant => (
                                <div key={variant._id} style={{ width: '20px', height: '20px', backgroundColor: variant.colorHex, cursor: 'pointer' }} className={`${variant.name === values.variant ? 'ring-1 ring-offset-2 ring-gray-700 border' : ' border'}`} onClick={() => {
                                    //setSelectColor(variant.name)
                                    setValues({ ...values, variant: variant.name })
                                }} />
                            ))}
                        </div>

                        {/* size */}
                        <div className="mt-6 w-full">
                            <select name="sizes" id="sizes" className="form w-full uppercase" value={values.size} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                // setSelectSize(e.target.value)
                                setValues({ ...values, size: e.target.value })
                            }}>
                                <option value="">Select Size</option>
                                {product.sizes && product.sizes.map(size => (
                                    <option value={size.name} key={size._id} >{size.name}</option>
                                ))}

                            </select>
                            {errors?.size && <p className="text-red-500 mt-1">{errors.size}</p>}
                        </div>

                        <div className="text-center mt-6">
                            <button className="btn w-full" type="submit">Add to cart</button>
                        </div>
                    </form>
                </div>
            </div>
            {/* PRODUCTS SUGGESSION */}
            <div className="mb-6">
                <p className="text-xl font-semibold tracking-wide mt-4">Similar items</p>
                <p className="text-base text-gray-500">How about these?</p>
                <div className="grid gap-y-4 md:gap-y-0 md:grid-cols-4 mt-4 ">
                    {productsSuggess && productsSuggess.map(product => (
                        <ProductCard product={product} key={product._id} />
                    ))}
                </div>
            </div>
        </main>
    )
}

export default ProductDetailPage