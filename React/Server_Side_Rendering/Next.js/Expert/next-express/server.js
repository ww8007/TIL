const express = require('express');
const server = express();
server.use(express.static('/out'));
server.listen(3000, (err) => {
  if (err) throw err;
});
