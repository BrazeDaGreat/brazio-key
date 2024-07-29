interface LabelInputProps {
  name: string;
  type: string;
  register: any;
  label: string;
  attributes?: any;
}

export default function LabelInput(props: LabelInputProps) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm opacity-40 font-semibold" htmlFor={props.name}>
        {props.label}
      </label>
      <input
        type={props.type}
        className="px-4 py-3 font-semibold rounded-lg border-gray-200 border-2 bg-transparent outline-none focus:border-red-200 transition-colors"
        {...props.register(props.name)}
        {...props.attributes}
      />
    </div>
  );
}
