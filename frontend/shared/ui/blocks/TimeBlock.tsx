interface TimeBlockProps {
  time: string;
  code: string;
}

export function TimeBlock({ time, code }: TimeBlockProps) {
  return (
    <div className="flex flex-col">
      <div className="font-bold text-xl text-[rgb(28,43,79)]">{time}</div>
      <div className="text-base text-[#6a6a6a] font-semibold">{code}</div>
    </div>
  );
}
