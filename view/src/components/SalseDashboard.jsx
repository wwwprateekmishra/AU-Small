import { Box, Grid, Stack, TextField, Typography } from "@mui/material"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import MyAutocomplete from "./MyAutocomplete"
import { useEffect, useState } from "react"
import MainCard from "./MainCard"
import MyCard from "./Card"
import ReactApexChart from "react-apexcharts";
import SimpleChart from "./SimpleChart"
import useDashboard from "../hooks/useDashboard"
import dayjs from 'dayjs';
const SalseDashboard = () => {
  const [state, setState] = useState('')
  const [stateOpt, setStateOpt] = useState([])
  const { getStates, getData } = useDashboard()
  const [frDate, setFrDate] = useState(null)
  const [toDate, setToDate] = useState(null)
  const [salesByCity, setSalesByCity] = useState({})
  const [salesBySctg, setSalesBySctg] = useState({})
  const [salesByCtg, setSalesByctg] = useState({})
  const [salesBySeg, setSalesBySeg] = useState({})
  const [salesByProd, setSalesByProd] = useState({})
  const [totalSales, setTotalSales] = useState(0)
  const [totalQTY, setTotalQTY] = useState(0)
  const [totalPro, setTotalPro] = useState(0)
  const [totalDis, setTotalDis] = useState(0)
  let options = {
    chart: {
      type: 'bar',
      background: 'primary',
      height: 250
    },
    colors: "#8BD0E0",
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: true,
      }
    },
    dataLabels: {
      enabled: false
    },
    xaxis: {
      categories: Object.keys(salesByCity).splice(0, 10)
    }
  }
  useEffect(() => {
    ; (async () => {
      let res = await getStates()
      if (res.status === 201) {
        setStateOpt(res.states)
        setState(res.states[0])
      }
      let resd = await getData()
      if (resd.status === 201) {
        let sByc = {}, sBySc = {}, sByCtg = {}, sByS = {}, sbyProd = {}, totals = 0, tQTY = 0, tpro = 0, tdis = 0, frDate = '', toDate = '';
        resd.data.forEach((d, i) => {
          if (!i) {
            frDate = d["Order Date"]
            toDate = d["Order Date"]
          }
          if (frDate > d["Order Date"]) frDate = d["Order Date"]
          if (toDate < d["Order Date"]) toDate = d["Order Date"]
          totals += +d.Sales
          tQTY += +d.Quantity
          tpro += +d.Profit
          tdis += +d.Discount
          if (!sByc[d.City]) sByc[d.City] = 0
          if (!sbyProd[d["Product Name"]]) sbyProd[d["Product Name"]] = 0
          if (!sBySc[d['Sub-Category']]) sBySc[d['Sub-Category']] = 0
          if (!sByCtg[d.Category]) sByCtg[d.Category] = 0
          if (!sByS[d.Segment]) sByS[d.Segment] = 0

          sByc[d.City] += parseInt(d.Sales)
          sBySc[d['Sub-Category']] += parseInt(d.Sales)
          sByCtg[d.Category] += parseInt(d.Sales)
          sByS[d.Segment] += parseInt(d.Sales)
          sbyProd[d["Product Name"]] += parseInt(d.Sales)
        })
        setFrDate(dayjs(frDate))
        setToDate(dayjs(toDate))
        setTotalSales(parseInt(totals))
        setTotalQTY(parseInt(tQTY))
        setTotalPro(parseInt(tpro))
        setTotalDis(parseInt(tdis))
        setSalesByProd(sbyProd)
        setSalesByCity(sByc)
        setSalesBySctg(sBySc)
        setSalesBySeg(sByS)
        setSalesByctg(sByCtg)
      }
    })().catch((e) => { console.log(e) })
  }, [])
  return (
    <MainCard>
      <Typography variant="h6" noWrap component="div">
        Sales Dashboard
      </Typography>
      <Grid container justifyContent="flex-end" rowSpacing={1} spacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ mt: -3 }}>
        <Grid item xs={2} sx={{}}>
          <Box >
            <MyAutocomplete sx={{ width: '100%' }} size="small" label="Select State" options={stateOpt} onChange={setState} value={state} />
          </Box>
        </Grid>
        <Grid item xs={2}>
          <Box sx={{ width: "100%" }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                renderInput={(props) => <TextField {...props} size='small' />}
                label="From Date"
                disableFuture={true}
                sx={{ width: '100%' }}
                value={frDate}
                format="YYYY-MM-DD"
                views={['year', 'month', 'day']}
                ampm={false}
                onChange={(newValue) => {
                  setFrDate(newValue);
                }}
              />
            </LocalizationProvider>
          </Box>
        </Grid>
        <Grid item xs={2} sx={{}}>
          <Box sx={{ width: "100%" }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                renderInput={(props) => <TextField {...props} size='small' />}
                label="To Date"
                disableFuture={true}
                sx={{ width: '100%' }}
                value={toDate}
                format="YYYY-MM-DD"
                views={['year', 'month', 'day']}
                ampm={false}
                onChange={(newValue) => {
                  setToDate(newValue);
                }}
              />
            </LocalizationProvider>
          </Box>
        </Grid>
      </Grid>
      <Grid container justifyContent="flex-end" rowSpacing={1} spacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ mt: 1 }}>

        <Grid item xs={3} >
          <MyCard sx={{ color: 'primary', backgroundColor: 'primary', height: 110 }} icon={<svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M30 0C13.44 0 0 13.44 0 30C0 46.56 13.44 60 30 60C46.56 60 60 46.56 60 30C60 13.44 46.56 0 30 0ZM30 56C15.66 56 4 44.34 4 30C4 15.66 15.66 4 30 4C44.34 4 56 15.66 56 30C56 44.34 44.34 56 30 56Z" fill="#64C86E" />
            <path d="M44 16H38.24C39.02 17.06 39.58 18.38 39.82 20H44V24H39.82C38.84 30.28 33.14 32 30 32H22.82L39.42 48.58L36.58 51.42L16.58 31.42C16.02 30.84 15.84 29.98 16.16 29.24C16.46 28.48 17.2 28 18 28H30C30.86 27.98 34.72 27.72 35.74 24H16V20H35.74C34.72 16.28 30.86 16.02 29.98 16H16V12H44V16Z" fill="#64C86E" />
          </svg>} text='Total Sales' value={`$ ${totalSales}`}></MyCard>

        </Grid>
        <Grid item xs={3} >
          <MyCard
            sx={{ color: 'primary', backgroundColor: 'primary', height: 110 }}
            icon={<svg width="60" height="38" viewBox="0 0 60 38" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M56.25 3.75V33.75H3.75V3.75H56.25ZM60 0H0V37.5H60V0Z" fill="#2296CE" />
              <path d="M22.5 7.5H7.5V11.25H22.5V7.5Z" fill="#2296CE" />
              <path d="M52.5 7.5H48.75V11.25H52.5V7.5Z" fill="#2296CE" />
              <path d="M45 7.5H41.25V11.25H45V7.5Z" fill="#2296CE" />
              <path d="M37.5 7.5H33.75V11.25H37.5V7.5Z" fill="#2296CE" />
              <path d="M48.75 15H7.5V18.75H48.75V15Z" fill="#2296CE" />
              <path d="M52.5 26.25H37.5V30H52.5V26.25Z" fill="#2296CE" />
            </svg>
            }
            text='Quantity sold'
            value={totalQTY}
          />
        </Grid>

        <Grid item xs={3} >
          <MyCard
            sx={{ color: 'primary', backgroundColor: 'primary', height: 110 }}
            icon={<svg width="60" height="56" viewBox="0 0 60 56" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M36 24V28H60V24H55.38L49.38 8H56V4H36V0H24V4H4V8H10.62L4.62 24H0V28H24V24H19.38L13.38 8H24V12H28V52H20V56H40V52H32V12H36V8H46.62L40.62 24H36ZM15.12 24H8.88L12 15.7L15.12 24ZM32 8H28V4H32V8ZM48 15.7L51.12 24H44.88L48 15.7Z" fill="#E9B164" />
              <path d="M20 32H4V36H20V32Z" fill="#E9B164" />
              <path d="M56 32H40V36H56V32Z" fill="#E9B164" />
            </svg>

            }
            text='Discount %'
            value={totalDis}
          />
        </Grid>
        <Grid item xs={3} >
          <MyCard
            sx={{ height: 110 }}
            icon={<svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 0V52.5H18.75V56.25H48.75V52.5H60V0H0ZM45 52.5H22.5V41.25H27.2625C26.625 42.3563 26.25 43.6313 26.25 45C26.25 49.1438 29.6062 52.5 33.75 52.5C37.8937 52.5 41.25 49.1438 41.25 45C41.25 43.6313 40.875 42.3563 40.2375 41.25H45V52.5ZM30 45C30 42.9375 31.6875 41.25 33.75 41.25C35.8125 41.25 37.5 42.9375 37.5 45C37.5 47.0625 35.8125 48.75 33.75 48.75C31.6875 48.75 30 47.0625 30 45ZM56.25 48.75H48.75V41.25H52.5V37.5H15V41.25H18.75V48.75H3.75V3.75H56.25V48.75Z" fill="#B44160" />
              <path d="M7.5 7.5V33.75H37.5V7.5H7.5ZM33.75 30H11.25V11.25H33.75V30Z" fill="#B44160" />
              <path d="M52.5 11.25H41.25V15H52.5V11.25Z" fill="#B44160" />
              <path d="M52.5 18.75H41.25V22.5H52.5V18.75Z" fill="#B44160" />
              <path d="M52.5 26.25H41.25V30H52.5V26.25Z" fill="#B44160" />
            </svg>
            }
            text='Profit'
            value={`$ ${totalPro}`}
          />
        </Grid>
      </Grid>
      <Grid container justifyContent="flex-end" rowSpacing={1} spacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ mt: 1 }}>

        <Grid item xs={6} >
          Sales By City
          <Box sx={{ color: '#8BD0E0', height: 320, overflowX: 'scroll' }}>
            <ReactApexChart options={options} series={[{ name: 'value', data: Object.values(salesByCity).splice(0, 10) }]} type="bar" height={'100%'} width={'100%'} />
          </Box>
        </Grid>
        <Grid item xs={6} >
          <Box sx={{ backgroundColor: 'primary', color: 'primary', height: 320, overflowX: 'scroll' }}>
            Sales By Products
            <Stack direction='row'>
              <Typography ml={2} component='h6'>Product name</Typography>
              <Typography sx={{ ml: '68%' }} >Sales in $</Typography>
            </Stack>
            {Object.entries(salesByProd).map(([key, val]) => <SimpleChart text={key} value={val} />)}

          </Box>
        </Grid>
      </Grid>
      <Grid container justifyContent="flex-end" rowSpacing={1} spacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ mt: 1 }}>

        <Grid item xs={4} >
          <Box sx={{ backgroundColor: 'primary', height: 300 }}>
            Sales By Categories
            <ReactApexChart options={{
              chart: {
                type: 'donut',
              },
              dataLabels: {
                enabled: false
              },
              labels: Object.keys(salesByCtg),
              responsive: [{
                breakpoint: 480,
                options: {
                  chart: {
                    width: 200
                  },
                  legend: {
                    position: 'bottom'
                  }
                }
              }]
            }} series={Object.values(salesByCtg)} type='donut' height={'92%'} width={'100%'} />
          </Box>
        </Grid>
        <Grid item xs={4} >
          <Box sx={{ backgroundColor: 'primary', height: 300, overflowX: 'scroll' }}>
            Sales By Sub Categories
            <Stack direction='row'>
              <Typography ml={2} component='h6'>Sub Categories</Typography>
              <Typography sx={{ ml: '55%' }} >Sales in $</Typography>
            </Stack>
            {Object.entries(salesBySctg).map(([key, val]) => <SimpleChart text={key} value={val} />)}
          </Box>
        </Grid>
        <Grid item xs={4} >
          <Box sx={{ backgroundColor: 'primary', height: 300 }}>
            Sales By Segment
            <ReactApexChart options={{
              chart: {
                type: 'donut',
              },
              labels: Object.keys(salesBySeg),
              dataLabels: {
                enabled: false
              },
              responsive: [{
                breakpoint: 480,
                options: {
                  chart: {
                    width: 200
                  },
                  legend: {
                    position: 'bottom'
                  }
                }
              }]
            }} series={Object.values(salesBySeg)} type='donut' height={'92%'} width={'100%'} />
          </Box>
        </Grid>
      </Grid>
    </MainCard>
  )
}
export default SalseDashboard