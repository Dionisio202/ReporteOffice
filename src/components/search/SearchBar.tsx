import React from "react";

const SearchBar: React.FC = () => {
  return (
    <div className="flex items-center space-x-2 bg-gray-100 p-2 rounded">
      <input
        type="text"
        placeholder="Buscar..."
        className="flex-1 p-2 border rounded"
      />
      <button className="bg-blue-500 text-white px-4 py-2 rounded">
        Buscar
      </button>
    </div>
  );
};

export default SearchBar;
