"use client";

import { useGetProducts } from "@/lib/hooks/products.lib";
import { Table, Spinner, Pagination } from "react-bootstrap";
import ProductRow from "@/components/ProductRow";

// fetches the collection of products from the server
// uses the useGetProducts hook to fetch the products
const ViewAllProducts = () => {
  const { data, isFetching } = useGetProducts();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // handles products array pagination
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  //  calculates the total number of pages
  const totalPages = Math.ceil((data?.length || 0) / itemsPerPage);
  const currentProducts = data?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // renders the products in a table layout
  return (
    <main className="container mt-5">
      <h2 className="mb-4 text-center">All Products</h2>
      {isFetching ? (
        <Spinner animation="border" />
      ) : (
        <>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentProducts?.map((product) => (
                <ProductRow key={product.id} product={product} />
              ))}
            </tbody>
          </Table>
          <Pagination className="justify-content-center">
            {Array.from({ length: totalPages }, (_, index) => (
              <Pagination.Item
                key={index + 1}
                active={index + 1 === currentPage}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </Pagination.Item>
            ))}
          </Pagination>
        </>
      )}
    </main>
  );
};

export default ViewAllProducts;
