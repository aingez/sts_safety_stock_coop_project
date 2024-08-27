import React, { useEffect, useState } from 'react';
import { Table, Spin, Alert, Tag } from 'antd';

function PartSearchTable({partSerial}) {
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
      const callAPI = async () => {
          try {
              const res = await fetch('http://localhost:8000/search/' + partSerial);
              if (!res.ok) {
                  throw new Error('Network response was not ok');
              }
              const data = await res.json();
              setApiData([data[0].data]);
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
        title: 'Part Type',
        dataIndex: 'type',
        key: 'type',
      },
      {
        title: 'Model',
        dataIndex: 'model',
        key: 'model',
      },
      {
        title: 'Serial Number',
        dataIndex: 'serial',
        key: 'serial',
      },
      {
        title: 'Pallet Number',
        dataIndex: 'pallet_id',
        key: 'pallet_id',
      },
      {
        title: 'Plant Type',
        dataIndex: 'plant_type',
        key: 'plant_type',
      },
      {
        title: 'Plant Code',
        dataIndex: 'plant_id',
        key: 'plant_id',
      },
      {
        title: 'Row',
        dataIndex: 'row',
        key: 'row',
      },
      {
        title: 'Lane',
        dataIndex: 'lane',
        key: 'lane',
      },
      {
        title: 'Packing Date',
        dataIndex: 'pack_date',
        key: 'pack_date',
      },
      {
        title: 'Packer',
        dataIndex: 'packer_id',
        key: 'packer_id',
      },
      {
        title: 'Un-Pack Date',
        dataIndex: 'unpack_date',
        key: 'unpack_date', // Assign a unique key for the column
      },
      {
        title: 'Un-Packer',
        dataIndex: 'unpacker_id',
        key: 'unpacker_id',
      }
    ];

  return (
    <div>
      <Table columns={columns} dataSource={apiData || []} rowKey="serial" />
    </div>
  )
}

export default PartSearchTable
