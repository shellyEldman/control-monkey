import { useEffect, useState } from "react";
import { getAccounts } from "./actions/index";
import Table from "./components/TableData";
import { Card, Select } from "antd";

function App() {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);

  useEffect(() => {
    const initAccounts = async () => {
      setLoading(true);
      const accounts = await getAccounts();
      const formattedAccounts = accounts.map(({ id, name }) => ({
        label: name,
        value: id,
      }));
      setAccounts(formattedAccounts);
      setLoading(false);
    };

    initAccounts();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Accounts Data</h1>
      <Card>
        <Select
          placeholder="Select Account"
          style={{ width: 200 }}
          onChange={(value) => setSelectedAccount(value)}
          options={accounts}
          loading={loading}
        />
      </Card>

      <Table selectedAccount={selectedAccount} />
    </div>
  );
}

export default App;
