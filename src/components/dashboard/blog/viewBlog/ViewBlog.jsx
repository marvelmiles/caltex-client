import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import http from "../../../../api/http";
import { useNavigate } from "react-router-dom";
import backarrow from "./../../../../images/backArrow.png";
import styles from './ViewBlog.module.scss';

const ViewBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);

  useEffect(() => {
    // Fetch all blogs from the backend
    const fetchBlogs = async () => {
      try {
        const res = await http.get("/posts");
        if (res.status === 200) {
          setBlogs(res.data);
          setFilteredBlogs(res.data);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  const filterBlogsByCategory = (category) => {
    if (category === "All") {
      setFilteredBlogs(blogs);
    } else {
      const filtered = blogs.filter((blog) => blog.category === category);
      setFilteredBlogs(filtered);
    }
  };
  

  const navigate = useNavigate();

  const handleProceed = () => {
    navigate('/blog/CreateBlog');
  };

  const renderGrid = () => {
    const grid = [];
    const columns = 3;
    const rows = Math.ceil(filteredBlogs.length / columns);

    for (let i = 0; i < rows; i++) {
      const rowItems = filteredBlogs.slice(i * columns, (i + 1) * columns);
      grid.push(
        <div key={i} className={styles.gridRow}>
          {rowItems.map((blog) => (
            <div key={blog.id} className={styles.gridColumn}>
              <Link to={`/blog/${blog.id}`}>
                <img src={blog.coverImage} width={367}
height={180} alt="Blog" />
                <p>{blog.timestamps}</p>
                <h3>{blog.title}</h3>
                <p id={styles.content}>{blog.content}</p>
              </Link>
            </div>
          ))}
        </div>
      );
    }

    return grid;
  };

  return (
    <div className={styles.main_cont}>
      <img src={backarrow} alt="backarrow" onClick={handleProceed} />
      <div className={styles.category_cont}>
        <button onClick={() => filterBlogsByCategory("All")}>All Blogs</button>
        <button onClick={() => filterBlogsByCategory("Company News")}>
          Company News
        </button>
        <button onClick={() => filterBlogsByCategory("Education")}>
          Education
        </button>
        <button onClick={() => filterBlogsByCategory("Insights")}>
          Insight
        </button>
        <button onClick={() => filterBlogsByCategory("Market News")}>
          Market News
        </button>
        <button onClick={() => filterBlogsByCategory("Market Analysis")}>
          Market Analysis
        </button>
      </div>
      <div className={styles.blog_main}>{renderGrid()}</div>
    </div>
  );
};

export default ViewBlog;
