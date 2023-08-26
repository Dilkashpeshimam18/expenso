import React from 'react'
import './HomeLineGraph.css'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS } from 'chart.js/auto'
import { useSelector } from 'react-redux'

const HomeLineGraph = ({ chartData }) => {
    const isSelected = useSelector(state => state.dashboard.isSelected)

    return (
        <div className={isSelected != 'Line' ? 'homeGraph' : 'homeGraphFull'}><Line data={chartData} /></div>
    )
}

export default HomeLineGraph