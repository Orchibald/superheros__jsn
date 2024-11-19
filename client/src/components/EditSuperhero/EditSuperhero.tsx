import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AppDispatch, RootState } from '../../store/store';
import { updateSuperhero } from '../../store/slices/superherosSlice';
import './EditSuperhero.scss';

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
    images: '',
  });

  useEffect(() => {
    if (superhero) {
      setForm({
        nickname: superhero.nickname,
        realName: superhero.realName,
        originDescription: superhero.originDescription,
        superpowers: superhero.superpowers.join(','),
        catchPhrases: superhero.catchPhrases.join(','),
        images: superhero.images.join(','),
      });
    }
  }, [superhero]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (superhero) {
      const updatedHero = {
        ...superhero,
        nickname: form.nickname,
        realName: form.realName,
        originDescription: form.originDescription,
        superpowers: form.superpowers.split(','),
        catchPhrases: form.catchPhrases.split(','),
        images: form.images.split(',' + ' '),
      };
      dispatch(updateSuperhero(updatedHero));
      navigate('/');
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
        <input
          placeholder="Images (comma separated URLs)"
          value={form.images}
          onChange={e => setForm({ ...form, images: e.target.value })}
          required
          className="edit-hero__input"
        />
        <button type="submit" className="edit-hero__button">Save Changes</button>
      </form>
    </div>
  );
};

export default EditSuperhero;
