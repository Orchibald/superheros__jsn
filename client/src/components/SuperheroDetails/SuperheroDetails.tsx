import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { RootState } from '../../store/store';
import './SuperheroDetails.scss';

const SuperheroDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const superhero = useSelector((state: RootState) =>
    state.superheroes.heroes.find(hero => hero.id === id)
  );

  if (!superhero) {
    return <div className="details__error">Superhero not found!</div>;
  }

  return (
    <div className="details">
      <Link to='/' className='back'>{'<'} Back</Link>
      <h1 className="details__title">{superhero.nickname}</h1>
      <p className="details__info">
        <strong>Real Name:</strong> {superhero.realName}
      </p>
      <p className="details__info">
        <strong>Origin:</strong> {superhero.originDescription}
      </p>
      <p className="details__info">
        <strong>Superpowers:</strong> {superhero.superpowers.join(', ')}
      </p>
      <p className="details__info">
        <strong>Catchphrases:</strong> {superhero.catchPhrases.join(', ')}
      </p>
      <div className="details__images">
        <strong>Images:</strong>
        <div className="details__image-list">
          {superhero.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={superhero.nickname}
              className="details__image"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SuperheroDetails;
