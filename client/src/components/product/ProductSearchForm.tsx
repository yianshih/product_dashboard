import React from "react";
import { Grid } from "@material-ui/core";
import Controls from "../controls/Controls";
import { useForm } from "../../hooks";
import Form from "../Form";

export interface ProductType {
  _id?: string;
  Name: string;
  Description: string;
  Price: number | null;
  DeliveryPrice: number | null;
}

export type InputValueType = {
  name: string;
};

const Labels: InputValueType = {
  name: "Name",
};

const initialFormValues: InputValueType = {
  name: "",
};

interface Props {
  onSearch: (value: InputValueType) => void;
}

export default function ProductSearchForm({ onSearch }: Props) {
  const validate = (fieldValues = values) => {
    let temp: InputValueType = { ...initialFormValues, ...errors };
    //check if name is not null
    if ("name" in fieldValues)
      temp.name = fieldValues.name ? "" : "This field is required.";

    setErrors({
      ...temp,
    });

    if (fieldValues === values)
      return Object.values(temp).every((x) => x === "");
  };
  const { values, errors, setErrors, handleInputChange, resetForm } = useForm(
    initialFormValues,
    true,
    validate
  );

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (validate()) {
      onSearch(values);
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

          <Controls.Button type="submit" text="Search" />
          <Controls.Button text="Reset" color="default" onClick={resetForm} />
        </Grid>
      </Grid>
    </Form>
  );
}
