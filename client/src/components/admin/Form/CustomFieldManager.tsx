import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface CustomField {
  _id: string;
  name: string;
  type: string;
  required: boolean;
  options: string[];
}

const CustomFieldManager: React.FC = () => {
  const [fields, setFields] = useState<CustomField[]>([]);
  const [error, setError] = useState<string>('');
  const [editingField, setEditingField] = useState<string | null>(null);
  const [name, setName] = useState<string>('');
  const [type, setType] = useState<string>('text');
  const [required, setRequired] = useState<boolean>(false);
  const [options, setOptions] = useState<string>('');

  const fetchFields = async () => {
    try {
      // const response = await axios.get<CustomField[]>('/api/fields');
      // setFields(response.data);
      setFields([
        { _id: '1', name: 'Username', type: 'text', required: true, options: [] },
        { _id: '2', name: 'Age', type: 'number', required: false, options: [] },
        { _id: '3', name: 'Date of Birth', type: 'date', required: true, options: [] },
        { _id: '4', name: 'Favorite Color', type: 'dropdown', required: false, options: ['Red', 'Green', 'Blue'] },
        { _id: '5', name: 'Feedback', type: 'text', required: true, options: [] },
      ]);
    } catch (error) {
      console.error('Error fetching custom fields', error);
      setError('Error fetching custom fields. Please try again.');
    }
  };

  useEffect(() => {
    fetchFields();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/fields/${id}`);
      fetchFields();
    } catch (error) {
      console.error('Error deleting custom field', error);
      setError('Error deleting custom field. Please try again.');
    }
  };

  const handleEdit = (field: CustomField) => {
    setEditingField(field._id);
    setName(field.name);
    setType(field.type);
    setRequired(field.required);
    setOptions(field.options.join(', '));
  };

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fieldData = {
      name,
      type,
      required,
      options: options.split(',').map(option => option.trim()),
    };

    try {
      if (editingField) {
        await axios.put(`/api/fields/${editingField}`, fieldData);
        setEditingField(null);
        fetchFields();
      }
    } catch (error) {
      console.error('Error updating custom field', error);
      setError('Error updating custom field. Please try again.');
    }
  };

  return (
    <div>
      <h2>Manage Custom Fields</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {fields.map(field => (
          <li key={field._id}>
            <strong>{field.name}</strong> (Type: {field.type}, Required: {field.required ? 'Yes' : 'No'})
            <button onClick={() => handleEdit(field)}>Edit</button>
            <button onClick={() => handleDelete(field._id)}>Delete</button>
          </li>
        ))}
      </ul>

      {editingField && (
        <form onSubmit={handleSave}>
          <h3>Edit Custom Field</h3>
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
          <button type="submit">Save Changes</button>
          <button type="button" onClick={() => setEditingField(null)}>Cancel</button>
        </form>
      )}
    </div>
  );
};

export default CustomFieldManager;