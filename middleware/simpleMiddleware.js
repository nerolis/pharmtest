export default function checkToken(req, res, next) {

  const validAPIKEY = 'superSecretToken';


  /**
   * @description test token
   */
  if (req.path === '/' || req.path === '/shop/niko-opt') {
    return next();
  }

  if (req.get('authorization') === validAPIKEY) {
    return next();
  };

};
  