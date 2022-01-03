import React from 'react'
import classNames from 'classnames'
import { useAppSelector, useAppDispatch } from '../../redux/hooks'
import { setFilter } from '../../redux/slices/optionsSlice'

type Props = {
    total: number
}

const Pagination = ({ total }: Props) => {
    const { filter } = useAppSelector(state => state.options)
    const dispatch = useAppDispatch()

    const limit = filter.limit
    const numberOfPages = Math.ceil(total / limit)

    let arrayOfPages: number[] = []
    for (let i = 1; i <= numberOfPages; i++) {
        arrayOfPages.push(i)
    }

    // PREV BUTTON 
    const handlePrev = () => {
        if (filter.page > 1) {
            const page = filter.page - 1
            dispatch(setFilter({ ...filter, page }))
        }
        return
    }

    // NEXT BUTTON
    const handleNext = () => {
        if (filter.page < numberOfPages) {
            const page = filter.page + 1
            console.log(page)
            dispatch(setFilter({ ...filter, page }))
        }
    }

    // PAGE SELETED
    const handlePageSelected = (page: number) => {
        console.log(page)
        dispatch(setFilter({ ...filter, page }))
    }

    // console.log(filter)

    return (
        <section className="pb-4 flex justify-center items-center">
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-[30px] w-[30px] border py-1 cursor-pointer mr-1 hover:shadow-lg transition duration-300 hover:bg-gray-700 hover:border-gray-700 hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" onClick={handlePrev}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </div>
            {arrayOfPages.map(page => (
                <p key={page} className={classNames("border text-center px-1 py-1 mx-1 w-[30px] h-[30px] cursor-pointer hover:shadow-lg transition duration-300 hover:bg-gray-700 hover:border-gray-700 hover:text-white", { 'bg-gray-700 border-gray-700 text-white shadow-xl': page === filter.page })} onClick={() => handlePageSelected(page)}>{page}</p>
            ))}
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-[30px] w-[30px] border py-1 cursor-pointer ml-1 hover:shadow-lg transition duration-300 hover:bg-gray-700 hover:border-gray-700 hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" onClick={handleNext}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </div>
        </section>
    )
}

export default Pagination
