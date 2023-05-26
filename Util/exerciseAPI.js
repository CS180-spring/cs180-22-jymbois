import axios from 'axios';

export const fetchExercises = async () => {
  try {
    const options = {
      method: 'GET',
      url: 'https://exercisedb.p.rapidapi.com/exercises',
      headers: {
        'X-RapidAPI-Key': '3452a1e0e1msh1b5715b5878dbbcp128620jsnb9c2f4f09325',
        'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
      },
    };

    const response = await axios.request(options);
    const data = response.data;
    // Process the received data
    console.log(data);
    return data; // Return the data to be used in the calling component
  } catch (error) {
    console.error(error);
    throw error; // Throw the error to be handled in the calling component
  }
};

  