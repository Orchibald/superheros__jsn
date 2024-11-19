import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { AppDispatch } from '../../store/store';
import { addSuperheroAsync } from '../../store/slices/superherosSlice';
import './AddSuperhero.scss';

const AddSuperhero: React.FC = () => {
  const [form, setForm] = useState({
    nickname: '',
    realName: '',
    originDescription: '',
    superpowers: '',
    catchphrases: '',
    images: [] as File[], 
  });

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setForm({ ...form, images: Array.from(e.target.files) });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const superheroData = {
      nickname: form.nickname,
      realName: form.realName,
      originDescription: form.originDescription,
      superpowers: form.superpowers,
      catchphrases: form.catchphrases,
      images: form.images, 
    };

    try {
      await dispatch(addSuperheroAsync(superheroData));
      navigate('/'); 
    } catch (error) {
      console.error('Error adding superhero:', error);
    }
  };

  return (
    <div className="add-hero">
      <Link to="/" className="back">{'<'} Back</Link>
      <h1 className="add-hero__title">Add a New Superhero</h1>
      <form onSubmit={handleSubmit} className="add-hero__form">
        <input
          type="text"
          placeholder="Pseudonym"
          value={form.nickname}
          onChange={(e) => setForm({ ...form, nickname: e.target.value })}
          required
          className="add-hero__input"
        />
        <input
          type="text"
          placeholder="Real Name"
          value={form.realName}
          onChange={(e) => setForm({ ...form, realName: e.target.value })}
          required
          className="add-hero__input"
        />
        <textarea
          placeholder="Origin Description"
          value={form.originDescription}
          onChange={(e) => setForm({ ...form, originDescription: e.target.value })}
          required
          className="add-hero__textarea"
        />
        <textarea
          placeholder="Superpowers (comma separated)"
          value={form.superpowers}
          onChange={(e) => setForm({ ...form, superpowers: e.target.value })}
          required
          className="add-hero__input"
        />
        <textarea
          placeholder="Catchphrases (comma separated)"
          value={form.catchphrases}
          onChange={(e) => setForm({ ...form, catchphrases: e.target.value })}
          required
          className="add-hero__input"
        />
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          className="add-hero__input"
        />
        <button type="submit" className="add-hero__button">
          Add Superhero
        </button>
      </form>
    </div>
  );
};

export default AddSuperhero;
