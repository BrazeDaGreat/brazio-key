interface IconProps {
  icon: string;
  className?: string;
}

export default function Icon({ icon, className }: IconProps) {
  return <i className={`bi bi-${icon} ${className}`}></i>;
}
