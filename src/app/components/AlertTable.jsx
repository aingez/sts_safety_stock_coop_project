import React from 'react';
import { Table } from 'antd';
import data from '../components/testing_data/alertMock.json';

async function AlertTable({ pageSize }) {

    const callAPI = async () => {
        try {
            const res = await fetch(`http://localhost:8000/pallet_age_rank`);
            const data = await res.json();
            console.log(data);
        } catch (err) {
            console.log(err);
        }
    };

    callAPI();

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
