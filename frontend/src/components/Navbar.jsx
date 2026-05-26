
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="bg-black text-white px-10 py-4 flex justify-between items-center shadow-lg">

      <Link
        to="/"
        className="text-3xl font-bold"
      >
        ShopEasy
      </Link>

      <div className="flex gap-6 text-lg">
        <Link to="/">Products</Link>

        <Link to="/admin">Admin</Link>
      </div>
    </div>
  );
}

export default Navbar;