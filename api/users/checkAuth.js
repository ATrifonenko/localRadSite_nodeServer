const checkAuth = (req, res) => {
  const { userId, userName, userPrivilege } = req.session;

  if (userId || userName || userPrivilege) {
    res.json({
      user: {
        logged: true,
        name: userName,
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
