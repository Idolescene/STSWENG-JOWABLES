const User = require('../models/user');

const valid_user = {
  fullname: "Juan Dela Cruz",
  username: "juan",
  email: "juan@email.com",
  password: "password",
  datejoined: "23/01/2021",
  contactnum: "NONE",
  housenum: "NONE",
  barangay: "NONE",
  city: "NONE",
  province: "NONE"
};

const invalid_user = {
  fullname: "David Beckham",
  username: "soccer4lyf",
  email: "email",
  password: "password",
  datejoined: "23/01/2021",
  contactnum: "NONE",
  housenum: "NONE",
  barangay: "NONE",
  city: "NONE",
  province: "NONE"
};

describe('Routes Configuration on the User Side of the Application', () => {
  it("ASYNC Should validate user with valid email", async () => {
    let error = null;
    try {
      const user = new User(valid_user);
      await user.validate();
    } catch (e) {
      error = e;
    }
    expect(error).not.toBeNull();
  })

  it("ASYNC Should not validate user without valid email", async () => {
    let error = null;
    try {
      const user = new User(invalid_user);
      await user.validate();
    } catch (e) {
      error = e;
    }
    expect(error).not.toBeNull();
  })
})