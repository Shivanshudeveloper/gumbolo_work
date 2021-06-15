import React from 'react';
import { filter } from 'lodash';
import { Icon } from '@iconify/react';
import { useState, useEffect } from 'react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';
import { API_SERVICE } from '../../config/URI';

// material
import { useTheme, makeStyles } from '@material-ui/core/styles';
import {
  Card,
  Table,
  Stack,
  Avatar,
  TableHead,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  Paper,
  TableCell,
  Container,
  TableContainer,
  TablePagination
} from '@material-ui/core';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getUserList, deleteUser } from '../../redux/slices/user';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import Page from '../../components/Page';
import Label from '../../components/Label';
import Scrollbar from '../../components/Scrollbar';
import SearchNotFound from '../../components/SearchNotFound';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../../components/_dashboard/user/list';


const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'company', label: 'Company', alignRight: false },
  { id: 'role', label: 'Role', alignRight: false },
  { id: 'isVerified', label: 'Verified', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: '' }
];

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500,
  },
}));

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}



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



const Clients = ({ client }) => {

  const showDetails = (id) => {
    sessionStorage.setItem("userprofileid", id);
    window.location.href = "/dashboard/user/profile"
  }

  return (
      <>
      <TableRow key="dsa">
        <TableCell component="th" scope="row">
          {client.fullname}
        </TableCell>
        <TableCell align="right">{client.email}</TableCell>
        <TableCell align="right">{client.phone}</TableCell>
        <TableCell align="right">
          <Button onClick={() => showDetails(client._id)} >View</Button>
        </TableCell>
      </TableRow>
      </>
  )
}



export default function UserList() {
  const dispatch = useDispatch();
  const { userList } = useSelector((state) => state.user);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  useEffect(() => {
    dispatch(getUserList());
  }, [dispatch]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = userList.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const handleDeleteUser = (userId) => {
    dispatch(deleteUser(userId));
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - userList.length) : 0;

  const filteredUsers = applySortFilter(userList, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;


  const [clients, setclients] = React.useState([]);
  const [loading, setloading] = React.useState(true);

  React.useEffect(() => {
      var uid = "demo@gmail.com";
      axios.get(`${API_SERVICE}/api/v1/main/getclients/${uid}`)
          .then(response => {
              setclients(response.data);
              console.log(response.data);
              setloading(false);
          })
  }, []);


  const showClients = () => {
      return clients.map(client => {
          return <Clients client={client} key={client._id} />
      })
  }

  return (
    <Page title="Gumbolo">
      <Container>
        <HeaderBreadcrumbs
          heading="Overview"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
          ]}
          action={
            <Button
              variant="contained"
              component={RouterLink}
              to={PATH_DASHBOARD.user.newUser}
              startIcon={<Icon icon={plusFill} />}
            >
              Add a New Client
            </Button>
          }
        />
        <Card>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Client Name</TableCell>
                <TableCell align="right">Client Email</TableCell>
                <TableCell align="right">Client Phone</TableCell>
                <TableCell align="right"> </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>

                {
                    loading === true ? (
                        <div style={{ padding: '14px' }}>
                          Loading...
                        </div>
                    ) : (
                        <>
                            {showClients()}
                        </>
                    )
                }

                



            </TableBody>
          </Table>
        </TableContainer>
        
          
          

          
        </Card>
      </Container>
    </Page>
  );
}
