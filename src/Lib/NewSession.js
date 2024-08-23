const newSession = () => {
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("isAuthenticated");
};

export { newSession };
