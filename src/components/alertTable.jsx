import React, { useEffect, useState } from "react";
import { Table, Alert, Tag, Spin } from "antd";

function AlertTable({ pageSize }) {
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const callAPI = async () => {
      try {
        const res = await fetch("http://localhost:8000/pallet_age_rank");
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
  }, []);

  const getUniquePartTypes = () => {
    const types = [...new Set(apiData.map((item) => item.type))];
    return types.map((type) => ({
      text: type,
      value: type,
    }));
  };

  const columns = [
    {
      title: "Status",
      dataIndex: "color_status",
      key: "color_status",
      render: (color) => <Tag color={color}>{color.toUpperCase()}</Tag>,
    },
    {
      title: "Part Type",
      dataIndex: "type",
      key: "type",
      filters: getUniquePartTypes(),
      onFilter: (value, record) => record.type === value,
      filterSearch: true,
    },
    {
      title: "Pallet Number",
      dataIndex: "pallet_name",
      key: "pallet_name",
    },
    {
      title: "Packing Date",
      dataIndex: "formatted_pack_date",
      key: "formatted_pack_date",
    },
    {
      title: "Age Days",
      dataIndex: "formatted_age_days",
      key: "formatted_age_days",
    },
    {
      title: "Plant Type",
      dataIndex: "plant_type",
      key: "plant_type",
    },
    {
      title: "Plant ID",
      dataIndex: "plant_id",
      key: "plant_id",
    },
    {
      title: "Lane",
      dataIndex: "lane",
      key: "lane",
    },
    {
      title: "Row",
      dataIndex: "row",
      key: "row",
    },
    {
      title: "Layer",
      dataIndex: "layer",
      key: "layer",
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center space-x-10">
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return <Alert message="Error" description={error} type="error" showIcon />;
  }

  return (
    <div>
      <Table
        columns={columns}
        dataSource={apiData}
        pagination={{ pageSize }}
        rowKey={(record) => record.pallet_id}
      />
    </div>
  );
}

export default AlertTable;
