
import axios from 'axios';
import React, { useState } from 'react';
import { Button, Form, Container, Alert, Spinner } from 'react-bootstrap';

const PostBlog = () => {
   const [blogDetails, setBlogDetails] = useState({
      name: '',
      photo: null,
      message: ''
   });

   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(null);
   const [success, setSuccess] = useState(null);

   const handleChange = (e) => {
      setBlogDetails({ ...blogDetails, [e.target.name]: e.target.value });
   };

   const handleImageChange = (e) => {
      const file = e.target.files[0];
      if (file && file.size < 5 * 1024 * 1024 && file.type.startsWith('image/')) { // File size less than 5MB and must be an image
         setBlogDetails({ ...blogDetails, photo: file });
      } else {
         setError('Please upload a valid image file (less than 5MB).');
      }
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      setError(null);
      setSuccess(null);

      const token = localStorage.getItem('token');
      if (!token) {
         setError('No token found. Please log in again.');
         setLoading(false);
         return;
      }

      try {
         const formData = new FormData();
         formData.append('name', blogDetails.name);
         formData.append('photo', blogDetails.photo);
         formData.append('message', blogDetails.message);

         const response = await axios.post('http://localhost:8001/api/user/postblog', formData, {
            headers: {
               Authorization: `Bearer ${token}`,
               'Content-Type': 'multipart/form-data',
            },
         });

         if (response.data.success) {
            setSuccess(response.data.message);
            setBlogDetails({
               name: '',
               photo: null,
               message: ''
            });
         } else {
            setError(response.data.message);
         }
      } catch (error) {
         console.error('Error adding blog:', error);
         // if (error.response && error.response.status === 401) {
         //    setError('Unauthorized. Please log in again.');
         // } else {
         //    setError('There was an error submitting your blog. Please try again.');
         // }
         if (error.response) {
            if (error.response.status === 404) {
              setError('Endpoint not found. Please check the URL.');
            } else if (error.response.status === 401) {
              setError('Unauthorized. Please log in again.');
            } else {
              setError('There was an error submitting your blog. Please try again.');
            }
          } else {
            setError('Network error. Please try again.');
         }
      } finally {
         setLoading(false);
      }
   };

   return (
      <Container className='w-50 my-5 border rounded'>
         <Form onSubmit={handleSubmit} className='p-3'>
            {error && <Alert variant='danger'>{error}</Alert>}
            {success && <Alert variant='success'>{success}</Alert>}

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
               <Form.Label>User Name</Form.Label>
               <Form.Control name='name' value={blogDetails.name} onChange={handleChange} type="text" placeholder="Enter Your username" required />
            </Form.Group>

            <Form.Group className="mb-3">
               <Form.Label>Image</Form.Label>
               <Form.Control
                  type="file"
                  name="photo"
                  onChange={handleImageChange}
                  required
               />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
               <Form.Label>Message</Form.Label>
               <Form.Control placeholder='message' name='message' value={blogDetails.message} onChange={handleChange} as="textarea" rows={3} required />
            </Form.Group>
            <Button type='submit' variant='outline-primary' disabled={loading}>
               {loading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : 'Post'}
            </Button>
         </Form>
      </Container>
   )
}

export default PostBlog;
