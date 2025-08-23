export const regex = {
  name: /^[\u0600-\u06FF\s]{1,50}$/,
  phone_number: /^(0|\+98|0098)?[1-9][0-9]{9}$/,
  password: /^(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{4,}$/,
  address: /^.{1,250}$/,
  plate: /^[0-9]{1,10}$/,
  unit: /^[0-9]{1,5}$/,
  province: /^[\u0600-\u06FF\s]{1,100}$/,
  city: /^[\u0600-\u06FF\s]{1,50}$/,
  postal_code: /^[0-9]{1,20}$/,
  receiver: /^[\u0600-\u06FFa-zA-Z\s]{1,50}$/
};

export default regex;
