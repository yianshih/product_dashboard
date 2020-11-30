import React, { useEffect } from "react";
import { Grid } from "@material-ui/core";
import Controls from "../controls/Controls";
import { useForm } from "../../hooks";
import Form from "../Form";
import { isNumeric } from "../../share";
import { useLazyQuery, useQuery } from "@apollo/react-hooks";
import { GET_PRODUCT_BY_ID } from "../../graphql/queries";
import { useParams } from "react-router-dom";

export interface ProductType {
  _id?: string;
  Name: string;
  Description: string;
  Price: number | null;
  DeliveryPrice: number | null;
}

export type InputValueType = {
  name: string;
  description: string;
  price: string;
  deliveryPrice: string;
};

const Labels: InputValueType = {
  name: "Name",
  description: "Description",
  price: "Price",
  deliveryPrice: "Delivery Price",
};

const initialFormValues: InputValueType = {
  name: "",
  description: "",
  price: "",
  deliveryPrice: "",
};

interface Props {
  onCreate: (value: InputValueType) => void;
  onUpdate: (id: string, value: InputValueType) => void;
}

export default function ProductCreateForm({ onCreate, onUpdate }: Props) {
  const validate = (fieldValues = values) => {
    let temp: InputValueType = { ...initialFormValues, ...errors };

    // check if name is not null
    if ("name" in fieldValues)
      temp.name = fieldValues.name ? "" : "This field is required.";

      // check if name is not null
    if ("description" in fieldValues)
      temp.description = fieldValues.description
        ? ""
        : "This field is required.";

        // check if name is numeric and greater than zero
    if ("price" in fieldValues)
      temp.price =
        isNumeric(fieldValues.price) && fieldValues.price > 0
          ? ""
          : "Price must be numeric";

          // check if name is numeric and greater then or equal to zero
    if ("deliveryPrice" in fieldValues)
      temp.deliveryPrice =
        isNumeric(fieldValues.deliveryPrice) && fieldValues.deliveryPrice >= 0
          ? ""
          : "Price must be numeric";

    setErrors({
      ...temp,
    });

    // check if error exists
    if (fieldValues === values)
      return Object.values(temp).every((x) => x === "");
  };
  const {
    values,
    errors,
    setValues,
    setErrors,
    handleInputChange,
    resetForm,
  } = useForm(initialFormValues, true, validate);
  const { productId }: any = useParams();
  const [getProductById, { data: ProductData }] = useLazyQuery(
    GET_PRODUCT_BY_ID
  );

  useEffect(() => {
    // if productId exist, then fetch data to update
    if (productId) {
      getProductById({ variables: { productId } });
    }
  }, [productId]);

  useEffect(() => {

    // if productData fetch, then set its data to update
    if (ProductData) {
      let data: ProductType = { ...ProductData?.productById };

      const temp: InputValueType = {
        name: data?.Name || "Unknown Name",
        description: data?.Description || "Unknown Description",
        price: data?.Price?.toString() || "0",
        deliveryPrice: data?.DeliveryPrice?.toString() || "0",
      };
      setValues({ ...temp });
    }
  }, [ProductData]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (validate()) {
      // if product id exists, then update it, otherwise create new product
      productId ? onUpdate(productId, values) : onCreate(values);
      !productId && resetForm();
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container justify="center" alignItems="center">
        <Grid item xs={6}>
          {Object.keys(initialFormValues).map((item: any) => (
            <Controls.Input
              fullWidth
              key={item}
              name={item}
              //@ts-ignore
              label={Labels[item]}
              value={values[item]}
              onChange={handleInputChange}
              //@ts-ignore
              error={errors[item]}
            />
          ))}

          <Controls.Button
            type="submit"
            text={productId ? "Update" : "Submit"}
          />
          <Controls.Button text="Reset" color="default" onClick={resetForm} />
        </Grid>
      </Grid>
    </Form>
  );
}
