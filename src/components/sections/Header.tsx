'use client'

import { MdClose, MdOutlineGridView } from "react-icons/md";
import { useCallback, useEffect, useRef, useState } from "react";
import navData from "@/data/navData";
// import { useTheme } from "next-themes";
import { Button, Scroll } from "@/components/ui";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/Button";

export default function Header() {
  // const { theme, setTheme } = useTheme();
  const [menu, setMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [activeNav, setActiveNav] = useState<string>("home");

  const handleClickClose = useCallback((id: string) => {
    setMenu(false);
    setActiveNav(id);
  }, []);

  const handleClose = useCallback(
    (e: any) => {
      if (menuRef.current && !menuRef.current?.contains(e.target)) {
        setMenu(false);
      }
    },
    [menuRef]
  );

  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector("#header");
      header?.classList.toggle("shadow-header", window.scrollY >= 80);

      const sectionIds = Array.from(
        document.querySelectorAll("section[id]")
      ).map((section) => section.getAttribute("id") || "home");
      const currentSectionId =
        sectionIds.find((sectionId) => {
          const section = document.getElementById(sectionId);
          if (!section) return false;
          const sectionTop = section.offsetTop - 200;
          const sectionBottom = sectionTop + section.offsetHeight;
          return (
            window.scrollY >= sectionTop && window.scrollY <= sectionBottom
          );
        }) || "home";

      setActiveNav(currentSectionId);
    };

    window.addEventListener("scroll", handleScroll);

    if (!menu) return;
    window.addEventListener("click", handleClose);
    window.addEventListener("scroll", handleClose);

    return () => {
      window.removeEventListener("click", handleClose);
      window.removeEventListener("scroll", handleClose);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleClose, menu]);

  return (
    <header
      id="header"
      ref={menuRef}
      className="max-md:shadow-header w-full fixed max-md:bottom-0 md:top-0 left-0 z-50 bg-white md:bg-neutral-50"
    >
      <nav className="max-w-4xl px-4 md:mx-auto h-14 md:h-16 flex justify-between items-center gap-4 bg-inherit">
        {/* <Button variant={'link'} className="lowercase" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
          <abbr
            title="Change Theme"
            className="no-underline"
          >
            s2sharpit
          </abbr>
        </Button> */}
        <Link
          href={"/"}
          className={cn(buttonVariants({ variant: "link" }), "lowercase")}
        >
          s2sharpit
        </Link>

        <div
          className={`${
            menu ? "bottom-0" : "-bottom-full"
          } fixed md:static left-0 w-full md:w-fit bg-neutral-50 pt-8 md:pt-0 px-2 sm:px-6 md:px-0 pb-14 md:pb-0 shadow-header md:shadow-none rounded-t-3xl md:rounded-none md:transition-none duration-300`}
        >
          <ul className="grid grid-cols-3 md:flex gap-4 justify-between md:w-[30rem]">
            {navData.map((data) => (
              <Scroll
                to={data.name}
                variant={"link"}
                key={data.name}
                onClick={() => handleClickClose(data.name)}
                className={`${
                  activeNav === data.name && "text-neutral-800 font-semibold"
                } flex flex-col items-center text-sm text-neutral-700 font-medium transition duration-300 hover:text-neutral-800 capitalize hover:cursor-pointer`}
              >
                <span className="md:hidden text-xl">{data.icon}</span>{" "}
                {data.name}
              </Scroll>
            ))}
          </ul>
          <Button
            variant={"link"}
            className="md:hidden absolute right-4 bottom-2 text-3xl"
            onClick={() => setMenu(false)}
          >
            <MdClose />
          </Button>
        </div>
        <Button
          variant={"link"}
          className="md:hidden text-3xl"
          onClick={() => setMenu(true)}
        >
          <MdOutlineGridView />
        </Button>
      </nav>
    </header>
  );
}
