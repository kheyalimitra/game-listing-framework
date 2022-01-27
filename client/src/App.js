import React from "react";
import axios from "axios";
import "./App.css";
import config from "./clientConfig.js";

const initialFormData = {
  category: "",
  title: "",
  subtitle: "",
  description: "",
  type: 1,
  images: [{ id: "1", type: "", url: "" }],
  tags: [],
  author: "",
  replayBundleUrlJson: "",
  duration: 0,
  isDownloadable: false,
  isStreamable: true,
  version: "1.0",
};
const App = () => {
  const [formData, updateFormData] = React.useState(initialFormData);
  const [post, setPost] = React.useState(null);
  const closeAlert = (e) => {
    const parentDivAlertElement = e.target.parentElement.parentNode;
    parentDivAlertElement.style.display = "none";
  };
  const handleChange = (e) => {
    if (e.target.name === "ImageURL") {
      formData.images[0].url = e.target.value.trim();
    }
    if (e.target.name === "ImageType") {
      formData.images[0].type = e.target.value.trim();
    }
    if (e.target.name === "ImageTags") {
      const tagsList = e.target.value.split(" ");
      formData.tags = tagsList;
    }
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
    e.preventDefault();
    // Remove empty keys
    Object.keys(formData).forEach((key) => {
      if (formData[key] === "") {
        delete formData[key];
      }
    });
    axios
      .post(config.baseURL, {
        ...formData,
      })
      .then((response) => {
        setPost(response.data);
        if (response.data.success) {
          const successAlertElement = document.getElementById("successAlert");
          successAlertElement.style.display = "inline";
        } else {
          const failureAlertElement = document.getElementById("failureAlert");
          failureAlertElement.style.display = "inline";
        }

        console.log(post);
      });
  };
  const formInputs = [];
  const inputList = [
    "Category",
    "Title",
    "Subtitle",
    "Description",
    "Type",
    "ImageId",
    "ImageURL",
    "ImageType",
    "Tags",
    "Author",
    "ReplayBundleUrlJson",
    "Duration",
    "IsDownloadable",
    "IsStreamable",
    "Version",
  ];
  for (var i = 0; i < inputList.length; i++) {
    formInputs.push(
      <div className="form-group">
        <label
          htmlFor={"formGroup" + inputList[i]}
          className="col-sm-2 colf-for-label label-col"
        >
          {inputList[i]}
        </label>
        <input
          type="text"
          name={inputList[i]}
          id={"formGroup" + inputList[i]}
          placeholder={inputList[i]}
          onChange={handleChange}
        />
      </div>
    );
  }
  return (
    <div className="App">
      <h1>Enter the Gametile details here:</h1>
      <div
        className="alert alert-success alert-dismissible fade show"
        role="alert"
        id="successAlert"
      >
        Successfully added 1 entry.
        <button
          type="button"
          className="close"
          data-dismiss="alert"
          aria-label="Close"
          onClick={closeAlert}
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div
        className="alert alert-danger alert-dismissible fade show"
        role="alert"
        id="failureAlert"
      >
        Error! something went wrong. Nothing is added.
        <button
          type="button"
          className="close"
          data-dismiss="alert"
          aria-label="Close"
          onClick={closeAlert}
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <form>
        <table className="table table-dark">
          <tbody>
            <tr>
              <td></td>
              <td>{formInputs}</td>
            </tr>
          </tbody>
        </table>
        <div className="container">
          <div className="row">
            <div className="col text-center">
              <button
                type="submit"
                onClick={handleSubmit}
                className="btn btn-primary submit-btn"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default App;
