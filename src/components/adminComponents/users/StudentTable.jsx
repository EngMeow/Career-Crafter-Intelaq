import { useContext, useEffect } from "react";
import { Circles } from "react-loader-spinner";
import { Container, NavLink, Table } from "react-bootstrap";
import { gradeLevelMap } from "../../../controls/gradeLevel";
import "../../../assets/css/Users.css";
import "../../../assets/css/class.css";
import { UserContext } from "../../../Contex/UserContext";
import { EmployeeContex } from "../../../Contex/EmployeeContex";

export default function TeacherTable() {
  const { myUser } = useContext(UserContext);
  const { EmployeeUsers, Loading, fetchEmployeeData } =
    useContext(EmployeeContex); // fetch data from studentcontext
  useEffect(() => {
    if (myUser.role === "ADMIN") {
      fetchEmployeeData();
    }
  }, []);
 

  if (Loading) {
    return (
      <div className="w-100" style={{ marginLeft: "50%" }}>
        <Circles
          height={500}
          width={60}
          color="#89288F"
          ariaLabel="circles-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    );
  }
  return (
    <Container>
      <div className=" px-2">
        <Table hover responsive className="userTable ">
          <thead className="custom-thead">
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Role</th>
              <th>grade</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="userBodyTable">
            {EmployeeUsers.map((student) => (
              <tr key={student.id}>
                <td>{student.id} </td>
                <td>
                  {student.profile?.firstName} {student.profile?.lastName}
                </td>
                <td>student</td>
                <td>{gradeLevelMap[student.profile?.gradeLevel]}</td>
                <td>{student.profile?.email}</td>
                <td>
                  <div className="p-0">
                    <NavLink
                      className="fa-solid fa-trash-can mx-3 fs-5 text-danger"
                      
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Container>
  );
}
