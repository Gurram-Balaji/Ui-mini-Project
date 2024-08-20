import Form from "./Components/Form/MyForm.jsx";
import ListOfNotes from "./Components/ListOfNotes/ListOfNots.jsx";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function getNextId(array) {
  const lastId = array.length > 0 ? array[array.length - 1].id : 0;
  return lastId + 1;
}

function errorToast() {
  toast.error("Something Went Wrong..!", {
    position: "bottom-left",
    autoClose: 10000,
  });
}

function successToast(Message) {
  toast.success(Message, { position: "top-center", autoClose: 3000 });
}

function App() {
  const [submittedData, setSubmittedData] = useState(
    JSON.parse(localStorage.getItem("notes"))
  );
  const [NewAddNote, setNewAddNote] = useState([]);

  const onSaveBtnClick = (newEntry) => {
    let updatedData, Message;
    try {
      if (newEntry.id) {
        updatedData = submittedData.map((entry) =>
          entry.id === newEntry.id ? newEntry : entry
        );
        Message = "Note Updated Successfully.";
      } else {
        const newEntryWithId = { id: getNextId(submittedData), ...newEntry };
        updatedData = [...submittedData, newEntryWithId];
        Message = "New Note Added Successfully.";
      }
      setSubmittedData(updatedData);
      successToast(Message);
    } catch (e) {
      errorToast();
    }
  };

  const onAddBtnClick = () => {
    setNewAddNote([...NewAddNote, { id: getNextId(NewAddNote) }]);
  };

  const onCloseBtnClick = (id) => {
    setNewAddNote(NewAddNote.filter((input) => input.id !== id));
  };

  const onEditBtnClick = (id) => {
    try {
      const editDate = submittedData.find((entry) => entry.id === id);
      const alreadyAdded = NewAddNote.find(
        (entry) => entry.editDate && entry.editDate.id === id
      );
      if (!alreadyAdded) {
        setNewAddNote([...NewAddNote, { id: getNextId(NewAddNote), editDate }]);
      }
    } catch (e) {
      errorToast();
    }
  };

  const onDeleteBtnClick = (id) => {
    try {
      setSubmittedData(submittedData.filter((entry) => entry.id !== id));
      successToast("Note Deleted Successfully.");
    } catch (e) {
      errorToast();
    }
  };

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(submittedData));
  }, [submittedData]);

  return (
    <div className="container">
      <div className="left-column">
        <ListOfNotes
          submittedData={submittedData}
          onEdit={onEditBtnClick}
          onDelete={onDeleteBtnClick}
          onAddBtnClick={onAddBtnClick}
        />
      </div>
      {NewAddNote.length > 0 && (
        <div className="right-column">
          {NewAddNote.map((input) => (
            <div className="entry-effect" key={input.id}>
              <Form
                submitForm={onSaveBtnClick}
                id={input.id}
                editDate={input.editDate}
                onRemove={onCloseBtnClick}
              />
            </div>
          ))}
        </div>
      )}
      <ToastContainer />
    </div>
  );
}

export default App;
