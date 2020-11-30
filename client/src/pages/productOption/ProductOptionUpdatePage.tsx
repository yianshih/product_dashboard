import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import { GET_PRODUCT_OPTIONS_BY_PRODUCT_ID } from "../../graphql/queries";
import {
  PRODUCT_OPTION_CREATE,
  PRODUCT_OPTION_UPDATE,
} from "../../graphql/mutations";
import ProductOptionCreateForm, {
  ProductOptionType,
  OptionInputValueType,
} from "../../components/productOption/ProductOptionCreateForm";
import { toast } from "react-toastify";

export default function ProductDetailPage() {
  const [productOptionUpdate] = useMutation(PRODUCT_OPTION_UPDATE, {
    update: (cache, { data: { productUpdate } }) => {
      cache.writeQuery({
        query: PRODUCT_OPTION_UPDATE,
        data: {
          productUpdate: [productUpdate],
        },
      });
    },
    onError: (error) => {
      console.log("create error : ", error);
      toast.error("Create Failed");
    },
  });

  const onUpdate = (
    id: string,
    productId: string,
    values: OptionInputValueType
  ) => {
    // if id is undefined then return error
    if (!id) {
      return toast.error("Product not found");
    }

    // format input values
    let valuesToCreate: ProductOptionType = {
      _id: id,
      ProductId: productId,
      Name: values?.name || "",
      Description: values?.description || "",
    };
    productOptionUpdate({
      variables: { input: { ...valuesToCreate } },
      refetchQueries: [
        {
          query: GET_PRODUCT_OPTIONS_BY_PRODUCT_ID,
          variables: { productId: productId },
        },
      ],
    });
    toast.success("Sumitted");
  };

  return (
    <Grid container justify="center" alignItems="center">
      <Grid item>
        <Grid container justify="center" alignItems="center" direction="column">
          <Grid item style={{ marginBottom: 10 }}>
            <Typography>New Product Option</Typography>
          </Grid>
          <ProductOptionCreateForm
            isUpdate
            onCreate={() => {}}
            onUpdate={onUpdate}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}
