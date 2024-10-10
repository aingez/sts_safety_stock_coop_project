// Dev: Aingthawan K.
// Manage page : This page is used to display the pallet mover for now (display tools for managaing warehouse).

"use client";

import React from "react";
import PalletMover from "../../components/palletMover";
import useCheckUser from "../../hooks/useCheckUser";

function PalletManage() {
  useCheckUser();
  return (
    <div className="min-h-screen px-10">
      <h1 className="custom-title-1">Pallet Management</h1>
      <div className="custom-box-2">
        <PalletMover />
      </div>
    </div>
  );
}

export default PalletManage;
