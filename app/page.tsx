import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="h-screen flex flex-col justify-center items-cente text-white">
        <Link href="/employee-list">Employee List</Link>
        <Link href="/admin-page"> Amdin Page</Link>

    </div>
  );
}
