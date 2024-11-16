import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface EditTemplateProps {
  id: string;
}

const EditTemplate: React.FC<EditTemplateProps> = ({ id }) => {
  const [template, setTemplate] = useState<{ title: string; content: string } | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (!id) return; 
    
    const fetchTemplate = async () => {
      try {
        const response = await axios.get(`/api/templates/${id}`);
        setTemplate(response.data);
        setTitle(response.data.title);
        setContent(response.data.content);
      } catch (error) {
        console.error('Error fetching template:', error);
      }
    };

    fetchTemplate();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.put(`/api/templates/${id}`, { title, content });
      console.log('Template updated:', response.data);
    } catch (error) {
      console.error('Error updating template:', error);
    }
  };

  if (!template) return <div>Loading...</div>;

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Template Title"
        required
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Template Content"
        required
      />
      <button type="submit">Update Template</button>
    </form>
  );
};

export default EditTemplate;
