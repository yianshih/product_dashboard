import React from "react";
import { Container, Grid, Typography } from "@material-ui/core";
import { useMutation } from "@apollo/react-hooks";
import ProductCreateForm, {
  InputValueType,
  ProductType,
} from "../../components/product/ProductCreateForm";
import { GET_ALL_PRODUCTS } from "../../graphql/queries";
import { PRODUCT_CREATE, PRODUCT_UPDATE } from "../../graphql/mutations";
import { toast } from "react-toastify";


export default function ProductCreatePage() {
  
  const [productCreate] = useMutation(PRODUCT_CREATE, {
    update: (cache, { data: { productCreate } }) => {
      cache.writeQuery({
        query: PRODUCT_CREATE,
        data: {
          productCreate: [productCreate],
        },
      });
    },
    onError: (error) => {
      console.log("create error : ", error);
      toast.error("Create Failed");
    },
  });

  const [productUpdate] = useMutation(PRODUCT_UPDATE, {
    update: (cache, { data: { productUpdate } }) => {
      cache.writeQuery({
        query: PRODUCT_UPDATE,
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

  const onCreate = (values: InputValueType) => {

    // format inputs to create
    let valuesToCreate: ProductType = {
      Name: values?.name || "",
      Description: values?.description || "",
      Price: parseFloat(values?.price) || 0,
      DeliveryPrice: parseFloat(values?.deliveryPrice) || 0,
    };
    productCreate({
      variables: { input: valuesToCreate },
      refetchQueries: [{ query: GET_ALL_PRODUCTS }],
    });
    toast.success("Sumitted");
  };

  // format inputs to update
  const onUpdate = (id: string, values: InputValueType) => {
    let valuesToUpdate: ProductType = {
      Name: values?.name || "",
      Description: values?.description || "",
      Price: parseFloat(values?.price) || 0,
      DeliveryPrice: parseFloat(values?.deliveryPrice) || 0,
    };
    console.log("Product to update : ", valuesToUpdate);
    productUpdate({ variables: { input: { _id: id, ...valuesToUpdate } } });
    toast.success("Sumitted");
  };

  return (
    <Container maxWidth="md">
      <Grid container justify="center" alignItems="center">
        <Typography>Create Product</Typography>
        <ProductCreateForm onCreate={onCreate} onUpdate={onUpdate} />
      </Grid>
    </Container>
  );
}
