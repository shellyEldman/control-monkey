export const columnsConfig = [
  {
    title: "Namespace",
    dataIndex: "namespaceName",
    sorter: (a, b) => a.namespaceName.localeCompare(b.namespaceName),
  },
  {
    title: "Stack",
    dataIndex: "stackName",
    sorter: (a, b) => a.stackName.localeCompare(b.stackName),
  },
  {
    title: "Resource Count",
    dataIndex: "resourceCount",
    sorter: (a, b) => a.resourceCount - b.resourceCount,
  },
  {
    title: "Cost",
    dataIndex: "cost",
    sorter: (a, b) => a.cost - b.cost,
  },
  {
    title: "Status",
    dataIndex: "status",
    sorter: (a, b) => a.status.localeCompare(b.status),
  },
  {
    title: "Coverage",
    dataIndex: "managedResources",
    render: (_, record) => {
      const percentage = record.resourceCount
        ? ((record.managedResources / record.resourceCount) * 100).toFixed(2)
        : 0;

      let emoji;
      if (percentage >= 75) {
        emoji = "🟢";
      } else if (percentage >= 50) {
        emoji = "🟡";
      } else {
        emoji = "🔴";
      }

      return `${percentage}% ${emoji}`;
    },
    sorter: (a, b) => {
      const aPercentage = a.resourceCount
        ? (a.managedResources / a.resourceCount) * 100
        : 0;
      const bPercentage = b.resourceCount
        ? (b.managedResources / b.resourceCount) * 100
        : 0;
      return aPercentage - bPercentage;
    },
  },
];

export const statusOptions = [
  { value: "all", label: "All" },
  { value: "In Sync", label: "In Sync" },
  { value: "Drifted", label: "Drifted" },
  { value: "Error", label: "Error" },
];
