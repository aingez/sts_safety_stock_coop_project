"use client";

import React, { useState } from "react";
import { Modal, Table, Input, Button } from "antd";

const PartInfoModal = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [plantType, setPlantType] = useState("");
  const [plantId, setPlantId] = useState("");
  const [palletName, setPalletName] = useState("");
  const [data, setData] = useState([]);

  const columns = [
    {
      title: "Serial",
      dataIndex: "serial",
      key: "serial",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Model",
      dataIndex: "model",
      key: "model",
    },
    {
      title: "Pallet ID",
      dataIndex: "pallet_id",
      key: "pallet_id",
    },
    {
      title: "Pack Date",
      dataIndex: "pack_date",
      key: "pack_date",
    },
    {
      title: "Packer ID",
      dataIndex: "packer_id",
      key: "packer_id",
    },
  ];

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    // Here you would typically fetch data from your API
    // For demonstration, we'll use the sample data
    const sampleData = [
      {
        serial: "ANST02246131006",
        type: "Block",
        model: "CONV",
        pallet_id: 1,
        pack_date: "2024-08-28T21:58:48.432483",
        packer_id: 3,
      },
      // ... other items ...
    ];
    setData(sampleData);
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      <Button onClick={showModal}>Open Part Info Modal</Button>
      <Modal
        title="Part Info"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={1000}
      >
        <Input
          placeholder="Plant Type"
          value={plantType}
          onChange={(e) => setPlantType(e.target.value)}
          style={{ marginBottom: "10px" }}
        />
        <Input
          placeholder="Plant ID"
          value={plantId}
          onChange={(e) => setPlantId(e.target.value)}
          style={{ marginBottom: "10px" }}
        />
        <Input
          placeholder="Pallet Name"
          value={palletName}
          onChange={(e) => setPalletName(e.target.value)}
          style={{ marginBottom: "10px" }}
        />
        <Table columns={columns} dataSource={data} />
      </Modal>
    </div>
  );
};

export default PartInfoModal;
