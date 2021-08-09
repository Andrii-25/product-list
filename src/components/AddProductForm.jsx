import React, { useState } from "react";
import ProductDataService from "../services/product.service";

function AddProductForm() {
  //initial product errors state
  const initialProductError = {
    imageUrlError: "",
    nameError: "",
    colorError: "",
    descriptionError: "",
    countError: "",
    widthError: "",
    heightError: "",
    weightError: "",
  };

  //declaration state variable for product
  const [product, setProduct] = useState({});

  //declaration state variable for width value
  const [width, setWidth] = useState(null);

  //declaration state variable for height value
  const [height, setHeight] = useState(null);

  //declaration state variable for inputs errors
  const [productError, setProductError] = useState({ initialProductError });

  //add new product function
  const addProduct = async (data) => {
    await ProductDataService.create(data).catch((e) => {
      console.log(e);
    });
  };

  //validation inputs function
  function validate() {
    let imageUrlError = "";
    let nameError = "";
    let colorError = "";
    let descriptionError = "";
    let countError = "";
    let widthError = "";
    let heightError = "";
    let weightError = "";
    let reg = /^[0-9]*$/;

    if (!product.imageUrl) {
      imageUrlError = "ImageURL cannot be blank!";
    }

    if (!product.name) {
      nameError = "Name cannot be blank!";
    }

    if (!product.color) {
      colorError = "Color cannot be blank!";
    }

    if (!product.description) {
      descriptionError = "Description cannot be blank!";
    }

    if (!product.count || !reg.test(product.count)) {
      countError = "Count cannot be blank and must contain only numbers!";
    }

    if (!width || !reg.test(width)) {
      widthError = "Width cannot be blank and must contain only numbers!";
    }

    if (!height || !reg.test(height)) {
      heightError = "Height cannot be blank and must contain only numbers!";
    }

    if (!product.weight) {
      weightError = "Weight cannot be blank!";
    }

    if (
      imageUrlError ||
      nameError ||
      colorError ||
      countError ||
      widthError ||
      heightError ||
      weightError ||
      descriptionError
    ) {
      setProductError({
        imageUrlError,
        nameError,
        colorError,
        countError,
        widthError,
        heightError,
        weightError,
        descriptionError,
      });
      return false;
    }
    return true;
  }

  function handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let item = { ...product, comments: [] };
    item[name] = value;
    setProduct(item);
    setProductError(initialProductError);
  }

  function handleChangeWidth(event) {
    const target = event.target;
    const value = target.value;
    setWidth(value);
    setProductError(initialProductError);
  }

  function handleChangeHeight(event) {
    const target = event.target;
    const value = target.value;
    setHeight(value);
    setProductError(initialProductError);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const isValid = validate();

    if (isValid) {
      const widthSrt = "width";
      const heightStr = "height";
      const sizeStr = "size";
      const sizeObj = {
        [sizeStr]: {
          [widthSrt]: width,
          [heightStr]: height,
        },
      };
      const data = Object.assign(product, sizeObj);
      await addProduct(data);
      setProductError(initialProductError);
      window.location.reload();
    }
  }
  return (
    <>
      <form className="row g-3 m-5" onSubmit={handleSubmit}>
        <div className="col-md-6">
          <label htmlFor="inputName" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            name="name"
            onChange={handleChange}
          ></input>
          <div
            style={{
              fontSize: "12px",
              color: "red",
              marginBottom: "10px",
            }}
          >
            {productError.nameError}
          </div>
        </div>
        <div className="col-md-6">
          <label htmlFor="inputURL" className="form-label">
            Image URL
          </label>
          <input
            type="text"
            className="form-control"
            name="imageUrl"
            onChange={handleChange}
          ></input>
          <div
            style={{
              fontSize: "12px",
              color: "red",
              marginBottom: "10px",
            }}
          >
            {productError.imageUrlError}
          </div>
        </div>
        <div className="col-12">
          <label htmlFor="inputHeight" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            type="text"
            name="description"
            onChange={handleChange}
          ></textarea>
          <div
            style={{
              fontSize: "12px",
              color: "red",
              marginBottom: "10px",
            }}
          >
            {productError.descriptionError}
          </div>
        </div>
        <div className="col-12">
          <label htmlFor="inputColor" className="form-label">
            Color
          </label>
          <input
            type="text"
            className="form-control"
            name="color"
            onChange={handleChange}
          ></input>
          <div
            style={{
              fontSize: "12px",
              color: "red",
              marginBottom: "10px",
            }}
          >
            {productError.colorError}
          </div>
        </div>
        <div className="col-12">
          <label htmlFor="inputCount" className="form-label">
            Count
          </label>
          <input
            type="text"
            className="form-control"
            name="count"
            onChange={handleChange}
          ></input>
          <div
            style={{
              fontSize: "12px",
              color: "red",
              marginBottom: "10px",
            }}
          >
            {productError.countError}
          </div>
        </div>
        <div className="col-12">
          <label htmlFor="inputWeight" className="form-label">
            Weight
          </label>
          <input
            type="text"
            className="form-control"
            name="weight"
            onChange={handleChange}
          ></input>
          <div
            style={{
              fontSize: "12px",
              color: "red",
              marginBottom: "10px",
            }}
          >
            {productError.weightError}
          </div>
        </div>
        <div className="col-md-6">
          <label htmlFor="inputWidth" className="form-label">
            Width
          </label>
          <input
            type="text"
            className="form-control"
            name="width"
            onChange={handleChangeWidth}
          ></input>
          <div
            style={{
              fontSize: "12px",
              color: "red",
              marginBottom: "10px",
            }}
          >
            {productError.widthError}
          </div>
        </div>
        <div className="col-md-6">
          <label htmlFor="inputHeight" className="form-label">
            Height
          </label>
          <input
            type="text"
            className="form-control"
            name="height"
            onChange={handleChangeHeight}
          ></input>
          <div
            style={{
              fontSize: "12px",
              color: "red",
              marginBottom: "10px",
            }}
          >
            {productError.heightError}
          </div>
        </div>
        <button type="submit" className="btn btn-success">
          Submit
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          data-bs-dismiss="modal"
        >
          Close
        </button>
      </form>
    </>
  );
}

export default AddProductForm;
