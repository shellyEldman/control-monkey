import { useCallback, useEffect, useState } from "react";
import { columnsConfig, statusOptions } from "../utils";
import { SearchOutlined } from "@ant-design/icons";
import { Input, Col, Table, Card, Select } from "antd";
import { getAccountDetail } from "../actions/index";

const defaultPagination = { current: 1, pageSize: 5 };

const TableData = ({ selectedAccount }) => {
  const [loading, setLoading] = useState(false);
  const [selectedAccountData, setSelectedAccountData] = useState([]);
  const [accountsData, setAccountsData] = useState({});
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState(null);
  const [pagination, setPagination] = useState(defaultPagination);

  const updateAccountsData = useCallback(async (accountId) => {
    setLoading(true);
    const data = await getAccountDetail(accountId);
    setAccountsData((currentData) => ({
      ...currentData,
      [accountId]: data,
    }));
    setLoading(false);
  }, []);

  useEffect(() => {
    setSearch("");
    setStatus(null);
    setPagination(defaultPagination);

    if (selectedAccount && !accountsData[selectedAccount]) {
      updateAccountsData(selectedAccount);
    }
  }, [selectedAccount, accountsData]);

  useEffect(() => {
    if (accountsData[selectedAccount]) {
      let filteredData = accountsData[selectedAccount];

      // Apply status filter if status is set
      if (status && status !== "all") {
        filteredData = filteredData.filter((item) => item.status === status);
      }

      // Apply search filter
      if (search) {
        const searchLower = search.toLowerCase();
        filteredData = filteredData.filter(
          (item) =>
            item.namespaceName.toLowerCase().includes(searchLower) ||
            item.stackName.toLowerCase().includes(searchLower)
        );
      }

      // Process the data to get the maximum cost per namespace
      const namespaceMap = filteredData.reduce((acc, item, index) => {
        if (
          !acc[item.namespaceName] ||
          acc[item.namespaceName].cost < item.cost
        ) {
          acc[item.namespaceName] = { ...item, key: index };
        }
        return acc;
      }, {});

      filteredData = Object.values(namespaceMap);
      setSelectedAccountData(filteredData);
    }
  }, [selectedAccount, accountsData, status, search]);

  const handleTableChange = (pagination) => {
    setPagination(pagination);
  };

  return (
    <Card style={{ marginTop: "20px" }}>
      <Input
        style={{ width: 200 }}
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        disabled={loading || !selectedAccount}
        prefix={<SearchOutlined />}
      />
      <Select
        placeholder="Status"
        style={{ width: 200, marginLeft: "20px" }}
        onChange={(value) => setStatus(value)}
        value={status}
        disabled={loading || !selectedAccount}
        options={statusOptions}
      />
      <Col>
        <Card style={{ marginTop: "20px" }}>
          <Table
            columns={columnsConfig}
            dataSource={selectedAccountData}
            pagination={pagination}
            loading={loading}
            onChange={handleTableChange}
          />
        </Card>
      </Col>
    </Card>
  );
};

export default TableData;
