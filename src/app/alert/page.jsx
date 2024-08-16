'use client'

import React, { useState, useEffect } from 'react';
import ReusableTable from '../components/AlertTable';  // Import the reusable table

function AlertPage() {
    const [data, setData] = useState([]);

    return (
        <>
            <div>
                <h1 className='text-4xl pb-5 font-bold'>Alert Page</h1>
            </div>
            <ReusableTable pageSize={10}/>
        </>
    );
}

export default AlertPage;
