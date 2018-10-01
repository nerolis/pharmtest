export default function checkToken(req, res, next) {

  const validAPIKEY = 'superSecretToken';


  /**
   * @description ибо spa
   */
  if (req.path === '/') {
    return next();
  }

  if (req.get('authorization') === validAPIKEY) {
    return next();
  };

};
  