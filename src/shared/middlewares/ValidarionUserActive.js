const { verify } = require ('jsonwebtoken');

const authConfig = require ('../../config/auth')

const AppError = require ('../errors/AppError')

module.exports = function ensureAuthenticated(
  request,
  response,
  next,
) {
  const authHeader = request.headers.authorization;

  console.log(authHeader)

  if (!authHeader) {
    throw new AppError('JWT token is missing', 401);
  }


  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, authConfig.jwt.secret);

    const { funcionario_status } = decoded

    request.user = {
      funcionario_status
    };

    if(request.user.funcionario_status === 0){
        throw AppError('Usuario não ativo!')
    }

    return next();
  } catch {
    throw new AppError('Invalid JWT token', 401);
  }
}