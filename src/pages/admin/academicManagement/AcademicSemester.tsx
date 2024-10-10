import { Button, Table, TableColumnsType, TableProps } from "antd";
import { useGetAllSemestersQuery } from "../../../redux/features/admin/academicManagement.api";
import { TAcademicSemester, TQueryParams } from "../../../types";
import { useState } from "react";

export type TTableData = Pick<
  TAcademicSemester,
  "name" | "year" | "startMonth" | "endMonth"
>;

const AcademicSemester = () => {
  const [params, setParams] = useState<TQueryParams[] | undefined>(undefined);
  const {
    data: semesterData,
    isLoading,
    isFetching,
  } = useGetAllSemestersQuery(params);

  const tableData = semesterData?.data?.map(
    ({ _id, name, year, startMonth, endMonth }) => ({
      key: _id,
      name,
      year,
      startMonth,
      endMonth,
    })
  );

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      showSorterTooltip: { target: "full-header" },
      filters: [
        {
          text: "Autumn",
          value: "Autumn",
        },
        {
          text: "Summer",
          value: "Summer",
        },
        {
          text: "Fall",
          value: "Fall",
        },
      ],
    },
    {
      title: "Year",
      dataIndex: "year",
      key: "year",
      filters: [
        {
          text: "2024",
          value: "2024",
        },
        {
          text: "2025",
          value: "2025",
        },
        {
          text: "2026",
          value: "2026",
        },
      ],
    },
    {
      title: "Start Month",
      dataIndex: "startMonth",
      key: "startMonth",
    },
    {
      title: "End Month",
      dataIndex: "endMonth",
      key: "endMonth",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: () => <Button>Update</Button>,
    },
  ];

  const onChange: TableProps<TTableData>["onChange"] = (
    _pagination,
    filters,
    _sorter,
    extra
  ) => {
    if (extra.action === "filter") {
      const queryParams: TQueryParams[] = [];

      filters.name?.forEach((item) =>
        queryParams.push({
          name: "name",
          value: item,
        })
      );
      filters.year?.forEach((item) =>
        queryParams.push({
          name: "year",
          value: item,
        })
      );

      setParams(queryParams);
    }
  };

  if (isLoading) return <>Loading...</>;

  return (
    <Table<TTableData>
      loading={isFetching}
      columns={columns}
      dataSource={tableData}
      onChange={onChange}
      showSorterTooltip={{ target: "sorter-icon" }}
    />
  );
};

export default AcademicSemester;
