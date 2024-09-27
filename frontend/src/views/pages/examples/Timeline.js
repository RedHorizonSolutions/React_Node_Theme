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
} from "reactstrap";
import ReactQuill from "react-quill";
import moment from "moment";
// core components
import Select2 from "react-select2-wrapper";
import SimpleHeader from "components/Headers/SimpleHeader.js";
import TagsInput from "components/TagsInput/TagsInput.js";
import { getPosts } from "network/ApiAxios";
import { addPost } from "network/ApiAxios";
import { getCategories } from "network/ApiAxios";
import { getCategoryById } from "network/ApiAxios";

function Timeline() {
  const [reactQuillText, setReactQuillText] = React.useState("");
  const [tagsinput, setTagsinput] = React.useState([]);
  const [posts, setPosts] = React.useState([]);
  const [title, setTitle] = React.useState("");
  const [categories, setCategories] = React.useState([]);
  const [category, setCategory] = React.useState(null);
  const [filter, setFilter] = React.useState(null);

  React.useEffect(() => {
    const runAsync = async () => {
      const { data: postsData } = await getPosts();
      const { posts: postsList } = postsData;
      for (let post of postsList) {
        const {data} = await getCategoryById(post.categories[0]);
        console.log(post.categories[0], data);
        if (data.category) {
          const {category: {title}} = data;
          post.categories = [title];
        } else {
          post.categories = [""];
        }
      }
      setPosts(postsList.reverse());

      const {data: categoriesData} = await getCategories();
      const {categories: categoriesList} = categoriesData;
      setCategories(categoriesList);
    };
    runAsync();
  }, []);

  const publishPost = async () => {
    console.log(category);
    if (!reactQuillText || !title || !category) return;
    const {data} = await getCategoryById(category);
    console.log(data);
    const {category: {title: categoryTitle}} = data;
    const { name: authorName } = JSON.parse(localStorage.getItem("user"));
    const post = {
      title: title,
      content: reactQuillText,
      tags: tagsinput,
      categories: [categoryTitle],
      publishedAt: new Date(),
      authorName,
    };
    const newPosts = [post, ...posts];
    setPosts(newPosts);
    await addPost(
      title,
      reactQuillText,
      [category],
      tagsinput,
      authorName,
      new Date()
    );
    setTagsinput([]);
    setTitle("");
    setReactQuillText("");
  };

  return (
    <>
      <SimpleHeader name="Timeline" parentName="Pages" />
      <Container className="mt--6" fluid>
        <Card>
          <CardHeader>
            <h3 className="mb-0">Write a post</h3>
          </CardHeader>
          <CardBody>
            <Form>
              <div data-quill-placeholder="Quill WYSIWYG" data-toggle="quill" />
              <Row>
                <Col md="8">
                  <Input
                    style={{marginBottom: 10}}
                    placeholder="Title"
                    type="text"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                  />
                </Col>
                <Col md="4">
                <Select2
                      className="form-control"
                      defaultValue="1"
                      options={{
                        placeholder: "Category",
                      }}
                      data={categories.map(cat => ({id: cat._id, text: cat.title}))}
                      onSelect={e => setCategory(e.target.value)}
                      value={category}
                    />
                </Col>
              </Row>
              <ReactQuill
                style={{marginBottom: 10}}
                value={reactQuillText}
                onChange={(value) => setReactQuillText(value)}
                theme="snow"
                modules={{
                  toolbar: [
                    ["bold", "italic"],
                    ["blockquote", "code"],
                    [
                      {
                        list: "ordered",
                      },
                      {
                        list: "bullet",
                      },
                    ],
                  ],
                }}
              />
            </Form>
            <h4 className="mb-0">Tags</h4>
            <Form>
              <TagsInput
                style={{marginBottom: 10}}
                onlyUnique
                className="bootstrap-tagsinput"
                onChange={(value) => setTagsinput(value)}
                value={tagsinput}
                tagProps={{ className: "tag badge mr-1" }}
                inputProps={{
                  className: "",
                  placeholder: "",
                }}
              />
            </Form>
            <Button
              block
              color="primary"
              size="lg"
              type="button"
              onClick={publishPost}
            >
              Publish
            </Button>
          </CardBody>
        </Card>
        <Row>
          <Col lg="6">
            <Card>
              <CardHeader className="bg-transparent">
                <h3 className="mb-0">Timeline</h3>
              </CardHeader>
              <CardBody>
                <div
                  className="timeline timeline-one-side"
                  data-timeline-axis-style="dashed"
                  data-timeline-content="axis"
                >
                  {posts.map((post) => (
                    <div className="timeline-block">
                      <span className="timeline-step badge-success">
                        <i className="ni ni-bell-55" />
                      </span>
                      <div className="timeline-content">
                        <small className="text-muted font-weight-bold">
                          {moment(post.publishedAt).format(
                            "MMMM Do yyyy HH:mm"
                          )}
                        </small>
                        <h4 className="mt-3 mb-0">
                          {post.title} - {post.authorName}
                        </h4>
                        <h5 className="mt-3 mb-0">
                          {post.categories[0]}
                        </h5>
                        <p className="text-sm mt-1 mb-0">
                          <div
                            dangerouslySetInnerHTML={{ __html: post.content }}
                          />
                          {/* {post.content} */}
                        </p>
                        <div className="mt-3">
                          {post.tags.map((tag) => (
                            <Badge color="success" pill>
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col lg="6">
            <Card className="bg-gradient-default shadow">
              <CardHeader className="bg-transparent">
                <h3 className="mb-0 text-white">Dark timeline</h3>
              </CardHeader>
              <CardBody>
                <div
                  className="timeline timeline-one-side"
                  data-timeline-axis-style="dashed"
                  data-timeline-content="axis"
                >
                  {posts.map((post) => (
                    <div className="timeline-block">
                      <span className="timeline-step badge-success">
                        <i className="ni ni-bell-55" />
                      </span>
                      <div className="timeline-content">
                        <small className="text-light font-weight-bold">
                          {moment(post.publishedAt).format(
                            "MMMM Do yyyy HH:mm"
                          )}
                        </small>
                        <h4 className="text-white mt-3 mb-0">
                          {post.title} - {post.authorName}
                        </h4>
                        <h5 className="text-white mt-3 mb-0">
                          {post.categories[0]}
                        </h5>
                        <p className="text-white text-sm mt-1 mb-0">
                          <div
                            dangerouslySetInnerHTML={{ __html: post.content }}
                          />
                          {/* {post.content} */}
                        </p>
                        <div className="mt-3">
                          {post.tags.map((tag) => (
                            <Badge color="success" pill>
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Timeline;
