import Image from 'next/image';
import { useState } from 'react';
import styles from '@/components/dashboard/card/Card.module.css';

interface ImageProps {
  image: string;
  name: string;
}

function CardImage({ image, name }: ImageProps) {
  const [imageRenderError, setImageRenderError] = useState(false);
  const imgPath = image;

  if (imageRenderError || !image) return null;

  return (
    <div className={styles['card-image']}>
      <Image
        fill
        src={imgPath}
        alt={name || ''}
        onError={() => setImageRenderError(true)}
        style={{ objectFit: 'cover' }}
      />
    </div>
  );
}

export default CardImage;
