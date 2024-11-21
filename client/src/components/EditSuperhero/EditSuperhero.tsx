import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AppDispatch, RootState } from '../../store/store';
import { updateSuperheroAsynk } from '../../store/slices/superherosSlice';
import './EditSuperhero.scss';
import { ImgHero } from '../ImgHero/ImgHero';

const EditSuperhero: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const superhero = useSelector((state: RootState) =>
    state.superheroes.heroes.find(hero => hero.id === id)
  );

  const [form, setForm] = useState({
    nickname: '',
    realName: '',
    originDescription: '',
    superpowers: '',
    catchPhrases: '',
    images: [] as File[],
  });

  useEffect(() => {
    if (superhero) {
      setForm({
        nickname: superhero.nickname,
        realName: superhero.realName,
        originDescription: superhero.originDescription,
        superpowers: superhero.superpowers.join(','),
        catchPhrases: superhero.catchPhrases.join(','),
        images: [],
      });
    }
  }, [superhero]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setForm({ ...form, images: Array.from(e.target.files) });
    }
  };

  const handleRemoveImage = (index: number) => {
    setForm(prevForm => ({
      ...prevForm,
      images: prevForm.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const superheroData = {
      nickname: form.nickname,
      realName: form.realName,
      originDescription: form.originDescription,
      superpowers: form.superpowers,
      catchPhrases: form.catchPhrases,
      images: form.images,
    };

    try {
      await dispatch(updateSuperheroAsynk({ id: id!, superheroData }));
      navigate('/');
    } catch (error) {
      console.error('Failed to update superhero', error);
    }
  };


  if (!superhero) {
    return <div className="edit-hero__error">Superhero not found!</div>;
  }

  return (
    <div className="edit-hero">
      <Link to='/' className='back'>{'<'} Back</Link>
      <h1 className="edit-hero__title">Edit Superhero</h1>
      <form onSubmit={handleSubmit} className="edit-hero__form">
        <input
          type="text"
          placeholder="Pseudonym"
          value={form.nickname}
          onChange={e => setForm({ ...form, nickname: e.target.value })}
          required
          className="edit-hero__input"
        />
        <input
          type="text"
          placeholder="Real Name"
          value={form.realName}
          onChange={e => setForm({ ...form, realName: e.target.value })}
          required
          className="edit-hero__input"
        />
        <textarea
          placeholder="Origin Description"
          value={form.originDescription}
          onChange={e => setForm({ ...form, originDescription: e.target.value })}
          required
          className="edit-hero__textarea"
        />
        <textarea
          placeholder="Superpowers (comma separated)"
          value={form.superpowers}
          onChange={e => setForm({ ...form, superpowers: e.target.value })}
          required
          className="edit-hero__input"
        />
        <textarea
          placeholder="Catchphrases (comma separated)"
          value={form.catchPhrases}
          onChange={e => setForm({ ...form, catchPhrases: e.target.value })}
          required
          className="edit-hero__input"
        />
        <div className="edit-hero__new-images-preview">
          <h3>New Images:</h3>
          {form.images.map((file, index) => (
            <div key={index} className="edit-hero__new-image-container">
              <img
                src={URL.createObjectURL(file)}
                alt={`New Superhero ${index}`}
                className="details__image"
              />
              <button
                type="button"
                className="edit-hero__image-delete"
                onClick={() => handleRemoveImage(index)}
              >
                ×
              </button>
            </div>
          ))}
        </div>
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          className="add-hero__input"
        />
        <div className="edit-hero__images-preview">
          <ImgHero hero={superhero} />
        </div>
        <button type="submit" className="edit-hero__button">Save Changes</button>
      </form>
    </div>
  );
};

export default EditSuperhero;
