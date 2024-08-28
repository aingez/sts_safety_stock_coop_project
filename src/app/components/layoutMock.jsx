import React from 'react'

function layoutMock({laneNumber, rowNumber}) {
    // create mock layout of warehouse
    // with antd table to display on editor page
    return (
        <div className='bg-neutral-200 rounded-lg p-5 shadow-lg'>
            <table className="border-collapse">
                <tbody>
                    <tr>
                        <td></td>
                        {[...Array(rowNumber)].map((_, rowIndex) => (
                            <td key={rowIndex} className='text-center pb-0 text-s font-light opacity-40'>
                                {rowIndex + 1}
                            </td>
                        ))}
                    </tr>
                    {[...Array(laneNumber)].map((_, laneIndex) => (
                        <tr key={laneIndex}>
                            <td className='pr-2 align-middle text-s font-light opacity-40'>{laneIndex + 1}</td>
                            {[...Array(rowNumber)].map((_, rowIndex) => (
                                <td key={rowIndex} className='p-1'>
                                    <div className="w-10 h-10 bg-amber-500 rounded-lg shadow-lg"></div>
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default layoutMock
