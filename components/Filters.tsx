import React, { useState } from 'react'
import SearchInput from './form-element/SearchInput'
import { useAppSelector, useAppDispatch } from '../redux/hooks'
import { setFilter } from '../redux/slices/optionsSlice'

const Filters = () => {
    const { categories, variants, sizes, filter } = useAppSelector(state => state.options)
    const dispatch = useAppDispatch()

    const [name, setName] = useState<string>('')

    // filter by category handler
    const filterCategoryHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(setFilter({ ...filter, category: e.target.value, page: 1 }))
    }

    // filter by variant handler
    const filterVariantHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(setFilter({ ...filter, variant: e.target.value, page: 1 }))
    }

    // filter by size handler
    const filterSizeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(setFilter({ ...filter, size: e.target.value, page: 1 }))
    }

    // search by product name
    const searchByNameHandler = (e: React.SyntheticEvent) => {
        e.preventDefault()
        dispatch(setFilter({ ...filter, name, page: 1 }))
    }

    // console.log('filter', filter)

    return (
        <section className="mt-8">
            <h1 className="title">Our Product</h1>
            <form onSubmit={searchByNameHandler}>
                <div className="flex flex-col items-center mt-4 md:flex-row">
                    {/* INPUT SEARCH */}
                    <div className="relative h-[42px] flex-auto w-full md:flex-auto">
                        <SearchInput onChange={(e) => setName(e.target.value)} name={name} setName={setName} />
                    </div>
                    <div className="flex flex-wrap w-full xs:justify-between md:flex-nowrap md:w-auto md:ml-2">
                        {/* CATEGORY SELECT BOX */}
                        <div>
                            <select name="categories" id="categories" className="form uppercase text-xs mt-2 mr-2 md:text-sm md:mt-0" value={filter.category} onChange={filterCategoryHandler} >
                                <option value="">Categories</option>
                                {categories && categories.map(category => (
                                    <option value={category._id} key={category._id}>{category.name}</option>
                                ))}

                            </select>
                        </div>

                        {/* VARIANT SELECT BOX */}
                        <div>
                            <select name="variants" id="variants" className="form uppercase text-xs mt-2 mr-2 md:text-sm md:mt-0" value={filter.variant} onChange={filterVariantHandler}>
                                <option value="">Colors</option>
                                {variants && variants.map(variant => (
                                    <option value={variant._id} key={variant._id}>{variant.name}</option>
                                ))}

                            </select>
                        </div>

                        {/* SIZE SELECT BOX */}
                        <div>
                            <select name="sizes" id="sizes" className="form uppercase text-xs mt-2 md:text-sm md:mt-0" value={filter.size} onChange={filterSizeHandler}>
                                <option value="">Sizes</option>
                                {sizes && sizes.map(size => (
                                    <option value={size._id} key={size._id}>{size.name}</option>
                                ))}

                            </select>
                        </div>
                    </div>
                </div>
            </form>

        </section >
    )
}

export default Filters
