const checkAuth = (req, res) => {
  const { userId, userLogin, userPrivilege } = req.session;

  if (userId || userLogin || userPrivilege) {
    res.json({
      user: {
        logged: true,
        name: userLogin,
        privilege: userPrivilege
      }
    });
  } else {
    res.json({
      user: {
        logged: false
      }
    });
  }
};

module.exports = checkAuth;
