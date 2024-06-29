
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import Stack from '@mui/material/Stack';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Container } from 'react-bootstrap';
import IconButton from '@mui/material/IconButton';
import { UserContext } from '../../App';
import Spinner from 'react-bootstrap/Spinner';


const Home = () => {
  const user = useContext(UserContext);
  const [AllBlogs, setAllBlogs] = useState([]);
  const [likedStatus, setLikedStatus] = useState({});

  const getAllBlogs = async () => {
    try {
      const response = await axios.get('http://localhost:8001/api/user/getblogs');
      setAllBlogs(response.data.data);
    } catch (error) {
      console.error('Error fetching all blogs:', error);
    }
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('http://localhost:8001/api/blogs');
         setAllBlogs(response.data); // Use the 'response' variable if needed
     } catch (error) {
    console.error('Error fetching blogs:', error);
    }
   };

  fetchBlogs();
  getAllBlogs();
}, []);
        

  const handleLikes = async (blogId, userId, likes) => {
    const updatedLikedStatus = { ...likedStatus };

    if (!updatedLikedStatus[userId]) {
      updatedLikedStatus[userId] = {};
    }

    if (!updatedLikedStatus[userId][blogId]) {
      updatedLikedStatus[userId][blogId] = true;
      setAllBlogs(prevBlogs =>
        prevBlogs.map(blog =>
          blog._id === blogId ? { ...blog, likes: blog.likes + 1 } : blog
        )
      );
    } else {
      updatedLikedStatus[userId][blogId] = false;
      setAllBlogs(prevBlogs =>
        prevBlogs.map(blog =>
          blog._id === blogId ? { ...blog, likes: blog.likes - 1 } : blog
        )
      );
    }

    setLikedStatus(updatedLikedStatus);

    try {
      await axios.post(`http://localhost:8001/api/user/updatelikes/${blogId}`, {
        blogId: blogId,
        likeCount: updatedLikedStatus[userId][blogId] ? likes + 1 : likes - 1,
      });
    } catch (error) {
      console.error('Error updating likes:', error);
    }
  };

  return (
    <Container className='my-3'>
      <Row xs={1} md={2} className='g-4'>
        {AllBlogs && AllBlogs.length > 0 ? (
          AllBlogs.slice().reverse().map(blog => (
            <Col key={blog._id}>
              <Card className='swing'>
                <Card.Img
                  variant='top'
                  src={`http://localhost:8001${blog?.photo?.path}`}
                />
                <Card.Body>
                  <Card.Title>{blog.name}</Card.Title>
                  {user.userLoggedIn === true ? (
                    <Stack direction='row' spacing={1}>
                      <IconButton onClick={() => handleLikes(blog._id, user.userData._id, blog.likes)}>
                        <FavoriteIcon />
                      </IconButton>
                    </Stack>
                  ) : (
                    <></>
                  )}
                  <Card.Text>
                    <span className='w-100'>{blog.likes} Likes</span>
                  </Card.Text>
                  <div className='body'>
                    <div className='left w-100'>
                      <Card.Text>{blog.message}</Card.Text>
                      <Card.Text>
                        <span style={{ opacity: 0.5, fontSize: 12, letterSpacing: '2px', marginBottom: 2 }}>
                          Created at: {new Date(blog.createdAt).toLocaleString()}
                        </span>
                      </Card.Text>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p>There are no blogs in the app</p>
        )}
      </Row>
      {AllBlogs.length === 0 && <Spinner animation='grow' variant='warning' />}
    </Container>
  );
};

export default Home;

