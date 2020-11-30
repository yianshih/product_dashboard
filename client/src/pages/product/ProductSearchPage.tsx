import React from "react";
import {
  Container,
  Grid,
  Typography,
  CircularProgress,
} from "@material-ui/core";
import ProductSearchForm, {
  InputValueType,
} from "../../components/product/ProductSearchForm";
import { GET_PRODUCT_BY_NAME } from "../../graphql/queries";
import { useQuery } from "@apollo/react-hooks";
import ProductList from "../../components/product/ProductList";

export default function ProductSearchPage() {
  const { refetch, data: products, loading } = useQuery(GET_PRODUCT_BY_NAME);

  const onSearch = (values: InputValueType) => {
    // format filter to fetch product
    let valuesToSearch: { Name: string } = {
      Name: values?.name || "",
    };

    //@ts-ignore
    refetch({ productName: valuesToSearch.Name });
  };

  return (
    <Container maxWidth="md">
      <Grid container justify="center" alignItems="center">
        <ProductSearchForm onSearch={onSearch} />
      </Grid>
      <Grid
        container
        justify="center"
        alignItems="center"
        style={{ marginTop: 15 }}
        direction="column"
      >
        <Grid item>
          <Typography variant="subtitle1" color="textSecondary">
            Search Result
          </Typography>
        </Grid>
        {loading && <CircularProgress />}
        <Grid item style={{ marginTop: 25 }}>
          {products?.productByName?.length ? (
            <ProductList productList={products.productByName} />
          ) : null}
        </Grid>
      </Grid>
    </Container>
  );
}
