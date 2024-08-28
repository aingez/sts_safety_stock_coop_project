"use client";

import React, { useState, useEffect } from "react";
import ReusableTable from "../components/alertTable"; // Import the reusable table

function AlertPage() {
  return (
    <>
      <div>
        <h1 class="custom-title-1">Alert Page</h1>
      </div>
      <div className="mb-5 rounded-lg bg-neutral-100 px-5 py-5 shadow-lg">
        <ReusableTable pageSize={20} />
      </div>
    </>
  );
}

export default AlertPage;
