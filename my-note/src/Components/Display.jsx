import React from 'react';
import { EditFilled, DeleteFilled } from '@ant-design/icons';

export default function Display({ submittedData, onEdit, onDelete }) {
    var i=1;
  return (
    <>
      <h1>Submitted Data</h1>
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
            {
                submittedData.map((entry, index) => (
              <tr key={index} className="fade-in">
                <td >{i++}</td>
                <td>{entry.title}</td>
                <td>{entry.description}</td>
                <td>
                    <div className="table-btn-container">
                  <button className="edit-btn" onClick={() => onEdit(entry.id)}><EditFilled /></button>
                  <button className="delete-btn" onClick={() => onDelete(entry.id)}><DeleteFilled /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No data submitted yet.</p>
      )}
    </>
  );
}
