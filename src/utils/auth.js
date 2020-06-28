import storage from 'jt-storage'
import qs from 'query-string'

const USER = "user";
const TOKEN = "token";

export default {
  getSchoolId() {
    const { schoolId } = qs.parse(window.location.search);
    return schoolId;
  },

  get() {
    return {
      [USER]: storage.get(`${USER}:${this.getSchoolId()}`),
      [TOKEN]: storage.get(`${TOKEN}:${this.getSchoolId()}`)
    };
  },

  login({ schoolId, user, token }) {
    storage.set(`${USER}:${schoolId}`, user);
    storage.set(`${TOKEN}:${schoolId}`, `Bearer ${token}`);
  },

  logout() {
    storage.remove(`${USER}:${this.getSchoolId()}`);
    storage.remove(`${TOKEN}:${this.getSchoolId()}`);
  },

  loggedIn() {
    return (
      !!storage.get(`${USER}:${this.getSchoolId()}`) &&
      !!storage.get(`${TOKEN}:${this.getSchoolId()}`)
    );
  },

  getHeaders() {
    return { Authorization: this.get()[TOKEN] };
  }
};
