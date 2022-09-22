export const phoneRegexPattern = '^(?:254|\\+254|0)?((7|1)(?:(?:[0-9][0-9])|(?:0[0-8])|(9[0-2]))[0-9]{6})$';

export const phoneCleanup = (phoneNumber: string) => {
  // +254712692310
  if (/^\+254(\d){9}$/.test(phoneNumber)) {
    return phoneNumber;
  }

  // 254712692310
  if (/^254(\d){9}$/.test(phoneNumber)) {
    return '+' + phoneNumber;
  }

  // 712692310
  if (/^(\d){9}$/.test(phoneNumber)) {
    return '+254' + phoneNumber;
  }

  // 0712692310
  if (/^0(\d){9}$/.test(phoneNumber)) {
    return '+254' + Number(phoneNumber);
  }
  return phoneNumber;
};
