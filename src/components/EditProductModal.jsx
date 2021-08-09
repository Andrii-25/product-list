import React from "react";
import EditProductForm from "./EditProductForm";

function EditProductModal(props) {
  return (
    <>
      <button
        type="button"
        className="btn btn-success"
        data-bs-toggle="modal"
        data-bs-target="#editModal"
        style={{width: "500px"}}
      >
        Edit
      </button>

      <div
        className="modal fade"
        id="editModal"
        tabindex="-1"
        aria-labelledby="editModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="editModalLabel">
                Edit Product
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <EditProductForm productId={props.productId}></EditProductForm>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditProductModal;
