import React, { useEffect, ReactChildren } from 'react'
import Footer from './Footer';
import Navbar from './Navbar/Navbar';
import fetchApi from '../utils/fetchApi'
import useSWR from 'swr'
import { useAppDispatch } from '../redux/hooks'
import { setCategories, setVariants, setSizes } from '../redux/slices/optionsSlice'

type Props = {
    children: ReactChildren
}

const Layout = ({ children }: Props) => {
    const dispatch = useAppDispatch()

    const { data: categories, error: errorCategories } = useSWR('/categories', fetchApi)
    const { data: variants, error: errorVariants } = useSWR('/variants', fetchApi)
    const { data: sizes, error: errorSizes } = useSWR('/sizes', fetchApi)

    useEffect(() => {
        if (categories) dispatch(setCategories(categories.data))
        if (variants) dispatch(setVariants(variants.data))
        if (sizes) dispatch(setSizes(sizes.data))
    }, [categories, variants, sizes, dispatch])

    if (errorCategories || errorVariants || errorSizes) return <p>Error....</p>
    return (
        <div className="relative">
            <Navbar />
            <div className="min-h-[calc(100vh-64px-64px)]">
                <div className="mt-16" />
                {children}
            </div>
            <Footer />
        </div>
    );
};

export default Layout;