/*!

=========================================================
* Argon Dashboard PRO React Nodejs - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-pro-react-nodejs
* Copyright 2021 Creative Tim (http://www.creative-tim.com)

* Coded by Creative Tim
* Coded by ProjectData

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import React from "react";
// reactstrap components
import {
  Badge,
  Button,
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
  Form,
  Input,
  Table,
  Media,
  UncontrolledTooltip,
  Progress,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import ReactQuill from "react-quill";
import moment from "moment";
// core components
import SimpleHeader from "components/Headers/SimpleHeader.js";
import TagsInput from "components/TagsInput/TagsInput.js";
import { getPosts } from "network/ApiAxios";
import { addPost } from "network/ApiAxios";
import { getCategories } from "network/ApiAxios";
import { addCategory } from "network/ApiAxios";
import { deleteCategory } from "network/ApiAxios";
import { editCategory } from "network/ApiAxios";
import { getAll } from "network/ApiAxios";

function Users(props) {
  const [users, setUsers] = React.useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  React.useEffect(() => {
    if (user) {
      const {userType} = user;
      if (userType != "admin") props.history.push("/admin/dashboard");
    }
    const runAsync = async () => {
      const { data } = await getAll();
      const { users: usersList } = data;
      setUsers(usersList);
      console.log(data);
    };
    runAsync();
  }, []);

  return (
    <>
      <SimpleHeader name="Timeline" parentName="Pages" />
      <Container className="mt--6" fluid>
        <Row>
          <div className="col">
            <Card>
              <CardHeader className="border-0">
                <h3 className="mb-0">Users</h3>
              </CardHeader>

              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th className="sort" data-sort="name" scope="col">
                      Name
                    </th>
                    <th className="sort" data-sort="email" scope="col">
                      Email
                    </th>
                    <th className="sort" data-sort="role" scope="col">
                        Role
                    </th>
                  </tr>
                </thead>
                <tbody className="list">
                  {users.map(user => (
                    <tr key={user._id}>
                      <td className="name">{user.name}</td>
                      <td className="email">{user.email}</td>
                      <td className="role">{user.userType}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
}

export default Users;
