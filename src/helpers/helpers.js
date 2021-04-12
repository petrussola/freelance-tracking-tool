export const handleDisplayMessage = (message, cb) => {
  cb(message);
  return setTimeout(() => {
    cb("");
  }, 3000);
};
