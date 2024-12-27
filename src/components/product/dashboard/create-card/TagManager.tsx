import React from 'react';
import Chip from '@/components/common/chip/Chip';
import DeleteButton from 'public/ic/ic_x.svg';
import TitleTagInput from '@/components/common/input/info-input/TitleTagInput';
import getTagColor from '@/components/common/chip/helper';
import styles from './TagManager.module.css';

interface TagManagerProps {
  tags: string[];
  onAddTag: (tag: string) => void;
  onRemoveTag: (tag: string) => void;
}

export default function TagManager({
  tags,
  onAddTag,
  onRemoveTag,
}: TagManagerProps) {
  const handleTagInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTag = e.target.value.trim();
    const color = getTagColor();
    const coloredTag = `${newTag}^${color}`;

    if (!newTag || tags.includes(newTag)) return; // 빈 문자열 또는 중복 태그 방지
    onAddTag(coloredTag);
    e.target.value = '';
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const inputElement = e.target as HTMLInputElement;
      handleTagInput({
        target: inputElement,
      } as React.ChangeEvent<HTMLInputElement>);
    }
  };

  return (
    <div>
      <TitleTagInput
        label="태그"
        placeholder="입력 후 Enter"
        onKeyDown={handleKeyDown}
        required
      />
      <div className={styles.tags}>
        {tags.map((tag) => {
          const [tagText, tagColor] = tag.split('^');
          return (
            <Chip key={`_${tag}`} chipType="tag" color={tagColor}>
              <p className={styles.tag}>
                {tagText}
                <DeleteButton
                  className={styles[`delete-button`]}
                  width={14}
                  height={14}
                  onClick={() => onRemoveTag(tag)}
                />
              </p>
            </Chip>
          );
        })}
      </div>
    </div>
  );
}
