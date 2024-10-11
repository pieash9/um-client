import { useParams } from "react-router-dom";

const StudentDetails = () => {
  const { studentId } = useParams();
  return <div>StudentDetails {studentId}</div>;
};

export default StudentDetails;
