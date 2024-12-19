import Image from 'next/image';
import { useState } from 'react';
import styles from '@/components/dashboard/card/Card.module.css';
import clsx from 'clsx';

interface ImageProps {
  image: string;
  name: string;
  className?: string;
}

function CardImage({ image, name, className }: ImageProps) {
  const [imageRenderError, setImageRenderError] = useState(false);
  const imgPath = image;

  if (imageRenderError || !image) return null;

  return (
    <div className={clsx(styles['card-image'], className)}>
      <Image
        fill
        src={imgPath}
        alt={name || ''}
        onError={() => setImageRenderError(true)}
      />
    </div>
  );
}

export default CardImage;
