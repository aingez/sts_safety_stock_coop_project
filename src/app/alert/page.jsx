'use client'

import React, { useState, useEffect } from 'react';
import ReusableTable from '../components/alertTable';  // Import the reusable table

function AlertPage() {

    return (
        <>
            <div>
                <h1 className='text-4xl pb-5 font-bold'>Alert Page</h1>
            </div>
            <div className='shadow-lg py-5 px-5 mb-5 rounded-lg bg-neutral-100'>
                <ReusableTable pageSize={20}/>
            </div>
        </>
    );
}

export default AlertPage;
