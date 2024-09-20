
import { Link } from "react-router-dom";
import { useUsers } from "../context/UsersContext"

export default function Navbar() {
    const { currentUser } = useUsers();

  return (
    <div>
      <div className='bg-gray-200 w-40 h-screen fixed transition-transform transform z-20'>
        <ul className="flex flex-col h-full justify-start items-center py-4 space-y-10 mt-20">
          <li className="px-5 py-3 hover:bg-gray-300 w-5/6 border-solid border-2 border-black text-center font-bold">
            <Link to={"/team"}  className="block ">Team</Link>
          </li>
          <li className="px-5 py-3 hover:bg-gray-300 w-5/6 border-solid border-2 border-black text-center font-bold">
            <Link to={'/addPlayer'} className="block">Add Player</Link>
          </li>
          <li className="px-5 py-3 hover:bg-gray-300 w-5/6 border-solid border-2 border-black text-center font-bold">
            <Link to={'/editPlayer'} className="block">Edit Player</Link>
          </li>
          <li className="px-5 py-3 hover:bg-gray-300 w-5/6 border-solid border-2 border-black text-center font-bold">
            <Link to="/" className="block">Logout</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}