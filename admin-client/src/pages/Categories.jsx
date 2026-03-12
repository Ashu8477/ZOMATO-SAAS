import { useEffect, useState } from 'react';
import { getCategoriesApi, createCategoryApi } from '../api/category.api';

function Categories() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');

  const fetchCategories = async () => {
    const res = await getCategoriesApi();
    setCategories(res.data.data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCreate = async () => {
    await createCategoryApi({ name });
    fetchCategories();
  };

  return (
    <div>
      <h1>Categories</h1>

      <input
        placeholder="category name"
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={handleCreate}>Create</button>

      {categories.map((c) => (
        <p key={c._id}>{c.name}</p>
      ))}
    </div>
  );
}

export default Categories;
