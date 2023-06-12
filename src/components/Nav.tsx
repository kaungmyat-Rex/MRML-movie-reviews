const Nav = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col justify-center items-center pt-3">
        {" "}
        <h1 className="z-20 bg-gradient-to-r from-purple-500 to-pink-500 inline-block text-2xl rounded-sm pl-2 pr-2 font-bold lg:text-white lg:text-4xl lg:mt-12 lg:border-2 lg:border-white lg:pb-1 ">
          MRMl
        </h1>
        <p className="z-20 bg-gradient-to-r from-purple-500 to-pink-500 inline-block bg-clip-text text-transparent text-lg pt-1 lg:text-white lg:text-3xl lg:font-bold lg:mb-9">
          Movie Reviews with Myanmar Language
        </p>
      </div>
    </div>
  );
};

export default Nav;
