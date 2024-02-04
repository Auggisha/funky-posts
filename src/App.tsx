import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Grid, Typography } from '@mui/material';
import puppy from './assets/puppy.jpg';
import puppy2 from './assets/puppey2.jpg';
import FeatherIcon from 'feather-icons-react';
import { Link } from "react-router-dom";
import { BrowserRouter } from 'react-router-dom'
import Posts from "./ui/Posts";
import Header from "./ui/Header";
const postsList = [
  {
    id: 1,
    user: {
      userId: 1,
      name: "Auggisha",
      email: "pandurevic.o@gmail.com",
      website: "pornhub.com",
      avatar: "https://via.placeholder.com/600/771796",
      avatarThumbnail: "https://via.placeholder.com/150/92c952",
    },
    title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
    comments: [
      {
        postId: 1,
        id: 1,
        name: "id labore ex et quam laborum",
        email: "Eliseo@gardner.biz",
        body: "laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium"
      },
      {
        postId: 1,
        id: 2,
        name: "id labore ex et quam laborum",
        email: "Eliseo@gardner.biz",
        body: "laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium"
      }
    ]
  },
  {
    id: 2,
    user: {
      userId: 1,
      name: "Auggisha",
      email: "Ognjen Pandurevic",
      webSite: "pornhub.com",
      avatar: "https://via.placeholder.com/600/92c952",
      avatarThumbnail: "https://via.placeholder.com/150/92c952",
    },
    title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
    comments: [
      {
        postId: 1,
        id: 1,
        name: "id labore ex et quam laborum",
        email: "Eliseo@gardner.biz",
        body: "laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium"
      }
    ]
  },
];

const App = () => {
  const [postsList, setPostsList] = useState([]);
  const [fetchedPosts, setFetchedPosts] = useState([]);
  const [fetchedComments, setFetchedComments] = useState([]);
  const [fetchedPhotos, setFetchedPhotos] = useState([]);
  const [fetchedUsers, setFetchedUsers] = useState([]);

  const fetchAllPosts = async () => {
    const test = 
      await fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then(data => setFetchedPosts(data));
  }

  const fetchAllComments = async () => {
    const test = 
      await fetch('https://jsonplaceholder.typicode.com/comments')
        .then(response => response.json())
        .then(data => setFetchedComments(data));
  }
  const fetchAllPhotos = async () => {
    const test = 
      await fetch('https://jsonplaceholder.typicode.com/photos')
        .then(response => response.json())
        .then(data => setFetchedPhotos(data));
  }
  const fetchAllUsers = async () => {
    const test = 
      await fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(data => setFetchedUsers(data));
  }

  useEffect(() => {
    fetchAllPosts();
    fetchAllComments();
    fetchAllPhotos();
    fetchAllUsers();
  }, []);

  useEffect(() => {
    if (fetchedPosts.length > 0 && fetchedComments.length > 0 && fetchedPhotos.length > 0 && fetchedUsers.length > 0) {
      let formatted = [];
      for (let i = 0; i < fetchedPosts.length; i++) {
        const val = {
          id: (fetchedPosts[i] as any).id,
          title: (fetchedPosts[i] as any).title,
          body: (fetchedPosts[i] as any).body,
          user: {
            id: (fetchedPosts[i] as any).userId,
            email: (fetchedUsers.find(x => (x as any).id === (fetchedPosts[i] as any).userId) as any).email,
            website: (fetchedUsers.find(x => (x as any).id === (fetchedPosts[i] as any).userId) as any).website,
            name: (fetchedUsers.find(x => (x as any).id === (fetchedPosts[i] as any).userId) as any).username,
            avatar: "https://via.placeholder.com/600/92c952",
            avatarThumbnail: "https://via.placeholder.com/150/92c952"
          },
          commentsNo: (fetchedComments.filter(x => (x as any).postId === (fetchedPosts[i] as any).id) as any).length
        };

        for (let i = 0; i < fetchedUsers.length; i++) {

        }

        formatted.push(val);
        setPostsList(formatted as any);
      }


    }
  }, [fetchedPosts, fetchedComments, fetchedPhotos, fetchedUsers]);
  
  return (
    <div className="App">
      <Header />
      {/* <Posts posts={postsList} /> */}
      <Posts />

      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      XXX */}
    </div>
  );
}

export default App;
