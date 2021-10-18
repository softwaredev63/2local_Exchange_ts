import React from 'react'

export default function ChartLamp({value}) {
    const color = value >= 0 ? '#94C01E' : '#FF4600';

    return (
        <div>
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill={color} className="bi bi-circle-fill" viewBox="0 0 16 16">
                <circle cx="8" cy="8" r="8" />
            </svg>
        </div>
    )
}