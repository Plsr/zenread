"use client";

import styles from "./ItemContent.module.css";

type Props = {
  content: string;
};

export const ItemContent = ({ content }: Props) => {
  return (
    <div
      className={styles.itemContent}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};
