export const regex = {
  name: /^[\u0600-\u06FF\s]{1,50}$/,
  phone_number: /^(0|\+98|0098)?[1-9][0-9]{9}$/,
  password: /^(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{4,}$/
};
