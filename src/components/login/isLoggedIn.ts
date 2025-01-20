function isLoggedIn(): boolean {
  return !!localStorage.getItem("accessToken");
}

export default isLoggedIn;
