import React from "react";
import { EditFilled, DeleteFilled, PlusOutlined } from "@ant-design/icons";
import { Popconfirm } from "antd";

export default function ListOfNotes({
  submittedData,
  onEdit,
  onDelete,
  onAddBtnClick,
}) {
  var i = 1;
  return (
    <>
      <button className="button-new-note" onClick={onAddBtnClick}>
        <PlusOutlined /> New Note
      </button>
      <h1>List Of Notes</h1>
      {submittedData.length > 0 ? (
        <table className="neumorphic">
          <thead>
            <tr>
              <th>Id</th>
              <th>Title</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="table-text">
            {submittedData.map((entry, index) => (
              <tr key={index} className="fade-in">
                <td>{i++}</td>
                <td>{entry.title}</td>
                <td>{entry.description}</td>
                <td>
                  <div className="table-btn-container">
                    <button
                      className="edit-btn"
                      onClick={() => onEdit(entry.id)}
                    >
                      <EditFilled />
                    </button>
                    <Popconfirm
                      title="Delete the note"
                      description="Are you sure to delete this note?"
                      onConfirm={() => onDelete(entry.id)}
                      okText="Yes"
                      cancelText="No"
                      icon={
                        <DeleteFilled
                          style={{
                            color: 'red',
                          }}
                        />
                      }
                    >
                      <button className="delete-btn">
                        <DeleteFilled />
                      </button>
                    </Popconfirm>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h3>
          Click on (<PlusOutlined /> New Note ) to add new note.
        </h3>
      )}
    </>
  );
}
