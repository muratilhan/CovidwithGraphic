import React,{useState, useEffect} from 'react'
import Chart from 'react-apexcharts'
import { fetchDailyData } from './Api'

function AreaChart({country}) { 

const [dailyData, setDailyData] = useState([])

useEffect(()=>{
    const fetchCountryDailyData = async () => {
        const data = await fetchDailyData(country);
        setDailyData(data.data)
    }

    fetchCountryDailyData();
},[country])

  return (
    <div>
        <Chart 
        options={{
                chart: {
                  height: 350,
                  type: 'area'
                },
                dataLabels: {
                  enabled: false
                },
                stroke: {
                  curve: 'smooth'
                },
                xaxis: {
                  type: 'datetime',
                  categories: dailyData.map((item) => item.Date)
                },
                tooltip: {
                  x: {
                    format: 'dd/MM/yy '
                  },
                } 
        }}
        series={[{
            name: 'Vaka',
            data: dailyData.map(item=> item.Confirmed)
          }, {
            name: 'İyileşen',
            data: dailyData.map(item=> item.Recovered)
          },{
            name: 'Ölüm',
            data: dailyData.map(item=> item.Deaths)
          }
        ]}
        style={{
        }}
        height={350}
        width={800}
        />
    </div>
  )
}


export default AreaChart