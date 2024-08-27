import React, { useEffect, useState } from 'react';
import { Table, Alert, Tag } from 'antd';

function AlertTable({ pageSize }) {
    const [apiData, setApiData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const callAPI = async () => {
            try {
                const res = await fetch('http://localhost:8000/pallet_age_rank');
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await res.json();
                setApiData(data[0].data);
                console.log(apiData);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        callAPI();
    }, []);

    const columns = [
        {
            title: 'Status',
            dataIndex: 'color_status',
            key: 'color_status',
            // render as antd color tag
            render: (color) => {
                return (
                    <span>
                        <Tag color={color}>{color.toUpperCase()}</Tag>
                    </span>
                );
            },
        },
        {
            title: 'Part Type',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: 'Pallet Number',
            dataIndex: 'pallet_id',
            key: 'pallet_id',
        },
        {
            title: 'Packing Date',
            dataIndex: 'pack_date',
            key: 'pack_date',
        },
        {
            title: 'Age Days',
            dataIndex: 'formatted_age_days',
            key: 'formatted_age_days',
        },
        {
            title: 'Plant Type',
            dataIndex: 'plant_type',
            key: 'plant_type',
        },
        {
            title: 'Plant ID',
            dataIndex: 'plant_id',
            key: 'plant_id',
        },
        {
            title: 'Lane Location',
            dataIndex: 'lane',
            key: 'lane',
        },
        {
            title: 'Row Location',
            dataIndex: 'row',
            key: 'row',
        },
        {
            title: 'Layer',
            dataIndex: 'layer',
            key: 'layer',
        },
    ];

    if (loading) {
        return <div className='flex justify-center items-center space-x-10'>Loading...</div>;
    }

    if (error) {
        return <Alert message="Error" description={error.message} type="error" />;
    }

    return (
        <div>
            <Table columns={columns} dataSource={apiData || []} pagination={{ pageSize }} rowKey="pallet_id" />
        </div>
    );
}

export default AlertTable;
