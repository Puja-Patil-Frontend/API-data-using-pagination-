import React, { useState, useEffect } from 'react';
import Post from './Component/Post';
import Pagination from './Component/Pagination';
import axios from 'axios';
import './App.css';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(true);
  const [postsPerPage] = useState(12);
  const [Toggle,setToggle]=useState();

  useEffect(() => {
    
    const fetchPosts = async () => {
      setLoading(true);
      const res = await axios.get('https://jsonplaceholder.typicode.com/photos')
      setPosts(res.data);
      setLoading(false);
    };

    fetchPosts();
  }, []);

  const listdata=()=>{
    setToggle(true);
  };

  const griddata=()=>{
    setToggle(false);
  };

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div className='container mt-3'>
      <h1 className='text-primary mb-3'>API Data</h1>
      <button className='primary' onClick={listdata}>List Data</button>
      <button className=' btn-primary' onClick={griddata}>Grid Data</button>
      
      {Toggle ? (
                <div>
                    <h1>List Data</h1>
                    {currentPosts.map((ele) => (
                      <ul>
                      <img src ={ele.thumbnailUrl}  alt=''/>
                      
                    </ul>
                    ))}
                </div>
            ) : (
                <div className="container">
                    <h1>Grid Data</h1>
                    <div className="row">
                        {currentPosts.map((ele)  => (
                           <img src={ele.thumbnailUrl}  alt="" />
                          
                        ))}
                    </div>
                </div>
            )}
      <Post posts={currentPosts} loading={loading} />
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
        paginate={paginate}
      />
    </div>
    
  );
};

export default App;
