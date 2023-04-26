import axios from 'axios';

export default getComments = () => {
  return new Promise((resolve, reject) => {
    axios
      .get('https://6316511582797be77fe32ec3.mockapi.io/comments')
      .then(function (response) {
        console.log(JSON.stringify(response));
        resolve(response.data);
      })
      .catch(function (error) {
        console.log(error);
        reject(error);
      });
  });
};
