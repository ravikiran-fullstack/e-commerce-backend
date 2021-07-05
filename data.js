import bcrypt from "bcryptjs";
import {v4 as uuidv4} from 'uuid';

const data = {
  users: [
    {
      name: "ravikiran",
      email: "ravikiran@gmail.com",
      password: bcrypt.hashSync("123", 8),
      isAdmin: true,
    },
    {
      name: "mowgli",
      email: "mowgli@bowbow.com",
      password: bcrypt.hashSync("bow", 8),
      isAdmin: false,
    },
  ],
  products: [
    {
      name: "Nike Slim Shirt",
      companyName: "Nike",
      category: "Shirts",
      image: "/images/p1.jpg",
      availableColors: [],
      price: 120,
      countInStock: 19,
      brand: "Nike",
      ratings: 1,
      numReviews: 10,
      description: "High Quality Products",
      featured: true,
      numberOfSales: 43,
      discount: true,
      discountPercentage: 10
    },
    {
      name: "Addidas Slim Shirt",
      companyName: "Addidas",
      category: "Shirts",
      image: "/images/p2.jpg",
      price: 80,
      countInStock: 20,
      brand: "Nike",
      ratings: 2.5,
      numReviews: 17,
      description: "High Quality Products",
      featured: false,
      numberOfSales: 21,
      discount: true,
      discountPercentage: 15
    },
    {
      name: "Reebok Slim Shirts",
      companyName: "Reebok",
      category: "Shirts",
      image: "/images/p6.jpg",
      price: 220,
      countInStock: 0,
      brand: "Nike",
      ratings: 4.5,
      numReviews: 19,
      description: "High Quality Products",
      featured: true,
      numberOfSales: 89,
      discount: true,
      discountPercentage: 5
    },
    {
      name: "Nike Slim Shoes",
      companyName: "Nike",
      category: "Shoes",
      image: "/images/p4.jpg",
      price: 100,
      countInStock: 15,
      brand: "Nike",
      ratings: 3,
      numReviews: 26,
      description: "High Quality Products",
      featured: true,
      numberOfSales: 61,
      discount: true,
      discountPercentage: 10
    },
    {
      name: "Raymonds Shirt",
      companyName: "Raymonds",
      category: "Shirts",
      image: "/images/p7.jpg",
      price: 60,
      countInStock: 2,
      brand: "Nike",
      ratings: 0.5,
      numReviews: 9,
      description: "High Quality Products",
      featured: true,
      numberOfSales: 12,
      discount: false,
      discountPercentage: 10
    },
  ],
};

export default data;
