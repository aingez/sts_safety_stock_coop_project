"use client"

import React, { useEffect, useState } from 'react';
import { Table, Spin, Alert, Tag } from 'antd';

function SearchTable() {
    const [apiData, setApiData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const callAPI = async () => {
            try {
                const res = await fetch('http://localhost:8000/pallet_age_rank');
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await res.json();
                setApiData(data[0].data);
                console.log(apiData);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        callAPI();
    }, []);

    return (
        <div>

        </div>
    )
}

export default SearchTable
