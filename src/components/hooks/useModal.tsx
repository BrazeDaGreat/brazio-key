export default function useModal() {
  const modal = () => {
    return (
      <div className="bk_modal absolute chupa_hua w-[100vw] h-[100vh] z-50 bg-black bg-opacity-50 items-center justify-center">
        <div className="bk_modal_box max-w-[256px] bg-slate-200 px-4 py-4 rounded-lg shadow-lg flex flex-col gap-4">
          <div className="bk_modal_question opacity-60 text-md text-center">
            Are you sure you want to delete this password? This action cannot be
            undone.
          </div>
          <div className="bk_buttons flex justify-end gap-2">
            <button className="text-sm border px-3 py-1 border-green-300 text-green-400 font-semibold rounded-md hover:bg-green-300 hover:text-gray-50 transition-colors">
              Yes
            </button>
            <button className="text-sm border px-3 py-1 border-red-300 text-red-400 font-semibold rounded-md  hover:bg-red-300 hover:text-gray-50 transition-colors">
              No
            </button>
          </div>
        </div>
      </div>
    );
  };

  const confirmBox = (question: string, yes: string, no: string) => {
    document.querySelector(".bk_modal_question")!.innerHTML = question;
    let btns = document.querySelectorAll(".bk_buttons button")!;
    btns.forEach((btn) => {});
    btns.item(0).setAttribute("onclick", `${yes}`);
    btns.item(1).setAttribute("onclick", `${no}`);

    document.querySelector(".bk_modal")!.classList.remove("chupa_hua");
    document.querySelector(".bk_modal")!.classList.add("flexible");
    console.log(document.querySelector(".bk_modal"));
  };

  const closeModal = () => {
    document.querySelector(".bk_modal")!.classList.add("chupa_hua");
    document.querySelector(".bk_modal")!.classList.remove("flexible");
  };

  return { modal, confirmBox, closeModal };
}
