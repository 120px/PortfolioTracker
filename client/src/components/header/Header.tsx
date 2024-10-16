import React from 'react'

const Header = () => {
    return (
        <div className='flex items-baseline'>
            <div className='pr-4'>
                <h2 className='font-semibold text-2xl bold'>Prysm</h2>
            </div>
            <div className=''>
                <a>Overview</a>
                <a>Research</a>
                <a>profile</a>
            </div>
        </div>
    )
}

export default Header