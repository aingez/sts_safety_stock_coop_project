'use client'
import React, { useState, useEffect } from 'react';
import { Table } from 'antd';

function AlertPage() {
    const [data, setData] = useState([]);

    useEffect(() => {
        // Mock data
        const mockData = [
            {
                partType: 'Block',
                palletNumber: 'BL07A',
                packingDate: new Date().toISOString(),
                plantCode: '1',
                plantType: 'Engine',
                rowLocation: 1,
                laneLocation: 2,
            },
            {
                partType: 'Head',
                palletNumber: 'HD08B',
                packingDate: new Date().toISOString(),
                plantCode: '2',
                plantType: 'Engine',
                rowLocation: 2,
                laneLocation: 3,
            },
            {
                partType: 'Crank',
                palletNumber: 'CR09C',
                packingDate: new Date().toISOString(),
                plantCode: '3',
                plantType: 'Engine',
                rowLocation: 3,
                laneLocation: 4,
            },
            {
                partType: 'Cam',
                palletNumber: 'CM10D',
                packingDate: new Date().toISOString(),
                plantCode: '2',
                plantType: 'Engine',
                rowLocation: 4,
                laneLocation: 5,
            },
            {
                partType: 'Block',
                palletNumber: 'BL11E',
                packingDate: new Date().toISOString(),
                plantCode: '3',
                plantType: 'Engine',
                rowLocation: 5,
                laneLocation: 6,
            }
        ];

        setData(mockData);
    }, []);

    // set up columns for the table
    // display respectively
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
        // Table component from antd sort from oldest to newest
        <>
        <div>
            <h1 className='text-4xl pb-5 font-bold'>
                Alert Page
            </h1>

        </div>
            <Table
                columns={columns}
                dataSource={data}
                pagination={{pageSize: 5}}
            />
        </>
    );
}

export default AlertPage;
