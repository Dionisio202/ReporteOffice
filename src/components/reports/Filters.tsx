
import React from 'react';

const Filters = ({ documentType, handleTypeChange }) => {
  return (
    <div className="col-span-3 border border-gray-400 p-4 rounded-lg">
      <h2 className="font-semibold mb-2">Tipo de Documento</h2>
      {Object.keys(documentType).map((type) => (
        <div key={type} className="flex items-center mb-2">
          <input
            type="checkbox"
            id={type}
            checked={documentType[type]}
            onChange={() => handleTypeChange(type)}
            className="mr-2"
          />
          <label htmlFor={type}>{type}</label>
        </div>
      ))}
    </div>
  );
};

export default Filters;
