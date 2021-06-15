import * as Yup from 'yup';
import React from 'react';
import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { Form, FormikProvider, useFormik } from 'formik';
import { API_SERVICE } from '../../../config/URI';
import axios from 'axios';


// material
import { LoadingButton } from '@material-ui/lab';
import {
  Box,
  Card,
  Grid,
  Stack,
  Switch,
  TextField,
  Typography,
  FormHelperText,
  FormControlLabel
} from '@material-ui/core';
// utils
import { fData } from '../../../utils/formatNumber';
import fakeRequest from '../../../utils/fakeRequest';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
//
import Label from '../../Label';
import { UploadAvatar } from '../../upload';
import countries from './countries';
import { QuillEditor } from '../../editor';

// ----------------------------------------------------------------------

UserNewForm.propTypes = {
  isEdit: PropTypes.bool,
  currentUser: PropTypes.object
};

export default function UserNewForm({ isEdit, currentUser }) {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const NewUserSchema = Yup.object().shape({
    name: Yup.string().required('Field is required'),
    email: Yup.string().required('Field is required').email(),
    phoneNumber: Yup.string().required('Field is required'),
    address: Yup.string().required('Field is required'),
    country: Yup.string().required('Field is required'),
    company: Yup.string().required('Field is required'),
    state: Yup.string().required('Field is required'),
    city: Yup.string().required('Field is required'),
    role: Yup.string().required('Field is required'),
    avatarUrl: Yup.mixed().required('Field is required')
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: currentUser?.name || '',
      email: currentUser?.email || '',
      phoneNumber: currentUser?.phoneNumber || '',
      address: currentUser?.address || '',
      country: currentUser?.country || '',
      state: currentUser?.state || '',
      city: currentUser?.city || '',
      zipCode: currentUser?.zipCode || '',
      avatarUrl: currentUser?.avatarUrl || null,
      isVerified: currentUser?.isVerified || true,
      status: currentUser?.status,
      company: currentUser?.company || '',
      role: currentUser?.role || ''
    },
    validationSchema: NewUserSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      try {
        await fakeRequest(500);
        resetForm();
        setSubmitting(false);
        enqueueSnackbar(!isEdit ? 'Create success' : 'Update success', { variant: 'success' });
        navigate(PATH_DASHBOARD.user.list);
      } catch (error) {
        console.error(error);
        setSubmitting(false);
        setErrors(error);
      }
    }
  });

  const { errors, values, touched, handleSubmit, isSubmitting, setFieldValue, getFieldProps } = formik;

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        setFieldValue('avatarUrl', {
          ...file,
          preview: URL.createObjectURL(file)
        });
      }
    },
    [setFieldValue]
  );

  const [fullname, setfullname] = React.useState('');
  const [email, setemail] = React.useState('');
  const [address, setaddress] = React.useState('');
  const [phone, setphone] = React.useState('');
  const [petname, setpetname] = React.useState('');
  const [amountpay, setamountpay] = React.useState('');
  const [dateofappointment, setdateofappointment] = React.useState('');




  const addclient = () => {
    var uploadData = {
      uid: 'demo@gmail.com',
      fullname,
      email,
      address,
      reason: values.content,
      phone,
      petname,
      amountpay,
      dateofappointment
    }
    axios.post(`${API_SERVICE}/api/v1/main/addclient`, uploadData)
        .then((response) => {
            if (response.status === 200) {
              window.location.href = "/dashboard/user/list";
            }
        }).catch(err => console.log(err));
  }

  return (
    <FormikProvider value={formik}>
      <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    onChange={(e) => setfullname(e.target.value)}
                  />
                  <TextField
                    fullWidth
                    label="Email Address"
                    onChange={(e) => setemail(e.target.value)}
                  />
                </Stack>


                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <TextField
                    fullWidth
                    label="Address"
                    onChange={(e) => setaddress(e.target.value)}
                  />
                  <TextField onChange={(e) => setphone(e.target.value)} fullWidth label="Phone No."  />
                </Stack>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <TextField
                    fullWidth
                    label="Pet Name"
                    onChange={(e) => setpetname(e.target.value)}
                  />
                  <TextField
                    fullWidth
                    onChange={(e) => setamountpay(e.target.value)}
                    label="Amount to Pay"
                  />
                </Stack>


                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <TextField
                    fullWidth
                    label="Date of Appointment"
                    onChange={(e) => setdateofappointment(e.target.value)}
                    type="date"
                  />
                </Stack>


                <hr />
                <h5>Reason for Pet Appointment</h5>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                    <QuillEditor
                      id="post-content"
                      value={values.content}
                      onChange={(val) => setFieldValue('content', val)}
                      error={Boolean(touched.content && errors.content)}
                    />
                    {touched.content && errors.content && (
                      <FormHelperText error sx={{ px: 2 }}>
                        {touched.content && errors.content}
                      </FormHelperText>
                    )}
                </Stack>

                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                  <LoadingButton onClick={addclient} type="button" variant="contained" loading={isSubmitting}>
                    Add Client
                  </LoadingButton>
                </Box>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
}
