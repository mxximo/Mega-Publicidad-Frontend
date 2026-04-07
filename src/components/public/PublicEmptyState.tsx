interface PublicEmptyStateProps {
  title: string;
  description: string;
}

export default function PublicEmptyState({ title, description }: PublicEmptyStateProps) {
  return (
    <div className="gp-muted-card p-8 text-center">
      <h3 className="text-lg font-bold text-[var(--public-text)]">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-[var(--public-text-muted)]">{description}</p>
    </div>
  );
}
