import React from 'react';

type Props = {};

export default function Upload({}: Props) {
  return (
    <div className="flex flex-col justify-center align-middle items-center m-10">
      <input
        type="text"
        id="name"
        name="name"
        placeholder="Title"
        className="w-1/2 mb-5"
      />
      <textarea
        rows={5}
        cols={20}
        id="content"
        name="content"
        placeholder="Content"
        className="w-1/2 mb-5"
      />
      <div className="flex flex-row justify-between">
        <input
          type="text"
          id="price"
          name="price"
          placeholder="price"
          className="w-1/2 mb-5"
        />
        <label htmlFor="isSold" className="flex flex-row">
          isSold
          <input type="checkbox" id="isSold" name="isSold" className=" mb-5" />
        </label>
      </div>
      <input type="file" className=" bg-gray-400 rounded-md mb-10  w-1/2" />
      <button
        type="submit"
        className="bg-blue-500 rounded-md text-white w-1/4 h-7"
      >
        Upload
      </button>
    </div>
  );
}
