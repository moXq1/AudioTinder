interface HeadingProps {
  title: string;
  center?: boolean;
  subtitle: string;
}

export const Heading: React.FC<HeadingProps> = ({
  center,
  subtitle,
  title,
}) => {
  return (
    <div className={center ? "text-center" : "text-start"}>
      <h2 className="text-2xl font-bold">{title}</h2>
      <p className="font-light text-neutral-500 mt-2">{subtitle}</p>
    </div>
  );
};
