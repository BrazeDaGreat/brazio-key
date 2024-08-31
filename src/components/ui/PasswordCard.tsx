import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Password from "../interfaces/Password";
import useCompany from "../hooks/useCompany";
import Icon from "./Icon";
export default function PasswordCard({
  password,
  setSelected,
  selected,
  pinKey = false,
  pinned,
}: {
  password: Password;
  setSelected: Dispatch<SetStateAction<Password | null>>;
  selected: Password | null;
  pinKey?: boolean;
  pinned?: Password[];
}) {
  const [name, logo] = useCompany(password.website);

  const [sel, setSel] = useState<boolean>(selected === password);

  useEffect(() => {
    setSel(selected === password);
  }, [selected]);

  function select() {
    setSelected(password);
  }

  return (
    <div
      className={
        "mx-2 my-2 p-2 flex gap-4 transition-all rounded-md cursor-pointer select-none " +
        (sel ? " bg-gray-300" : "hover:bg-gray-200")
      }
      onClick={select}
    >
      {/* Left Side */}
      <div className="">
        <img className="w-10 h-10 rounded-xl shadow-md" src={logo} alt="Logo" />
      </div>
      {/* Right Side */}
      <div className="flex flex-col items-start justify-center text-gray-500">
        {/* Website Name */}
        <div className="font-semibold">
          {!pinKey && pinned?.includes(password) && <Icon icon="pin-angle" />}{" "}
          {name}
        </div>
        {/* Email/Username */}
        <div className="text-xs opacity-70">
          {password.email || password.username}
        </div>
      </div>
    </div>
  );
}
