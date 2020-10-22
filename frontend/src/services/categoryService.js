import Api from "./Api";

class CategoryDataService {

  getAll() {
    return Api.get("/categories");
  }

  get(id) {
    return Api.get(`/categories/${id}`);
  }

  create(data) {
    return Api.post("/categories", data);
  }

  update(id, data) {
    return Api.put(`/categories/${id}`, data);
  }

  delete(id) {
    return Api.delete(`/categories/${id}`);
  }

  /* findByTitle(title) {
    return Api.get(`/categories?title=${title}`);
  } */
}

export default new CategoryDataService();