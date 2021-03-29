// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import {
//   Button,
//   Container,
//   CssBaseline,
//   List,
//   ListItem,
//   ListItemText,
//   Input,
//   ListItemSecondaryAction,
//   IconButton
//   } from '@material-ui/core';
// import SendIcon from '@material-ui/icons/Send';
// import EditIcon from '@material-ui/icons/Edit';
// import DeleteIcon from '@material-ui/icons/Delete';

import React, { useReducer, useEffect } from 'react';
import styled from 'styled-components';
import { fetchPosts } from '../apis/posts'; 
import { initialState, postsActionTyps, postsReducer } from '../reducers/posts';
import MainLogo from '../assets/main-logo.png';
import MainCoverImage from '../assets/main-cover2.jpg';

export const Posts = () => {

  const [state, dispatch] = useReducer(postsReducer, initialState);

  useEffect(() => {
    dispatch({ type: postsActionTyps.FETCHING });
    fetchPosts().then((data) => 
      dispatch({
        type: postsActionTyps.FETCH_SUCCESS,
        payload: {
          postLists: data
        }
      })
      // console.log(data)
    )
  },[])

  // useEffect(() => {
  //   dispatch({ type: postsActionTyps.FETCHING });
  //   fetchPosts()
  //   .then((data) =>
  //     dispatch({
  //       type: postsActionTyps.FETCH_SUCCESS,
  //       payload: {
  //         postsList: data
  //       }
  //     })
  //   )
  // }, [])
  // useEffect(() => {
  //   fetchPosts()
  //   .then((data) =>
  //     // console.log(data)
  //     console.log({postsList: data})
  //   )
  // }, [])


  return (
    <React.Fragment>
      <HeaderWrapper>
        <MainLogoImage src={MainLogo} alt="main logo" />
      </HeaderWrapper>
      <MainCoverImageWrapper>
        <MainCover src={MainCoverImage} alt="main cover" />
      </MainCoverImageWrapper>
      {
        state && state.postsList && state.postsList.map(post => 
          <div key={post.id}>
            {post.content}
          </div>
        )
      }
      {console.log(state.postsList)}
    </React.Fragment>
  )
}

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  padding: 8px 32px;
`;

const MainLogoImage = styled.img`
  height: 80px;
`
const MainCoverImageWrapper = styled.div`
  text-align: center;
`;

const MainCover = styled.img`
  height: 700px;
`;
















// export default function Posts ()  {
//   const [createpost, setCreatepost] = useState("");
//   const [posts, setPosts] = useState([]);
//   const [updatepost, setUpdatepost] = useState("");

//   // 新規投稿。新しいpostをaxios経由でDBに書き込む。
//   const createPost = (event) => {
//     console.log("イベント発火")
//     axios.post('http://localhost:3001/posts',
//       {
//         content: createpost
//       }
//     ).then(response => {
//       console.log("registration response", response.data)
//       setPosts([...posts, {
//         id: response.data.id,
//         content: response.data.content
//       }])
//       resetTextField()
//     }).catch(error => {
//       console.log("registration error", error)
//     }).catch(data =>  {
//       console.log(data)
//     })
//     event.preventDefault()
//   }

//   // 一覧表示。レンダーされる度にgetが走る。
//   useEffect(() => {
//     async function fetchData()  {
//       const result = await axios.get('http://localhost:3001/posts',)
//         console.log(result)
//         console.log(result.data)
//         setPosts(result.data);
//       }
//       fetchData();
//       }, []);

//   const updatePost = (id) => {
//     axios.patch(`http://localhost:3001/posts/${id}`,
//     { 
//       content: updatepost
//     }
//     ).then(response => {
//       const newposts = [...posts];
//       const index = newposts.findIndex(x => x.id === id);
//       newposts.splice(index, 1, response["data"]);
//       setPosts([{posts: newposts}])
//       console.log(response.data)
//     }).catch(error => {
//       console.log("registration error", error)
//     }).catch(data =>  {
//       console.log(data)
//     })
//   }

//   const deletePost = (id) => {
//     axios.delete(`http://localhost:3001/posts/${id}`)
//     .then(response => {
//       setPosts(posts.filter(x => x.id !== id))
//       console.log("set")
//     }).catch(data =>  {
//       console.log(data)
//     })
//   }

//   const resetTextField = () => {
//     setCreatepost('')
//   }
//   const handleUpdate = (event) => {
//     setUpdatepost(event.target.value)
//   }

//   return (
//     <React.Fragment>
//       <Container component='main' maxWidth='xs'>
//         <CssBaseline/>
//           <form onSubmit={createPost}>
//             <Input
//                 type="text"
//                 name="post"
//                 fullWidth
//                 value={createpost}
//                 placeholder="Enter text"
//                 onChange={event => setCreatepost(event.target.value)}
//             />
//             <Button
//               type="submit"
//               variant='contained'
//               color='primary'
//               endIcon={<SendIcon />}>
//                 つぶやく
//             </Button>
//           </form>
//         <List
//           style={{marginTop: '48px'}}
//           component='ul'
//         >
//           {posts.map(item => (
//             <ListItem key={item.id} component='li' >
//               <ListItemText>
//                 ID:[{item.id}]
//                 Content:[{item.content}]
//               </ListItemText>
//               <ListItemSecondaryAction>
//                 <form>
//                   <Input
//                     type="text"
//                     name="post"
//                     value={updatepost} 
//                     onChange={event => handleUpdate(event)}
//                   />
//                   <IconButton
//                     size="small" 
//                     aria-label="edit"
//                     onClick={() => updatePost(item.id)}>
//                     <EditIcon fontSize="small" />
//                   </IconButton>
//                   <IconButton
//                       size="small" 
//                       aria-label="delete"
//                       onClick={() => deletePost(item.id)}>
//                     <DeleteIcon fontSize="small" />
//                   </IconButton>
//                 </form>
//               </ListItemSecondaryAction>              
//             </ListItem>
//           ))}
//         </List>
//       </Container>
//     </React.Fragment>
//   );
// }