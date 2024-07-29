interface WindowProps {
  children: Array<React.ReactNode> | React.ReactNode;
  className?: string;
}

export default function Window(props: WindowProps) {
  return (
    <div
      className={`${props.className} w-[768px] h-[576px] bg-slate-100 rounded-lg shadow-lg`}
    >
      {props.children}
    </div>
  );
}
