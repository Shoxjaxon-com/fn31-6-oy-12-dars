import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div>
      <header className="flex bg-blue-200 p-4">
       <div className="container mx-auto flex items-center justify-between">
       <div>
          <Link to="/" className="text-xl font-bold text-blue-600">
            C
          </Link>
        </div>

        <div>
          <ul className="flex gap-4">
            <li>
              <Link to="/" className="text-black hover:border bg-black text-white p-3 rounded-md">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-black hover:bg-slate-400 p-3 rounded-md">
                About
              </Link>
            </li>
            <li>
              <Link to="/product" className="text-black hover:bg-slate-400 p-3 rounded-md">
                Product
              </Link>
            </li>
            <li>
              <Link to="/cart" className="text-black hover:bg-slate-400 p-3 rounded-md">
                Cart
              </Link>
            </li>
          </ul>
        </div>
       </div>
      </header>
    </div>
  );
}

export default Header;