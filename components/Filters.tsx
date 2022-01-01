import { NextPage } from 'next'
import React, { useState } from 'react'
import useSWR from 'swr'
import { ICategory, ISize, IVariant, IProductFilter } from '../redux/slices/optionsSlice'
import fetchApi from '../utils/fetchApi'
import SearchInput from './form-element/SearchInput'

const Filters = () => {
    const [category, setCategory] = useState<string>()
    const [variant, setVariant] = useState<string>()
    const [size, setSize] = useState<string>()
    const [name, setName] = useState<string>()

    // fetch categories
    const { data: dataCategories, error: categoriesError } = useSWR('/categories', fetchApi)
    let categories: ICategory[] = []
    if (dataCategories) categories = dataCategories.data

    // fetch sizes
    const { data: dataSizes, error: sizesError } = useSWR('/sizes', fetchApi)
    let sizes: ICategory[] = []
    if (dataSizes) sizes = dataSizes.data

    if (categoriesError || sizesError) return <p>Fetch Options Error</p>

    console.log('FILTER: ', { categories, sizes })




    // console.log('NAME:', name)

    // filter by category handler
    // const filterCategoryHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    //     setCategory(e.target.value)
    //     setFilter({ ...filter, category: e.target.value })
    // }

    // // filter by variant handler
    // const filterVariantHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    //     setVariant(e.target.value)
    //     setFilter({ ...filter, variant: e.target.value })
    // }

    // // filter by size handler
    // const filterSizeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    //     setSize(e.target.value)
    //     setFilter({ ...filter, size: e.target.value })
    // }

    // // search by product name
    // const searchByNameHandler = (e: React.SyntheticEvent) => {
    //     e.preventDefault()
    //     setFilter({ ...filter, name })
    // }

    return (
        <section className="mt-8">
            <h1 className="title">Our Product</h1>
            <form>
                <div className="flex flex-col items-center mt-4 md:flex-row">
                    {/* INPUT SEARCH */}
                    <div className="relative h-[42px] flex-auto w-full md:flex-auto">
                        <SearchInput onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="flex flex-wrap w-full xs:justify-between md:flex-nowrap md:w-auto md:ml-2">
                        {/* CATEGORY SELECT BOX */}
                        <div>
                            <select name="categories" id="categories" className="form uppercase text-xs mt-2 mr-2 md:text-sm md:mt-0" value={category} onChange={() => { }} >
                                <option value="">Categories</option>
                                {categories && categories.map(category => (
                                    <option value={category._id} key={category._id}>{category.name}</option>
                                ))}

                            </select>
                        </div>
                        {/* VARIANT SELECT BOX */}

                        {/* SIZE SELECT BOX */}
                        <div>
                            <select name="sizes" id="sizes" className="form uppercase text-xs mt-2 md:text-sm md:mt-0" value={size} onChange={() => { }}>
                                <option value="">Sizes</option>
                                {sizes && sizes.map(size => (
                                    <option value={size._id} key={size._id}>{size.name}</option>
                                ))}

                            </select>
                        </div>
                    </div>
                </div>
            </form>

        </section>
    )
}

export default Filters
