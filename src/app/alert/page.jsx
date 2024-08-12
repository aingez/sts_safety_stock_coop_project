import React from 'react';
import { Table } from 'antd';

function AlertPage() {
    const columns = [
        {
            title: 'Part Type',
            dataIndex: 'partType',
            key: 'partType',
        },
        {
            title: 'Packing Date',
            dataIndex: 'packingDate',
            key: 'packingDate',
        },
        {
            title: 'Row Location',
            dataIndex: 'rowLocation',
            key: 'rowLocation',
        },
        {
            title: 'Pallet Number',
            dataIndex: 'palletNumber',
            key: 'palletNumber',
        },
    ];

    const data = [
        {
            partType: 'Part A',
            packingDate: '2022-10-01',
            rowLocation: 'A1',
            palletNumber: 'P001',
        },
        {
            partType: 'Part B',
            packingDate: '2022-10-02',
            rowLocation: 'B2',
            palletNumber: 'P002',
        },
        {
            partType: 'Part C',
            packingDate: '2022-10-03',
            rowLocation: 'C3',
            palletNumber: 'P003',
        },
    ];

    return (
        <div>
            <h1 className='text-5xl pb-5 font-bold'>Alert</h1>
            <Table columns={columns} dataSource={data} />
        </div>
    );
}

export default AlertPage;
