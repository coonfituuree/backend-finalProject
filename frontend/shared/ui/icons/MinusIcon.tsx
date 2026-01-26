export interface IconProps {
  className?: string;
}

export function MinusIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.25 12a1.25 1.25 0 1 1 2.5 0 1.25 1.25 0 0 1-2.5 0zm3.896-.75a2.751 2.751 0 1 0 0 1.5H21.5a.75.75 0 0 0 0-1.5H8.146z"
      />
    </svg>
  );
}
