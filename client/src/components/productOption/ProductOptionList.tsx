import { Grid } from "@material-ui/core";
import React from "react";
import ProductOptionCard from "./ProductOptionCard";
import { ProductOptionType } from "./ProductOptionCreateForm";
import { useHistory } from "react-router-dom";
import { useProductOptionDelete } from "../../hooks";

interface Props {
  productOptionList: ProductOptionType[];
  productId: string;
}

export default function ProductOptionList({
  productOptionList,
  productId,
}: Props) {
  const history = useHistory();

  const { onDelete } = useProductOptionDelete();

  return (
    <Grid
      container
      spacing={5}
      direction="row"
      justify="space-evenly"
      alignItems="center"
    >
      {productOptionList?.length
        ? productOptionList.map((item: ProductOptionType, index: number) => (
            <Grid key={item?._id || index.toString()}>
              <ProductOptionCard
                onUpdate={() =>
                  history.push(`/productOption/update/${item?._id || "unknownID"}`)
                }
                onDelete={() => onDelete(item?._id || "unknownID", productId)}
                name={item?.Name || "Unknown Name"}
                description={item?.Description || "Unknown Description"}
              />
            </Grid>
          ))
        : null}
    </Grid>
  );
}
