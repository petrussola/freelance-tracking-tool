export const handleDisplayMessage = (message, cb) => {
  if (!message) {
    cb("Server is not responding. Contact administrator.");
  } else {
    cb(message);
  }
  return setTimeout(() => {
    cb("");
  }, 3000);
};

export const resetTask = (message, cbs) => {
  return cbs.forEach((cb) => cb(message));
};
