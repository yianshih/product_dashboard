import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { Grid, Typography, Button, CircularProgress } from "@material-ui/core";
import { GET_ALL_PRODUCTS } from "../graphql/queries";
import ProductList from "../components/product/ProductList";
import { useHistory } from "react-router-dom";

const Home = () => {
  const { data, loading, error } = useQuery(GET_ALL_PRODUCTS);
  const history = useHistory();

  if (!data || data?.allProducts?.length === 0) {
    return (
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        style={{ marginTop: 10 }}
      >
        <Grid item>
          <Grid container direction="row" justify="center" alignItems="center">
            {error && (
              <Typography variant="h6">Something went wrong</Typography>
            )}
            {loading ? (
              <CircularProgress />
            ) : (
              <>
                <Typography variant="h6">Product not found</Typography>
                <Button
                  variant="text"
                  color="primary"
                  onClick={() => history.push("/product/create")}
                >
                  Start Creating Products
                </Button>
              </>
            )}
          </Grid>
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      spacing={5}
      style={{ marginTop: 10 }}
    >
      {data?.allProducts?.length && (
        <ProductList productList={data.allProducts} />
      )}
    </Grid>
  );
};

export default Home;
