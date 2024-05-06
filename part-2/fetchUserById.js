const fetchUserById = async (id) => {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
    if (response.status !== 200) {
      console.log('Ошибка сетевого запроса');
      return {}
    };
    const user = await response.json();
    return user;
  } catch (err) {
    console.log('Ошибка сетевого запроса', err);
    return {};
  }
};

module.exports = fetchUserById;
