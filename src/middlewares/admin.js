module.exports = {
  isAdmin(req, res, next) {
    try {
      const userAdmin = req.user;
      console.log(userAdmin);
      if (userAdmin.nivel !== 999 && req.user.acesso === 1) {
        return res.status(400).json({ error: 'usuario não possui permissão' });
      }
      next();
    } catch (error) {
      return res.status(401).json({
        error: 'você não possui autorização para realizar esta operação',
      });
    }
  },
};
