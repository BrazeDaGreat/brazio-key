import Icon from "./Icon";

interface LoginButtonProps {
  onClick: () => void;
  icon: string;
  name: string;
  color: string;
}

export default function LoginButton(props: LoginButtonProps) {
  const { color } = props;

  return (
    <button
      className="flex gap-2 items-center justify-center px-6 py-2 border rounded-md shadow-sm transition-colors duration-300"
      style={{
        color: color,
        borderColor: color,
        backgroundColor: "transparent", // default background
      }}
      onClick={props.onClick}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = color;
        e.currentTarget.style.color = "white";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = "transparent";
        e.currentTarget.style.color = color;
      }}
    >
      <Icon icon={props.icon} />
      <span className="font-semibold">{props.name}</span>
    </button>
  );
}
