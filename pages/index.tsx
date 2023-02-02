import axios from 'axios';

import { useState, ChangeEvent, useEffect } from 'react';

type Painting = {
  id: string;
  name: string;
  content: string;
  imageUrl: string;
  price: string;
  isSold: boolean;
  categoryId: string;
};

type Category = {
  id: string;
  name: string;
};

export default function Home() {
  const [painting, setPainting] = useState<Painting[]>([]);
  const [category, setCategory] = useState<Category[]>([]);
  const [formState, setFormState] = useState({
    name: '',
    content: '',
    price: '',
    isSold: false,
    imageUrl: '',
    categoryId: '',
  });
  const [formCategory, setFormCategory] = useState({
    name: '',
  });
  const [imageSelected, setImageSelected] = useState<string | Blob>('');

  useEffect(() => {
    const getCategory = async () => {
      const { data } = await axios.get(
        'http://localhost:5001/api/v1/categories'
      );
      setCategory(data);
    };
    getCategory();
  }, []);

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', imageSelected);
    formData.append('upload_preset', 'jxkcbdrv');
    try {
      const response = await axios({
        method: 'post',
        url: 'http://localhost:5001/api/v1/paintings',
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleOnChange = (event: any) => {
    setImageSelected(event.target.files[0]);
  };
  const handleSubmit = () => {
    const formData = new FormData();
    formData.append('name', formState.name);
    formData.append('content', formState.content);
    formData.append('price', formState.price);
    formData.append('categoryId', formState.categoryId);
    formData.append('isSold', formState.isSold ? 'true' : 'false');
    formData.append('image', imageSelected);

    axios.post('http://localhost:5001/api/v1/paintings', formData);
  };

  const handleSubmit2 = () => {
    axios.post('http://localhost:5001/api/v1/categories', {
      name: formState.name,
    });
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormState((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  };
  const handleChange2 = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormCategory((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <>
      <div className="flex flex-col justify-center align-middle items-center m-10">
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Title"
          className="w-1/2 mb-5"
          onChange={handleChange}
          value={formState.name}
        />
        <select
          onChange={handleChange}
          name="categoryId"
          className="mb-3 w-1/2"
        >
          <option className="text-center">Select a category</option>
          {category.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>

        <textarea
          rows={5}
          cols={20}
          id="content"
          name="content"
          placeholder="Content"
          className="w-1/2 mb-5"
          onChange={handleChange}
          value={formState.content}
        />
        <div className="flex flex-row justify-between">
          <input
            type="text"
            id="price"
            name="price"
            placeholder="price"
            className="w-1/2 mb-5"
            onChange={handleChange}
            value={formState.price}
          />
          <label htmlFor="isSold" className="flex flex-row">
            isSold
            <input
              type="checkbox"
              id="isSold"
              name="isSold"
              className=" mb-5"
              onChange={handleChange}
            />
          </label>
        </div>
        <input
          type="file"
          onChange={handleOnChange}
          className=" bg-gray-400 rounded-md mb-10  w-1/2"
        />
        <button
          type="submit"
          className="bg-blue-500 rounded-md text-white w-1/4 h-7"
          onClick={handleSubmit}
        >
          Submit
        </button>
        <button
          type="submit"
          className="bg-blue-500 rounded-md mt-3 text-white w-1/4 h-7"
          onClick={handleUpload}
        >
          Upload
        </button>
      </div>{' '}
    </>
  );
}
