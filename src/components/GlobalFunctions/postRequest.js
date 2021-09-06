import React from 'react';

const registerUser = async (
  phoneNumber,
  emailAdress,
  postCode,
  firstName,
  lastName,
  role,
) => {
  try {
    const response = await fetch(
      'http://scrappy.world:3000/api/v1/user/register',
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'cache-control': 'no-cache',
        },
        body: {
          phone: '+9203045622878',
          email: 'jyqygatob@vomoto.com',
          firstName: 'Public',
          lastName: 'admin',
          address: 'near by rolse',
          postCode: 'H1452',
          servicePostCodes: [],
          role: 1,
          deviceId: 'androidDeviceId',
        },
      },
    );
    const json = await response.json();
    console.log(json);
    return json;
  } catch (error) {
    console.error(error);
    return error.message;
  }
};

export default registerUser;
