function auth() {
  return {
    headers: { authorization: "bearer " + localStorage.getItem("token") },
  };
}
export default auth;
