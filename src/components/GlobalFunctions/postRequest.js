import React from 'react';

export const registerUser = async (
  phoneNumber,
  emailAdress,
  postalCode,
  fName,
  lName,
  roleOfUser,
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
        body: JSON.stringify({
          phone: phoneNumber,
          email: emailAdress,
          firstName: fName,
          lastName: lName,
          address: 'near by rolse',
          postCode: postalCode,
          servicePostCodes: [],
          role: roleOfUser,
          deviceId: 'androidDeviceId',
        }),
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

export const registerWasteCollector = async (
  phoneNumber,
  emailAdress,
  postalCode,
  fName,
  lName,
  servicePostalCodes,
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
        body: JSON.stringify({
          phone: phoneNumber,
          email: emailAdress,
          firstName: fName,
          lastName: lName,
          address: 'near by rolse',
          postCode: postalCode,
          servicePostCodes: servicePostalCodes,
          role: 2,
          deviceId: 'androidDeviceId',
        }),
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

export default {registerUser, registerWasteCollector};
