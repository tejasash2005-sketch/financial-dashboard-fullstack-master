import mongoose from 'mongoose'
import dotenv from 'dotenv'
import bcryptjs from 'bcryptjs'
import User from './models/User'
import Income from './models/Income'
import Expense from './models/Expense'
import Budget from './models/Budget'
import Investment from './models/Investment'

dotenv.config({ path: '.env' })

const mongoUri = process.env.MONGODB_URI!

const seedData = async () => {
  try {
    console.log('Connecting to MongoDB...')
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log('Connected!')

    // 1. Clear existing data for the test user
    const testEmail = 'yaot@test.io'
    const testUsername = 'TestUser'
    const existingUser = await User.findOne({
      $or: [{ email: testEmail }, { username: testUsername }]
    })
    if (existingUser) {
      console.log('Cleaning up old test data...')
      await Income.deleteMany({ _id: { $in: existingUser.income } })
      await Expense.deleteMany({ _id: { $in: existingUser.expense } })
      await Budget.deleteMany({ _id: { $in: existingUser.budget } })
      await Investment.deleteMany({ _id: { $in: existingUser.investments } })
      await User.deleteOne({ _id: existingUser._id })
    }

    // Helper for dates
    const getPastDate = (monthsAgo: number) => {
      const d = new Date();
      d.setMonth(d.getMonth() - monthsAgo);
      return d;
    };

    // 2. Create Dummy Incomes
    const incomes = await Income.insertMany([
      { name: 'Monthly Salary', amount: 4500, date: getPastDate(0), tag: 'Salary', comments: 'Main income source' },
      { name: 'Monthly Salary', amount: 4500, date: getPastDate(1), tag: 'Salary', comments: 'Last month salary' },
      { name: 'Monthly Salary', amount: 4500, date: getPastDate(2), tag: 'Salary', comments: 'Old salary' },
      { name: 'Freelance Project', amount: 800, date: getPastDate(0), tag: 'Side Hustle', comments: 'Web dev work' },
      { name: 'Dividends', amount: 150, date: getPastDate(1), tag: 'Investments', comments: 'Quarterly payout' }
    ])

    // 3. Create Dummy Expenses
    const expenses = await Expense.insertMany([
      { name: 'Rent', amount: 1200, date: getPastDate(0), tag: 'Housing', comments: 'City apartment' },
      { name: 'Rent', amount: 1200, date: getPastDate(1), tag: 'Housing', comments: 'City apartment' },
      { name: 'Rent', amount: 1200, date: getPastDate(2), tag: 'Housing', comments: 'City apartment' },
      { name: 'Groceries', amount: 400, date: getPastDate(0), tag: 'Food', comments: 'Weekly shop' },
      { name: 'Groceries', amount: 350, date: getPastDate(1), tag: 'Food', comments: 'Weekly shop' },
      { name: 'Netflix', amount: 15, date: getPastDate(0), tag: 'Entertainment', comments: 'Subscription' },
      { name: 'Gym Membership', amount: 50, date: getPastDate(1), tag: 'Health', comments: 'Monthly fee' },
    ])

    // 4. Create Dummy Budgets
    const budgets = await Budget.insertMany([
      { title: 'Food & Groceries', budget: 500, tag: 'Food', comments: 'Monthly limit' },
      { title: 'Entertainment', budget: 200, tag: 'Fun', comments: 'Movies, games, etc' },
      { title: 'Travel Fund', budget: 1000, tag: 'Savings', comments: 'Vacation savings' }
    ])

    // 5. Create Dummy Investments
    const investments = await Investment.insertMany([
      {
        name: 'S&P 500 ETF',
        category: 'Stocks',
        transactionType: 'Buy',
        amount: 5000,
        quantity: 12,
        price: [{ priceBought: 415, priceSold: 0 }],
        totalValue: 5000,
        currency: 'USD',
        date: [{ dateBought: new Date() }],
        comments: 'Long term hold'
      },
      {
        name: 'Bitcoin',
        category: 'Crypto',
        transactionType: 'Buy',
        amount: 2500,
        quantity: 0.05,
        price: [{ priceBought: 50000, priceSold: 0 }],
        totalValue: 2500,
        currency: 'Bitcoin',
        date: [{ dateBought: new Date() }],
        comments: 'Digital gold'
      }
    ])

    // 6. Create the User
    const salt = await bcryptjs.genSalt(10)
    const hashedPassword = await bcryptjs.hash('test1234', salt)

    const newUser = new User({
      username: 'TestUser',
      email: testEmail,
      password: hashedPassword,
      firstName: 'Test',
      lastName: 'User',
      isAdmin: true,
      income: incomes.map(i => i._id),
      expense: expenses.map(e => e._id),
      budget: budgets.map(b => b._id),
      investments: investments.map(i => i._id)
    })

    await newUser.save()
    console.log('==========================================')
    console.log('SUCCESS: Realistic dummy data seeded!')
    console.log('User Email: yaot@test.io')
    console.log('User Password: test1234')
    console.log('==========================================')

    process.exit(0)
  } catch (error) {
    console.error('Error seeding data:', error)
    process.exit(1)
  }
}

seedData()
