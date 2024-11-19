import React from 'react';
import { Superhero } from '../../store/slices/superherosSlice';
import './IngHero.scss'

type Props = {
  hero: Superhero
}

export const ImgHero: React.FC<Props> = ({ hero }) => {


  return (
    <div className="details__images">
        <strong>Images:</strong>
        <div className="details__image-list">
          {hero.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={hero.nickname}
              className="details__image"
            />
          ))}
        </div>
      </div>
  );
};
