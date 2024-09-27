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

function Categories(props) {
  const [description, setDescription] = React.useState("");
  const [categories, setCategories] = React.useState([]);
  const [title, setTitle] = React.useState("");
  const [update, setUpdate] = React.useState(false);
  const [id, setId] = React.useState(null);

  const user = JSON.parse(localStorage.getItem("user"));

  React.useEffect(() => {
    if (user) {
      const {userType} = user;
      if (userType != "admin" && userType != "creator") props.history.push("/admin/dashboard");
    }
    const runAsync = async () => {
      const { data } = await getCategories();
      const { categories: categoriesList } = data;
      setCategories(categoriesList);
      console.log(data);
    };
    runAsync();
  }, []);

  const publishPost = async () => {
    if (!description || !title) return;
    const category = {
      title,
      description,
    };
    if (update) {
      const {data: response} = await editCategory(title, description, id);
      console.log(response);
      const index = categories.map(cat => cat._id).indexOf(id);
      categories[index] = {title, description, _id: id};
      setCategories(categories);
      setTitle("");
      setDescription("");
      setUpdate(false);
      return;
    }
    const newPosts = [category, ...categories];
    setCategories(newPosts);
    const { data } = await addCategory(title, description);
    setTitle("");
    setDescription("");
  };

  const deleteCat = async category => {
    const {data} = await deleteCategory(category._id);
    console.log(data);
    if (data.success) {
      let categoriesCopy = [...categories];
      categoriesCopy = categoriesCopy.filter(cat => cat._id !== category._id);
      setCategories(categoriesCopy);
    }
  };

  const editCat = async category => {
    setTitle(category.title);
    setDescription(category.description);
    setId(category._id);
    setUpdate(true);
  }

  return (
    <>
      <SimpleHeader name="Timeline" parentName="Pages" />
      <Container className="mt--6" fluid>
        <Card>
          <CardHeader>
            <h3 className="mb-0">Add a category</h3>
          </CardHeader>
          <CardBody>
            <Form>
              <div data-quill-placeholder="Quill WYSIWYG" data-toggle="quill" />
              <Input
                style={{ marginBottom: 10 }}
                placeholder="Title"
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
              <div data-quill-placeholder="Quill WYSIWYG" data-toggle="quill" />
              <Input
                style={{ marginBottom: 10 }}
                placeholder="Description"
                type="text"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              />
            </Form>
            <Button
              block
              color="primary"
              size="lg"
              type="button"
              onClick={publishPost}
            >
              {update ? "UPDATE": "ADD"}
            </Button>
          </CardBody>
        </Card>
        <Row>
          <div className="col">
            <Card>
              <CardHeader className="border-0">
                <h3 className="mb-0">Categories</h3>
              </CardHeader>

              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th className="sort" data-sort="title" scope="col">
                      Title
                    </th>
                    <th className="sort" data-sort="description" scope="col">
                      Description
                    </th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody className="list">
                  {categories.map((cat) => (
                    <tr key={cat._id}>
                      <td className="budget">{cat.title}</td>
                      <td className="budget">{cat.description}</td>
                      <td className="table-actions">
                        <a
                          className="table-action"
                          href="#pablo"
                          id="tooltip564981685"
                          onClick={() => editCat(cat)}
                        >
                          <i className="fas fa-user-edit" />
                        </a>
                        <UncontrolledTooltip
                          delay={0}
                          target="tooltip564981685"
                        >
                          Edit product
                        </UncontrolledTooltip>
                        <a
                          className="table-action table-action-delete"
                          href="#pablo"
                          id="tooltip601065234"
                          onClick={() => deleteCat(cat)}
                        >
                          <i className="fas fa-trash" />
                        </a>
                        <UncontrolledTooltip
                          delay={0}
                          target="tooltip601065234"
                        >
                          Delete product
                        </UncontrolledTooltip>
                      </td>
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

export default Categories;
