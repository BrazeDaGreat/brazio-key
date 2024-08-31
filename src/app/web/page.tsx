"use client";

import useLoad from "@/components/hooks/useLoad";
import Icon from "@/components/ui/Icon";
import Window from "@/components/Window";
import pb from "@/lib/pocketbase";
import { redirect } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Password from "@/components/interfaces/Password";
import { Span } from "next/dist/trace";
import PasswordCard from "@/components/ui/PasswordCard";
import useCompany from "@/components/hooks/useCompany";
import useModal from "@/components/hooks/useModal";

export default function Webapp() {
  if (!pb.authStore.isValid) redirect("/"); // We don't need the user if not logged in.

  const { loading, jsx } = useLoad();
  // const [data, setData] = useState<Password[]>([]);

  const [pinnedPass, setPinnedPass] = useState<Password[]>([]);
  const [normalPass, setNormalPass] = useState<Password[]>([]);

  const [selected, setSelected] = useState<Password | null>(null);
  const [screen, setScreen] = useState<string>("none");

  useEffect(() => {
    if (selected) setScreen("pswd");
  }, [selected]);

  async function getData() {
    loading(true);
    try {
      const gData = await pb
        .collection("passwords")
        .getFullList<Password>(200, {
          sort: "-created",
          filter: `owner = "${pb.authStore.model?.email}"`,
        });

      let pinned: Password[] = [];
      let normal: Password[] = [];

      gData.forEach((pass) => {
        if (pass.pinned) {
          pinned.push(pass);
        }
        normal.push(pass);
      });

      setPinnedPass(pinned);
      setNormalPass(normal);
      loading(false);
    } catch (e) {
      console.warn(e);
    }
  }
  useEffect(() => {
    if (pb.authStore.isValid) getData();
  }, []);

  let avatarName = pb.authStore.model?.username;
  avatarName = avatarName?.substring(0, 2);

  const { modal } = useModal();

  return (
    <main className="w-100 min-h-[100vh] flex items-center justify-center bg-slate-200">
      {loading() && jsx()}
      {modal()}
      <Window className="flex flex-col">
        {/* Top Bar */}
        <div className="w-full p-4 pb-0 flex items-center justify-between">
          {/* New Button */}
          <button className="bg-red-500 opacity-60 text-white px-2 py-1 rounded-full hover:opacity-90 transition-all">
            <Icon icon="plus-lg" />
          </button>
          {/* Search Bar */}
          <div className="flex relative">
            <div className="absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] flex gap-2 opacity-60 items-center justify-center text-sm pointer-events-none">
              <Icon icon="search" />
              <span className="">Search</span>
            </div>
            <input
              type="text"
              className="shadow-sm w-full outline-none bg-gray-300 bg-opacity-30 py-1 px-2 min-w-[288px] rounded-full text-sm"
            />
          </div>
          {/* Profile */}
          <div className="relative">
            {/* Avatar */}
            <div className="w-8 h-8 border-2 rounded-full flex items-center justify-center text-gray-400 border-red-500 border-opacity-60 cursor-pointer hover:border-opacity-100 hover:bg-red-500 transition-all hover:text-slate-50">
              <span className="text-xs font-semibold">{avatarName}</span>
            </div>
          </div>
        </div>
        {/* Info Bar */}
        <div className="w-full p-4 flex items-center justify-between border-b border-gray-300 text-xs">
          <div className="select-none opacity-50">
            Brazio Key&trade; v1.6-beta
          </div>
          <div className="hover:underline opacity-50">
            <a href="https://discord.gg/XXkSFkdx8H" target="_blank">
              Join Discord
            </a>
          </div>
        </div>
        {/* Content Window */}
        <div className="flex items-center justify-center">
          {/* Left Passwords Bar */}
          <div className="flex flex-col gap-2 w-[40%] h-[480px] border-r bk_pass_bar relative">
            {/* Pinned Passwords */}
            <div className="flex gap-2 px-2 py-1 text-sm text-gray-400 select-none">
              <Icon icon="pin-angle" />
              <span>Pinned</span>
            </div>
            {/* Pinned Passwords List */}
            <div className="">
              {pinnedPass.length == 0 && (
                <div className="text-xs text-center w-full opacity-60">
                  No pinned passwords.
                </div>
              )}
              {pinnedPass.map((pass) => (
                <PasswordCard
                  key={pass.id}
                  password={pass}
                  setSelected={setSelected}
                  selected={selected}
                  pinKey={true}
                />
              ))}
            </div>
            {/* All Passwords */}
            <div className="flex gap-2 px-2 py-1 text-sm text-gray-400 select-none">
              <Icon icon="wallet2" />
              <span>All Passwords</span>
            </div>
            {/* All Passwords List */}
            <div className="">
              {normalPass.length == 0 && (
                <div className="text-xs text-center w-full opacity-60">
                  No passwords.
                </div>
              )}
              {normalPass.map((pass) => (
                <PasswordCard
                  key={pass.id}
                  password={pass}
                  setSelected={setSelected}
                  selected={selected}
                  pinned={pinnedPass}
                />
              ))}
            </div>

            {/* Generate Password Button */}
            <div className="sticky bottom-0 w-full flex gap-2 text-lg items-center bg-slate-100 px-2 py-1 border-t border-gray-300 cursor-pointer rounded-bl-lg transition-colors hover:bg-slate-200">
              <Icon icon="key" className="rotate-[135deg]" />
              <span className="text-sm">Generate Password</span>
            </div>
          </div>
          {/* Data Window */}
          <div className="w-[60%] h-[480px]">
            {screen === "none" && <ScreenNone />}
            {screen === "pswd" && (
              <ScreenPassword
                pass={selected!}
                pinnedList={pinnedPass}
                setPinnedPass={setPinnedPass}
              />
            )}
          </div>
        </div>
      </Window>
    </main>
  );
}

interface ScreenPasswordProps {
  pass: Password;
  pinnedList: Password[];
  setPinnedPass: Function;
}

function ScreenPassword({
  pass,
  pinnedList,
  setPinnedPass,
}: ScreenPasswordProps) {
  const [name, logo] = useCompany(pass.website);

  // censor the password by having * instead
  let d = [];
  for (let i = 0; i < pass.password.length; i++) {
    // d.push(<Icon icon="dot" />);
    d.push(<span>*</span>);
  }

  let createdDate = pass.created;
  // format the date as DD-MM-YYYY
  createdDate =
    createdDate.split(" ")[0] +
    " at " +
    createdDate.split(" ")[1].split(".")[0];

  function passwordStrength(password: string) {
    let strength = 0;

    // Check length
    if (password.length >= 8) strength += 1;
    if (password.length >= 12) strength += 1;

    // Check for numbers
    if (/\d/.test(password)) strength += 1;

    // Check for symbols
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength += 1;

    // Check for uppercase letters
    if (/[A-Z]/.test(password)) strength += 1;

    // Ensure the strength is capped at a maximum value of 5
    return Math.min(strength, 5);
  }

  // const { modal } = useModal();

  // function deleteButton() {
  //   modalWindow(
  //     "Are you sure?",
  //     ["Yes", "No"],
  //     [deleteButtonConfirm, modalDispose]
  //   );
  // }

  const { confirmBox, closeModal } = useModal();

  async function deleteButtonConfirm() {
    alert("Wow");
  }

  function deleteButton() {
    confirmBox("Kardun delete?", "deleteButtonConfirm()", "alert('Nhi')");
    // alert("kardia open");
  }

  return (
    <div className="">
      {/* Top Section */}
      <div className="p-5 flex items-center justify-between border-b border-gray-300">
        {/* Logo and Name */}
        <div className="flex items-center gap-4">
          <img
            src={logo}
            alt={name}
            className="w-16 h-16 rounded-lg shadow-md"
          />
          <span className="text-lg font-semibold">{name}</span>
        </div>
        {/* Controls */}
        <div className="flex items-center gap-4">
          <button
            onClick={deleteButton}
            className="flex gap-2 border px-3 py-2 rounded-md text-sm text-gray-400 border-gray-300 hover:border-red-400 hover:text-red-500 transition-colors"
          >
            <Icon icon="trash" />
            <span>Delete</span>
          </button>

          <PinButton
            pass={pass}
            pinned={pinnedList}
            setPinned={setPinnedPass}
          />
        </div>
      </div>

      {/* User Details Section */}
      <div className="p-5 flex flex-col gap-4">
        {/* Username */}
        <div className="bk_details">
          <div className="bk_icon flex items-center justify-center">
            <Icon icon="person" className="text-3xl text-red-500 opacity-40" />
          </div>
          <div className="bk_title text-xs text-gray-500 opacity-60">
            Username
          </div>
          <div className="bk_data">
            <span>{pass.username}</span>
          </div>
          <div className="bk_act"></div>
        </div>
        {/* Email */}
        <div className="bk_details">
          <div className="bk_icon flex items-center justify-center">
            <Icon icon="at" className="text-3xl text-red-500 opacity-40" />
          </div>
          <div className="bk_title text-xs text-gray-500 opacity-60">Email</div>
          <div className="bk_data">
            <span>{pass.email}</span>
          </div>
          <div className="bk_act"></div>
        </div>
        {/* Password */}
        <div className="bk_details">
          <div className="bk_icon flex items-center justify-center">
            <Icon
              icon="key"
              className="rotate-[135deg] text-3xl text-red-500 opacity-40"
            />
          </div>
          <div className="bk_title text-xs text-gray-500 opacity-60">
            Password
          </div>
          <div className="bk_data">
            <span>{[...d]}</span>
          </div>
          <div className="bk_act"></div>
        </div>
        {/* Password Strength */}
        <div className="bk_details">
          <div className="bk_icon flex items-center justify-center">
            <Icon icon="unlock" className="text-3xl text-red-500 opacity-40" />
          </div>
          <div className="bk_title text-xs text-gray-500 opacity-60">
            Password Strength
          </div>
          <div className="bk_data">
            <span>{passwordStrength(pass.password)}/5</span>
          </div>
          <div className="bk_act"></div>
        </div>
        {/* Created At */}
        <div className="bk_details">
          <div className="bk_icon flex items-center justify-center">
            <Icon
              icon="calendar-event"
              className=" text-2xl text-red-500 opacity-40"
            />
          </div>
          <div className="bk_title text-xs text-gray-500 opacity-60">
            Created At
          </div>
          <div className="bk_data">
            <span>{createdDate}</span>
          </div>
          <div className="bk_act"></div>
        </div>
      </div>
    </div>
  );
}

interface PinButtonProps {
  pass: Password;
  pinned: Password[];
  setPinned: Function;
}
function PinButton({ pass, pinned, setPinned }: PinButtonProps) {
  let isPinned = false;
  let style = "";
  if (pinned.includes(pass)) {
    style = "bg-green-400 text-white";
    isPinned = true;
  }

  async function action() {
    if (isPinned) {
      setPinned(pinned.filter((p) => p !== pass));
    } else {
      setPinned([...pinned, pass]);
    }
    await pb.collection("passwords").update(pass.id, { pinned: !isPinned });
  }

  return (
    <button
      className={
        "flex gap-2 border px-3 py-2 rounded-md text-sm text-gray-400 border-gray-300 hover:border-green-400 hover:text-green-500 transition-colors " +
        style
      }
      onClick={action}
    >
      <Icon icon="pin-angle " />
      <span>{isPinned ? "Unpin" : "Pin"}</span>
    </button>
  );
}

function ScreenNone() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <span className="text-xs text-gray-500 opacity-50">
        Nothing to see here.
      </span>
    </div>
  );
}
