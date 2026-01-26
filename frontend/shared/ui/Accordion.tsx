"use client";

import { ReactNode, useLayoutEffect, useRef, useState } from "react";
import { cn } from "@/shared/libs/utils";
import { ArrowDown } from "lucide-react";

type Props = {
  label: string;
  content: ReactNode;

  status: boolean;
  setStatus: (status: boolean) => void;

  parentClassName?: string;
  className?: string;
  contentClassName?: string;
};

function Accordion({
  label,
  content,
  className,
  contentClassName,
  parentClassName,
  status,
  setStatus,
}: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  const [height, setHeight] = useState(0);

  useLayoutEffect(() => {
    if (!wrapperRef.current || !innerRef.current) return;

    if (status) {
      setHeight(innerRef.current.scrollHeight);
    } else {
      setHeight(0);
    }
  }, [status, content]);

  return (
    <div className={cn("overflow-hidden", parentClassName)}>
      <div
        className={cn(
          "rounded-3xl flex justify-between items-center px-6 py-5 select-none cursor-pointer",
          "bg-white",
          className,
        )}
        onClick={() => setStatus(!status)}>
        <span className="font-medium">{label}</span>

        <ArrowDown
          className={cn(
            "w-3 fill-secondary transition-all duration-300 ease-in-out",
            status ? "rotate-180" : "",
          )}
        />
      </div>

      <div
        ref={wrapperRef}
        className={cn(
          "transition-all duration-300 ease-in-out",
          contentClassName,
        )}
        style={{ height }}>
        <div ref={innerRef} className="p-6 pt-3 box-border">
          {content}
        </div>
      </div>
    </div>
  );
}

export default Accordion;
