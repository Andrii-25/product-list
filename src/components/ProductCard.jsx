import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductDataService from "../services/product.service";
import DeleteModal from "./DeleteModal";

function ProductCard() {
  //declaration state variable which is used to verify whether the data has already been obtained from api
  const [isLoading, setLoading] = useState(false);

  //declaration state variable that store all products
  const [products, setProducts] = useState({});

  //declaration state variable that store values for sorting product list
  const [sorting, setSorting] = useState("count");

  //function for get all products from api
  const getProducts = async () => {
    await ProductDataService.getAll()
      .then((response) => {
        setProducts(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  //function for remove product by id
  const remove = async (id) => {
    await ProductDataService.remove(id)
      .catch((e) => {
        console.log(e);
      })
      .then(() => {
        let updatedProducts = [...products].filter((i) => i.id !== id);
        setProducts(updatedProducts);
        window.location.reload();
      });
  };

  useEffect(async () => {
    await getProducts();
    setLoading(true);
  }, []);

  if (!isLoading) {
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

  //sorting products by count
  const productListByCount = products
    .sort((a, b) => {
      if (a.count > b.count) {
        return -1;
      }
      if (a.count < b.count) {
        return 1;
      }
      return 0;
    })
    .map((card) => {
      return (
        <div
          className="card mb-3 mx-auto m-5 border border-2 shadow"
          style={{ maxWidth: "800px" }}
          key={card.id}
        >
          <div className="row g-0">
            <div className="col-md-4">
              <img
                src={card.imageUrl}
                style={{ height: "300px", maxWidth: "270px" }}
                alt="..."
              ></img>
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">{card.name}</h5>
                <p
                  className="card-text text-truncate"
                  style={{
                    height: "150px",
                  }}
                >
                  {card.description}
                </p>
                <div className="col float-start mt-4 ms-2">
                  <span className="badge bg-info text-dark fs-6">
                    Count: {card.count}
                  </span>
                </div>
                <div className="col float-end ms-2">
                  <DeleteModal remove={() => remove(card.id)}></DeleteModal>
                </div>
                <Link to={`/products/${card.id}`}>
                  <button
                    type="button"
                    className="btn btn-outline-primary mt-3 float-end"
                  >
                    See more
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      );
    });

  //sorting products by name
  const productListByName = products
    .sort((a, b) => {
      if (a.name > b.name) {
        return -1;
      }
      if (a.name < b.name) {
        return 1;
      }
      return 0;
    })
    .map((card) => {
      return (
        <div
          className="card mb-3 mx-auto m-5 border border-2 shadow"
          style={{ maxWidth: "800px" }}
          key={card.id}
        >
          <div className="row g-0">
            <div className="col-md-4">
              <img
                src={card.imageUrl}
                style={{ height: "300px", maxWidth: "270px" }}
                alt="..."
              ></img>
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">{card.name}</h5>
                <p
                  className="card-text text-truncate"
                  style={{
                    height: "150px",
                  }}
                >
                  {card.description}
                </p>
                <div className="col float-start mt-4 ms-2">
                  <span className="badge bg-info text-dark fs-6">
                    Count: {card.count}
                  </span>
                </div>
                <div className="col float-end ms-2">
                  <DeleteModal remove={() => remove(card.id)}></DeleteModal>
                </div>
                <Link to={`/products/${card.id}`}>
                  <button
                    type="button"
                    className="btn btn-outline-primary mt-3 float-end"
                  >
                    See more
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      );
    });

  //sorting products conditions
  let productList = null;
  if (sorting === "name") {
    productList = productListByName;
  }
  if (sorting === "count") {
    productList = productListByCount;
  }

  return (
    <>
      <div className="container-fluid mb-5">
        <div className="dropdown float-end mt-2">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Sort
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li>
              <button
                className="dropdown-item"
                type="button"
                onClick={() => {
                  setSorting("count");
                }}
              >
                By count
              </button>
            </li>
            <li>
              <button
                className="dropdown-item"
                type="button"
                onClick={() => {
                  setSorting("name");
                }}
              >
                By name
              </button>
            </li>
          </ul>
        </div>
      </div>

      {productList}
    </>
  );
}
export default ProductCard;
