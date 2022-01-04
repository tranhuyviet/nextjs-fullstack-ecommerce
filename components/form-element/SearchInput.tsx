import React from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { setFilter } from '../../redux/slices/optionsSlice'

type Props = {
    onChange: React.ChangeEventHandler<HTMLInputElement>
    name?: string
    setName: React.Dispatch<React.SetStateAction<string>>

}

const SearchInput = ({ onChange, name, setName, }: Props) => {
    const dispatch = useAppDispatch()
    const { filter } = useAppSelector(state => state.options)
    const clearTextHandle = () => {
        setName('')
        dispatch(setFilter({ ...filter, name: '' }))
    }

    return (
        <div className="relative">
            <input type="text" placeholder="search product" className="search-input w-full form pr-[84px]" onChange={onChange} value={name} />
            <div className="absolute right-0 top-0 h-[42px]  flex items-center justify-between">
                {name && name.length > 0 &&
                    <div className="cursor-pointer flex justify-center items-center w-[42px] h-[42px] transition duration-300" onClick={clearTextHandle}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        <div className="w-[1px] h-2/3 bg-gray-300 ml-[5px] mr-[5px]" />
                    </div>
                }
                <div className="mr-[8px] h-[42px] flex justify-center items-center">
                    <button className="bg-gray-700 rounded-md p-[6px]" type="submit">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5  text-gray-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SearchInput
