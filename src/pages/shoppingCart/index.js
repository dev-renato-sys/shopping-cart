import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  IconButton,
  ImageListItem,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
// import InfoIcon from "@mui/icons-material/Info";
import ReturnIcon from "@mui/icons-material/KeyboardReturn";
import React from "react";
import { ShowPage } from "components/skeleton";
import { useShoppingCart } from "context/shoppingCart";
import { getCurrencyString } from "helpers/currency";
import { Link } from "react-router-dom";

function ShoppingCartPage() {
  const {
    shoppingCart,
    removeItemsFromShoppingCart,
    shoppingCartTotalSpendWithoutDiscounts,
    shoppingCartTotalDiscounts,
    shoppingCartTotalSpendWithDiscounts,
    removeOneItemQuantityToChart,
    addOneItemQuantityToChart,
  } = useShoppingCart();

  return (
    <>
      <ShowPage>
        <Box container padding={4}>
          <Card>
            <CardContent>
              {/* <List sx={{ width: "100%", bgcolor: "background.paper" }}> */}
              <Grid alignItems="center" spacing={2} container>
                <Grid item>
                  <IconButton component={Link} to="/">
                    <ReturnIcon />
                  </IconButton>
                </Grid>
                <Grid item>
                  <p>
                    <b>My shopping cart</b>
                  </p>
                </Grid>
              </Grid>
              {shoppingCart.map((item) => {
                // const labelId = `checkbox-list-secondary-label-${item.productId}`;
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
                      <Grid item xs={4}>
                        {item.name}
                      </Grid>
                      <Grid item xs={4}>
                        <IconButton
                          onClick={() => {
                            if (item.quantity === 1) {
                              removeItemsFromShoppingCart(item);
                            } else {
                              removeOneItemQuantityToChart(item);
                            }
                          }}
                          color="primary"
                          size="small"
                        >
                          <RemoveIcon />
                        </IconButton>
                        {item.quantity}
                        <IconButton
                          onClick={() => {
                            addOneItemQuantityToChart(item);
                          }}
                          color="primary"
                          size="small"
                        >
                          <AddIcon />
                        </IconButton>
                      </Grid>
                      <Grid item xs={4}>
                        {getCurrencyString(item.price, item.quantity)}
                      </Grid>
                      <Grid container p={1} justifyContent="flex-end">
                        <Button
                          onClick={() => {
                            removeItemsFromShoppingCart(item);
                          }}
                        >
                          Remove item
                        </Button>
                      </Grid>
                      <Grid item xs={12}>
                        <Divider />
                      </Grid>
                    </Grid>
                  </div>
                );
              })}
              {shoppingCart.length > 0 && (
                <>
                  <Grid container p={2}>
                    <Grid item xs={12}>
                      <p>
                        Total without discounts R$
                        <b> {shoppingCartTotalSpendWithoutDiscounts}</b>.
                      </p>
                      <p>
                        Discounts R$
                        <b> {Math.abs(shoppingCartTotalDiscounts)}</b>.
                      </p>
                      <p>
                        Subtotal R$ <b>{shoppingCartTotalSpendWithDiscounts}</b>
                        .
                      </p>
                      <p>
                        {shoppingCartTotalSpendWithDiscounts >= 10 ? (
                          <>
                            <Alert>Congrats, free shipping discount.</Alert>
                          </>
                        ) : (
                          <>
                            <Alert color="warning">
                              Sorry, free shipping discount is only avaliable
                              for purchases above R$10.
                            </Alert>
                          </>
                        )}
                      </p>
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        onClick={() => {
                          alert(
                            "“Um dos meus dias mais produtivos foi quando eu joguei fora 1000 linhas de código.” – Ken Thompson"
                          );
                        }}
                        variant="contained"
                      >
                        Next step
                      </Button>
                    </Grid>
                  </Grid>
                </>
              )}
              {/* </List> */}
            </CardContent>
          </Card>
        </Box>
      </ShowPage>
    </>
  );
}

export default ShoppingCartPage;
