import React, { useState } from "react";
import Layout from "../../../Layout";
import BackArrow from "../../backArrow/BackArrow";
import { useCtx } from "../../../../context";
import http from "../../../../api/http";
import styles from "./CreateBlog.module.scss";

const CreateBlog = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { setSnackBar } = useCtx();

  const defaultFormData = {
    title: "",
    content: "",
    category: "",
    tags: [],
    coverImage: null,
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
      setFormData((prevFormData) => ({
        ...prevFormData,
        coverImage: file,
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        coverImage: null,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.values(formData).some((v) => !v))
      return setSnackBar("All field is required");

    setIsLoading(true);

    const apiFormData = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        for (const _value of value) {
          apiFormData.append(key, _value);
        }
      } else apiFormData.set(key, value);
    });

    try {
      const res = await http.post(`/posts/new`, apiFormData, {
        withCredentials: true,
      });

      if (res.status === 200) {
        setSnackBar({
          message: "Blog published successfully.",
          severity: "success",
        });
        setFormData(defaultFormData);
      }
    } catch (error) {
      setSnackBar(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTagChange = (event) => {
    const selectedOptions = Array.from(event.target.selectedOptions).map(
      (option) => option.value
    );
    setFormData((prevFormData) => ({
      ...prevFormData,
      [event.target.name]: selectedOptions,
    }));
  };

  const categories = [
    "Company News",
    "Education",
    "Insights",
    "Market News",
    "Market Analysis",
  ];

  return (
    <Layout>
      <div className={styles.main_cont}>
        <BackArrow />
        <div className={styles.main_div}>
          <ul className={styles.form_ul}>
            <li>CREATE THE</li>
            <li>Perfect</li>
            <li>BLOG POST</li>
          </ul>
          <form action="" onSubmit={handleSubmit}>
            <label htmlFor="image" className={styles.label}>
              <input
                type="file"
                multiple={false}
                accept=".jpg,.jpeg,.png,.svg"
                id="image"
                name="coverImage"
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
              <span>Add Blog Image</span>
            </label>
            <span id={styles.img_text}>
              Image format should be Jpg, Jpeg, Png, or Svg
            </span>
            <span>{formData?.coverImage?.name}</span>
            <input
              required
              type="text"
              name="title"
              id="title"
              placeholder="Blog Title"
              value={formData.title}
              onChange={handleInputChange}
            />
            <label htmlFor="category">
              <select
                required
                id="category"
                name="category"
                onChange={handleInputChange}
                value={formData.category}
              >
                <option value="" disabled selected hidden>
                  Select Category
                </option>
                {categories.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>
            <div className={styles.tags}>
              <label htmlFor="tags">
                Select Tags:
                <span>
                  (Press and hold the Ctrl key to select multiple tags)
                </span>
              </label>
              <select
                required
                id="tags"
                name="tags"
                multiple
                onChange={handleTagChange}
                value={formData.tags}
              >
                <option value="company news">Company News</option>
                <option value="education">Education</option>
                <option value="insights">Insights</option>
                <option value="market news">Market News</option>
                <option value="market analysis">Market Analysis</option>
              </select>

              <p>Selected Tags: {formData.tags.join(", ")}</p>
            </div>
            <textarea
              placeholder="Write a blog"
              required
              id="blogbody"
              name="content"
              rows="10"
              cols="100"
              value={formData.content}
              onChange={handleInputChange}
            ></textarea>
            <button type="submit" disabled={isLoading}>
              {isLoading ? "Publishing..." : "Publish"}
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default CreateBlog;
