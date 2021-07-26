import * as Yup from "yup";
import { useState } from "react";
import { Icon } from "@iconify/react";
import { useSnackbar } from "notistack";
import { useFormik, Form, FormikProvider } from "formik";
import eyeFill from "@iconify/icons-eva/eye-fill";
import closeFill from "@iconify/icons-eva/close-fill";
import eyeOffFill from "@iconify/icons-eva/eye-off-fill";
// material
import {
  Stack,
  TextField,
  IconButton,
  InputAdornment,
  Alert,
} from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import { LoadingButton } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";
// hooks
import useAuth from "../../../hooks/useAuth";
import useIsMountedRef from "../../../hooks/useIsMountedRef";
//
import { MIconButton } from "../../@material-extend";

// ----------------------------------------------------------------------
import { API_SERVICE } from "../../../config/URI";
import axios from "axios";

import CardInput from "../CardInput";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

const useStyles = makeStyles({
  root: {
    maxWidth: 500,
    marginTop: "4px",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    alignContent: "flex-start",
  },
  div: {
    display: "flex",
    flexDirection: "row",
    alignContent: "flex-start",
    justifyContent: "space-between",
  },
  button: {
    margin: "2em auto 1em",
  },
});

export default function RegisterForm({ amount, isBasic }) {
  const classes = useStyles();
  const { register } = useAuth();
  const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [showPassword, setShowPassword] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("First name required"),
    lastName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Last name required"),
    email: Yup.string()
      .email("Email must be a valid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    validationSchema: RegisterSchema,
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      try {
        await register(
          values.email,
          values.password,
          values.firstName,
          values.lastName
        );
        enqueueSnackbar("Register success", {
          variant: "success",
          action: (key) => (
            <MIconButton size="small" onClick={() => closeSnackbar(key)}>
              <Icon icon={closeFill} />
            </MIconButton>
          ),
        });
        if (isMountedRef.current) {
          setSubmitting(false);
        }
      } catch (error) {
        console.error(error);
        if (isMountedRef.current) {
          setErrors({ afterSubmit: error.message });
          setSubmitting(false);
        }
      }
    },
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  const [data, setData] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
  });

  const changeEle = (event) => {
    const { name, value } = event.target;
    setData((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  };

  const submitData = () => {
    axios.post(`${API_SERVICE}/api/v1/main/register`, data).then((res) => {
      console.log("User added successfully");
      setData({
        fname: "",
        lname: "",
        email: "",
        password: "",
      });
    });
  };

  const continueBasic = async () => {
    alert("Basic Plan");
  };
  const confirmPayment = async () => {
    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const res = await axios.post(`${API_SERVICE}/api/v1/main/charges`, {
      email: data.email,
      amount: amount,
    });

    const clientSecret = res.data["client_secret"];

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          email: data.email,
        },
      },
    });
    // if (result.error) {
    //   // Show error to your customer (e.g., insufficient funds)
    //   console.log(result.error.message);
    // } else {
    //   // The payment has been processed!
    //   if (result.paymentIntent.status === "succeeded") {

    //   }
    // }
  };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate>
        <Stack spacing={3}>
          {errors.afterSubmit && (
            <Alert severity="error">{errors.afterSubmit}</Alert>
          )}

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField
              fullWidth
              label="First name"
              {...getFieldProps("firstName")}
              // error={Boolean(touched.firstName && errors.firstName)}
              //helperText={touched.firstName && errors.firstName}
              name="fname"
              onChange={changeEle}
              value={data.fname}
            />

            <TextField
              fullWidth
              label="Last name"
              {...getFieldProps("lastName")}
              // error={Boolean(touched.lastName && errors.lastName)}
              //helperText={touched.lastName && errors.lastName}
              name="lname"
              onChange={changeEle}
              value={data.lname}
            />
          </Stack>

          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label="Email address"
            {...getFieldProps("email")}
            // error={Boolean(touched.email && errors.email)}
            //helperText={touched.email && errors.email}
            name="email"
            onChange={changeEle}
            value={data.email}
          />

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? "text" : "password"}
            label="Password"
            {...getFieldProps("password")}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            // error={Boolean(touched.password && errors.password)}
            //helperText={touched.password && errors.password}
            name="password"
            onChange={changeEle}
            value={data.password}
          />
          {/*  */}

          {!isBasic && (
            <div className="col-md">
              <center>
                <div className={classes.root}>
                  <h2 className="text-center font-weight-bold">Card Details</h2>
                  <CardContent className={classes.content}>
                    <CardInput />
                  </CardContent>
                </div>
              </center>
            </div>
          )}

          {/*  */}
          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            onClick={isBasic ? continueBasic : confirmPayment}
          >
            {isBasic ? "Continue" : "Confirm Payment"}
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
