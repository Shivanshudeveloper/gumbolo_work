import { Link as RouterLink } from "react-router-dom";
// material
import { experimentalStyled as styled } from "@material-ui/core/styles";
import {
  Box,
  Card,
  Link,
  Container,
  Typography,
  Tooltip,
} from "@material-ui/core";
// hooks
import useAuth from "../../hooks/useAuth";
// routes
import { PATH_AUTH } from "../../routes/paths";
// layouts
import AuthLayout from "../../layouts/AuthLayout";
// components
import Page from "../../components/Page";
import { MHidden } from "../../components/@material-extend";
import { RegisterForm } from "../../components/authentication/register";
import AuthFirebaseSocials from "../../components/authentication/AuthFirebaseSocial";

import { useState, useEffect } from "react";
import queryString from "query-string";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import MainFooter from "src/layouts/main/MainFooter";
// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: "100%",
  maxWidth: 464,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  margin: theme.spacing(2, 0, 2, 2),
}));

const ContentStyle = styled("div")(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  display: "flex",
  minHeight: "100vh",
  flexDirection: "column",
  justifyContent: "center",
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function Register() {
  const { method } = useAuth();
  const [isBasic, setIsBasic] = useState(false);
  useEffect(() => {
    const id = queryString.parse(window.location.search);
    setTitle("Get started with " + id.plan + " plan");
    switch (id.plan) {
      case "basic":
        setAmount(0);
        setIsBasic(true);
        break;
      case "starter":
        setAmount(39);
        setIsBasic(false);
        break;
      case "premium":
        setAmount(89);
        setIsBasic(false);
        break;

      default:
        break;
    }
  }, []);

  const [title, setTitle] = useState("Get started absolutely free.");
  const [amount, setAmount] = useState(0);

  const stripePromise = loadStripe(
    "pk_test_51J8Hs4JNNRBRk7NImwMn1K1DgBb8CGeuQKAqdS0gQKQ6Kc3xABcobNpGmFcQlNmAxq6UKuIRA1ySJBPCrwuirdtc00TwTa2zBV"
  );

  return (
    <RootStyle title="Gumbolo">
      <AuthLayout>
        Already have an account? &nbsp;
        <Link
          underline="none"
          variant="subtitle2"
          component={RouterLink}
          to={PATH_AUTH.login}
        >
          Login
        </Link>
      </AuthLayout>

      {/* <MHidden width="mdDown">
        <SectionStyle>
          <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
            Manage the business more effectively with Gumbolo
          </Typography>
          <img
            alt="register"
            src="/static/illustrations/illustration_register.png"
          />
        </SectionStyle>
      </MHidden> */}

      <Container>
        <ContentStyle>
          <Box sx={{ mb: 5, display: "flex", alignItems: "center" }}>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h4" gutterBottom>
                {title}
              </Typography>
              {/* <Typography sx={{ color: 'text.secondary' }}>Free forever. No credit card needed.</Typography> */}
            </Box>
            {/* <Tooltip title={(method === 'firebase' && 'Firebase') || (method === 'cognito' && 'Cognito') || 'JWT'}>
              <Box
                component="img"
                src={`/static/auth/${
                  (method === 'firebase' && 'ic_firebase') || (method === 'cognito' && 'ic_cognito') || 'ic_jwt'
                }.png`}
                sx={{ width: 32, height: 32 }}
              />
            </Tooltip> */}
          </Box>

          {method === "firebase" && <AuthFirebaseSocials />}
          <Elements stripe={stripePromise}>
            <RegisterForm amount={amount} isBasic={isBasic} />
          </Elements>

          <Typography
            variant="body2"
            align="center"
            sx={{ color: "text.secondary", mt: 3 }}
          >
            By registering, I agree to Minimal&nbsp;
            <Link underline="always" sx={{ color: "text.primary" }}>
              Terms of Service
            </Link>
            &nbsp;and&nbsp;
            <Link underline="always" sx={{ color: "text.primary" }}>
              Privacy Policy
            </Link>
            .
          </Typography>

          <MHidden width="smUp">
            <Typography variant="subtitle2" sx={{ mt: 3, textAlign: "center" }}>
              Already have an account?&nbsp;
              <Link to={PATH_AUTH.login} component={RouterLink}>
                Login
              </Link>
            </Typography>
          </MHidden>
        </ContentStyle>
        <MainFooter />
      </Container>
    </RootStyle>
  );
}
