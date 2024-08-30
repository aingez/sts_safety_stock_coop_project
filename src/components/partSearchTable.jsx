import React, { useEffect, useState } from "react";
import { Table, Spin, Alert } from "antd";

function PartSearchTable({ partSerial }) {
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const callAPI = async () => {
      try {
        const res = await fetch(`http://localhost:8000/search/${partSerial}`);
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();
        setApiData(data[0].data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    callAPI();
  }, [partSerial]);

  const columns = [
    {
      title: "Part Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Model",
      dataIndex: "model",
      key: "model",
    },
    {
      title: "Serial Number",
      dataIndex: "serial",
      key: "serial",
    },
    {
      title: "Pallet Number",
      dataIndex: "pallet_name",
      key: "pallet_name",
    },
    {
      title: "Plant Type",
      dataIndex: "plant_type",
      key: "plant_type",
    },
    {
      title: "Plant Code",
      dataIndex: "plant_id",
      key: "plant_id",
    },
    {
      title: "Row",
      dataIndex: "row",
      key: "row",
    },
    {
      title: "Lane",
      dataIndex: "lane",
      key: "lane",
    },
    {
      title: "Packing Date",
      dataIndex: "formatted_pack_date",
      key: "formatted_pack_date",
    },
    {
      title: "Packer",
      dataIndex: "packer_id",
      key: "packer_id",
    },
    {
      title: "Un-Pack Date",
      dataIndex: "formatted_unpack_date",
      key: "formatted_unpack_date",
    },
    {
      title: "Un-Packer",
      dataIndex: "unpacker_id",
      key: "unpacker_id",
    },
  ];

  if (loading) {
    return <Spin size="large" />;
  }

  if (error) {
    return <Alert message="Error" description={error} type="error" showIcon />;
  }

  return (
    <div>
      <Table
        columns={columns}
        dataSource={apiData ? [apiData] : []}
        rowKey={(record) => record.serial}
      />
    </div>
  );
}

export default PartSearchTable;
