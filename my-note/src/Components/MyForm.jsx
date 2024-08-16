
import React, { useState } from 'react';
import { CloseOutlined, SendOutlined } from '@ant-design/icons';


const Form = ({submitForm, id, editDate, onRemove}) => {
const [title, setTitle] = useState(editDate ? editDate.title : "");
const [description, setDescription] = useState(editDate ? editDate.description : "");

      const handleSubmit = (e) => {
         e.preventDefault();
         var newEntry = { title, description };
         if(editDate){
            newEntry={id: editDate.id, ...newEntry };
          }
         submitForm(newEntry);
         onRemove(id);
         setTitle('');
         setDescription('');
       };

    return (
     <div className="form-container">
        <h1>Add New Note</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="Title"
            />
            </label>
          </div>
          <div className="form-group">
            <label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              placeholder="Description"
            ></textarea>
            </label>
          </div>
          <div className="btn-container">
          <button type="button" onClick={()=>onRemove(id)} className="close-btn"><CloseOutlined /> Close</button>
          <button type="submit" className="submit-btn"><SendOutlined /> Save</button>
          </div>
        </form>
      </div>
  );
};

export default Form;
