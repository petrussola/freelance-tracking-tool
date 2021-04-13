export const handleDisplayMessage = (message, cb) => {
  cb(message);
  return setTimeout(() => {
    cb("");
  }, 3000);
};

export const resetTask = (message, cbs) => {
  return cbs.forEach((cb) => cb(message));
};
