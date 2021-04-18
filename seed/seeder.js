const faker = require('faker');
const {listingModel, blogModel} = require('../model/listingBlogModel');
const {listingConnection, blogConnection} = require('./../connections');
const cities = require('./cities');



const sample = (array) => array[Math.floor(Math.random() * array.length)];


const seed = async () => {
  await listingModel.deleteMany({})
    for (let i = 0; i< 6; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        await listingModel.create({
               location: `${cities[random1000].city}, ${cities[random1000].state}`,
      image: 'https://source.unsplash.com/collection/20440282',
      description: faker.lorem.paragraph(7),
      price: faker.datatype.number({
        min: 1200,
        max: 1000000
      }),
      garage: faker.datatype.number({
        min: 1,
        max: 3
      }),
      bedroom:faker.datatype.number({
        min: 1,
        max: 7
      }),
      bathroom:faker.datatype.number({
        min: 1,
        max: 7
      }),
      area:faker.datatype.number({
        min: 700,
        max: 3500
      }),
      property: 'House',
      status: 'Sale', 
       user:'607ca96f674ac53518ff81fe'
        });  
    }
  await blogModel.deleteMany({})
    for (let i = 0; i < 6; i++) {
        await blogModel.create({
           author: faker.name.findName(),
           user:'607ca96f674ac53518ff81fe',
      title: faker.lorem.sentence(4),
      category: 'Travel',
      image: faker.image.city(),
    //   image: 'https://source.unsplash.com/collection/74264368',
      body: faker.lorem.paragraph(15),
      // body: `${sample(blogDescription)}`,
      createdAt: Date().toLocaleString().split(',')[0],
        });
    }
}

seed().then(() => {
    listingConnection.close();
    blogConnection.close();
});