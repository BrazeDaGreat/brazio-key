interface WindowProps {
  children: Array<React.ReactNode> | React.ReactNode;
  className?: string;
}

export default function Window(props: WindowProps) {
  return (
    <div
      className={`${props.className} w-full md:w-[768px] md:h-[576px] bg-slate-100 md:rounded-lg md:shadow-lg`}
    >
      {props.children}
    </div>
  );
}
