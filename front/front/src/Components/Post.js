import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Button,
  Container,
  CssBaseline,
  List,
  ListItem,
  ListItemText,
  Input,
  ListItemSecondaryAction,
  IconButton
  } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

export default function MainContainer ()  {
  const [createpost, setCreatepost] = useState("");
  const [posts, setPosts] = useState([]);
  const [updatepost, setUpdatepost] = useState("");

  const createPost = (event) => {
    console.log("イベント発火")
    axios.post('http://localhost:3001/posts',
      {
        content: createpost
      }
    ).then(response => {
      console.log("registration response", response.data)
      setPosts([...posts, {
        id: response.data.id,
        content: response.data.content
      }])
      resetTextField()
    }).catch(error => {
      console.log("registration error", error)
    }).catch(data =>  {
      console.log(data)
    })
    event.preventDefault()
  }

  useEffect(() => {
    async function fetchData()  {
      const result = await axios.get('http://localhost:3001/posts',)
        console.log(result)
        console.log(result.data)
        setPosts(result.data);
      }
      fetchData();
      }, []);

  const updatePost = (id) => {
    axios.patch(`http://localhost:3001/posts/${id}`,
    { 
      content: updatepost
    }
    ).then(response => {
      setPosts(posts.filter(x => x.id !== id))
      console.log(response.data)
    }).catch(error => {
      console.log("registration error", error)
    }).catch(data =>  {
      console.log(data)
    })
  }

  const deletePost = (id) => {
    axios.delete(`http://localhost:3001/posts/${id}`)
    .then(response => {
      setPosts(posts.filter(x => x.id !== id))
      console.log("set")
    }).catch(data =>  {
      console.log(data)
    })
  }

  const resetTextField = () => {
    setCreatepost('')
  }
  const handleUpdate = (event) => {
    setUpdatepost(event.target.value)
  }

  return (
    <React.Fragment>
      <Container component='main' maxWidth='xs'>
        <CssBaseline/>
          <form onSubmit={createPost}>
            <Input
                type="text"
                name="post"
                fullWidth
                value={createpost}
                placeholder="Enter text"
                onChange={event => setCreatepost(event.target.value)}
            />
            <Button
              type="submit"
              variant='contained'
              color='primary'
              endIcon={<SendIcon />}>
                つぶやく
            </Button>
          </form>
        <List
          style={{marginTop: '48px'}}
          component='ul'
        >
          {posts.map(item => (
            <ListItem key={item.id} component='li' >
              <ListItemText>
                ID:[{item.id}]
                Content:[{item.content}]
              </ListItemText>
              <ListItemSecondaryAction>
                <form>
                  <Input
                    type="text"
                    name="post"
                    value={updatepost} 
                    onChange={event => handleUpdate(event)}
                  />
                  <IconButton
                    size="small" 
                    aria-label="edit"
                    onClick={() => updatePost(item.id)}>
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                      size="small" 
                      aria-label="delete"
                      onClick={() => deletePost(item.id)}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </form>
              </ListItemSecondaryAction>              
            </ListItem>
          ))}
        </List>
      </Container>
    </React.Fragment>
  );
}