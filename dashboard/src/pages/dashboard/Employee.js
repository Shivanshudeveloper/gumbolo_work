import * as Yup from 'yup';
import React from 'react';
import { useSnackbar } from 'notistack';
import { useCallback, useState } from 'react';
import { Form, FormikProvider, useFormik } from 'formik';
// material
import { LoadingButton } from '@material-ui/lab';
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { API_SERVICE } from '../../config/URI';
import axios from 'axios';
import Container from '@material-ui/core/Container';
import {
  Card,
  Grid,
  Chip,
  Stack,
  Button,
  Switch,
  Paper,
  TextField,
  Typography,
  Autocomplete,
  FormHelperText,
  FormControlLabel,
  CardActions,
  CardContent
} from '@material-ui/core';
// utils
import fakeRequest from '../../utils/fakeRequest';
//
import {Timepicker} from 'react-timepicker';

// Remember to include timepicker.css
// If you can import CSS in JS:
import 'react-timepicker/timepicker.css';
import { varBounceInLeft } from 'src/components/animate';

import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { UploadSingleFile } from '../../components/upload';
import Avatar from '@material-ui/core/Avatar';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});



const useStyles = makeStyles((theme) => ({
    appBar: {
      position: 'relative',
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
    },
    root: {
      width: "auto",
    },
    large: {
      width: theme.spacing(14),
      height: theme.spacing(14),
    },
}));

//

// ----------------------------------------------------------------------

const TAGS_OPTION = [
  'Toy Story 3',
  'Logan',
  'Full Metal Jacket',
  'Dangal',
  'The Sting',
  '2001: A Space Odyssey',
  "Singin' in the Rain",
  'Toy Story',
  'Bicycle Thieves',
  'The Kid',
  'Inglourious Basterds',
  'Snatch',
  '3 Idiots'
];

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1)
}));

// ----------------------------------------------------------------------

export default function Employee() {
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();
  const [openEmployee, setOpenEmployee] = React.useState(false);
  const handleClickOpenEmployee = () => {
    setOpenEmployee(true);
  };
  const handleCloseEmployee = () => {
    setOpenEmployee(false);
  };


  const [openJob, setOpenJob] = React.useState(false);
  const handleClickOpenJob = () => {
    setOpenJob(true);
  };
  const handleCloseJob = () => {
    setOpenJob(false);
  };


  const [openEmployeeWork, setOpenEmployeeWork] = React.useState(false);
  const handleClickOpenEmployeeWork = () => {
    setOpenEmployeeWork(true);
  };
  const handleCloseEmployeeWork = () => {
    setOpenEmployeeWork(false);
  };

  const [openTime, setOpenTime] = React.useState(false);

  const handleClickOpenTime = () => {
    setOpenTime(true);
  };

  const handleCloseTime = () => {
    setOpenTime(false);
  };

  const [openTimeEnd, setOpenTimeEnd] = React.useState(false);

  const handleClickOpenTimeEnd = () => {
    setOpenTimeEnd(true);
  };

  const handleCloseTimeEnd = () => {
    setOpenTimeEnd(false);
  };



  const [open, setOpen] = useState(false);
  const [time, settime] = useState('');

  const handleOpenPreview = () => {
    setOpen(true);
  };

  const handleClosePreview = () => {
    setOpen(false);
  };

  const NewBlogSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    content: Yup.string(),
    cover: Yup.mixed().required('Cover is required')
  });

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      content: '',
      cover: null,
      tags: ['Logan'],
      publish: true,
      comments: true,
      metaTitle: '',
      metaDescription: '',
      metaKeywords: ['Logan']
    },
    validationSchema: NewBlogSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        await fakeRequest(500);
        resetForm();
        handleClosePreview();
        setSubmitting(false);
        enqueueSnackbar('Post success', { variant: 'success' });
      } catch (error) {
        console.error(error);
        setSubmitting(false);
      }
    }
  });

  var { errors, values, touched, handleSubmit, isSubmitting, setFieldValue, getFieldProps } = formik;

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        setFieldValue('cover', {
          ...file,
          preview: URL.createObjectURL(file)
        });
      }
    },
    [setFieldValue]
  );


  const onChange = (hours, minutes) => {
    // do something
  }

  const onChangeEndTime = (hours, minutes) => {
    // do something
  }

  return (
    <>
        <Dialog
          open={openTime}
          onClose={handleCloseTime}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Start Time</DialogTitle>
          <DialogContent>
              <Timepicker onChange={onChange} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseTime} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={openTimeEnd}
          onClose={handleCloseTimeEnd}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">End Time</DialogTitle>
          <DialogContent>
              <Timepicker onChange={onChangeEndTime} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseTimeEnd} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>



        <Dialog fullScreen open={openEmployee} onClose={handleCloseEmployee} TransitionComponent={Transition}>
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={handleCloseEmployee} aria-label="close">
                        <CloseIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Container style={{ marginTop: '20px' }} maxWidth="md">
                <h2>Add Employee</h2>
                <Grid style={{ marginTop: '4px', marginBottom: '20px' }} container spacing={3}>
                    <Grid item xs={6} >
                        <TextField fullWidth id="standard-basic" label="First Name" />
                    </Grid>
                    <Grid item xs={6} >
                        <TextField fullWidth id="standard-basic" label="Last Name" />
                    </Grid>
                    
                    <Grid item xs={6} >
                        <TextField fullWidth id="standard-basic" label="Email" />
                    </Grid>
                    <Grid item xs={6} >
                        <TextField fullWidth id="standard-basic" label="Phone No." />
                    </Grid>

                    <Grid item xs={12} >
                        <TextField fullWidth id="standard-basic" label="Address" />
                    </Grid>

                    <Grid item xs={12} >
                        <TextField fullWidth id="standard-basic" label="Position eg. Worker, Manager, Staff, Maid" />
                    </Grid>

                    <Grid item xs={12} >
                        <TextField fullWidth id="standard-basic" label="Working hours" />
                    </Grid>

                    <Grid item xs={12}>
                        <LabelStyle>Add Photograph</LabelStyle>
                        <UploadSingleFile
                        maxSize={3145728}
                        accept="image/*"
                        file={values.cover}
                        onDrop={handleDrop}
                        error={Boolean(touched.cover && errors.cover)}
                        />
                        {touched.cover && errors.cover && (
                        <FormHelperText error sx={{ px: 2 }}>
                            {touched.cover && errors.cover}
                        </FormHelperText>
                        )}
                    </Grid>

                    <Grid item xs={12}>
                        <Button
                            fullWidth
                            type="button"
                            color="primary"
                            variant="contained"
                            size="large"
                            onClick={handleOpenPreview}
                            sx={{ mr: 1.5 }}
                        >
                        Submit
                        </Button>
                    </Grid>
                </Grid>
            </Container>
        </Dialog>



        <Dialog fullScreen open={openJob} onClose={handleCloseJob} TransitionComponent={Transition}>
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={handleCloseJob} aria-label="close">
                        <CloseIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Container style={{ marginTop: '20px' }} maxWidth="md">
                <h2>Add Job</h2>
                <Grid style={{ marginTop: '4px', marginBottom: '20px' }} container spacing={3}>
                    <Grid item xs={12} >
                        <TextField fullWidth id="standard-basic" label="Job Title" />
                    </Grid>

                    <Grid item xs={6} >
                        <TextField fullWidth id="standard-basic" label="Date" value="04/08/2021" />
                    </Grid>
                    <Grid item xs={6} >
                        <TextField fullWidth id="standard-basic" label="Time" value="10:50 AM" />
                    </Grid>
                    
                    <Grid item xs={12} >
                        <TextField fullWidth id="standard-basic" label="Client Name" />
                    </Grid>

                    
                    <Grid item xs={6} >
                        <TextField fullWidth id="standard-basic" label="Client Phone No." />
                    </Grid>

                    <Grid item xs={6} >
                        <TextField fullWidth id="standard-basic" label="Client Address" />
                    </Grid>

                    

                    <Grid item xs={12} >
                        <TextField fullWidth id="standard-basic" label="Payment" />
                    </Grid>


                    <Grid item xs={12} >
                        <TextField fullWidth multiline rows={4} id="standard-basic" label="Description" />
                    </Grid>


                    <Grid item xs={12}>
                        <Button
                            fullWidth
                            type="button"
                            color="primary"
                            variant="contained"
                            size="large"
                            onClick={handleOpenPreview}
                            sx={{ mr: 1.5 }}
                        >
                        Submit
                        </Button>
                    </Grid>
                </Grid>
            </Container>
        </Dialog>


        <Dialog fullScreen open={openEmployeeWork} onClose={handleCloseEmployeeWork} TransitionComponent={Transition}>
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={handleCloseEmployeeWork} aria-label="close">
                        <CloseIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Container style={{ marginTop: '20px' }} maxWidth="md">
                <h2>Schedule Work to Employee</h2>
                <Grid style={{ marginTop: '4px', marginBottom: '20px' }} container spacing={3}>
                  <Grid item xs={3}>
                    <TextField fullWidth type="date" id="outlined-basic" variant="outlined" />
                  </Grid>

                  <Grid item xs={3}>
                    <Button
                        fullWidth
                        type="button"
                        color="primary"
                        variant="outlined"
                        onClick={handleClickOpenTime}
                        size="large"
                        style={{ height: '57px' }}
                        sx={{ mr: 1.5 }}
                    >
                    Start Time
                    </Button>
                  </Grid>

                  <Grid item xs={3}>
                    <Button
                        fullWidth
                        type="button"
                        color="primary"
                        variant="outlined"
                        onClick={handleClickOpenTimeEnd}
                        size="large"
                        style={{ height: '57px' }}
                        sx={{ mr: 1.5 }}
                    >
                    End Time
                    </Button>
                  </Grid>

                  <Grid item xs={3}>
                    <Button
                        fullWidth
                        type="button"
                        color="primary"
                        variant="contained"
                        style={{ height: '57px' }}
                        size="large"
                        sx={{ mr: 1.5 }}
                    >
                    Search
                    </Button>
                  </Grid>
                </Grid>
            </Container>
        </Dialog>


      <FormikProvider value={formik}>
        <Form noValidate autoComplete="off">
            <Grid container spacing={3}>
                <Grid item xs={12} >
                    <Button onClick={handleClickOpenEmployee} style={{ float: 'right', marginRight: '10px' }} variant="contained" color="primary">
                        Add Employee
                    </Button>

                    <Button onClick={handleClickOpenEmployeeWork} style={{ float: 'right', marginRight: '10px' }} variant="contained" color="secondary">
                        Schedule Work
                    </Button>
                </Grid>
            </Grid>

            <Grid style={{ marginTop: '20px' }} container spacing={3}>
                <Grid item xs={6} sm={3}>
                    <Card className={classes.root}>
                        <CardContent>
                            <center>
                                <Avatar alt="Remy Sharp" src="https://writestylesonline.com/wp-content/uploads/2019/01/What-To-Wear-For-Your-Professional-Profile-Picture-or-Headshot.jpg" className={classes.large} />
                                <br />
                                <h4>Riya Sharma</h4>
                                <h5>riya@gmail.com</h5>
                            </center>

                        </CardContent>
                        <CardActions>
                            <Button onClick={handleClickOpenJob} fullWidth>View More</Button>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item xs={6} sm={3}>
                    <Card className={classes.root}>
                        <CardContent>
                            <center>
                                <Avatar alt="Remy Sharp" src="https://writestylesonline.com/wp-content/uploads/2019/01/What-To-Wear-For-Your-Professional-Profile-Picture-or-Headshot.jpg" className={classes.large} />
                                <br />
                                <h4>Riya Sharma</h4>
                                <h5>riya@gmail.com</h5>
                            </center>

                        </CardContent>
                        <CardActions>
                            <Button onClick={handleClickOpenJob} fullWidth>View More</Button>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item xs={6} sm={3}>
                    <Card className={classes.root}>
                        <CardContent>
                            <center>
                                <Avatar alt="Remy Sharp" src="https://writestylesonline.com/wp-content/uploads/2019/01/What-To-Wear-For-Your-Professional-Profile-Picture-or-Headshot.jpg" className={classes.large} />
                                <br />
                                <h4>Riya Sharma</h4>
                                <h5>riya@gmail.com</h5>
                            </center>

                        </CardContent>
                        <CardActions>
                            <Button onClick={handleClickOpenJob} fullWidth>View More</Button>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item xs={6} sm={3}>
                    <Card className={classes.root}>
                        <CardContent>
                            <center>
                                <Avatar alt="Remy Sharp" src="https://writestylesonline.com/wp-content/uploads/2019/01/What-To-Wear-For-Your-Professional-Profile-Picture-or-Headshot.jpg" className={classes.large} />
                                <br />
                                <h4>Riya Sharma</h4>
                                <h5>riya@gmail.com</h5>
                            </center>

                        </CardContent>
                        <CardActions>
                            <Button onClick={handleClickOpenJob} fullWidth>View More</Button>
                        </CardActions>
                    </Card>
                </Grid>

                <Grid item xs={6} sm={3}>
                    <Card className={classes.root}>
                        <CardContent>
                            <center>
                                <Avatar alt="Remy Sharp" src="https://writestylesonline.com/wp-content/uploads/2019/01/What-To-Wear-For-Your-Professional-Profile-Picture-or-Headshot.jpg" className={classes.large} />
                                <br />
                                <h4>Riya Sharma</h4>
                                <h5>riya@gmail.com</h5>
                            </center>

                        </CardContent>
                        <CardActions>
                            <Button onClick={handleClickOpenJob} fullWidth>View More</Button>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item xs={6} sm={3}>
                    <Card className={classes.root}>
                        <CardContent>
                            <center>
                                <Avatar alt="Remy Sharp" src="https://writestylesonline.com/wp-content/uploads/2019/01/What-To-Wear-For-Your-Professional-Profile-Picture-or-Headshot.jpg" className={classes.large} />
                                <br />
                                <h4>Riya Sharma</h4>
                                <h5>riya@gmail.com</h5>
                            </center>

                        </CardContent>
                        <CardActions>
                            <Button fullWidth>View More</Button>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item xs={6} sm={3}>
                    <Card className={classes.root}>
                        <CardContent>
                            <center>
                                <Avatar alt="Remy Sharp" src="https://writestylesonline.com/wp-content/uploads/2019/01/What-To-Wear-For-Your-Professional-Profile-Picture-or-Headshot.jpg" className={classes.large} />
                                <br />
                                <h4>Riya Sharma</h4>
                                <h5>riya@gmail.com</h5>
                            </center>

                        </CardContent>
                        <CardActions>
                            <Button fullWidth>View More</Button>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item xs={6} sm={3}>
                    <Card className={classes.root}>
                        <CardContent>
                            <center>
                                <Avatar alt="Remy Sharp" src="https://writestylesonline.com/wp-content/uploads/2019/01/What-To-Wear-For-Your-Professional-Profile-Picture-or-Headshot.jpg" className={classes.large} />
                                <br />
                                <h4>Riya Sharma</h4>
                                <h5>riya@gmail.com</h5>
                            </center>

                        </CardContent>
                        <CardActions>
                            <Button fullWidth>View More</Button>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>


        </Form>
      </FormikProvider>
    </>
  );
}
