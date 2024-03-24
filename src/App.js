import {useState, useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import AddPost from './Addpost';
import Post from './Post';
import './App.css'
import axios from 'axios';
/*
  AXIOS docs
  https://axios-http.com/docs/intro
 */

function App() {
  const [posts, setPosts] = useState([]);

  const client=axios.create({
    baseURL:'https://jsonplaceholder.typicode.com/posts'
  })
  const fetchPosts = async() => {
  const response =await client.get('?_limit=4')
    setPosts(response.data);
  }
 
 useEffect(() => {
      fetchPosts()
   }, []);
   
const addPost = async(title, body) => {
const response = await client.post('', {
title,
body,
});
setPosts((prevPosts) => [response.data, ...prevPosts])
};
    const data = await response.json();
    setPosts((prevPosts) => [data, ...prevPosts])
  };
   
  const deletePost = async(id) => {
  const response=await client.delete(`${id}`);
  setPosts(posts.filter((post)=>post.id!==id));//to refrech
  };
   
  return (
    <main>
    <h1>Consuming REST api with Axios</h1>
      <AddPost addPost={addPost}/>
      <section className="posts-container">
      <h2>Posts</h2>
        {posts.map((post) => 
          <Post 
            key={post.id} 
            id={post.id}
            title={post.title} 
            body={post.body} 
            deletePost={deletePost}
          />
        )}
      </section>
   </main>
  )
}

export default App;
