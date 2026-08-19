import type { ReactNode } from "react";

export function NumberedListItem({
  number,
  title,
  description,
  icon,
}: {
  number: string;
  title: string;
  description?: string;
  icon?: ReactNode;
}) {
  return (
    <article className="numbered-list-item">
      <strong>{number}</strong>
      <div>
        <h3>{icon}{title}</h3>
        {description && <p>{description}</p>}
      </div>
    </article>
  );
}