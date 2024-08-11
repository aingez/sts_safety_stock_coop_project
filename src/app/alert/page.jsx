import React from 'react'

function AlertPage() {
return (
    <div>
        <h1 className='text-5xl pb-5 font-bold'>
            Alert
        </h1>
        <table className='table-auto'>
            <thead>
                <tr>
                    <th className='px-4 py-2'>Part Type</th>
                    <th className='px-4 py-2'>Packing Date</th>
                    <th className='px-4 py-2'>Row Location</th>
                    <th className='px-4 py-2'>Pallet Number</th>
                </tr>
            </thead>
            <tbody>
                {/* Map over the data and render each row */}
                {data.map((item) => (
                    <tr key={item.palletNumber}>
                        <td className='border px-4 py-2'>{item.partType}</td>
                        <td className='border px-4 py-2'>{item.packingDate}</td>
                        <td className='border px-4 py-2'>{item.rowLocation}</td>
                        <td className='border px-4 py-2'>{item.palletNumber}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
)
}

export default AlertPage
AlertPage
const data = [
    // {
    //     partType: 'Part A',
    //     packingDate: '2022-10-01',
    //     rowLocation: 'A1',
    //     palletNumber: 'P001'
    // },
    // {
    //     partType: 'Part B',
    //     packingDate: '2022-10-02',
    //     rowLocation: 'B2',
    //     palletNumber: 'P002'
    // },
    // {
    //     partType: 'Part C',
    //     packingDate: '2022-10-03',
    //     rowLocation: 'C3',
    //     palletNumber: 'P003'
    // }
];
