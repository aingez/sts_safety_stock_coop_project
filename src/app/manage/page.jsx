import React from "react";
import PalletMover from "../../components/palletMover";

function PalletManage() {
  return (
    <div className="min-h-screen">
      <h1 className="custom-title-1">Pallet Management</h1>
      <div className="custom-box-2">
        <PalletMover />
      </div>
    </div>
  );
}

export default PalletManage;
