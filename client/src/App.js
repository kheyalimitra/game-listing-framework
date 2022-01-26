import React from "react";
import axios from "axios";
import './App.css';
import config from "./clientConfig.js";

const initialFormData = {
  category: "",
  title: "",
  subtitle: "",
  description: "",
  type: 1,
  images: [{id: '1', type: '', url: ''}],
  tags: [],
  author: "",
  replayBundleUrlJson: "",
  duration: 0,
  isDownloadable: false,
  isStreamable: true,
  version: "1.0"
};
const App = () => {
  const [formData, updateFormData] = React.useState(initialFormData);
  const [post, setPost] = React.useState(null);
  const closeAlert = (e) => {
    const parentDivAlertElement = e.target.parentElement.parentNode;
    parentDivAlertElement.style.display = 'none';
  }
  const handleChange = (e) => {
    if (e.target.name === 'imageUrl') {
      formData.images[0].url = e.target.value.trim();
    }
    if (e.target.name === 'imageType') {
      formData.images[0].type = e.target.value.trim();
    }
    if(e.target.name === 'imageTags') {
      const tagsList = e.target.value.split(' ');
      formData.tags = tagsList;
    }
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim()
    });

  };

  const handleSubmit = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim()
    });
    e.preventDefault();
    // Remove empty keys
    Object.keys(formData).forEach(key => {
      if (formData[key] === '') {
        delete formData[key];
      }
    });
    axios
      .post(config.baseURL, {
        ...formData
      })
      .then((response) => {
        setPost(response.data);
        if(response.data.success) {
          const successAlertElement = document.getElementById("successAlert");
          successAlertElement.style.display = 'inline';
        } else {
          const failureAlertElement = document.getElementById("failureAlert");
          failureAlertElement.style.display = 'inline';
        }
        
        console.log(post);
      });

  }; 
  return (
    <div className="App">
      <h1>
        Enter the Gametile details here:
      </h1>
      <div className="alert alert-success alert-dismissible fade show" role="alert" id="successAlert">
        Successfully added 1 entry. 
        <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={closeAlert}>
        <span aria-hidden="true">&times;</span>
        </button>
        </div>
      <div className="alert alert-danger alert-dismissible fade show" role="alert" id="failureAlert">
        Error! something went wrong. Nothing is added. 
        <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={closeAlert}>
          <span aria-hidden="true">&times;</span>
        </button>
        </div>
      <form className="App-header">
      <div className="form-group">
        <label htmlFor="formGroupCategory" className="  col-sm-2 colf-for-label label-col" >Category</label>
        <input type="text" name="category" id="formGroupCategory" placeholder="Category" onChange={handleChange} />
      </div>
      <div className="form-group">
        <label htmlFor="formGroupTitle" className="col-sm-2 colf-for-label label-col" >Title</label>
        <input type="text"  name="title" id="formGroupTitle" placeholder="Title" onChange={handleChange}/>
      </div>
      <div className="form-group">
        <label htmlFor="formGroupSubtitle" className="  col-sm-2 colf-for-label label-col">Subtitle</label>
        <input type="text"  name="subtitle" id="formGroupSubtitle" placeholder="Subtitle" onChange={handleChange}/>
      </div>
      <div className="form-group">
        <label htmlFor="formGroupDescription" className="  col-sm-2 colf-for-label label-col">Description</label>
        <input type="text"  name="description" id="formGroupDescription" placeholder="Description" onChange={handleChange}/>
      </div>
      <div className="form-group">
        <label htmlFor="formGroupReplay" className="  col-sm-2 colf-for-label label-col">ReplayBundleUrlJson</label>
        <input type="text"  name="replayBundleUrlJson" id="formGroupReplay" placeholder="ReplayBundleUrlJson" onChange={handleChange}/>
      </div>
      <div className="form-group">
        <label htmlFor="formGroupDuration" className="  col-sm-2 colf-for-label label-col">Duration</label>
        <input type="text"  name="duration" id="formGroupDuration" placeholder="Duration" onChange={handleChange}/>
      </div>
      <div className="form-group">
        <label htmlFor="formGroupDownload" className="  col-sm-2 colf-for-label label-col">IsDownloadable</label>
        <input type="text" name="isDownloadable" id="formGroupDownload" placeholder="True / False" onChange={handleChange}/>
      </div>
      <div className="form-group">
        <label htmlFor="formGroupAuthor" className="  col-sm-2 colf-for-label label-col">Author</label>
        <input type="text"  name="author" id="formGroupAuthor" placeholder="Author" onChange={handleChange}/>
      </div>
      <div className="form-group">
        <label htmlFor="formGroupImages" className="  col-sm-2 colf-for-label label-col">ImageType</label>
        <input type="text" name="imageType" id="formGroupImages" placeholder="1" onChange={handleChange}/>
      </div>
      <div className="form-group">
        <label htmlFor="formGroupImageURL" className="  col-sm-2 colf-for-label label-col">ImageUrl</label>
        <input type="text" name="imageUrl" id="formGroupImageURL" placeholder="url" onChange={handleChange}/>
      </div>
      <div className="form-group">
        <label htmlFor="formGroupTags" className="  col-sm-2 colf-for-label label-col">Tags</label>
        <input type="text" name="imageTags" id="formGroupTags" placeholder="Tags" onChange={handleChange}/>
      </div>
      <div className="form-group">
        <label htmlFor="formGroupStream" className="  col-sm-2 colf-for-label label-col">IsStreamable</label>
        <input type="text" name="isStreamable" id="formGroupStream" placeholder="True / False" onChange={handleChange}/>
      </div>
      <div className="form-group">
        <label htmlFor="formGroupVersion" className="  col-sm-2 colf-for-label label-col">Version</label>
        <input type="text" name="version" id="formGroupVersion" placeholder="Version" onChange={handleChange}/>
      </div>
      <button type="submit" onClick={handleSubmit} className="btn btn-primary submit-btn">Submit</button>
    </form>
    </div>
  );
}

export default App;
