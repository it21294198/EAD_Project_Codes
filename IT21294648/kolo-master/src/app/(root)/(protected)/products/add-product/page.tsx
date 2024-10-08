"use client";

import { useAddProduct } from "@/lib/hooks/products.lib";
import { useQueryClient } from "@tanstack/react-query";
import { Button, Form, Spinner } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { InferType, object, string, number } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

// Add product schema
const addProductSchema = object({
  name: string().required("Product name is required"),
  description: string().required("Description is required"),
  price: number()
    .required("Price is required")
    .positive("Price must be a positive number"),
  stock: number()
    .required("Stock is required")
    .min(0, "Stock cannot be negative"),
});

type AddProductForm = InferType<typeof addProductSchema>;

// Add product component
const AddProduct = () => {
  const queryClient = useQueryClient();
  const { mutateAsync: addProduct, isLoading } = useAddProduct(queryClient);

  // Form hook initialization
  // Form submit. Calls the addProduct mutation function asynchronously
  // Resets the form after successful submission
  const form = useForm<AddProductForm>({
    resolver: yupResolver(addProductSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      stock: 0,
    },
  });

  // Form submit. Calls the addProduct mutation function asynchronously
  // Resets the form after successful
  const onSubmit = async (data: AddProductForm) => {
    try {
      await addProduct(data);
      form.reset();
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  // Form component
  return (
    <main className="container mt-5">
      <h2 className="mb-4 text-center">Add Product</h2>
      <Form onSubmit={form.handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="formProductName">
          <Form.Label>Product Name</Form.Label>
          <Controller
            control={form.control}
            name="name"
            render={({ field }) => (
              <Form.Control
                type="text"
                placeholder="Enter product name"
                {...field}
                isInvalid={!!form.formState.errors.name}
              />
            )}
          />
          <Form.Control.Feedback type="invalid">
            {form.formState.errors.name?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formProductDescription">
          <Form.Label>Description</Form.Label>
          <Controller
            control={form.control}
            name="description"
            render={({ field }) => (
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter product description"
                {...field}
                isInvalid={!!form.formState.errors.description}
              />
            )}
          />
          <Form.Control.Feedback type="invalid">
            {form.formState.errors.description?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formProductPrice">
          <Form.Label>Price</Form.Label>
          <Controller
            control={form.control}
            name="price"
            render={({ field }) => (
              <Form.Control
                type="number"
                placeholder="Enter product price"
                {...field}
                isInvalid={!!form.formState.errors.price}
              />
            )}
          />
          <Form.Control.Feedback type="invalid">
            {form.formState.errors.price?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formProductStock">
          <Form.Label>Stock</Form.Label>
          <Controller
            control={form.control}
            name="stock"
            render={({ field }) => (
              <Form.Control
                type="number"
                placeholder="Enter stock quantity"
                {...field}
                isInvalid={!!form.formState.errors.stock}
              />
            )}
          />
          <Form.Control.Feedback type="invalid">
            {form.formState.errors.stock?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          className="w-100"
          disabled={isLoading}
        >
          {isLoading ? <Spinner animation="border" size="sm" /> : "Add Product"}
        </Button>
      </Form>
    </main>
  );
};

export default AddProduct;
