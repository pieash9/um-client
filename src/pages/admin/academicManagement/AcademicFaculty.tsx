import { Button, Table, TableColumnsType } from "antd";
import { useGetAcademicFacultiesQuery } from "../../../redux/features/admin/academicManagement.api";
import { TAcademicFaculty } from "../../../types";

export type TTableData = Pick<TAcademicFaculty, "name">;

const AcademicFaculty = () => {
  const {
    data: semesterData,
    isLoading,
    isFetching,
  } = useGetAcademicFacultiesQuery(undefined);

  const tableData = semesterData?.data?.map(({ _id, name }) => ({
    key: _id,
    name,
  }));

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },

    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: () => <Button>Update</Button>,
    },
  ];

  if (isLoading) return <>Loading...</>;

  return (
    <Table<TTableData>
      loading={isFetching}
      columns={columns}
      dataSource={tableData}
      showSorterTooltip={{ target: "sorter-icon" }}
    />
  );
};

export default AcademicFaculty;
