import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  IconButton,
  ImageListItem,
  ListItem,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ReturnIcon from "@mui/icons-material/KeyboardReturn";
import RemoveIcon from "@mui/icons-material/Remove";
import { ShowPage } from "components/skeleton";
import React from "react";
import { useShoppingCart } from "context/shoppingCart";
import { Link, useParams } from "react-router-dom";

function ProductPage() {
  const {
    items,
    addItemsToShoppingCart,
    addOneItemQuantity,
    removeOneItemQuantity,
  } = useShoppingCart();
  const { id } = useParams();

  const handleShoppingCart = (item) => {
    addItemsToShoppingCart(item);
  };

  return (
    <ShowPage>
      <Box container padding={4}>
        <Card>
          <CardContent>
            {/* <List sx={{ width: "100%", bgcolor: "background.paper" }}> */}
            <ListItem disablePadding>
              <Grid alignItems="center" spacing={2} container>
                <Grid item>
                  <IconButton component={Link} to="/">
                    <ReturnIcon />
                  </IconButton>
                </Grid>
                <Grid item>
                  <p>
                    <b>Viewing Item</b>
                  </p>
                </Grid>
              </Grid>
            </ListItem>
            {items
              .filter((item) => item.productId === id)
              .map((item) => {
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
                        <b>{item.name}</b>
                      </Grid>
                      <Grid item xs={12}>
                        Brand: {item.additionalInfo.brandName}
                      </Grid>
                      <Grid item xs={12}>
                        Category: {item.productCategories[29]}
                      </Grid>
                      <Grid item xs={12}>
                        {item.quantity > 0 && (
                          <>
                            <IconButton
                              onClick={() => {
                                removeOneItemQuantity(item.productId);
                              }}
                              color="primary"
                              size="small"
                            >
                              <RemoveIcon />
                            </IconButton>
                          </>
                        )}
                        &nbsp;{item.quantity}&nbsp;
                        <IconButton
                          onClick={() => {
                            addOneItemQuantity(item.productId);
                          }}
                          color="primary"
                          size="small"
                        >
                          <AddIcon />
                        </IconButton>
                      </Grid>
                      <Grid item xs={12}>
                        TOTAL R$
                        <b>{` ${(item.price / 100) * item.quantity}`}</b>
                      </Grid>
                      <Grid container p={1} justifyContent="flex-end">
                        <Button
                          disabled={item.quantity === 0}
                          component={Link}
                          to="/shopping-cart"
                          onClick={(e) => {
                            handleShoppingCart(item);
                          }}
                        >
                          Add Item to Shopping Cart
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

export default ProductPage;
