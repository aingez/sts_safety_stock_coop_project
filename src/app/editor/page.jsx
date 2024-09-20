// Dev: Aingthawan K.
// editor page : This page is used to display the warehouse editor tools.

"use client";

import React, { useState } from "react";
import WhCreator from "../../components/warehouseCreator";
import PalletCreateRemover from "../../components/palletCreateRem";
import PartList from "../../components/activePartModelList";

const WarehouseEditor = () => {
  return (
    <div className="min-h-screen pb-20">
      <h1 className="custom-title-1">Data Editor</h1>
      <h2 className="custom-subtitle-2">Pallet Editor</h2>
      <div className="custom-box-1 py-4">
        <PalletCreateRemover />
      </div>

      <h2 className="custom-subtitle-2">Warehouse Editor</h2>
      <div className="custom-box-1 overflow-x-auto">
        <WhCreator />
      </div>

      <h2 className="custom-subtitle-2">Parts Editor</h2>
      <div className="custom-box-1 overflow-x-auto">
        <div className="custom-box-2 m-4"><PartList /></div>
      </div>
    </div>
  );
};

export default WarehouseEditor;
