import { cn } from "@/shared/libs/utils";

interface Props {
  className?: string;
  children: React.ReactNode;
}

export default function Container({ className, children }: Props) {
  return (
    <div className={cn("mx-auto max-w-324", className)}>{children}</div>
  );
}
