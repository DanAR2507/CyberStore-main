import mongoose from 'mongoose';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import Product from './models/productModel.js';
import Order from './models/orderModel.js';
import User from './models/userModel.js';
import users from './data/users.js';
import products from './data/products.js';

dotenv.config();
connectDB();

const importData = async () => {
  try {
    console.log('Удаление данных...');
    await User.deleteMany();
    await Product.deleteMany();
    await Order.deleteMany();
    console.log('Удаление данных завершено.');

    console.log('Вставка данных пользователей...');
    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;

    console.log('Вставка данных продуктов...');
    const sampleProducts = products.map((product) => ({ ...product, user: adminUser }));
    await Product.insertMany(sampleProducts);
    console.log('Вставка данных продуктов завершена.');

    console.log('Данные успешно импортированы!');
    process.exit();
  } catch (error) {
    console.error(`Ошибка импорта данных: ${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    console.log('Удаление данных...');
    await User.deleteMany();
    await Product.deleteMany();
    await Order.deleteMany();
    console.log('Данные успешно удалены!');
    process.exit();
  } catch (error) {
    console.error(`Ошибка удаления данных: ${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}