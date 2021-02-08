const { it, expect, afterEach } = require('@jest/globals');
const request = require('supertest');
const userRoutes = require('../routes/userRoutes');


describe('Routes Configuration on the User Side of the Application', () => {
  it('GET localhost:3000/catalogue - SUCCESS', () => {
    request(userRoutes)
    .get('/catalogue')
    .expect(200)
    .expect((req, res) => {
      title: 'Catalogue'
    });
  });

  it("GET localhost:3000/contact - SUCCESS", () => {
    request(userRoutes)
    .get('/contact')
    .expect(200)
    .expect((req, res) => {
      title: 'Contact Us'
    });
  });

  it("GET localhost:3000/about - SUCCESS", () => {
    request(userRoutes)
    .get('/about')
    .expect(200)
    .expect((req, res) => {
      title: 'About Us'
    });
  });

  it("GET localhost:3000/faq - SUCCESS", () => {
    request(userRoutes)
    .get('/faq')
    .expect(200)
    .expect((req, res) => {
      title: 'FAQ'
    });
  });

  it("GET localhost:3000/checkout - SUCCESS", () => {
    request(userRoutes)
    .get('/checkout')
    .expect(200)
    .expect((req, res) => {
      title: 'Your Cart'
    });
  });

  it("GET localhost:3000/shipping - SUCCESS", () => {
    request(userRoutes)
    .get('/shipping')
    .expect(200)
    .expect((req, res) => {
      title: 'Shipping Details and Payment Options'
    });
  });

  it("GET localhost:3000/login - SUCCESS", () => {
    request(userRoutes)
    .get('/login')
    .expect(200)
    .expect((req, res) => {
      title: 'Login and Register'
    });
  });
  
  it("GET localhost:3000/profile - SUCCESS", () => {
    request(userRoutes)
    .get('/profile')
    .expect(200)
    .expect((req, res) => {
      title: 'Profile'
    });
  });

});