"use client";

import { useUpdateOrder } from "@/lib/hooks/orders.lib";
import { useQueryClient } from "@tanstack/react-query";
import { Button, Form, Spinner } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { InferType, object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const updateOrderSchema = object({
  id: string().required("Order ID is required"),
  title: string().required("Title is required"),
  total: string().required("Total is required"),
  status: string().required("Status is required"),
});

type UpdateOrderForm = InferType<typeof updateOrderSchema>;

// Update order component
const UpdateOrder = () => {
  const queryClient = useQueryClient();
  const { mutateAsync: updateOrder, isLoading } = useUpdateOrder(queryClient);

  // Form hook initialization
  // Form submit. Calls the updateOrder function asynchronously
  const form = useForm<UpdateOrderForm>({
    resolver: yupResolver(updateOrderSchema),
    defaultValues: {
      id: "",
      title: "",
      total: "",
      status: "Pending",
    },
  });

  // Form submit. Calls the updateOrder mutation function asynchronously
  // Resets the form after successful submission
  const onSubmit = async (data: UpdateOrderForm) => {
    try {
      await updateOrder(data);
      form.reset();
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  // Form component
  // Renders the form to update an order
  return (
    <main className="container mt-5">
      <h2 className="mb-4 text-center">Update Order</h2>
      <Form onSubmit={form.handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="formOrderId">
          <Form.Label>Order ID</Form.Label>
          <Controller
            control={form.control}
            name="id"
            render={({ field }) => (
              <Form.Control
                type="text"
                placeholder="Enter order ID"
                {...field}
                isInvalid={!!form.formState.errors.id}
              />
            )}
          />
          <Form.Control.Feedback type="invalid">
            {form.formState.errors.id?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formOrderTitle">
          <Form.Label>Order Title</Form.Label>
          <Controller
            control={form.control}
            name="title"
            render={({ field }) => (
              <Form.Control
                type="text"
                placeholder="Enter order title"
                {...field}
                isInvalid={!!form.formState.errors.title}
              />
            )}
          />
          <Form.Control.Feedback type="invalid">
            {form.formState.errors.title?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formOrderTotal">
          <Form.Label>Total</Form.Label>
          <Controller
            control={form.control}
            name="total"
            render={({ field }) => (
              <Form.Control
                type="text"
                placeholder="Enter total amount"
                {...field}
                isInvalid={!!form.formState.errors.total}
              />
            )}
          />
          <Form.Control.Feedback type="invalid">
            {form.formState.errors.total?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formOrderStatus">
          <Form.Label>Status</Form.Label>
          <Controller
            control={form.control}
            name="status"
            render={({ field }) => (
              <Form.Select
                {...field}
                isInvalid={!!form.formState.errors.status}
              >
                <option value="Pending">Pending</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </Form.Select>
            )}
          />
          <Form.Control.Feedback type="invalid">
            {form.formState.errors.status?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          className="w-100"
          disabled={isLoading}
        >
          {isLoading ? (
            <Spinner animation="border" size="sm" />
          ) : (
            "Update Order"
          )}
        </Button>
      </Form>
    </main>
  );
};

export default UpdateOrder;
