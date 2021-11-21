import React from 'react';

/**
 * Loading
 *
 * @returns {JSX.Element}
 */
export default function Loading(){
    return (
        <div className='container text-center load'>
            <div className="lds-hourglass"/>
        </div>
    )
}