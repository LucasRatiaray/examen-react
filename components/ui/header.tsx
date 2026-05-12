"use client";

import { useState } from "react";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { buttonVariants } from "@/components/ui/button";
import { MenuToggleIcon } from "@/components/ui/menu-toggle-icon";
import { ModeToggle } from "@/components/ui/mode-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useJournal } from "@/context/JournalContext";

export function Header() {
  const [open, setOpen] = useState(false);
  const t = useTranslations("Nav");

  const { state } = useJournal();
  const obsCount = state.observations.length;

  const links = [
    {
      label: (
        <span className="flex items-center gap-2">
          {t("journal")}
          {
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
              {obsCount > 0 ? obsCount : "0"}
            </span>
          }
        </span>
      ),
      href: "/journal",
    },
    { label: t("launches"), href: "/launches" },
    { label: t("about"), href: "/about" },
  ];

  return (
    <>
      {/* Mobile header */}
      <header className="flex h-14 items-center justify-between border-b px-4 lg:hidden">
        <div className="text-lg font-bold">
          <Link href="/">BirdMachine</Link>
        </div>

        <DropdownMenu open={open} onOpenChange={setOpen}>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center justify-center rounded-md p-1 outline-none">
              <MenuToggleIcon open={open} className="size-5" duration={300} />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-48">
            {links.map((link) => (
              <DropdownMenuItem key={link.label} asChild>
                <a href={link.href}>{link.label}</a>
              </DropdownMenuItem>
            ))}
            <ModeToggle />
          </DropdownMenuContent>
        </DropdownMenu>
      </header>

      {/* Desktop header */}
      <header className="fixed inset-x-0 top-4 z-50 mx-auto hidden w-full max-w-4xl rounded-md border border-border bg-background/50 shadow backdrop-blur-lg lg:block supports-[backdrop-filter]:bg-background/50">
        <nav className="flex h-12 w-full items-center justify-between px-2">
          <div className="text-lg font-bold">
            <Link href="/">BirdMachine</Link>
          </div>
          <div className="flex items-center gap-2">
            {links.map((link, i) => (
              <Link
                key={i}
                className={buttonVariants({ variant: "ghost" })}
                href={link.href}
              >
                {link.label}
              </Link>
            ))}
            <ModeToggle />
          </div>
        </nav>
      </header>
    </>
  );
}
