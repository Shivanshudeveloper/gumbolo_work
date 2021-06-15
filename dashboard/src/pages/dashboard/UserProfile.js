import { Icon } from '@iconify/react';
import { capitalCase } from 'change-case';
import { useEffect, useState } from 'react';
import React from 'react';
import heartFill from '@iconify/icons-eva/heart-fill';
import peopleFill from '@iconify/icons-eva/people-fill';
import roundPermMedia from '@iconify/icons-ic/round-perm-media';
import roundAccountBox from '@iconify/icons-ic/round-account-box';
import queryString from 'query-string';
import { API_SERVICE } from '../../config/URI';
import axios from 'axios';
import parse from 'html-react-parser';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Tab, Box, Card, Tabs, Container } from '@material-ui/core';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getPosts, getGallery, getFriends, getProfile, getFollowers, onToggleFollow } from '../../redux/slices/user';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useAuth from '../../hooks/useAuth';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import Button from '@material-ui/core/Button';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import {
  Profile,
  ProfileCover,
  ProfileFriends,
  ProfileGallery,
  ProfileFollowers
} from '../../components/_dashboard/user/profile';

// ----------------------------------------------------------------------

const TabsWrapperStyle = styled('div')(({ theme }) => ({
  zIndex: 9,
  bottom: 0,
  width: '100%',
  display: 'flex',
  position: 'absolute',
  backgroundColor: theme.palette.background.paper,
  [theme.breakpoints.up('sm')]: {
    justifyContent: 'center'
  },
  [theme.breakpoints.up('md')]: {
    justifyContent: 'flex-end',
    paddingRight: theme.spacing(3)
  }
}));

// ----------------------------------------------------------------------

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
}));


export default function UserProfile({ location }) {
  const dispatch = useDispatch();
  const { myProfile, posts, followers, friends, gallery } = useSelector((state) => state.user);
  const { user } = useAuth();
  const [currentTab, setCurrentTab] = useState('profile');
  const [findFriends, setFindFriends] = useState('');
  const [userdetails, setuserdetails] = useState({});
  const [loading, setloading] = useState(true);

  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };
  const [aggrements, setaggrements] = React.useState('');

  React.useEffect(() => {
      var uid = "demo@gmail.com";
      var id = sessionStorage.getItem("userprofileid");
      axios.get(`${API_SERVICE}/api/v1/main/getuserdetails/${id}`)
        .then(response => {
            setuserdetails(response.data);
            axios.get(`${API_SERVICE}/api/v1/main/getaggrement/${uid}`)
              .then((response) => {
                  if (response.status === 201) {
                      setaggrements('');
                      setloading(false);
                  } else {
                      setaggrements(response.data.aggrements);
                      setloading(false);
                  }
              }).catch(err => console.log(err));
        })
  }, []);
 
  useEffect(() => {
    dispatch(getProfile());
    dispatch(getPosts());
    dispatch(getFollowers());
    dispatch(getFriends());
    dispatch(getGallery());
  }, [dispatch]);

  const handleChangeTab = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const handleToggleFollow = (followerId) => {
    dispatch(onToggleFollow(followerId));
  };

  const handleFindFriends = (event) => {
    setFindFriends(event.target.value);
  };

  if (!myProfile) {
    return null;
  }

  const PROFILE_TABS = [
    {
      value: 'profile',
      icon: <Icon icon={roundAccountBox} width={20} height={20} />,
      component: <Profile myProfile={myProfile} posts={posts} />
    },
    {
      value: 'followers',
      icon: <Icon icon={heartFill} width={20} height={20} />,
      component: <ProfileFollowers followers={followers} onToggleFollow={handleToggleFollow} />
    },
    {
      value: 'friends',
      icon: <Icon icon={peopleFill} width={20} height={20} />,
      component: <ProfileFriends friends={friends} findFriends={findFriends} onFindFriends={handleFindFriends} />
    },
    {
      value: 'gallery',
      icon: <Icon icon={roundPermMedia} width={20} height={20} />,
      component: <ProfileGallery gallery={gallery} />
    }
  ];

  const deleteUser = (_id) => {
    axios.get(`${API_SERVICE}/api/v1/main/deleteuser/${_id}`)
      .then((response) => {
          window.location.href = "/dashboard/user/list";
      }).catch(err => console.log(err));
  }

  return (
    <Page title="Gumbolo">
      <Container>
        <HeaderBreadcrumbs
          heading="Profile"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
          ]}
        />
        {
          loading ? (
            <>
            </>
          ) : (
            <>
              <Button onClick={() => deleteUser(userdetails._id)} variant="contained" color="error" style={{ float: 'right', marginBottom: '10px' }}>
                Delete Client
              </Button>
              <AppBar position="static" color="default">
              <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
                aria-label="full width tabs example"
              >
                <Tab label="Overview" {...a11yProps(0)} />
                <Tab label="Aggrement" {...a11yProps(1)} />
                <Tab label="Appointments" {...a11yProps(2)} />
                <Tab label="Pets" {...a11yProps(3)} />
              </Tabs>
            </AppBar>
            <SwipeableViews
              axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
              index={value}
              onChangeIndex={handleChangeIndex}
            >
              <TabPanel value={value} index={0} dir={theme.direction}>
                <h2>
                  {userdetails.fullname}
                </h2>
                <br />
                <h4>
                  <b>Email: </b> {userdetails.email} <br />
                  <b>Phone: </b> {userdetails.phone} <br />
                  <b>Address: </b> {userdetails.address} <br />
                  <b>Pet Name: </b> {userdetails.petname} <br />
                  <b>Appointment Date: </b> {userdetails.dateofappointment} <br /> <br />
                  <b>Reason for Appointment: </b> 
                    {parse(`
                      ${userdetails.reason}
                    `)} 
                  <br />
                  <b>Amount: </b> $ {userdetails.amountpay} <br />
                </h4>
              </TabPanel>
              <TabPanel value={value} index={1} dir={theme.direction}>
                {parse(`
                  ${aggrements}
                `)} 
              </TabPanel>
              <TabPanel value={value} index={2} dir={theme.direction}>
                <h4>
                  <b>Appointment Date: </b> {userdetails.dateofappointment} <br /> <br />
                  <b>Reason for Appointment: </b> 
                    {parse(`
                      ${userdetails.reason}
                    `)} 
                  <br />
                  <b>Amount: </b> $ {userdetails.amountpay} <br />
                </h4>
              </TabPanel>
              <TabPanel value={value} index={3} dir={theme.direction}>
                <h4>
                  <b>Pet Name: </b> {userdetails.petname} <br />
                  <b>Appointment Date: </b> {userdetails.dateofappointment} <br /> <br />
                  <b>Reason for Appointment: </b> 
                    {parse(`
                      ${userdetails.reason}
                    `)} 
                  <br />
                  <b>Amount: </b> $ {userdetails.amountpay} <br />
                </h4>
              </TabPanel>
            </SwipeableViews>
            </>
          )
        }
        

      </Container>
    </Page>
  );
}
