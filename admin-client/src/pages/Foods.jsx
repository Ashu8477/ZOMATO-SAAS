import { useEffect, useState } from 'react';
import { getFoodsApi, createFoodApi } from '../api/food.api';
import { getCategoriesApi } from '../api/category.api';

function Foods() {
  const [foods, setFoods] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [file, setFile] = useState(null);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState('');

  const fetchCategories = async () => {
    const res = await getCategoriesApi();
    setCategories(res.data.data);
  };

  const fetchFoods = async () => {
    const res = await getFoodsApi();
    setFoods(res.data.data);
  };

  useEffect(() => {
    fetchFoods();
    fetchCategories();
  }, []);

  const handleCreate = async () => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append("category", category);
    formData.append('image', file);

    await createFoodApi(formData);
    fetchFoods();
  };

  return (
    <div>
      <h1>Foods</h1>

      <input placeholder="name" onChange={(e) => setName(e.target.value)} />
      <input placeholder="price" onChange={(e) => setPrice(e.target.value)} />
      <select onChange={(e) => setCategory(e.target.value)}>
        <option>Select category</option>
        {categories.map((c) => (
          <option value={c._id}>{c.name}</option>
        ))}
      </select>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />

      <button onClick={handleCreate}>Create</button>

      {foods.map((f) => (
        <div key={f._id}>
          <p>{f.name}</p>
          <p>₹ {f.price}</p>
        </div>
      ))}
    </div>
  );
}

export default Foods;
