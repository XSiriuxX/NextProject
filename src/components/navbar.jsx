import Link from "next/link";

export default function Navbar() {
  return (
    <nav className=" bg-slate-700">
      <div className=" container mx-auto flex justify-between items-center py-1">
        <h3 className=" font-bold text-2xl">
          <Link href="/">NextCRUD</Link>
        </h3>
        <ul className=" flex font-bold gap-x-5 text-lg">
          <li>
            <Link className=" text-slate-300 hover:text-slate-100" href="/new">
              New
            </Link>
          </li>
          <li>
            <Link
              className=" text-slate-300 hover:text-slate-100"
              href="/about"
            >
              About
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
