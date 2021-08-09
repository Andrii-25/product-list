import http from "../http-common";

//get all products from api
const getAll = () => {
  return http.get("/products");
};

//get one product by id
const get = (id) => {
  return http.get(`/products/${id}`);
};

//create new product
const create = (data) => {
  return http.post("/products", data);
};

//update product by id
const update = (id, data) => {
  return http.put(`/products/${id}`, data);
};

//remove product by id
const remove = (id) => {
  return http.delete(`/products/${id}`);
};

//add new comment
const addComment = (id, data) => {
  return http.patch(`/products/${id}`, data);
};

const productService = {
  getAll,
  get,
  create,
  update,
  remove,
  addComment
};

export default productService;
