import type { IconProps } from "./MinusIcon";

export function ArrowRightIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.46 5.4a.75.75 0 1 0-1.06 1.06l4.79 4.79H4a.75.75 0 0 0 0 1.5h15.19l-4.79 4.79a.75.75 0 0 0 1.06 1.06l6.07-6.07a.75.75 0 0 0 0-1.06L15.46 5.4z"
      />
    </svg>
  );
}
