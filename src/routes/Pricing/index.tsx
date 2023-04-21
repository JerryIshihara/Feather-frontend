// import React from "react";
// import { useTheme, Container } from "@mui/material";

// const Pricing = () => {
// 	const theme = useTheme();
// 	return (
// 		<Container maxWidth="lg">
// 			<div style={{ color: theme.palette.text.primary }}>Pricing</div>
// 		</Container>
// 	);
// };

// export default Pricing;
import React from "react";
import { useTheme, Container, Grid, Typography, Button } from "@mui/material";
import { styled } from "@mui/system";

const PricingContainer = styled(Container)(({ theme }) => ({
  padding: theme.spacing(8, 0),
  backgroundColor: theme.palette.background.paper,
}));

const Pricing = () => {
  const theme = useTheme();
  return (
    <PricingContainer maxWidth="lg">
      <Typography variant="h3" align="center" gutterBottom>
        Pricing Plans
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <PricingCard
            title="Basic"
            price="$9.99/month"
            features={[
              "Access to training videos",
              "Video editing tools",
              "Basic analysis",
            ]}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <PricingCard
            title="Pro"
            price="$19.99/month"
            features={[
              "Access to training videos",
              "Video editing tools",
              "Advanced analysis",
            ]}
            popular
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <PricingCard
            title="Premium"
            price="$29.99/month"
            features={[
              "Access to training videos",
              "Video editing tools",
              "Expert analysis",
            ]}
          />
        </Grid>
      </Grid>
    </PricingContainer>
  );
};

interface PricingCardProps {
  title: string;
  price: string;
  features: string[];
  popular?: boolean;
}

const PricingCard = ({ title, price, features, popular }: PricingCardProps) => {
  const theme = useTheme();
  return (
    <div
      style={{
        backgroundColor: theme.palette.mode === "dark" ? "#333" : "#fff",
        borderRadius: theme.shape.borderRadius,
        boxShadow: theme.shadows[2],
        padding: theme.spacing(4),
        textAlign: "center",
      }}
    >
      {popular && (
        <Typography
          variant="overline"
          component="div"
          style={{
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            borderRadius: theme.shape.borderRadius,
            padding: theme.spacing(0.5, 2),
            marginBottom: theme.spacing(2),
          }}
        >
          Popular
        </Typography>
      )}
      <Typography variant="h6" component="div" gutterBottom>
        {title}
      </Typography>
      <Typography variant="h4" component="div" gutterBottom>
        {price}
      </Typography>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {features.map((feature, index) => (
          <li key={index} style={{ marginBottom: theme.spacing(1) }}>
            {feature}
          </li>
        ))}
      </ul>
      <Button
        variant="contained"
        size="large"
        color="primary"
        fullWidth
        style={{ marginTop: theme.spacing(2) }}
      >
        Sign Up
      </Button>
    </div>
  );
};

export default Pricing;
