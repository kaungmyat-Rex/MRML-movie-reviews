interface props {
  text: string;
}

export const SeemoreBtn = ({ text }: props) => {
  return (
    <a
      className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg box-border text-fuchsia-500 block h-12 text-base font-bold p-[1px] relative no-underline w-36 z-10 items-center bg-black justify-center hover:bg-transparent hover:text-black"
      href="/"
    >
      <span className="items-center bg-black rounded-lg flex justify-center h-full transition w-full hover:bg-transparent">
        {text}
      </span>
    </a>
  );
};
