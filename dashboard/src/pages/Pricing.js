// material
import { experimentalStyled as styled } from "@material-ui/core/styles";
import { Box, Grid, Switch, Container, Typography } from "@material-ui/core";
// components
import Page from "../components/Page";
import { PricingPlanCard } from "../components/_external-pages/pricing";
//
import { PlanFreeIcon, PlanStarterIcon, PlanPremiumIcon } from "../assets";

// ----------------------------------------------------------------------

const PLANS = [
  {
    subscription: "basic",
    icon: <PlanFreeIcon />,
    price: 0,
    caption: "forever",
    lists: [
      { text: "1 User", isAvailable: true },
      { text: "Unlimited clients", isAvailable: true },
      { text: "Unlimited appointments", isAvailable: true },
      { text: "Invoice Management", isAvailable: true },
      { text: "Add-ons: Extra user $10", isAvailable: true },
    ],
    labelAction: "choose basic",
  },
  {
    subscription: "starter",
    icon: <PlanStarterIcon />,
    price: 39,
    caption: "saving $24 a year",
    lists: [
      { text: "1 User", isAvailable: true },
      { text: "Unlimited clients", isAvailable: true },
      { text: "Unlimited appointments", isAvailable: true },
      { text: "Invoice Management", isAvailable: true },
      { text: "Add-ons: Extra user $10", isAvailable: true },
    ],
    labelAction: "choose starter",
  },
  {
    subscription: "premium",
    icon: <PlanPremiumIcon />,
    price: 89,
    caption: "saving $124 a year",
    lists: [
      { text: "20 millions tracks", isAvailable: true },
      { text: "Up to 7 users", isAvailable: true },
      { text: "Unlimited clients", isAvailable: true },
      { text: "Unlimited appointments", isAvailable: true },
      { text: "Employee Management", isAvailable: true },
    ],
    labelAction: "choose premium",
  },
];

const RootStyle = styled(Page)(({ theme }) => ({
  minHeight: "100%",
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10),
}));

// ----------------------------------------------------------------------

export default function Pricing() {
  return (
    <RootStyle title="Pricing | Minimal-UI">
      <Container maxWidth="lg">
        <Typography variant="h3" align="center" paragraph>
          Flexible plans for your
          <br /> community&apos;s size and needs
        </Typography>
        <Typography align="center" sx={{ color: "text.secondary" }}>
          Choose your plan and make modern online conversation magic
        </Typography>

        <Box sx={{ my: 5 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <Typography variant="overline" sx={{ mr: 1.5 }}>
              MONTHLY
            </Typography>
            <Switch />
            <Typography variant="overline" sx={{ ml: 1.5 }}>
              YEARLY (save 10%)
            </Typography>
          </Box>
          <Typography
            variant="caption"
            align="right"
            sx={{ color: "text.secondary", display: "block" }}
          >
            * Plus applicable taxes
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {PLANS.map((card, index) => (
            <Grid item xs={12} md={4} key={card.subscription}>
              <PricingPlanCard card={card} index={index} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </RootStyle>
  );
}
