import React from 'react'
import { useState, useEffect } from 'react';

//import css
import "./Home.css";

//import MUI
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

//import MUI Icons
import SearchIcon from '@mui/icons-material/Search';
import PublishIcon from '@mui/icons-material/Publish';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import InvertColorsIcon from '@mui/icons-material/InvertColors';
import WindPowerIcon from '@mui/icons-material/WindPower';
import ExpandIcon from '@mui/icons-material/Expand';
import FmdGoodIcon from '@mui/icons-material/FmdGood';

const Home = () => {
  const [items, setItems] = useState([]);
  const [city, setCity] = useState('pune');

  //handleChange
  const handleChange = (event) => {
    setCity(event.target.value);
  }

  // call api 
  useEffect(() => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_SECRET_KEY}`;
    const fetchData = async () => {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': '*/*',
          'User-Agent': 'Thunder Client (https://www.thunderclient.com)',
        },
      });
      if (!response.ok) {
        throw new Error('Data Not Avilable..!')
      } else {
        setItems(await response.json());
      }
    }

    fetchData();
  }, [city])
  return (
    <>
      <Grid container spacing={1} style={{ transition: '3s' }}>
        <Grid item xs={12} sm={7} md={7} sx={{ margin: "0 auto", textAlign: 'center' }}>
          <Typography variant='h6' p={1}>
            Weather App
          </Typography>
        </Grid>
        <Grid item xs={11} sm={11} md={8} sx={{ margin: "0 auto" }}>
          <Paper elevation={4}>
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
              <FmdGoodIcon />
            </IconButton>
            <InputBase sx={{ m: 1, flex: 1 }} placeholder="Search Location" onChange={handleChange} id="searchinput"/>
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
        </Grid>
        {
          // eslint-disable-next-line
          items === undefined || items.message === "Nothing to geocode" || items.message === "city not found" || items.code === "404" || items == ""
            ?
            <Grid item xs={11} sm={11} md={7} sx={{ margin: "0 auto", marginTop: 2 }} style={{ transition: '3s' }}>
              <Stack sx={{ width: '100%' }} spacing={2}>
                <Alert variant="filled" severity="error">
                  This is an error alert — No data Found!
                </Alert>
              </Stack>
            </Grid>
            :
            <Grid item xs={11} sm={11} md={7} sx={{ margin: "0 auto", marginTop: 2 }} style={{ transition: 'all 3s ease-in-out' }}>
              <Paper elevation={0} sx={{ padding: '10px' }}>
                <Typography pb={1} varient='p'
                  sx={{
                    fontSize: '0.9rem'
                  }}
                >
                  Current Weather
                </Typography>
                <Box>
                  <Grid container spacing={1}>
                    <Grid item xs={12} sm={6} md={6} sx={{ paddingLeft: '5px' }} className='demo'>
                      <Paper variant="outlined" sx={{ p: 2 }}>
                        <Typography sx={{ fontSize: '1.5rem' }}>
                          {items.name}
                        </Typography>
                        <div className="display">
                          <div>
                            <img src={`https://openweathermap.org/img/wn/${items.weather[0].icon}@4x.png`} alt="weather" />
                          </div>
                          <div className="temp">
                            <Typography sx={{ fontSize: '4.7rem' }}>
                              {
                                Math.floor(items.main.temp - 273.15)
                              }
                              <span className='sup'>o</span>
                            </Typography>
                          </div>
                        </div>
                        <Typography pb={1} varient='p'
                          sx={{
                            fontSize: '0.9rem'
                          }}
                        >
                          {`${items.weather[0].main} ( ${items.weather[0].description} )`}
                        </Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} sx={{ textAlign: 'center' }}>
                      <Paper variant="outlined" sx={{ p: 2 }}>
                        <Typography variant='body1'>
                          Feels Like <span>{
                            Math.floor(items.main.feels_like - 273.15)
                          }</span><span className='sup'>o</span>
                        </Typography>
                        <div className="display1">
                          <Box className="display" style={{ justifyContent: 'center' }}>
                            <PublishIcon fontSize='small' />
                            <span>&ensp;{Math.floor(items.main.temp_max - 273.15)}</span><span className='sup'>o</span>
                            &ensp;&ensp;
                            <FileDownloadIcon fontSize='small' />
                            <span>&ensp;{Math.floor(items.main.temp_min - 273.15)}</span><span className='sup'>o</span>
                          </Box>
                          <Box style={{ textAlign: 'left', marginTop: '20px' }}>
                            <ListItem>
                              <ListItemIcon>
                                <InvertColorsIcon />
                              </ListItemIcon>
                              <ListItemText>Humidity {Math.floor(items.main.humidity)} % </ListItemText>
                            </ListItem>
                            <ListItem>
                              <ListItemIcon>
                                <WindPowerIcon />
                              </ListItemIcon>
                              <ListItemText>Wind {Math.floor(items.wind.speed)} kpm</ListItemText>
                            </ListItem>
                            <ListItem>
                              <ListItemIcon>
                                <ExpandIcon />
                              </ListItemIcon>
                              <ListItemText>Pressure {Math.floor(items.main.pressure)} hpa</ListItemText>
                            </ListItem>
                          </Box>
                        </div>
                      </Paper>
                    </Grid>
                  </Grid>
                </Box>
              </Paper>
            </Grid>
        }
      </Grid>

    </>
  )
}

export default Home