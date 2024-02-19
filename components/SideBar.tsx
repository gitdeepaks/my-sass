"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Montserrat } from "next/font/google";
import { cn } from "@/lib/utils";
import {
  Code2Icon,
  ImageIcon,
  Layout,
  LayoutDashboard,
  MessageSquare,
  Music,
  Settings2,
  VideoIcon,
} from "lucide-react";

const montserrate = Montserrat({ weight: "600", subsets: ["latin"] });

const routes = [
  {
    label: "DashBoard",
    icon: LayoutDashboard,
    href: "/dashboard",
    color: "text-sky-500",
  },
  {
    label: "Conversation",
    icon: MessageSquare,
    href: "/conversation",
    color: "text-violet-500",
  },
  {
    label: "Image Generation",
    icon: ImageIcon,
    href: "/image",
    color: "text-pink-500",
  },
  {
    label: "Video Generation",
    icon: VideoIcon,
    href: "/video",
    color: "text-orange-700",
  },
  {
    label: "Music Generation",
    icon: Music,
    href: "/music",
    color: "text-emerald-700",
  },
  {
    label: "Code Generation",
    icon: Code2Icon,
    href: "/code",
    color: "text-green-700",
  },
  {
    label: "Settings",
    icon: Settings2,
    href: "/settings",
  },
];

const SideBar = () => {
  return (
    <div className="space-y-4 py-4 flex flec-col h-full bg-[#111827] text-white">
      <div className="px-3 py-2 flex-1">
        <Link href="/dashboard" className="flex items-center pl-3 mb-14">
          <div className="relative w-8 h-8 mr-4">
            <Image fill alt="logo" src="/logo.svg" />
          </div>
          <h1 className={cn("text-3xl font-bold", montserrate.className)}>
            Genus
          </h1>
        </Link>
        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              href={route.href}
              key={route.href}
              className="text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition"
            >
              <div className="flex items-center flex-1">
                <route.icon className={cn("w-5 h-4 mr-3", route.color)} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
