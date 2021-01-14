import axios from 'axios';
import { postsIndex } from '../router';

export const fetchPosts = async() => {
  return await axios.get(postsIndex)
  .then(res => {
    return res.data
  })
  .catch((e) => console.error(e))
}