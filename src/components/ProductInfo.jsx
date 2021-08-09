import React, { useEffect, useState } from "react";
import ProductDataService from "../services/product.service";
import EditProductModal from "./EditProductModal";
import DeleteModal from "./DeleteModal";

function ProductInfo(props) {
  const initialDescriptionError = {
    error: "",
  };

  //declaration state variable that store all products
  const [product, setProduct] = useState({});

  //declaration state variable that store all comments
  const [comments, setComments] = useState([]);

  //declaration state variable which is used to verify whether the data has already been obtained from api
  const [loaded, setLoaded] = useState(false);

  //declaration state variable that store one comment
  const [comment, setComment] = useState({});

  //declaration state variable that store input errors
  const [descriptionError, setDescriptionError] = useState({
    initialDescriptionError,
  });

  //validate input function
  function validate() {
    let error = "";

    if (!comment.description) {
      error = "Comment cannot be blank!";
    }

    if (error) {
      setDescriptionError({
        error,
      });
      return false;
    }
    return true;
  }

  //function to get product by id
  const getProduct = async (id) => {
    await ProductDataService.get(id)
      .then((response) => {
        setProduct(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  //function to add comment for product
  const addComment = async (id, data) => {
    await ProductDataService.addComment(id, data).catch((e) => {
      console.log(e);
    });
  };

  //function to convert date
  const dateBuilder = (d) => {
    let date = new Date(d);
    let time = date.toLocaleTimeString();
    let localDate = date.toLocaleDateString();
    return time.substr(0, 5) + " " + localDate;
  };

  useEffect(async () => {
    await getProduct(props.match.params.id);
    setLoaded(true);
    setComments(...[product.comments]);
    console.log(comments);
  }, []);

  function handleChange(event) {
    const target = event.target;
    const value = target.value;
    const productIdStr = "productId";
    const descriptionStr = "description";
    const dateStr = "date";
    setComment({
      [productIdStr]: props.match.params.id,
      [descriptionStr]: value,
      [dateStr]: dateBuilder(Date.now()),
    });
    console.log(comment);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const isValid = validate();

    if (isValid) {
      product.comments.push(comment);
      const updatedComments = product.comments;
      const commentsStr = "comments";

      const newComments = {
        [commentsStr]: updatedComments,
      };

      const updatedProduct = { ...product, ...newComments };
      console.log(updatedProduct);

      await addComment(props.match.params.id, updatedProduct);
      window.location.reload();
    }
  }

  const removeComment = async (commentDate) => {
    const cm = product.comments;
    const index = cm.findIndex((v) => v.date === commentDate);

    cm.splice(index, 1);

    console.log(cm);

    const commentsStr = "comments";

    const newComments = {
      [commentsStr]: cm,
    };

    const pr = { ...product, ...newComments };

    await addComment(props.match.params.id, pr);
    window.location.reload();
  };

  if (!loaded) {
    return (
      <div className="d-flex justify-content-center">
        <div
          className="spinner-border text-dark"
          style={{ marginTop: "300px" }}
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="container-md mt-5">
        <div className="row">
          <div className="col">
            <img
              src={product.imageUrl}
              className="img-thumbnail"
              alt="product"
            ></img>
          </div>
          <div className="col">
            <h1>{product.name}</h1>
            <p className="lead">{product.description}</p>
          </div>
        </div>
      </div>

      <div className="container-fluid mt-5">
        <h2 className="text-center">Properties</h2>
      </div>

      <div
        className="container-lg mb-3 border border-2"
        style={{ height: "1px" }}
      ></div>

      <div className="container-fluid" style={{ background: "#aab5ae" }}>
        <div className="container-sm">
          <div className="row row-cols-2">
            <div className="col">
              <p className="fs-3 text-center">Count:</p>
            </div>
            <div className="col">
              <p className="fs-3 text-center">{product.count}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid" style={{ background: "#dfe8e2" }}>
        <div className="container-sm">
          <div className="row row-cols-2">
            <div className="col">
              <p className="fs-3 text-center">Color:</p>
            </div>
            <div className="col">
              <p className="fs-3 text-center">Green</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid" style={{ background: "#aab5ae" }}>
        <div className="container-sm">
          <div className="row row-cols-2">
            <div className="col">
              <p className="fs-3 text-center">Width:</p>
            </div>
            <div className="col">
              <p className="fs-3 text-center">{product.size.width}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid" style={{ background: "#dfe8e2" }}>
        <div className="container-sm">
          <div className="row row-cols-2">
            <div className="col">
              <p className="fs-3 text-center">Height:</p>
            </div>
            <div className="col">
              <p className="fs-3 text-center">{product.size.height}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid" style={{ background: "#aab5ae" }}>
        <div className="container-sm">
          <div className="row row-cols-2">
            <div className="col">
              <p className="fs-3 text-center">Weight:</p>
            </div>
            <div className="col">
              <p className="fs-3 text-center">{product.weight}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid mt-3 text-center">
        <EditProductModal productId={props.match.params.id}></EditProductModal>
      </div>

      <div className="container-fluid mt-5">
        <h1 className="text-center">Comments</h1>
      </div>

      <div
        className="container-lg border border-2"
        style={{ height: "1px" }}
      ></div>

      <div className="container-sm">
        <form onSubmit={handleSubmit}>
          <label for="inputHeight" className="form-label mt-5">
            Add Comment
          </label>
          <textarea
            className="form-control mb-2"
            type="text"
            name="description"
            onChange={handleChange}
            // value=""
          ></textarea>
          <div
            style={{
              fontSize: "12px",
              color: "red",
              marginBottom: "10px",
            }}
          >
            {descriptionError.error}
          </div>
          <button className="btn btn-primary" type="submit">
            Submit
          </button>
        </form>
      </div>

      {product.comments ? (
        product.comments.map((comment) => {
          return (
            <div className="card mt-5 mb-5 w-75 mx-auto" key={comment.id}>
              <div className="card-header">{dateBuilder(comment.date)}</div>
              <div className="card-body">
                <blockquote className="blockquote mb-0">
                  <p>{comment.description}</p>
                  <div className="container-fluid mt-5">
                    <DeleteModal
                      remove={() => removeComment(comment.date)}
                    ></DeleteModal>
                  </div>
                </blockquote>
              </div>
            </div>
          );
        })
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}

export default ProductInfo;
