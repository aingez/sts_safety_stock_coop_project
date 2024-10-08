// Dev: Aingthawan K.
// editor page : This page is used to display the warehouse editor tools.

"use client";

import React, { useState } from "react";
import WhCreator from "../../components/warehouseCreator";
import PalletCreateRemover from "../../components/palletCreateRem";
import PartList from "../../components/activePartModelList";
import useCheckUser from "../../hooks/useCheckUser";

const WarehouseEditor = () => {
  useCheckUser();
  return (
    <div className="min-h-screen px-10 pb-20">
      <h1 className="custom-title-1">Create Master</h1>
      <h2 className="custom-subtitle-2">Pallet Creator</h2>
      <div className="custom-box-3 py-4">
        <PalletCreateRemover />
      </div>

      <h2 className="custom-subtitle-2">Warehouse Creator</h2>
      <div className="custom-box-3 overflow-x-auto">
        <WhCreator />
      </div>

      <h2 className="custom-subtitle-2">Parts Creator</h2>
      <div className="custom-box-3 overflow-x-auto">
        <div className="custom-box-2 m-4 w-full">
          <PartList />
        </div>
      </div>
    </div>
  );
};

export default WarehouseEditor;
