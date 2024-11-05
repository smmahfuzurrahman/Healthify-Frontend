import NavMenu from "./NavMenu";

const Navbar = () => {
  return (
    <header className="flex items-center justify-between p-4 bg-white shadow-sm md:py-6 md:px-10 mb-10">
      {/* Logo Section */}
      <div className="flex items-center">
        <h1 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500 md:text-4xl">
          Healthify<span className="text-indigo-600">AI</span>
        </h1>
      </div>

      {/* Menu Items Section */}
      <div className="md:flex md:space-x-6 hidden">
        <NavMenu />
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden">
        <NavMenu />
      </div>
    </header>
  );
};

export default Navbar;
