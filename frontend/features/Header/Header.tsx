import Container from "@/shared/ui/Container";
import Link from "next/link";

function Header() {
  return (
    <header>
      <Container className="py-8">
        <div className="flex items-center justify-between gap-9">
          <Link href={"/"} className="text-2xl text-white font-bold">
            Vizier Airways
          </Link>

          <div className="flex items-center gap-12 text-white font-semibold">
            <Link href={"/"}>Gallery</Link>
            <Link href={"/faq"}>FAQ</Link>
            <Link href={"/"}>Contacts</Link>
            <Link
              href={"/"}
              className="px-6 py-2 bg-[#242424] cursor-pointer rounded-2xl hover:bg-[#242424e9]">
              Login
            </Link>
          </div>
        </div>
      </Container>
    </header>
  );
}

export default Header;
