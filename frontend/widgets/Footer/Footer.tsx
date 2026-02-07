import Container from "@/shared/ui/Container";
import Link from "next/link";
import Image from "next/image";

function Footer() {
  return (
    <div className="w-full py-8 max-md:px-4 bg-[#1C2B4F]">
      <Container className="w-270.5 max-md:w-full">
        <div className="flex flex-col gap-8 max-md:gap-4">
          <div className="flex gap-20 max-md:gap-4 max-md:flex-col-reverse justify-between">
            <div className="flex max-md:flex-col gap-10 max-md:gap-2 max-md:pt-2">
              <div className="text-white font-semibold text-sm">
                Popular destinations
              </div>
              <div className="flex gap-6 text-sm text-[#D0D5DD] max-md:gap-4 ">
                <div>Astana</div>
                <div>Dubai</div>
                <div>London</div>
                <div>Paris</div>
                <div>Aktobe</div>
                <div>Moscow</div>
              </div>
            </div>

            <hr className="hidden max-md:block h-px w-full bg-[#475467] border-none" />

            <div className="flex gap-4 max-md:justify-between">
              <Link href={"https://youtube.com/"}>
                <Image
                  src="/socials/youtube.svg"
                  alt=""
                  width={24}
                  height={24}
                />
              </Link>
              <Link href={"https://youtube.com/"}>
                <Image
                  src="/socials/youtube.svg"
                  alt=""
                  width={24}
                  height={24}
                />
              </Link>
              <Link href={"https://youtube.com/"}>
                <Image
                  src="/socials/youtube.svg"
                  alt=""
                  width={24}
                  height={24}
                />
              </Link>
              <Link href={"https://youtube.com/"}>
                <Image
                  src="/socials/youtube.svg"
                  alt=""
                  width={24}
                  height={24}
                />
              </Link>
              <Link href={"https://youtube.com/"}>
                <Image
                  src="/socials/youtube.svg"
                  alt=""
                  width={24}
                  height={24}
                />
              </Link>
              <Link href={"https://youtube.com/"}>
                <Image
                  src="/socials/youtube.svg"
                  alt=""
                  width={24}
                  height={24}
                />
              </Link>
              <Link href={"https://youtube.com/"}>
                <Image
                  src="/socials/youtube.svg"
                  alt=""
                  width={24}
                  height={24}
                />
              </Link>
              <Link href={"https://youtube.com/"}>
                <Image
                  src="/socials/youtube.svg"
                  alt=""
                  width={24}
                  height={24}
                />
              </Link>
            </div>
          </div>

          <hr className="h-px w-full bg-[#475467] border-none" />

          <div className="flex gap-10 self-start max-md:grid max-md:grid-cols-2">
            <div className="flex flex-col gap-3">
              <div className="text-white font-semibold text-sm">About us</div>
              <ul className="flex flex-col text-[#D0D5DD] gap-2 font-medium text-xs">
                <li>About Company</li>
                <li>News and Press-Realeses</li>
                <li>Our Rewards</li>
              </ul>
            </div>
            <div className="flex flex-col gap-3">
              <div className="text-white font-semibold text-sm">Corporate</div>
              <ul className="flex flex-col text-[#D0D5DD] gap-2 font-medium text-xs">
                <li>Corporate profile</li>
                <li>Corporate social responsibility</li>
                <li>Investors</li>
                <li>Procurement</li>
              </ul>
            </div>
            <div className="flex flex-col gap-3">
              <div className="text-white font-semibold text-sm">Партнерам</div>
              <ul className="flex flex-col text-[#D0D5DD] gap-2 font-medium text-xs">
                <li>Corporate flights</li>
                <li>Cargo transportation</li>
                <li>For travel agents</li>
                <li>Advertise with us</li>
              </ul>
            </div>

            <div className="flex flex-col gap-3">
              <div className="text-white font-semibold text-sm">Corporate</div>
              <ul className="flex flex-col text-[#D0D5DD] gap-2 font-medium text-xs">
                <li>Corporate profile</li>
                <li>Corporate social responsibility</li>
                <li>Investors</li>
                <li>Procurement</li>
              </ul>
            </div>
            <div className="flex flex-col gap-3">
              <div className="text-white font-semibold text-sm">Corporate</div>
              <ul className="flex flex-col text-[#D0D5DD] gap-2 font-medium text-xs">
                <li>Corporate profile</li>
                <li>Corporate social responsibility</li>
                <li>Investors</li>
                <li>Procurement</li>
              </ul>
            </div>
          </div>

          <hr className="h-px w-full bg-[#475467] border-none" />

          <div className="flex justify-between items-center max-md:flex-col-reverse">
            <div className="flex flex-col gap-4 text-xs font-medium text-white max-md:items-center">
              <div>© 2026 Vizier Airways JSC. All rights reserved.</div>

              <div className="flex flex-col gap-6 text-[#D0D5DD] max-md:flex-col max-md:items-center max-md:justify-center">
                <div className="flex gap-4">
                  <div>Terms and Conditions</div>
                  <div>Privacy Policy</div>
                </div>

                <div className="flex gap-4 max-md:flex-col max-md:items-center">
                  <div>Cookie Policy</div>
                  <div>Cookie Settings</div>
                </div>
              </div>
            </div>

            <div className="flex gap-6 max-md:flex-col max-md:items-center max-md:gap-4">
              <div className="text-white text-sm w-42.5 max-md:w-full font-bold">
                Download the Vizier Airways mobile app
              </div>

              <div className="flex gap-2">
                <Image
                  src="/application/appstore.svg"
                  alt=""
                  width={108}
                  height={31}
                />
                <Image
                  src="/application/googleplay.svg"
                  alt=""
                  width={108}
                  height={31}
                />
              </div>

              <hr className="hidden max-md:block h-px w-full bg-[#475467] border-none" />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Footer;
