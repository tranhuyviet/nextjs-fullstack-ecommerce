import React from 'react'
import ReactLoading from 'react-loading'
import classNames from 'classnames'

type IButton = {
    title: string
    loading: boolean
}

function SubmitButton({ title, loading }: IButton) {
    return (
        <button className={classNames("mt-6 btn flex justify-center items-center relative ", { 'bg-gray-400 border-gray-400 cursor-not-allowed': loading })} type='submit' disabled={loading}>
            {loading && <ReactLoading type='spinningBubbles' height={20} width={20} />}
            <span className="ml-2 uppercase">{title}</span>
        </button>
    )
}

export default SubmitButton
