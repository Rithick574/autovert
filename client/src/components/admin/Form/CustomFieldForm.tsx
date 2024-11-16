import React, { useState } from 'react';
import axios from 'axios';

const CustomFieldForm:React.FC = () => {
  const [name, setName] = useState('');
  const [type, setType] = useState('text');
  const [required, setRequired] = useState(false);
  const [options, setOptions] = useState('');

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    const fieldData = {
      name,
      type,
      required,
      options: options.split(',').map(option => option.trim()),
    };
    
    try {
      await axios.post('/api/fields', fieldData);
    } catch (error) {
      console.error('Error creating custom field', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Field Name" value={name} onChange={(e) => setName(e.target.value)} required />
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="text">Text</option>
        <option value="number">Number</option>
        <option value="date">Date</option>
        <option value="dropdown">Dropdown</option>
      </select>
      <label>
        Required:
        <input type="checkbox" checked={required} onChange={(e) => setRequired(e.target.checked)} />
      </label>
      {type === 'dropdown' && (
        <input type="text" placeholder="Options (comma separated)" value={options} onChange={(e) => setOptions(e.target.value)} />
 )}
      <button type="submit">Create Custom Field</button>
    </form>
  );
};

export default CustomFieldForm;