import { useMutation } from "@apollo/react-hooks";
import { useState } from "react";
import { toast } from "react-toastify";
import { PRODUCT_DELETE, PRODUCT_OPTION_DELETE } from "../graphql/mutations";
import {
  GET_ALL_PRODUCTS,
  GET_PRODUCT_OPTIONS_BY_PRODUCT_ID,
} from "../graphql/queries";

export function useForm(
  initialFValues: any,
  validateOnChange: boolean = false,
  validate: (value: any) => void
) {
  const [values, setValues] = useState(initialFValues);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });

    if (validateOnChange) validate({ [name]: value });
  };

  const resetForm = () => {
    setValues(initialFValues);
    setErrors({});
  };

  return {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm,
  };
}

export function useDelete() {
  const [productDelete] = useMutation(PRODUCT_DELETE, {
    update: ({ data }: any) => {
      console.log("Product DELETE MUTATION", data);
      toast.error("Product deleted");
    },
    onError: (err) => {
      console.log(err);
      toast.error("Product delete failed");
    },
  });

  const onDelete = (id: string) => {
    productDelete({
      variables: { productId: id },
      refetchQueries: [{ query: GET_ALL_PRODUCTS }],
    });
  };
  return { onDelete };
}

export function useProductOptionDelete(cb?: () => void) {
  const [productOptionDelete] = useMutation(PRODUCT_OPTION_DELETE, {
    update: ({ data }: any) => {
      console.log("Product Option DELETE MUTATION", data);
      toast.error("Product Option deleted");
      cb && cb();
    },
    onError: (err) => {
      console.log(err);
      toast.error("Product Option delete failed");
    },
  });

  const onDelete = (id: string, productId: string) => {
    productOptionDelete({
      variables: { productOptionId: id },
      refetchQueries: [
        { query: GET_PRODUCT_OPTIONS_BY_PRODUCT_ID, variables: { productId } },
      ],
    });
  };
  return { onDelete };
}
