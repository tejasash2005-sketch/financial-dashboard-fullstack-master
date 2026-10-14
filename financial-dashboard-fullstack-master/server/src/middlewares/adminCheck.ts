import { Request, Response, NextFunction } from 'express'
import { ForbiddenError, UnauthorizedError } from '../helpers/apiError'
import { UserDocument } from '../models/User'

export default function adminCheck(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const user = req.user as UserDocument
  if (!user) {
    return next(new UnauthorizedError())
  }
  if (!user.isAdmin) {
    return next(new ForbiddenError('Admin access required'))
  }
  next()
}
