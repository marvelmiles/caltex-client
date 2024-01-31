import React, { useState } from "react";
import Layout from "../../../Layout";
import BackArrow from "../../backArrow/BackArrow";
import { useCtx } from "../../../../context";
import http from "../../../../api/http";
import styles from "./CreateBlog.module.scss";

const CreateBlog = () => {
  const [selectedTags1, setSelectedTags1] = useState([]);
  const [selectedTags2, setSelectedTags2] = useState([]);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [fileValue, setFileValue] = useState("");

  const { setSnackBar } = useCtx();

  const defaultFormData = {
    title: "",
    content: "",
    category: "",
    tags1: [],
    tags2: [],
    coverImage: "",
  };

  const [formData, setFormData] = useState(defaultFormData);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileValue(file.name);
      setUploadedFile(file);
      setFormData((prevFormData) => ({
        ...prevFormData,
        coverImage: file, 
      }));
    } else {
      setFileValue("");
      setUploadedFile(null);
      setFormData((prevFormData) => ({
        ...prevFormData,
        coverImage: null, 
      }));
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (uploadedFile) {
  //     const apiFormData = new FormData();
  //     apiFormData.append("coverImage", uploadedFile);

  //     // Append other form data properties
  //     Object.entries(formData).forEach(([key, value]) => {
  //       formData.append(key, value);
  //     });

  //     try {
  //       const res = await http.post(`/posts/new`, formData, {
  //         withCredentials: true,
  //       });
  //       if (res.status === 200) {
  //         console.log("Successfully Uploaded!");
  //       }
  //     } catch (error) {
  //       console.log("Upload Failed!", error);
  //     }
  //   } else {
  //     setSnackBar("Something went wrong! Please try again later.");
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (uploadedFile) {
      const apiFormData = new FormData();
      apiFormData.append("coverImage", uploadedFile);

      // Append other form data properties
      Object.entries(formData).forEach(([key, value]) => {
        apiFormData.append(key, value); // Use apiFormData instead of formData
      });

      try {
        const res = await http.post(`/posts/new`, apiFormData, {
          withCredentials: true,
        });
        if (res.status === 200) {
          console.log("Successfully Uploaded!");
        }
      } catch (error) {
        console.log("Upload Failed!", error);
      }
    } else {
      setSnackBar("Something went wrong! Please try again later.");
    }
  };


  // const handleTagChange = (event) => {
  //   const selectedOptions = Array.from(event.target.selectedOptions).map(
  //     (option) => option.value
  //   );
  //   setFormData((prevFormData) => ({
  //     ...prevFormData,
  //     tags1: selectedOptions,
  //   }));

   
  //   setSelectedTags1(selectedOptions);
    
  // };
  // const handleTagChange2 = (event) => {
  //    const selectedOptions2 = Array.from(event.target.selectedOptions2).map(
  //      (option) => option.value
  //    );
  //    setFormData((prevFormData) => ({
  //      ...prevFormData,
  //      tags2: selectedOptions2,
  //    }));

   
  //   setSelectedTags2(selectedOptions2);
    
  // };

  const handleTagChange = (event) => {
    const selectedOptions = Array.from(event.target.selectedOptions).map(
      (option) => option.value
    );
    setFormData((prevFormData) => ({
      ...prevFormData,
      [event.target.name]: selectedOptions, // Use event.target.name
    }));

    setSelectedTags1(selectedOptions);
  };

  const handleTagChange2 = (event) => {
    const selectedOptions2 = Array.from(event.target.selectedOptions).map(
      (option) => option.value
    );
    setFormData((prevFormData) => ({
      ...prevFormData,
      [event.target.name]: selectedOptions2, // Use event.target.name
    }));

    setSelectedTags2(selectedOptions2);
  };


  const categories = [
    "Company News",
    "Education",
    "Insights",
    "Market News",
    "Market Analysis",
  ];

  const [selectedCategory, setSelectedCategory] = useState("");

  const handleCategoryChange = (e) => {
    const selectCategory = e.target.value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      category: selectCategory,
    }));
    setSelectedCategory(selectCategory);
  };

  return (
    <Layout>
      <div className={styles.main_cont}>
        <BackArrow />
        <div className={styles.main_div}>
          <ul className={styles.form_ul}>
            <li>CREATE THE</li>
            <li>Perfect</li>
            <li>BLOCK POST</li>
          </ul>
          <form action="" onSubmit={handleSubmit}>
            <label htmlFor="image" className={styles.label}>
              <input
                type="file"
                multiple={false}
                accept=".jpg,.jpeg,.png,.svg"
                id="image"
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
              <span>Add Blog Image</span>
            </label>
            <span id={styles.img_text}>
              Image format should be Jpg, Jpeg, Png, or Svg
            </span>
            <span>{fileValue}</span>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Blog Title"
              onClick={handleInputChange}
            />
            <label htmlFor="category">
              <select
                id="category"
                name="category"
                onChange={handleCategoryChange}
                value={selectedCategory}
              >
                <option value="" disabled selected hidden>
                  Select Category
                </option>
                {categories.map((item, index) => (
                  <option key={index} value={index}>
                    {item}
                  </option>
                ))}
              </select>
            </label>
            <div className={styles.tags}>
              <label htmlFor="tags">
                Select Tags One:
                <span>
                  (Press and hold the Ctrl key to select multiple tags)
                </span>
              </label>
              <select
                id="tags"
                name="tags"
                multiple
                onChange={handleTagChange}
                value={selectedTags1}
              >
                <option value="company news">Company News</option>
                <option value="education">Education</option>
                <option value="insights">Insights</option>
                <option value="market news">Market News</option>
                <option value="market analysis">Market Analysis</option>
              </select>

              <p>Selected Tags One: {selectedTags1.join(", ")}</p>
            </div>
            <div className={styles.tags}>
              <label htmlFor="tags2">
                Select Tags Two:
                <span>
                  (Press and hold the Ctrl key to select multiple tags)
                </span>
              </label>
              <select
                id="tags2"
                name="tags"
                multiple
                onChange={handleTagChange2}
                value={selectedTags2}
              >
                <option value="company news">Company News</option>
                <option value="education">Education</option>
                <option value="insights">Insights</option>
                <option value="market news">Market News</option>
                <option value="market analysis">Market Analysis</option>
              </select>

              <p>Selected Tags Two: {selectedTags2.join(", ")}</p>
            </div>
            <textarea
              id="blogbody"
              name="blogbody"
              rows="10"
              cols="100"
              onClick={handleInputChange}
            >
              Write a blog
            </textarea>
            <button type="submit">Publish</button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default CreateBlog;

