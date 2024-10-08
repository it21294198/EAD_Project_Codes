"use client";

import { Button } from "react-bootstrap";
import { useRouter } from "next/navigation";

const ProductRow = ({ product }) => {
  const router = useRouter();

  const handleEdit = () => {
    router.push(`/products/edit/${product.id}`);
  };

  //  deletes a product from the database
  // sends a DELETE request to the server
  const handleDelete = async () => {
    try {
      await fetch(`/api/products/${product.id}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <tr>
      <td>{product.id}</td>
      <td>{product.name}</td>
      <td>{product.description}</td>
      <td>{product.price.toFixed(2)}</td>
      <td>{product.stock}</td>
      <td>
        <Button variant="warning" onClick={handleEdit}>
          Edit
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Delete
        </Button>
      </td>
    </tr>
  );
};

export default ProductRow;
