import React, { useEffect, useState } from "react";
import { Card, Button, InputGroup, Form } from "react-bootstrap";
import "./App.css";
import CCard from "./CCard";
// import body from './body';
// import Card from './card';

function App() {
  const [data, setData] = useState([]);

  //  const url="https://jsonplaceholder.typicode.com/posts/1"

  const fetchPosts = () => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        console.log(data);
      });
  };

  const postAPost = (e) => {
    e.preventDefault();
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify({
        title: e.target.title.value,
        body: e.target.body.value,
        userId: 1,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setData((prev) => [json, ...prev]);
      });
  };

  const postUpdated = (updatedData) => {
    setData((prev) =>
      prev.map((item) => (item.id  === updatedData.id ? updatedData : item))
    );
  };

  const postDeleted = (id) => {
    setData((prev) => prev.filter((item) => item.id !== id));
  };
  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="container" style={{ marginTop: 15 }}>
      <Form onSubmit={postAPost}>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" placeholder="Enter Title" name="title" />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Body</Form.Label>
          <Form.Control type="text" placeholder="Enter Body" name="body" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Post
        </Button>
      </Form>
      {data.map((item) => {
        return (
          <CCard
            item={item}
            postUpdated={postUpdated}
            postDeleted={postDeleted}
          />
        );
      })}
    </div>
  );
}

export default App;
