import React from 'react';
import { Table } from 'antd';
import data from '../components/testing_data/alertMock.json';

function AlertTable({ pageSize }) {
    const columns = [
        {
            title: 'Part Type',
            dataIndex: 'partType',
            key: 'partType',
        },
        {
            title: 'Pallet Number',
            dataIndex: 'palletNumber',
            key: 'palletNumber',
        },
        {
            title: 'Packing Date',
            dataIndex: 'packingDate',
            key: 'packingDate',
            render: (text) => new Date(text).toLocaleString(),
        },
        {
            title: 'Plant Code',
            dataIndex: 'plantCode',
            key: 'plantCode',
        },
        {
            title: 'Plant Type',
            dataIndex: 'plantType',
            key: 'plantType',
        },
        {
            title: 'Row Location',
            dataIndex: 'rowLocation',
            key: 'rowLocation',
        },
        {
            title: 'Lane Location',
            dataIndex: 'laneLocation',
            key: 'laneLocation',
        },
    ];

    return (
        <div>
            <Table columns={columns} dataSource={data} pagination={{ pageSize }} />
        </div>
    );
}

export default AlertTable;
