// BlogDetails.js
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import http from "../../../../api/http";
import backarrow from "./../../../../images/backArrow.png";
import { formatDate } from "../dateUtils";
import styles from './BlogDetails.module.scss';

const BlogDetails = () => {
  const { blogId } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    // Fetch the individual blog using the blogId parameter
    const fetchBlog = async () => {
      try {
        const res = await http.get(`/posts/${blogId}`);
        if (res.status === 200) {
          setBlog(res.data);
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };

    fetchBlog();
  }, [blogId]);

  const handleProceed = () => {
    navigate(-1);
  };

  const handleDelete = async () => {
    try {
      const res = await http.delete(`/posts/${blogId}`);
      if (res.status === 200) {
        // Blog deleted successfully, navigate back to the blog list
        navigate("/blog/ViewBlog");
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };
console.log(blog);
  return (
    <div className={styles.main_cont}>
      <img src={backarrow} alt="backarrow" onClick={handleProceed} />
      {blog ? (
        <div className={styles.main_inner_cont}>
          <img src={blog.coverImage} width={367} height={180} alt="Blog" />
          <p>{formatDate(blog.createdAt)}</p>
          <h3>{blog.title}</h3>
          <p id={styles.content}>{blog.content}</p>
          <button onClick={handleDelete}>Delete Blog</button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default BlogDetails;
