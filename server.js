const { db, syncAndSeed, User } = require('./db/index.js');
console.log('***',User)
const express = require('express');

const app = express();

app.get('/users', async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.send(users);
  }
  catch (error) {
    next(error)
  }
})
const init = async () => {
  try {
    // await db.authenticate(); // will confirm that we're connected to the db
    await syncAndSeed();
    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`app listening on port ${por}`))}
  catch(e) {
    console.log(e)
  }
}
init();
