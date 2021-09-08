export const validateEmail=(email)=> {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export const checkPostalCode=(code) =>{
  code = code.replace(' ', '');
  if (code.length >= 5 && code.length <= 7) {
    if (code[code.length - 3] >= 0 && code[code.length - 3] <= 9) {
      if (isLetter(code[code.length - 2]) && isLetter(code[code.length - 2]))
        return true;
      else {
        console.log('Character issue');
      }
    }
  } else {
    console.log('length issue');
  }
  return false;
}
function isLetter(c) {
  return c.toLowerCase() != c.toUpperCase();
}

export default {checkPostalCode, validateEmail};
