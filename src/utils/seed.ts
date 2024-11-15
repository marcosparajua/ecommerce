import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Clothes } from '../models/clothes.js';
import { User } from '../models/user.js';

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string, {});
    console.log('MongoDB connected for seeding');

    await Clothes.deleteMany({});
    await User.deleteMany({});

    const clothes_sample = [
      {
        id: 1,
        name: 'Steroid Derby',
        price: 15.99,
        description: 'Balenciaga low cut steroids',
        image: './assets/steroid.jpg',
        category: 'Shoes',
        quantity: 10,
        size: 'M',
        color: 'Black',
        rating: 4.5,
        favorite: false,
        tags: ['all', 'shoes'],
      },
      {
        id: 2,
        name: 'Ink dripped sole boots',
        price: 15.99,
        description: 'Carol Christian Poell ink dripped sole boots',
        image: './assets/inkDrip.webp',
        category: 'Shoes',
        quantity: 10,
        size: 'M',
        color: 'Black',
        rating: 4.5,
        favorite: true,
        tags: ['all', 'boots', 'shoes'],
      },
      {
        id: 3,
        name: 'Platform Sneakers',
        price: 15.99,
        description: 'Platform sneakers by Balenciaga',
        image: './assets/platform.avif',
        category: 'Shoes',
        quantity: 10,
        size: 'M',
        color: 'White, Black, Red',
        rating: 4.5,
        favorite: false,
        tags: ['all', 'shoes'],
      },
      {
        id: 4,
        name: 'Destroyed Jeans',
        price: 15.99,
        description: 'destroyed jeans by Balenciaga',
        image: './assets/destroyed.jpg',
        category: 'Pants',
        quantity: 10,
        size: 'M',
        color: 'Blue',
        rating: 4.5,
        favorite: true,
        tags: ['all', 'pants'],
      },
      {
        id: 5,
        name: 'Amber Snow Boots',
        price: 15.99,
        description: 'Amber snow boots by Rick Owens',
        image: './assets/snowBoot.webp',
        category: 'Shoes',
        quantity: 10,
        size: 'M',
        color: 'Black',
        rating: 4.5,
        favorite: true,
        tags: ['all', 'boots', 'shoes'],
      },
      {
        id: 6,
        name: 'Disparate Gloves',
        price: 15.99,
        description: 'Disparate Gloves by Carol Christian Poell',
        image: './assets/gloves.jpg',
        category: 'Gloves',
        quantity: 10,
        size: 'M',
        color: 'Black',
        rating: 4.5,
        favorite: true,
        tags: ['all', 'gloves'],
      },
    ];

    await Clothes.insertMany(clothes_sample);
    console.log('Clothes seeded');

    const sample_users = [
      {
        name: 'John Doe',
        email: 'johndoe@sample.com',
        password: '123456',
        isAdmin: true,
      },
      {
        name: 'Jane Doe',
        email: 'janedoe@sample.com',
        password: '123456',
        isAdmin: false,
      },
    ];

    for (const user of sample_users) {
      const newUser = new User(user);
      await newUser.save();
    }
    console.log('Users seeded');

    mongoose.connection.close();
    console.log('Seeding completed');
  } catch (error) {
    console.error('Seeding error:', error);
    mongoose.connection.close();
  }
};

seedData();
