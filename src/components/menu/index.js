import { AppBar, Badge, IconButton, Toolbar, Typography } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import { Box } from "@mui/system";
import { useAuth } from "context/auth";
import { useShoppingCart } from "context/shoppingCart";
import React from "react";
import { Link } from "react-router-dom";

function AppMenu() {
  const { Logout } = useAuth();
  const { shoppingCart } = useShoppingCart();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            component={Link}
            to="/"
            size="large"
            // aria-label="show 17 new notifications"
            color="inherit"
          >
            <HomeIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            Welcome to Shopping cart roleplay
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              component={Link}
              to="/shopping-cart"
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={shoppingCart.length} color="warning">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            <IconButton
              component={Link}
              to="/"
              size="large"
              color="inherit"
              onClick={Logout}
            >
              {/* <Badge badgeContent={17} color="error"> */}
              <LogoutIcon />
              {/* </Badge> */}
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default AppMenu;
