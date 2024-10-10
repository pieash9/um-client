import { Button, Table, TableColumnsType, TableProps } from "antd";
import {
  useGetAcademicDepartmentsQuery,
  useGetAcademicFacultiesQuery,
} from "../../../redux/features/admin/academicManagement.api";
import { TAcademicDepartment, TQueryParams } from "../../../types";
import { useState } from "react";

export type TTableData = Pick<TAcademicDepartment, "name" | "academicFaculty">;

const AcademicDepartment = () => {
  const [params, setParams] = useState<TQueryParams[] | undefined>(undefined);
  const {
    data: semesterData,
    isLoading,
    isFetching,
  } = useGetAcademicDepartmentsQuery(params);
  const { data: academicFaculties } = useGetAcademicFacultiesQuery(undefined);

  const academicFacultiesFilterData = academicFaculties?.data?.map(
    ({ _id, name }) => ({ text: name, value: _id })
  );

  const tableData = semesterData?.data?.map(
    ({ _id, name, academicFaculty }) => ({
      key: _id,
      name,
      academicFaculty,
    })
  );

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Academic Faculty",
      dataIndex: "academicFaculty",
      key: "academicFaculty",
      render: (data) => data.name,
      filters: academicFacultiesFilterData,
      onFilter: (value, record) => record.academicFaculty._id === value,
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

      filters.academicFaculty?.forEach((item) =>
        queryParams.push({
          name: "academicFaculty",
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

export default AcademicDepartment;
