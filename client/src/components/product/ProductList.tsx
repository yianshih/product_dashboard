import { Grid } from "@material-ui/core";
import React from "react";
import ProductCard from "./ProductCard";
import { ProductType } from "./ProductSearchForm";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { useMutation } from "@apollo/react-hooks";
import { PRODUCT_DELETE } from "../../graphql/mutations";
import { useDelete } from "../../hooks";

interface Props {
  //onDelete: (id: string) => void;
  productList: ProductType[];
}

export default function ProductList({ productList }: Props) {
  const history = useHistory();

  const { onDelete } = useDelete();

  return (
    <Grid
      container
      spacing={5}
      direction="row"
      justify="space-evenly"
      alignItems="center"
    >
      {productList?.length &&
        productList.map((item: ProductType, index: number) => (
          <Grid key={item?._id || index.toString()}>
            <ProductCard
              onClick={() =>
                history.push(`/product/${item?._id || "unknownID"}`)
              }
              onUpdate={() =>
                history.push(`/product/update/${item?._id || "unknownID"}`)
              }
              onDelete={() => onDelete(item?._id || "unknownID")}
              name={item?.Name || "Unknown Name"}
              description={item?.Description || "Unknown Description"}
              price={item?.Price || "Unknown Price"}
              deliveryPrice={
                item?.DeliveryPrice === 0
                  ? 0
                  : item?.DeliveryPrice || "Unknown Delivery Price"
              }
            />
          </Grid>
        ))}
    </Grid>
  );
}
