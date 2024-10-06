import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [characters, setCharacters] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [characterToDelete, setCharacterToDelete] = useState(null);
  const [characterToEdit, setCharacterToEdit] = useState(null); 
  const [editForm, setEditForm] = useState({ name: '', gender: '', image: '' }); 

  useEffect(() => {
    axios.get('https://66e7e6bfb17821a9d9da7097.mockapi.io/cartoon')
      .then((response) => {
        setCharacters(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const deleteCharacter = () => {
    if (!characterToDelete) return;
    
    axios.delete(`https://66e7e6bfb17821a9d9da7097.mockapi.io/cartoon/${characterToDelete}`)
      .then(() => {
        setCharacters((prev) => prev.filter(character => character.id !== characterToDelete));
        setCharacterToDelete(null);
      })
     
  };

  const updateCharacter = () => {
    if (!characterToEdit) return;

    axios.put(`https://66e7e6bfb17821a9d9da7097.mockapi.io/cartoon/${characterToEdit}`, editForm)
      .then((response) => {
        setCharacters((prev) => 
          prev.map(character => 
            character.id === characterToEdit ? response.data : character
          )
        );
        setCharacterToEdit(null); 
      })
      
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const filteredCharacters = characters.filter(character => 
    character.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <nav className=" p-4 text-white flex justify-between m-0">
          <Link to="/" className="btn bg-primary mr-4 text-white">Home</Link>
          
      <input 
        type="text" 
        placeholder="Search by name" 
        className="input bg-base-200 border p-2 mb-4 mx-2"
        onChange={(e) => setSearchTerm(e.target.value)} 
      />
      <Link to="/add-character">
        <button className="btn bg-primary text-white p-2  mb-4">Add New Character</button>
      </Link>
        </nav>

      <h1 className="text-2xl font-bold mb-4">Characters List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCharacters.length > 0 ? (
          filteredCharacters.map((character) => (
            <div key={character.id} className="border p-4 rounded shadow">
              <img src={character.image} alt={character.name} className="w-full h-48 object-cover rounded mb-4"/>
              <h2 className="text-xl font-bold">{character.name}</h2>
              <p>Gender: {character.gender}</p>

              <button className="btn bg-red-500 mt-2" onClick={() => {
                setCharacterToDelete(character.id);
                document.getElementById('my_modal_1').showModal();
              }}>Delete</button>

              <button className="btn bg-yellow-500 mt-2 mx-2" onClick={() => {
                setCharacterToEdit(character.id); 
                setEditForm({ name: character.name, gender: character.gender, image: character.image }); 
                document.getElementById('my_modal_edit').showModal(); 
              }}>Edit</button>
            </div>
          ))
        ) : (
          <p>No characters found</p>
        )}
      </div>

      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Delete Character</h3>
          <p className="py-4">Are you sure you want to delete this character?</p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Back</button>
              <button
                className="btn bg-red-500 text-white p-2 mx-2"
                onClick={deleteCharacter}
              >
                Delete
              </button>
            </form>
          </div>
        </div>
      </dialog>

      <dialog id="my_modal_edit" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Edit Character</h3>
          <div className="py-4">
            <input 
              type="text" 
              name="name"
              value={editForm.name} 
              onChange={handleFormChange}
              placeholder="Character Name" 
              className="input bg-base-200 border p-2 mb-4 w-full"
            />
            <input 
              type="text" 
              name="gender"
              value={editForm.gender} 
              onChange={handleFormChange}
              placeholder="Character Gender" 
              className="input bg-base-200 border p-2 mb-4 w-full"
            />
            <input 
              type="text" 
              name="image"
              value={editForm.image} 
              onChange={handleFormChange}
              placeholder="Image URL" 
              className="input bg-base-200 border p-2 mb-4 w-full"
            />
          </div>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Back</button>
              <button
                
                className="btn bg-green-500 text-white p-2 mx-2"
                onClick={updateCharacter}
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default HomePage;
