import { Router } from 'express'
import passport from 'passport'
import adminCheck from '../middlewares/adminCheck'

import {
  createUser,
  findUsers,
  findUserById,
  updateUser,
  deleteUser,
  findUserByUserName,
  addInvestmentToUser,
  addIncomeToUser,
  addExpenseToUser,
  addImageToUser,
} from '../controllers/userController'

const router = Router()

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  adminCheck,
  findUsers
)
router.post('/', createUser)
router.get(
  '/:userId',
  passport.authenticate('jwt', { session: false }),
  findUserById
)
router.get(
  '/:username',
  passport.authenticate('jwt', { session: false }),
  findUserByUserName
)
router.put(
  '/:userId',
  passport.authenticate('jwt', { session: false }),
  updateUser
)

router.delete(
  '/:userId',
  passport.authenticate('jwt', { session: false }),
  deleteUser
)

router.patch('/addInvestment/:userId/:investmentId', addInvestmentToUser)
router.patch('/addIncome/:userId/:incomeId', addIncomeToUser)
router.patch('/addExpense/:userId/:expenseId', addExpenseToUser)
router.patch('/addImage/:userId/:imageId', addImageToUser)

export default router
