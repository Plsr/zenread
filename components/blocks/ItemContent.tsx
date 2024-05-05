"use client";

import styles from "./ItemContent.module.css";

type Props = {
  content?: string;
};

export const ItemContent = ({ content }: Props) => {
  if (!content) {
    return null;
  }

  return (
    <div
      className={styles.itemContent}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};
