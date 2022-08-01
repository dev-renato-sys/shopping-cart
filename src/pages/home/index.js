import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  ImageListItem,
  ListItem,
} from "@mui/material";
import { ShowPage } from "components/skeleton";
import React from "react";
import { useShoppingCart } from "context/shoppingCart";
import { Link } from "react-router-dom";

function HomePage() {
  const { items } = useShoppingCart();

  return (
    <ShowPage>
      <Box container padding={4}>
        <Card>
          <CardContent>
            {/* <List sx={{ width: "100%", bgcolor: "background.paper" }}> */}
            <ListItem disablePadding>
              <Grid container>
                <Grid item sm={12}>
                  <p>
                    <b>Avaliable Shopping Items</b>
                  </p>
                </Grid>
                <Grid item sm={12}>
                  <Alert color="warning">
                    Shipping discount above R$10 purchases.
                  </Alert>
                </Grid>
              </Grid>
            </ListItem>
            {items.map((item) => {
              // const labelId = `checkbox-list-secondary-label-${item.id}`;
              return (
                <div key={item.productId}>
                  <Grid container spacing={2} p={2}>
                    <Grid item xs={12}>
                      <ImageListItem key={item.productId}>
                        <img
                          src={`${item.imageUrl}`}
                          // srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                          alt={"yo"}
                          loading="lazy"
                          style={{ width: 100, height: 100 }}
                        />
                      </ImageListItem>
                    </Grid>
                    <Grid item xs={12}>
                      {item.name}
                    </Grid>
                    <Grid item xs={4}>
                      R${` ${item.sellingPrice / 100}`}
                    </Grid>
                    <Grid container p={1} justifyContent="flex-end">
                      <Button
                        component={Link}
                        to={`/products/${item.productId}`}
                      >
                        View Item
                      </Button>
                    </Grid>
                    <Grid item xs={12}>
                      <Divider />
                    </Grid>
                  </Grid>
                </div>
              );
            })}
            {/* </List> */}
          </CardContent>
        </Card>
      </Box>
    </ShowPage>
  );
}

export default HomePage;
