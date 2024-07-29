"use client";

import Icon from "@/components/ui/Icon";
import LabelInput from "@/components/ui/LabelInput";
import LoginButton from "@/components/ui/LoginButton";
import Testimonials from "@/components/ui/Testimonials";
import Window from "@/components/Window";
import pb from "@/lib/pocketbase";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function Home() {
  const { register, handleSubmit } = useForm();

  async function login() {
    const authData = await pb
      .collection("users")
      .authWithOAuth2({ provider: "github" });
    console.log(pb.authStore.model?.email);
    console.log(pb.authStore.isValid);
  }

  async function loginWithCreds(data: any) {
    console.log(data);
  }
  async function loginWithDiscord() {
    console.log("Ji discord");
  }
  async function loginWithGithub() {
    console.log("Ji github");
  }

  return (
    <main className="w-100 min-h-[100vh] flex items-center justify-center bg-slate-200">
      <Window className="flex gap-4 items-center justify-between p-4 flex-col sm:flex-row">
        {/* Left Section */}
        <div className="sm:w-1/2 gap-4 sm:gap-0 bg-gray-200 sm:min-h-[520px] md:h-full rounded-lg p-4 sm:p-5 flex flex-col justify-between">
          {/* Red Dot */}
          <div
            onClick={login}
            className="w-6 h-6 rounded-lg bg-red-400 flex items-center justify-center"
          >
            {/* White dot in between */}
            <div className="w-2 h-2 rounded-lg bg-white"></div>
          </div>
          {/* Content */}
          <div className="flex flex-col gap-6">
            <h1 className="text-3xl font-semibold">
              Let us manage your{" "}
              <span className="font-bold text-red-400">passwords</span>.
            </h1>
            <p className="opacity-60">
              Keep your passwords safe and secure with Brazio Key&trade;
              password manager.
            </p>
          </div>
          {/* Quotes */}
          <div>
            <Testimonials
              data={[
                {
                  author: "Dennis Ritchie",
                  avatar:
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Dennis_Ritchie_2011.jpg/220px-Dennis_Ritchie_2011.jpg",
                  position: "Software Engineer",
                  content:
                    "The software is very easy-to-use and I can easily manage my passwords.",
                },
                {
                  author: "Imran Khan",
                  avatar:
                    "https://media.licdn.com/dms/image/C4D03AQH6nyAzPqP5TA/profile-displayphoto-shrink_200_200/0/1535015983371?e=2147483647&v=beta&t=BeMq1IWHTYOP8YKtLUQY9A-jPYK7hq1tFGNkHCYlCf0",
                  position: "Ex-Prime Minister",
                  content:
                    "I love this app, it helps me keep all my passwords safe.",
                },
              ]}
            />
          </div>
        </div>
        <div className="sm:w-1/2 h-full p-8 flex flex-col gap-2">
          <h1 className="text-2xl font-semibold">Get Started</h1>
          <p className="opacity-60 text-sm">
            Login or get started with your account.
          </p>
          <div className="h-8"></div>
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(loginWithCreds)}
          >
            <LabelInput
              name="email"
              register={register}
              type="email"
              label="Email Address"
            />
            <LabelInput
              name="pin"
              register={register}
              type="number"
              label="PIN Code"
              attributes={{ min: 1000, max: 9999 }}
            />
            <button
              type="submit"
              onClick={loginWithCreds}
              className="text-sm bg-red-500 text-slate-50 font-semibold rounded-lg py-4 shadow-md transition-all opacity-70 hover:opacity-80"
            >
              Login
            </button>
          </form>
          <div className="flex h-12 items-center justify-center gap-4">
            <div className="h-1 bg-gray-200 w-[40%] rounded-full"></div>
            <span className="text-xs font-semibold opacity-70 select-none">
              or
            </span>
            <div className="h-1 bg-gray-200 w-[40%] rounded-full"></div>
          </div>
          <div className="p-2 flex gap-2 items-center justify-center">
            <LoginButton
              name="Discord"
              icon="discord"
              onClick={loginWithDiscord}
              color="#7289da"
            />
            <LoginButton
              name="Github"
              icon="github"
              onClick={loginWithGithub}
              color="#2b3137"
            />
          </div>
          <div className="text-xs text-center font-semibold opacity-60 pt-4">
            &copy; 2020-2024 Braze Dev. All rights reserved.
          </div>
        </div>
      </Window>
    </main>
  );
}

// "use client";

// import pb from "@/lib/pocketbase";
// import { useEffect, useState } from "react";

// export default function Home() {
//   const [logged, setLogged] = useState(false);

//   useEffect(() => {
//     setLogged(pb.authStore.isValid);
//   }, []);

//   async function login() {
//     const authData = await pb
//       .collection("users")
//       .authWithOAuth2({ provider: "discord" });
//     setLogged(pb.authStore.isValid);
//   }

//   async function logout() {
//     await pb.authStore.clear();
//     setLogged(false);
//   }

//   return (
//     <main>
//       {!logged && <button onClick={login}>Login with Discord</button>}
//       {logged && <h1>Logged in with Discord wtf</h1>}
//       {logged && <button onClick={logout}>Logout</button>}
//     </main>
//   );
// }
