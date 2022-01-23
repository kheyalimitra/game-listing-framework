import React from "react";
import axios from "axios";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


const baseURL = "http://localhost:8080/add-game";
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
    e.preventDefault()
    console.log(formData);
    axios
      .post(baseURL, {
        formData
      })
      .then((response) => {
        setPost(response.data);
      });
    console.log(post);
  }; 
  return (
    <div className="App">
      <h1>
        Enter the Gametile details here:
      </h1>
      <form className="App-header">
      <div class="form-group">
        <label for="formGroupCategory" class="form-group-label" >Category</label>
        <input type="text" name="category" id="formGroupCategory" placeholder="Category" onChange={handleChange} />
      </div>
      <div class="form-group">
        <label for="formGroupTitle" class="form-group-label" >Title</label>
        <input type="text"  name="title" id="formGroupTitle" placeholder="Title" onChange={handleChange}/>
      </div>
      <div class="form-group">
        <label for="formGroupSubtitle" class="form-group-label">Subtitle</label>
        <input type="text"  name="subtitle" id="formGroupSubtitle" placeholder="Subtitle" onChange={handleChange}/>
      </div>
      <div class="form-group">
        <label for="formGroupDescription" class="form-group-label">Description</label>
        <input type="text"  name="description" id="formGroupDescription" placeholder="Description" onChange={handleChange}/>
      </div>
      <div class="form-group">
        <label for="formGroupReplay" class="form-group-label">ReplayBundleUrlJson</label>
        <input type="text"  name="replayBundleUrlJson" id="formGroupReplay" placeholder="ReplayBundleUrlJson" onChange={handleChange}/>
      </div>
      <div class="form-group">
        <label for="formGroupDuration" class="form-group-label">Duration</label>
        <input type="text"  name="duration" id="formGroupDuration" placeholder="Duration" onChange={handleChange}/>
      </div>
      <div class="form-group">
        <label for="formGroupDownload" class="form-group-label">IsDownloadable</label>
        <input type="text" name="isDownloadable" id="formGroupDownload" placeholder="True / False" onChange={handleChange}/>
      </div>
      <div class="form-group">
        <label for="formGroupAuthor" class="form-group-label">Author</label>
        <input type="text"  name="author" id="formGroupAuthor" placeholder="Author" onChange={handleChange}/>
      </div>
      <div class="form-group" >
        <label for="formGroupImages" class="form-group-label">ImageType</label>
        <input type="text" name="imageType" id="formGroupImages" placeholder="1" onChange={handleChange}/>
      </div>
      <div class="form-group">
        <label for="formGroupImageURL" class="form-group-label">ImageUrl</label>
        <input type="text" name="imageUrl" id="formGroupImageURL" placeholder="url" onChange={handleChange}/>
      </div>
      <div class="form-group">
        <label for="formGroupTags" class="form-group-label">Tags</label>
        <input type="text" name="imageTags" id="formGroupTags" placeholder="Tags" onChange={handleChange}/>
      </div>
      <div class="form-group">
        <label for="formGroupStream" class="form-group-label">IsStreamable</label>
        <input type="text" name="isStreamable" id="formGroupStream" placeholder="True / False" onChange={handleChange}/>
      </div>
      <div class="form-group">
        <label for="formGroupVersion" class="form-group-label">Version</label>
        <input type="text" name="version" id="formGroupVersion" placeholder="Version" onChange={handleChange}/>
      </div>
      <button type="submit" onClick={handleSubmit} class="btn btn-primary">Submit</button>
    </form>
    </div>
  );
}

export default App;
