const logout = (req, res) => {
  if (req.session) {
    req.session.destroy(() => {
      res.json({
        user: {
          logged: false
        }
      });
    });
  } else {
    res.send("бульк-бульк");
  }
};

module.exports = logout;
