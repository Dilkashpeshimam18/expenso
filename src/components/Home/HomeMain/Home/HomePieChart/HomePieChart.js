import React from 'react'
import './HomePieChart.css'
import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS } from 'chart.js/auto'
import { useSelector } from 'react-redux'

const HomePieChart = ({ chartData }) => {
    const isSelected = useSelector(state => state.dashboard.isSelected)

    return (
        <div className={isSelected != 'Pie' ? 'homeChart' : 'homeChartFull'}><Doughnut data={chartData} /></div>
    )
}

export default HomePieChart