import React, { useEffect } from "react";
import { Grid, Typography } from "@material-ui/core";
import ProductCard from "../../components/product/ProductCard";
import { useHistory, useParams } from "react-router-dom";
import { useLazyQuery, useMutation } from "@apollo/react-hooks";
import {
  GET_PRODUCT_BY_ID,
  GET_PRODUCT_OPTIONS_BY_PRODUCT_ID,
} from "../../graphql/queries";
import { PRODUCT_OPTION_CREATE } from "../../graphql/mutations";
import { ProductType } from "../../components/product/ProductSearchForm";
import { useDelete } from "../../hooks";
import ProductOptionCreateForm, {
  ProductOptionType,
  OptionInputValueType,
} from "../../components/productOption/ProductOptionCreateForm";
import { toast } from "react-toastify";
import ProductOptionList from "../../components/productOption/ProductOptionList";

export default function ProductDetailPage() {
  const history = useHistory();

  const [productOptionCreate] = useMutation(PRODUCT_OPTION_CREATE, {
    update: (cache, { data: { productOptionCreate } }) => {
      cache.writeQuery({
        query: PRODUCT_OPTION_CREATE,
        data: {
          productOptionCreate: [productOptionCreate],
        },
      });
    },
    onError: (error) => {
      console.log("create error : ", error);
      toast.error("Create Failed");
    },
  });

  const { onDelete } = useDelete();
  const { productId }: any = useParams();
  const [getProductById, { data: ProductData }] = useLazyQuery(
    GET_PRODUCT_BY_ID
  );
  const [
    getProductOptionByProductId,
    { data: ProductOptionData },
  ] = useLazyQuery(GET_PRODUCT_OPTIONS_BY_PRODUCT_ID);

  useEffect(() => {
    // if productId is not undefined, then search product data and its options by id
    if (productId) {
      getProductById({ variables: { productId } });
      getProductOptionByProductId({ variables: { productId } });
    }
  }, [productId]);

  if (!ProductData?.productById) {
    return (
      <Grid container>
        <Typography variant="body1">Product not found</Typography>
      </Grid>
    );
  }

  const {
    _id,
    Name,
    Description,
    Price,
    DeliveryPrice,
  }: ProductType = ProductData?.productById;

  const onCreate = (values: OptionInputValueType) => {
    if (!_id) {
      return toast.error("Product not found");
    }

    // format input to create ProductOption
    let valuesToCreate: ProductOptionType = {
      ProductId: _id,
      Name: values?.name || "",
      Description: values?.description || "",
    };
    productOptionCreate({
      variables: { input: valuesToCreate },
      refetchQueries: [
        {
          query: GET_PRODUCT_OPTIONS_BY_PRODUCT_ID,
          variables: { productId: _id },
        },
      ],
    });
    toast.success("Sumitted");
  };

  return (
    <Grid container justify="center" alignItems="center">
      <Grid item>
        <ProductCard
          onUpdate={() => history.push(`/product/update/${_id || "unknownID"}`)}
          onDelete={() => onDelete(_id || "unknownID")}
          name={Name}
          price={Price || 0}
          deliveryPrice={DeliveryPrice || 0}
          description={Description}
        />
      </Grid>
      <Grid item>
        <Grid container justify="center" alignItems="center" direction="column">
          <Grid item style={{ marginBottom: 10 }}>
            <Typography>New Product Option</Typography>
          </Grid>
          <ProductOptionCreateForm onCreate={onCreate} onUpdate={() => {}} />
        </Grid>
      </Grid>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        style={{ marginTop: 20 }}
      >
        <Grid item>
          <Typography>Product Option List :</Typography>
        </Grid>
        {ProductOptionData?.productOptionsByProductId ? (
          <Grid item style={{ marginTop: 30 }}>
            <ProductOptionList
              productOptionList={ProductOptionData?.productOptionsByProductId}
              productId={productId}
            />
          </Grid>
        ) : null}
      </Grid>
    </Grid>
  );
}
