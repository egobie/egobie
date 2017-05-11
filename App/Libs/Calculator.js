export const totalPrice = (services, coupon) => {
  if (services.length === 0) {
    return ' ';
  }

  let price = services.reduce((acc, service) => {
    return acc + service.price;
  }, 0);

  price *= 1.07 * (services.length > 1 ? 0.9 : 1);

  return price.toFixed(2);
};

export const totalTime = (services) => {
  if (services.length === 0) {
    return ' ';
  }

  let time = services.reduce((acc, service) => {
    return acc + service.time;
  }, 0);
  let hour = Math.floor(time / 60);
  let min = time % 60;

  if (min === 0) {
    return `${hour} Hour${hour > 1 ? 's': ''}`;
  } else if (hour === 0) {
    return `${min} Minutes`;
  } else {
    return `${hour} Hour${hour > 1 ? 's': ''} ${min} Minutes`
  }
};