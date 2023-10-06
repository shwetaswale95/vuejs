import http from "../http-common";

class TutorialDataService {
  getAll() {
    return http.get("/customers");
  }

  get(id) {
    return http.get(`/customers/${id}`);
  }

  create(data) {
    return http.post("/customers", data);
  }

  update(id, data) {
    return http.put(`/customers/${id}`, data);
  }

  delete(id) {
    return http.delete(`/customers/${id}`);
  }

  addProduct(products) {
    const headers = {
      "Content-Type": `application/x-www-form-urlencoded`,
      Authorization: `Bearer sk_test_51MSFMaSIDUaT83RH4vnhsd912OjOTu0H24F7JeBJocmKGdFZSonVLag0uxO25rPnAnICc1jNkNP2Eb9Io2U4bSHz00hQv8daDj`,
    };
    return http.post(`https://dashboard.stripe.com/v1/products`, products, {
      headers: headers,
    });
  }
  getProduct() {
    const headers = {
      "Content-Type": `application/x-www-form-urlencoded`,
      Authorization: `Bearer sk_test_51MSFMaSIDUaT83RH4vnhsd912OjOTu0H24F7JeBJocmKGdFZSonVLag0uxO25rPnAnICc1jNkNP2Eb9Io2U4bSHz00hQv8daDj`,
    };
    return http.get(`https://dashboard.stripe.com/v1/products`, {
      headers: headers,
    });
  }
}
export default new TutorialDataService();
