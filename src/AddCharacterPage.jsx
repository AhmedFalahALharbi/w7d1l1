import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddCharacterPage = () => {
  const [newCharacter, setNewCharacter] = useState({
    name: '',
    gender: '',
    image: '',
  });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('https://66e7e6bfb17821a9d9da7097.mockapi.io/cartoon', newCharacter)
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        console.error('Error adding character:', error);
      });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add New Character</h1>
      <form onSubmit={handleSubmit} className="border p-4 rounded shadow">
        <input
          type="text"
          placeholder="Name"
          value={newCharacter.name}
          onChange={(e) => setNewCharacter({ ...newCharacter, name: e.target.value })}
          className="input border p-2 mb-2 w-full"
        />
        <input
          type="text"
          placeholder="Gender"
          value={newCharacter.gender}
          onChange={(e) => setNewCharacter({ ...newCharacter, gender: e.target.value })}
          className="input border p-2 mb-2 w-full"
        />
        <input
          type="text"
          placeholder="Image URL"
          value={newCharacter.image}
          onChange={(e) => setNewCharacter({ ...newCharacter, image: e.target.value })}
          className=" input border p-2 mb-2 w-full"
        />
        <button
          type="submit"
          className="bg-primary btn text-white p-2 rounded w-full"
        >
          Add Character
        </button>
      </form>
    </div>
  );
};

export default AddCharacterPage;
