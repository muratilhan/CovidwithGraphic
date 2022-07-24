import './App.css';
import {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import AreaChart from './AreaChart';
import  logo  from './covid-19.png'
import { fetchCountries } from './Api';


function App() {

  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("turkey");

useEffect(() => {
  const fetchCountriesData = async () => {
    const countries = await fetchCountries()
    setCountries(countries.data)
  }

  fetchCountriesData();
},[])


  return (
    <div className="container">
      <div className="header">
            <img src={logo} alt="covid19Logo" style={{height:"80px",marginLeft:"50px"}} />
            <Box className='selectInput' sx={{ 
              width:"60%",
              margin:"0 auto"
              
               }}>
                <FormControl fullWidth>
                      <Select
                            value={country}
                            onChange={(e)=> setCountry(e.target.value)}
                          >
                          {countries.map((country) =>{  
                              return <MenuItem key={country.Country} value={country.Slug}>{country.Country}</MenuItem>
                            })
                          }
                      </Select>
                </FormControl>
          </Box>
      </div>
      
      <div className="data">
            <AreaChart country={country} />
      </div>

    </div>
  );
}

export default App;
