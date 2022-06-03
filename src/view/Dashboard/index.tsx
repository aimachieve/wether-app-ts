import React, { useEffect, useCallback, useState } from "react";

import {
  Box,
  Grid,
  Button,
  TextField,
  Stack,
  List,
  ListItemButton,
  ListItemText,
  Typography,
  Divider,
} from "@mui/material";

import { styled } from "@mui/material/styles";

import axios from "axios";

import formatDate from "../../utils/formatDate";

const Wrapper = styled(Box)(({ theme }) => ({
  margin: "0 auto",
  maxWidth: "1000px",
  padding: "30px",
}));

type StockMap = Array<{
  date: string
  date_epoch: string
  day: {
    maxtemp_c: string
    maxtemp_f: string
    mintemp_c: string
    mintemp_f: string
    avgtemp_c: string
    avgtemp_f: string
    maxwind_mph: string
    maxwind_kph: string
    totalprecip_mm: string
    totalprecip_in: string
    avgvis_km: string
    avgvis_miles: string
    avghumidity: string
    daily_will_it_rain: string
    daily_chance_of_rain: string
    daily_will_it_snow: string
    daily_chance_of_snow: string
    condition: {
      text: string
      icon: string
      code: number,
    },
  },
  uv: number,
}>;

export default function Dashboard() {
  const [cityname, setCityname] = useState("toronto");
  const [weather, setWeather] = useState<StockMap>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    const init = async () => {
      const res = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=804787237140480a88b203259223105&q=toronto&days=3`);
      setWeather(res.data.forecast.forecastday);
    };

    init();
  }, []);

  const search = useCallback(async () => {
    if (cityname === "") {
      window.alert("Input city name, please.");
      return;
    }
    const res = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=804787237140480a88b203259223105&q=${cityname}&days=3`);
    setWeather(res.data.forecast.forecastday);
  }, [cityname]);

  return (
    <Wrapper>
      <Stack
        direction="row"
        gap={5}
      >
        <TextField
          value={cityname}
          onChange={(e) => setCityname(e.target.value)}
          type="search"
          fullWidth
        />
        <Button
          variant="contained"
          onClick={search}
          fullWidth
          sx={{
            borderRadius: "30px",
          }}
        >
          Search
        </Button>
      </Stack>
      <Grid container spacing={4} sx={{ mt: 2, border: "1px solid black"}}>
        <Grid item xs={12} xl={4}>
          <List component="nav" aria-label="main mailbox folders">
            {
              weather.map((item: any, index: number) => (
                <ListItemButton
                  key={index}
                  onClick={(event) => setSelectedIndex(index)}
                  selected={selectedIndex === index}
                >
                  <ListItemText primary={formatDate(item.date)} />
                </ListItemButton>
              ))
            }
          </List>
        </Grid>

        <Divider orientation="vertical" flexItem />

        <Grid item xs={12} xl={7}>
          {
            weather.length > 0 && (
              <Stack alignItems="center" mt={2}>
                <Stack direction="row" alignItems="center">
                  <Box
                    component="img"
                    src={ weather[selectedIndex].day.condition.icon }
                  />
                  <Typography>{ weather[selectedIndex].day.condition.text }</Typography>
                </Stack>

                <Typography>Max Temperature: { weather[selectedIndex].day.maxtemp_c }</Typography>
                <Typography>Min Temperature: { weather[selectedIndex].day.mintemp_c }</Typography>
              </Stack>
            )
          }
        </Grid>
      </Grid>
    </Wrapper>
  );
}
