import Form from './Components/MyForm.jsx';
import Display from './Components/Display.jsx';
import React, { useState, useEffect } from 'react';
import { PlusOutlined } from '@ant-design/icons';

function getNextId(array){
    const lastId = array.length > 0 ? array[array.length - 1].id : 0;
   return lastId + 1;
}

function App() {

  const [submittedData, setSubmittedData] = useState(JSON.parse(localStorage.getItem('notes')));
   const [NewAddNote, setNewAddNote] = useState([]);
   
const onSaveBtnClick = (newEntry) => {
  let updatedData;
  if (newEntry.id) {
    updatedData = submittedData.map(entry =>
      (entry.id === newEntry.id) ? newEntry : entry
    );
  } else {
    const newEntryWithId = { id: getNextId(submittedData), ...newEntry };
    updatedData = [...submittedData, newEntryWithId];
  }
  setSubmittedData(updatedData);
};

 const onAddBtnClick = () => {
    setNewAddNote([...NewAddNote, { id: getNextId(NewAddNote)}]);
  };

  const onCloseBtnClick = (id) => {
      setNewAddNote(NewAddNote.filter(input => input.id !== id));
    };

 const onEditBtnClick = (id) => {
     const editDate = submittedData.find(entry => entry.id === id);
     const alreadyAdded = NewAddNote.find(entry => entry.editDate && entry.editDate.id === id);
     if (!alreadyAdded) {
       setNewAddNote([...NewAddNote, { id: getNextId(NewAddNote), editDate }]);
     }
  };

  const onDeleteBtnClick = (id) => {
    setSubmittedData(submittedData.filter(entry => entry.id !== id));
  };

useEffect(() => {
		localStorage.setItem('notes', JSON.stringify(submittedData));
	}, [submittedData]);

  return (
    <div>
     <div className="container">
      <div className="left-column">
      <button className="button-new-note" onClick={onAddBtnClick}><PlusOutlined /> New Note</button>
      <Display submittedData={submittedData} onEdit={onEditBtnClick} onDelete={onDeleteBtnClick} />
      </div>
      {NewAddNote.length>0 &&
      (<div className="right-column">
        {NewAddNote.map(input => (
        <div className="entry-effect">
        <Form submitForm={onSaveBtnClick} key={input.id} id={input.id} editDate={input.editDate} onRemove={onCloseBtnClick} />
        </div>
             ))}
      </div>)
      }
      </div>
    </div>
  );
}

export default App;
