/* Trying out callbacks */
var getUser = (id, callback) => {
  var user = {
    id: id,
    name: 'Vikram'
  };
  /* Simulating a delay before passing the data as callback */
  setTimeout(() => {
    callback(user);
  }, 3000)
};

getUser(31, (user) => {
  console.log(user);
});