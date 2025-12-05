import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
   <div className="h-screen flex flex-col justify-center items-center text-[var(--foreground)] bg-[var(--background)]">
  <Link href="/employee-list">Employee List</Link>
  <Link href="/admin-page">Admin Page</Link>
  <Link href="/admin-delete">Admin Delet</Link>
</div>
  );
}
