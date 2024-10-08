"use client";

import { useGetOrders } from "@/lib/hooks/orders.lib";
import { useQueryClient } from "@tanstack/react-query";
import { Card, Col, Row, Spinner } from "react-bootstrap";
import OrderCard from "@/components/OrderCard";

// fetches the collection of orders from the server
// uses the useGetOrders hook to fetch the orders
// renders the orders in a grid layout
const GetOrders = () => {
  const queryClient = useQueryClient();
  const { data: orders, isFetching, refetch } = useGetOrders();

  return (
    <main className="container mt-5">
      <h2 className="mb-4 text-center">Orders</h2>
      {isFetching ? (
        <Spinner animation="border" variant="primary" />
      ) : (
        <Row xs={1} md={2} lg={3} className="g-4">
          {orders?.map((order) => (
            <Col key={order.id}>
              <OrderCard order={order} />
            </Col>
          ))}
        </Row>
      )}
    </main>
  );
};

export default GetOrders;
