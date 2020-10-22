import Api from "./Api";

class FilmDataService {

  getAll() {
    return Api.get("/films");
  }

  get(id) {
    return Api.get(`/films/${id}`);
  }

  create(data) {
    return Api.post("/films", data);
  }

  update(id, data) {
    return Api.put(`/films/${id}`, data);
  }

  delete(id) {
    return Api.delete(`/films/${id}`);
  }

  /* findByTitle(title) {
    return Api.get(`/films?title=${title}`);
  } */
}

export default new FilmDataService();