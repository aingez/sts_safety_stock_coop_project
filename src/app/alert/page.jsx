// Dev: Aingthawan K.
// alert page : This page is used to display the alert table.

"use client";

import React, { useState, useEffect } from "react";
import ReusableTable from "../../components/alertTable"; // Import the reusable table

function AlertPage() {
  return (
    <div className="flex min-h-screen flex-col sm:px-5 md:px-20 lg:px-20">
      <h1 className="custom-title-1">Alert Page</h1>
      <div className="custom-box-2">
        <ReusableTable pageSize={20} />
      </div>
    </div>
  );
}

export default AlertPage;
