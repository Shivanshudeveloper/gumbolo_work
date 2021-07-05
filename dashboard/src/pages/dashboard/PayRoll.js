import React, { useState } from "react";
// material
import { Container } from '@material-ui/core';
// hooks
import useAuth from '../../hooks/useAuth';
// components
import Page from '../../components/Page';

import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, withStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {
    Chart,
    BarSeries,
    Title,
    ArgumentAxis,
    ValueAxis,
} from '@devexpress/dx-react-chart-bootstrap4';
import '@devexpress/dx-react-chart-bootstrap4/dist/dx-react-chart-bootstrap4.css';
import { Animation } from '@devexpress/dx-react-chart';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import { red } from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';



const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 10,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
  },
  bar: {
    borderRadius: 5,
    backgroundColor: '#1a90ff',
  },
}))(LinearProgress);



function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
}
  
TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};
  
function a11yProps(index) {
    return {
      id: `full-width-tab-${index}`,
      'aria-controls': `full-width-tabpanel-${index}`,
    };
}
  
const useStyles = makeStyles((theme) => ({
    root: {
      backgroundColor: theme.palette.background.paper,
      width: 500,
    },
    table: {
        minWidth: 650,
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: red[500],
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
}));

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}
  
const rows = [
    createData('Daksh Tyagi', 'daksh tyagi logged hours for the first time on this project', '11:00'),
    createData('Daksh Tyagi', 'daksh tyagi created a client', '12:00'),
    createData('Daksh Tyagi', 'daksh tyagi created a project', '13:01'),
    createData('Daksh Tyagi', 'daksh tyagi created a project', '14:40'),
];



const data = [
    { year: 'May 23 -May 29', population: 2.525 },
    { year: 'May 30 -Jun 5', population: 3.018 },
    { year: 'Jun 6 -Jun 12', population: 3.682 },
    { year: 'Jun 13 -Jun 19', population: 4.440 },
    { year: 'Jun 20 -Jun 26', population: 5.310 },
    { year: 'Jun 27 -Jul 3', population: 6.127 },
];

// import { useParams } from 'react-router';

// ----------------------------------------------------------------------

export default function PayRoll(props) {
  const { user } = useAuth();
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // let { userid } = useParams();
  // console.log(userid);

  return (
    <Page title="Gumbolo - Payroll">
      
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Edit User</MenuItem>
      </Menu>
      <Container maxWidth="xl">
        <h2 className="fontchange">Pay Roll</h2>
        <Button style={{ float: 'right', marginBottom: '20px' }} variant="contained">Create a New Payroll</Button>
        <br />
        <AppBar position="static" color="default">
            <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            aria-label="full width tabs example"
            >
            <Tab label="Dashboard" {...a11yProps(0)} />
            <Tab label="All Users" {...a11yProps(1)} />
            <Tab label="Activities" {...a11yProps(2)} />
            </Tabs>
        </AppBar>
        <SwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={value}
            onChangeIndex={handleChangeIndex}
        >
            <TabPanel value={value} index={0} dir={theme.direction}>
                <section>
                    <Chart
                        data={data}
                    >
                        <ArgumentAxis />
                        <ValueAxis max={7} />

                        <BarSeries
                            valueField="population"
                            argumentField="year"
                        />
                        <Title text="Hours logged per week" />
                        <Animation />
                    </Chart>

                    <br />

                    <Paper style={{ padding: '10px' }} elevation={0}>
                      <Card style={{ marginTop: '20px' }} >
                        <CardHeader
                          avatar={
                            <Avatar src="https://eadn-wc03-196922.nxedge.io/cdn/wp-content/uploads/2018/10/young-attractive-woman.jpg" aria-label="recipe" className={classes.avatar}>
                              R
                            </Avatar>
                          }
                          action={
                            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} >More</Button>
                          }
                          title="Daksh Tyagi"
                          subheader="September 14, 2016"
                        />
                        <CardContent>
                          <Grid container spacing={3}>
                            <Grid item xs={6} sm={3}>
                              <Paper className={classes.paper} >
                                May 23 - May 29
                                <br />
                                10h 22m
                              </Paper>
                            </Grid>
                            <Grid item xs={6} sm={3}>
                              <Paper className={classes.paper} >
                                May 30 - Jun 1
                                <br />
                                0h 20m
                              </Paper>
                            </Grid>
                            <Grid item xs={6} sm={3}>
                              <Paper className={classes.paper} >
                                Jun 2 - Jun 4
                                <br />
                                10h 22m
                              </Paper>
                            </Grid>
                            <Grid item xs={6} sm={3}>
                              <Paper className={classes.paper} >
                                Jun 6 - July 2
                                <br />
                                40h 22m
                              </Paper>
                            </Grid>
                          </Grid>
                        </CardContent>
                      </Card>
                      
                      <Card style={{ marginTop: '20px' }} >
                        <CardHeader
                          avatar={
                            <Avatar src="https://eadn-wc03-196922.nxedge.io/cdn/wp-content/uploads/2018/10/young-attractive-woman.jpg" aria-label="recipe" className={classes.avatar}>
                              R
                            </Avatar>
                          }
                          action={
                            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} >More</Button>
                          }
                          title="Daksh Tyagi"
                          subheader="September 14, 2016"
                        />
                        <CardContent>
                          <Grid container spacing={3}>
                            <Grid item xs={6} sm={3}>
                              <Paper className={classes.paper} >
                                May 23 - May 29
                                <br />
                                10h 22m
                              </Paper>
                            </Grid>
                            <Grid item xs={6} sm={3}>
                              <Paper className={classes.paper} >
                                May 30 - Jun 1
                                <br />
                                0h 20m
                              </Paper>
                            </Grid>
                            <Grid item xs={6} sm={3}>
                              <Paper className={classes.paper} >
                                Jun 2 - Jun 4
                                <br />
                                10h 22m
                              </Paper>
                            </Grid>
                            <Grid item xs={6} sm={3}>
                              <Paper className={classes.paper} >
                                Jun 6 - July 2
                                <br />
                                40h 22m
                              </Paper>
                            </Grid>
                          </Grid>
                        </CardContent>
                      </Card>
                    </Paper>
                </section>
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
                <section>
                    <Paper style={{ padding: '10px' }} elevation={0}>
                      <Card style={{ marginTop: '20px' }} >
                        <CardHeader
                          avatar={
                            <Avatar src="https://eadn-wc03-196922.nxedge.io/cdn/wp-content/uploads/2018/10/young-attractive-woman.jpg" aria-label="recipe" className={classes.avatar}>
                              R
                            </Avatar>
                          }
                          action={
                            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} >More</Button>
                          }
                          title="Daksh Tyagi"
                          subheader="September 14, 2016"
                        />
                        <CardContent>
                          <BorderLinearProgress variant="determinate" value={50} />
                          <i>10h 40m</i>
                          <Grid container spacing={3}>
                            <Grid item xs={6} sm={3}>
                              <Paper className={classes.paper} >
                                May 23 - May 29
                                <br />
                                10h 22m
                              </Paper>
                            </Grid>
                            <Grid item xs={6} sm={3}>
                              <Paper className={classes.paper} >
                                May 30 - Jun 1
                                <br />
                                0h 20m
                              </Paper>
                            </Grid>
                            <Grid item xs={6} sm={3}>
                              <Paper className={classes.paper} >
                                Jun 2 - Jun 4
                                <br />
                                10h 22m
                              </Paper>
                            </Grid>
                            <Grid item xs={6} sm={3}>
                              <Paper className={classes.paper} >
                                Jun 6 - July 2
                                <br />
                                40h 22m
                              </Paper>
                            </Grid>
                          </Grid>
                        </CardContent>
                      </Card>
                      
                      <Card style={{ marginTop: '20px' }} >
                        <CardHeader
                          avatar={
                            <Avatar src="https://eadn-wc03-196922.nxedge.io/cdn/wp-content/uploads/2018/10/young-attractive-woman.jpg" aria-label="recipe" className={classes.avatar}>
                              R
                            </Avatar>
                          }
                          action={
                            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} >More</Button>
                          }
                          title="Daksh Tyagi"
                          subheader="September 14, 2016"
                        />
                        <CardContent>
                          <BorderLinearProgress variant="determinate" value={25} />
                          <i>08h 40m</i>
                          <Grid container spacing={3}>
                            <Grid item xs={6} sm={3}>
                              <Paper className={classes.paper} >
                                May 23 - May 29
                                <br />
                                10h 22m
                              </Paper>
                            </Grid>
                            <Grid item xs={6} sm={3}>
                              <Paper className={classes.paper} >
                                May 30 - Jun 1
                                <br />
                                0h 20m
                              </Paper>
                            </Grid>
                            <Grid item xs={6} sm={3}>
                              <Paper className={classes.paper} >
                                Jun 2 - Jun 4
                                <br />
                                10h 22m
                              </Paper>
                            </Grid>
                            <Grid item xs={6} sm={3}>
                              <Paper className={classes.paper} >
                                Jun 6 - July 2
                                <br />
                                40h 22m
                              </Paper>
                            </Grid>
                          </Grid>
                        </CardContent>
                      </Card>
                    </Paper>
                </section>
            </TabPanel>
            <TabPanel value={value} index={2} dir={theme.direction}>
                <section>
                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead>
                            <TableRow>
                                <TableCell>Work</TableCell>
                                <TableCell>Comments</TableCell>
                                <TableCell>Time</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {rows.map((row) => (
                                <TableRow key={row.name}>
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell>{row.calories}</TableCell>
                                    <TableCell>{row.fat}</TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </section>
            </TabPanel>
        </SwipeableViews>


        
      </Container>
    </Page>
  );
}
