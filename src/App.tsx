import { Route, Routes } from 'react-router-dom';
import "./App.css";

import Post from "./ui/Post";
import Posts from "./ui/Posts";
import Header from "./ui/Header";
import NotFound from "./ui/404";

const App = () => {
  const helloMessage = "Hello from";

  return (
    <div className="App">
      <Header hello={() => helloMessage} />

      <Routes>
        <Route 
          path="/posts" 
          element={<Posts hello={() => helloMessage} />} 
        />

        <Route 
          path="/post/:id" 
          element={<Post hello={() => helloMessage} />} 
        />

        <Route 
          path="*" 
          element={<NotFound hello={() => helloMessage} />} 
        />
      </Routes>
    </div>
  );
}

export default App;
