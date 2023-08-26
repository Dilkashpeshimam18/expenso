import React from 'react'
import './HomeBar.css'
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS } from 'chart.js/auto'
import { useSelector } from 'react-redux'

const HomeBar = ({ chartData }) => {
    const isSelected = useSelector(state => state.dashboard.isSelected)

    return (
        <div className={isSelected != 'Bar' ? 'homeBar' : 'homeBarFull'}><Bar data={chartData} /></div>
    )
}

export default HomeBar