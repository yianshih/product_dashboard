import React, { useEffect } from "react";
import { Grid } from "@material-ui/core";
import Controls from "../controls/Controls";
import { useForm } from "../../hooks";
import Form from "../Form";
import { isNumeric } from "../../share";
import { useLazyQuery, useQuery } from "@apollo/react-hooks";
import { GET_PRODUCT_OPTION_BY_ID } from "../../graphql/queries";
import { useParams } from "react-router-dom";

export type ProductOptionType = {
  _id?: string;
  ProductId: string;
  Name: string;
  Description: string;
};

export type OptionInputValueType = {
  name: string;
  description: string;
};

const Labels: OptionInputValueType = {
  name: "Name",
  description: "Description",
};

const initialFormValues: OptionInputValueType = {
  name: "",
  description: "",
};

interface Props {
  isUpdate?: boolean;
  onCreate: (value: OptionInputValueType) => void;
  onUpdate: (
    id: string,
    productId: string,
    value: OptionInputValueType
  ) => void;
}

export default function ProductCreateForm({
  isUpdate = false,
  onCreate,
  onUpdate,
}: Props) {
  const validate = (fieldValues = values) => {
    let temp: OptionInputValueType = { ...initialFormValues, ...errors };
    if ("name" in fieldValues)
      // check if name is not null
      temp.name = fieldValues.name ? "" : "This field is required.";
      // check if description is not null
    if ("description" in fieldValues)
      temp.description = fieldValues.description
        ? ""
        : "This field is required.";

    setErrors({
      ...temp,
    });

    // check if there is any error
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

  const { productOptionId }: any = useParams();

  const [getProductOptionById, { data: ProductOptionData }] = useLazyQuery(
    GET_PRODUCT_OPTION_BY_ID
  );

  useEffect(() => {
    // if productOptionData is fetched, then set input values to update
    if (ProductOptionData) {
      let data: ProductOptionType = { ...ProductOptionData?.productOptionById };
      const temp: OptionInputValueType = {
        name: data?.Name || "Unknown Name",
        description: data?.Description || "Unknown Description",
      };
      setValues({ ...temp });
    }
  }, [ProductOptionData]);

  useEffect(() => {
    // if productOption id is not undefined, then fetch data to update 
    if (productOptionId) {
      getProductOptionById({ variables: { productOptionId } });
    }
  }, [productOptionId]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (validate()) {
      
      if (productOptionId) {
        const { ProductId } = ProductOptionData?.productOptionById;
        onUpdate(productOptionId, ProductId, values);
      } else {
        onCreate(values);
        resetForm();
      }
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
            text={isUpdate ? "Update" : "Create"}
          />
          <Controls.Button text="Reset" color="default" onClick={resetForm} />
        </Grid>
      </Grid>
    </Form>
  );
}
