"use client";

import { useEffect, useRef, useState } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

let value = 100
let getValue = () => {
    value = value * 1.01;
    return value;
}

export default function MtcChart() {
    const [data, setData] = useState<{ uv: number, pv: number, index: number }[]>([]);
    const [loop, setLoop] = useState(false);

    /*const startSimulation = () => {
        const newData = [];
        for (let i = 0; i < 50; i++) {
            newData.push({ uv: Math.random() * 100, index: i });
        }
        setData(newData);
    }*/
    useEffect(() => {
        let interval: any = null;
        if (loop) {
            interval = setInterval(() =>
                setData((p) => {
                    const newData = [...p, newPoint(p.length)];
                    return newData;
                }), 15)
        } else {
            clearInterval(interval);
        };
        return () => clearInterval(interval);
    }, [loop])

    const newPoint = (i: number) => {
        return { uv: getValue(), pv: Math.random() * 100, index: i }
    }
    const startSimulation = () => {
        setLoop(true);
    }
    const stopSimulation = () => {
        setLoop(false);
    }

    return (
        <div className='w-full h-[90%]'>
            <button className='border border-gray-600 px-4 py-2'
                onClick={startSimulation}>
                Start Simulation
            </button>
            <button className='border border-gray-600 px-4 py-2'
                onClick={stopSimulation}>
                Stop Simulation
            </button>
            <ResponsiveContainer>
                <LineChart
                    id='id-1'
                    data={data}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                    <XAxis dataKey="index" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="uv" stroke="#8884d8" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="pv" stroke="#8884d8" strokeWidth={2} dot={false} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
