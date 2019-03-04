module.exports = (productName, price) => {
  if (productName.trim() === '') {
    return {
      message: 'Не указано название товара',
      status: 'Error'
    };
  }

  if (price <= 0) {
    return {
      message: 'Указана некорректная цена',
      status: 'Error'
    };
  }
};
