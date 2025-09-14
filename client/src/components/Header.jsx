const Header = () => {
    return (
      <header className="flex items-center justify-between px-6 py-3 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-800">Micro-Entrepreneur Portal</h2>
        <div
          className="w-10 h-10 rounded-full bg-cover"
          style={{
            backgroundImage:
              "url('https://upload.wikimedia.org/wikipedia/en/thumb/6/69/IIT_Madras_Logo.svg/1200px-IIT_Madras_Logo.svg.png')",
          }}
        ></div>
      </header>
    );
  };
  
  export default Header;
  