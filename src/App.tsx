import { Route, Routes } from 'react-router-dom';
import "./App.css";

import Post from "./ui/Post";
import Posts from "./ui/Posts";
import Header from "./ui/Header";
import NotFound from "./ui/404";

const App = () => (
  <div className="App">
    <Header />

    <Routes>
      <Route path="/posts" element={<Posts />} />
      <Route path="/post/:id" element={<Post />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </div>
);

export default App;
