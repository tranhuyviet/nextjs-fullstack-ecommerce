import React from 'react'

type Props = {
    onChange: React.ChangeEventHandler<HTMLInputElement>
}

const SearchInput = ({ onChange }: Props) => {
    return (
        <div className="relative">
            <input type="text" placeholder="search product" className="search-input w-full form" onChange={onChange} />
            <button className="bg-gray-700 py-[2px] px-2 absolute right-1 top-1 h-[34px] rounded-md" type="submit">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5  text-gray-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </button>
        </div>
    )
}

export default SearchInput
