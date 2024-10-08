import { useRouter } from "next/router";
import { useQuery } from "tanstack";

interface InventoryItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
}

const InventoryPage: React.FC = () => {
  const router = useRouter();
  const { data, isLoading, isError } = useQuery<InventoryItem[]>(
    "inventory",
    fetchInventory
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching inventory data.</div>;
  }

  // Redirect to "/products" when a table row is clicked
  const handleRowClick = () => {
    router.push("/products");
  };

  return (
    <div>
      <h1>Inventory</h1>
      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid black", padding: "8px" }}>ID</th>
            <th style={{ border: "1px solid black", padding: "8px" }}>Name</th>
            <th style={{ border: "1px solid black", padding: "8px" }}>
              Quantity
            </th>
            <th style={{ border: "1px solid black", padding: "8px" }}>Price</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr
              key={item.id}
              onClick={handleRowClick}
              style={{ cursor: "pointer" }}
            >
              <td style={{ border: "1px solid black", padding: "8px" }}>
                {item.id}
              </td>
              <td style={{ border: "1px solid black", padding: "8px" }}>
                {item.name}
              </td>
              <td style={{ border: "1px solid black", padding: "8px" }}>
                {item.quantity}
              </td>
              <td style={{ border: "1px solid black", padding: "8px" }}>
                {item.price}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryPage;

// inventory page
const InventoryPage = () => {
  const { data, isLoading, isError } = useQuery<InventoryItem[]>(
    "inventory",
    fetchInventory
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching inventory data.</div>;
  }

  return (
    <div>
      <h1>Inventory</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>{item.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryPage;
