import React, { useState } from "react";
import { Button, Card, FormControl, InputGroup } from "react-bootstrap";

function CCard({ item, postUpdated, postDeleted }) {
  const [editing, setEditing] = useState(false);

  const updatePost = (e) => {
    e.preventDefault();
    fetch("https://jsonplaceholder.typicode.com/posts/1", {
      method: "PUT",
      body: JSON.stringify({
        id: item.id,
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
        postUpdated(json);
        setEditing(false);
      });
  };

  const deletePost = (id) => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: "DELETE",
    }).then((response) => {
      postDeleted(id);
      console.log("delete response", response);
    });
  };
  return (
    <Card key={item.id} style={{ margin: 15 }}>
      <form onSubmit={updatePost}>
        <Card.Body>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {editing ? (
              <InputGroup>
                <FormControl defaultValue={item.title} name="title" />
              </InputGroup>
            ) : (
              <Card.Title onClick={() => setEditing(true)}>
                {item.title}
              </Card.Title>
            )}
            {editing ? (
              <Button variant="primary" type="submit">
                Update
              </Button>
            ) : (
              <Button variant="primary" onClick={() => deletePost(item.id)}>
                Delete
              </Button>
            )}
          </div>
          {editing ? (
            <InputGroup>
              <FormControl defaultValue={item.body} name="body" />
            </InputGroup>
          ) : (
            <Card.Text onClick={() => setEditing(true)}>{item.body}</Card.Text>
          )}
          <span style={{ fontSize: 15 , fontWeight:"bold" }}>Click on card to edit</span>
        </Card.Body>
      </form>
    </Card>
  );
}

export default CCard;
