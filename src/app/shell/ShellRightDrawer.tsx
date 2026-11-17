import React, { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Check,
  CreditCard,
  LogOut,
  Settings,
  Star,
  User,
  Wallet,
  Pocket,
  ShoppingBag,
  Vault,
  Luggage,
  ChevronRight,
  type LucideIcon,
} from "lucide-react";
import { WindowPositionRightIcon } from "@/components/icons/WindowPositionIcons";
import { ProgressiveBlur } from "@/components/ProgressiveBlur";

export interface FavItem {
  to: string;
  label: string;
  icon?: LucideIcon;
  color?: string;
}

export interface ShellRightDrawerProps {
  isRightOpen: boolean;
  setIsRightOpen: (open: boolean) => void;
  rightSidebarTab: "control" | "favorites";
  setRightSidebarTab: (tab: "control" | "favorites") => void;
  favorites: string[];
  favItems: FavItem[];
  pathname: string;
  fullPath: string;
  toggleFavorite: (route: string) => void;
  blurConfig: { enabled: boolean; tint: boolean };
}

const CONTROL_APPS = [
  {
    to: "/wallet",
    title: "Wallet",
    subtitle: "Dompet kas, komparasi harga & nota belanja",
    badge: "Dompet",
    icon: Wallet,
    accentColor: "bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 border-indigo-500/30",
  },
  {
    to: "/pocket",
    title: "Pocket",
    subtitle: "Kartu akses, voucher, tiket & slip saku",
    badge: "Saku",
    icon: Pocket,
    accentColor: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
  },
  {
    to: "/pouch",
    title: "Pouch",
    subtitle: "Organizer dokumen esensial & kit bepergian",
    badge: "Travel",
    icon: ShoppingBag,
    accentColor: "bg-pink-500/15 text-pink-600 dark:text-pink-400 border-pink-500/30",
  },
  {
    to: "/vault",
    title: "Vault",
    subtitle: "Brankas digital & identitas resmi terenkripsi",
    badge: "Kredensial",
    icon: Vault,
    accentColor: "bg-teal-500/15 text-teal-600 dark:text-teal-400 border-teal-500/30",
  },
  {
    to: "/trunk",
    title: "Trunk",
    subtitle: "Gudang perkakas & inventaris rumah tangga",
    badge: "Gudang",
    icon: Luggage,
    accentColor: "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30",
  },
];

export function ShellRightDrawer({
  isRightOpen,
  setIsRightOpen,
  rightSidebarTab,
  setRightSidebarTab,
  favorites,
  favItems,
  pathname,
  fullPath,
  toggleFavorite,
  blurConfig,
}: ShellRightDrawerProps) {
  const [expandedSection, setExpandedSection] = useState<"profile" | "general" | "billing" | null>(null);
  const [firstName, setFirstName] = useState("John");
  const [lastName, setLastName] = useState("Doe");
  const [email, setEmail] = useState("john.doe@example.com");
  const [profileSaved, setProfileSaved] = useState(false);
  const [desktopNotifications, setDesktopNotifications] = useState(true);
  const [emailSummaries, setEmailSummaries] = useState(false);

  const toggleSection = (section: "profile" | "general" | "billing") => {
    setExpandedSection((prev) => (prev === section ? null : section));
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 2000);
  };

  const displayName = `${firstName} ${lastName}`.trim() || "My Account";
  const initials =
    ((firstName.trim()[0] || "") + (lastName.trim()[0] || "")).toUpperCase() || "ME";

  return (
    <aside
      id="sidenavRight"
      className={`fixed inset-y-0 right-0 z-50 flex w-[350px] max-w-[85vw] flex-col liquid-glass-sidebar-right transition-transform duration-300 ease-in-out ${
        isRightOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* Right Sidebar Spacer: Tombol close / toggle kanan yang sejajar dengan header */}
      <div className="w-full h-[60px] sidebar-top-glass shrink-0 flex items-center justify-end px-3 border-b border-white/20 dark:border-white/10">
        <button
          type="button"
          className="size-9 rounded-full aspect-square text-white/90 hover:text-white hover:bg-white/20 active:scale-95 transition-all cursor-pointer flex items-center justify-center shrink-0"
          onClick={() => setIsRightOpen(false)}
          title="Sembunyikan Control Center"
          aria-label="Tutup sidebar kanan"
        >
          <WindowPositionRightIcon size={24} showArrow={false} />
        </button>
      </div>

      {/* Right Sidebar Tab Switcher: Ribbon Tab diturunkan sejajar di bawah garis header */}
      <div className="sidebar-tab-switcher-bar flex items-end w-full h-10 bg-white/10 dark:bg-white/5 shrink-0 gap-0 relative z-20">
        <button
          type="button"
          onClick={() => setRightSidebarTab("control")}
          className={`relative flex-1 h-10 flex items-center justify-center gap-2 px-3 text-xs transition-all cursor-pointer -mb-px ${
            rightSidebarTab === "control"
              ? "rounded-tl-none rounded-tr-[28px] sidebar-tab-active-glass !border-b-0"
              : "rounded-none sidebar-tab-inactive-glass"
          }`}
        >
          <Settings className="h-3.5 w-3.5 shrink-0" />
          <span className="truncate">Control</span>
        </button>
        <button
          type="button"
          onClick={() => setRightSidebarTab("favorites")}
          className={`relative flex-1 h-10 flex items-center justify-center gap-2 px-3 text-xs transition-all cursor-pointer -mb-px ${
            rightSidebarTab === "favorites"
              ? "rounded-tl-[28px] rounded-tr-none sidebar-tab-active-glass !border-b-0"
              : "rounded-none sidebar-tab-inactive-glass"
          }`}
        >
          <User className="h-3.5 w-3.5 shrink-0" />
          <span className="truncate">Profil Pengguna</span>
          {favorites.length > 0 && (
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold leading-none shrink-0 ${
                rightSidebarTab === "favorites"
                  ? "bg-amber-500/20 text-amber-600 dark:text-amber-400"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {favorites.length}
            </span>
          )}
        </button>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] px-4 py-4 sm:px-5 sidebar-menu-body-glass">
        {rightSidebarTab === "favorites" ? (
          <div className="flex flex-col gap-3 w-full">
            {/* Info Akun Pengguna (menyatu langsung di tab Profil Pengguna) */}
            <div className="flex items-center justify-between gap-3 rounded-xl p-3 border border-white/15 dark:border-white/10 bg-white/10 dark:bg-white/5 backdrop-blur-md">
              <div className="flex items-center gap-3 min-w-0">
                <div className="size-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                  {initials}
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-bold text-foreground truncate">{displayName}</span>
                  <span className="text-xs text-muted-foreground truncate">Free Plan</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => toggleSection("general")}
                className={`size-8 rounded-lg flex items-center justify-center border transition-colors cursor-pointer shrink-0 ${
                  expandedSection === "general"
                    ? "bg-primary text-primary-foreground border-primary shadow-2xs"
                    : "bg-white/15 dark:bg-white/10 hover:bg-white/25 dark:hover:bg-white/20 text-foreground border-white/15 dark:border-white/10"
                }`}
                title="Preferences"
                aria-label="Preferences"
              >
                <Settings className="size-4 shrink-0" />
              </button>
            </div>

            {/* Menu & Pengaturan Profil Pengguna (terintegrasi langsung di sidebar kanan tanpa modal) */}
            <div className="flex flex-col gap-2 w-full">
              {/* 1. Profile Settings */}
              <div
                className={`rounded-xl border backdrop-blur-md overflow-hidden transition-all ${
                  expandedSection === "profile"
                    ? "bg-white/15 dark:bg-white/10 border-primary/40 shadow-xs"
                    : "bg-white/10 dark:bg-white/5 border-white/15 dark:border-white/10"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleSection("profile")}
                  aria-expanded={expandedSection === "profile"}
                  className="group w-full flex items-center justify-between px-3 py-2.5 text-xs font-medium text-foreground hover:bg-white/15 dark:hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2.5 min-w-0">
                    <User
                      className={`size-4 shrink-0 transition-colors ${
                        expandedSection === "profile"
                          ? "text-primary"
                          : "text-muted-foreground group-hover:text-foreground"
                      }`}
                    />
                    <span className="truncate font-semibold">Profile Settings</span>
                  </span>
                  <ChevronRight
                    className={`size-3.5 shrink-0 transition-transform duration-200 ${
                      expandedSection === "profile"
                        ? "rotate-90 text-primary"
                        : "text-muted-foreground/60 group-hover:text-foreground"
                    }`}
                  />
                </button>

                {expandedSection === "profile" && (
                  <form
                    onSubmit={handleSaveProfile}
                    className="px-3 pb-3 pt-2 border-t border-white/15 dark:border-white/10 space-y-3 animate-in fade-in duration-150"
                  >
                    <div className="flex items-center gap-3 pb-2.5 border-b border-white/15 dark:border-white/10">
                      <div className="size-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm shrink-0 shadow-xs">
                        {initials}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-semibold text-foreground truncate">Profile Information</p>
                        <p className="text-[11px] text-muted-foreground truncate">
                          Update your personal details.
                        </p>
                        <button
                          type="button"
                          className="mt-1.5 px-2.5 py-1 rounded-lg bg-white/15 dark:bg-white/10 hover:bg-white/25 dark:hover:bg-white/20 text-[11px] font-medium text-foreground border border-white/15 dark:border-white/10 transition-colors cursor-pointer"
                        >
                          Change Avatar
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1">
                        <label className="text-[11px] font-medium text-muted-foreground block">
                          First Name
                        </label>
                        <input
                          type="text"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-background/70 dark:bg-background/50 border border-border/80 text-foreground outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] font-medium text-muted-foreground block">
                          Last Name
                        </label>
                        <input
                          type="text"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-background/70 dark:bg-background/50 border border-border/80 text-foreground outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-medium text-muted-foreground block">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-background/70 dark:bg-background/50 border border-border/80 text-foreground outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-semibold shadow-xs transition-all cursor-pointer"
                    >
                      {profileSaved ? (
                        <>
                          <Check className="size-3.5" />
                          <span>Saved</span>
                        </>
                      ) : (
                        <span>Save Changes</span>
                      )}
                    </button>
                  </form>
                )}
              </div>

              {/* 2. Preferences */}
              <div
                className={`rounded-xl border backdrop-blur-md overflow-hidden transition-all ${
                  expandedSection === "general"
                    ? "bg-white/15 dark:bg-white/10 border-primary/40 shadow-xs"
                    : "bg-white/10 dark:bg-white/5 border-white/15 dark:border-white/10"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleSection("general")}
                  aria-expanded={expandedSection === "general"}
                  className="group w-full flex items-center justify-between px-3 py-2.5 text-xs font-medium text-foreground hover:bg-white/15 dark:hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2.5 min-w-0">
                    <Settings
                      className={`size-4 shrink-0 transition-colors ${
                        expandedSection === "general"
                          ? "text-primary"
                          : "text-muted-foreground group-hover:text-foreground"
                      }`}
                    />
                    <span className="truncate font-semibold">Preferences</span>
                  </span>
                  <ChevronRight
                    className={`size-3.5 shrink-0 transition-transform duration-200 ${
                      expandedSection === "general"
                        ? "rotate-90 text-primary"
                        : "text-muted-foreground/60 group-hover:text-foreground"
                    }`}
                  />
                </button>

                {expandedSection === "general" && (
                  <div className="px-3 pb-3 pt-2 border-t border-white/15 dark:border-white/10 space-y-2 animate-in fade-in duration-150">
                    <div className="flex items-center justify-between gap-3 p-2.5 rounded-lg bg-background/50 dark:bg-background/35 border border-border/60">
                      <div className="min-w-0">
                        <p className="text-xs font-medium text-foreground truncate">
                          Desktop Notifications
                        </p>
                        <p className="text-[11px] text-muted-foreground truncate">
                          Receive alerts for tasks and events.
                        </p>
                      </div>
                      <button
                        type="button"
                        role="switch"
                        aria-checked={desktopNotifications}
                        onClick={() => setDesktopNotifications((v) => !v)}
                        className={`w-9 h-5 rounded-full relative transition-colors cursor-pointer shrink-0 ${
                          desktopNotifications ? "bg-primary" : "bg-muted"
                        }`}
                      >
                        <span
                          className={`size-3.5 bg-white rounded-full absolute top-[3px] transition-all shadow-2xs ${
                            desktopNotifications ? "right-[3px]" : "left-[3px]"
                          }`}
                        />
                      </button>
                    </div>

                    <div className="flex items-center justify-between gap-3 p-2.5 rounded-lg bg-background/50 dark:bg-background/35 border border-border/60">
                      <div className="min-w-0">
                        <p className="text-xs font-medium text-foreground truncate">
                          Email Summaries
                        </p>
                        <p className="text-[11px] text-muted-foreground truncate">
                          Receive daily agenda emails.
                        </p>
                      </div>
                      <button
                        type="button"
                        role="switch"
                        aria-checked={emailSummaries}
                        onClick={() => setEmailSummaries((v) => !v)}
                        className={`w-9 h-5 rounded-full relative transition-colors cursor-pointer shrink-0 ${
                          emailSummaries ? "bg-primary" : "bg-muted"
                        }`}
                      >
                        <span
                          className={`size-3.5 bg-white rounded-full absolute top-[3px] transition-all shadow-2xs ${
                            emailSummaries ? "right-[3px]" : "left-[3px]"
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* 3. Billing & Subscription */}
              <div
                className={`rounded-xl border backdrop-blur-md overflow-hidden transition-all ${
                  expandedSection === "billing"
                    ? "bg-white/15 dark:bg-white/10 border-primary/40 shadow-xs"
                    : "bg-white/10 dark:bg-white/5 border-white/15 dark:border-white/10"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleSection("billing")}
                  aria-expanded={expandedSection === "billing"}
                  className="group w-full flex items-center justify-between px-3 py-2.5 text-xs font-medium text-foreground hover:bg-white/15 dark:hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2.5 min-w-0">
                    <CreditCard
                      className={`size-4 shrink-0 transition-colors ${
                        expandedSection === "billing"
                          ? "text-primary"
                          : "text-muted-foreground group-hover:text-foreground"
                      }`}
                    />
                    <span className="truncate font-semibold">Billing &amp; Subscription</span>
                  </span>
                  <ChevronRight
                    className={`size-3.5 shrink-0 transition-transform duration-200 ${
                      expandedSection === "billing"
                        ? "rotate-90 text-primary"
                        : "text-muted-foreground/60 group-hover:text-foreground"
                    }`}
                  />
                </button>

                {expandedSection === "billing" && (
                  <div className="px-3 pb-3 pt-2 border-t border-white/15 dark:border-white/10 animate-in fade-in duration-150">
                    <div className="p-3.5 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl text-white shadow-md">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-bold text-sm">Free Plan</h4>
                        <span className="px-2 py-0.5 bg-white/20 rounded-full text-[10px] font-semibold backdrop-blur-sm">
                          Current
                        </span>
                      </div>
                      <p className="text-blue-100 text-[11px] leading-relaxed mb-3">
                        You are currently on the free tier. Upgrade to unlock premium features and higher limits.
                      </p>
                      <button
                        type="button"
                        className="w-full bg-white text-blue-600 px-3 py-2 rounded-lg font-bold text-xs hover:bg-blue-50 transition-colors cursor-pointer shadow-2xs"
                      >
                        Upgrade to Pro
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* 4. Sign Out */}
              <button
                type="button"
                onClick={() => {}}
                className="group w-full flex items-center justify-between rounded-xl px-3 py-2.5 text-xs font-medium transition-all border backdrop-blur-md bg-rose-500/10 border-rose-500/20 text-rose-600 dark:text-rose-400 hover:bg-rose-500/20 cursor-pointer"
              >
                <span className="flex items-center gap-2.5 min-w-0">
                  <LogOut className="size-4 shrink-0" />
                  <span className="truncate font-semibold">Sign Out</span>
                </span>
              </button>
            </div>

            {favItems.length > 0 && (
              <div className="flex flex-col gap-1.5 w-full">
                {favItems.map((item) => {
                  const FavIcon = item.icon || Star;
                  const isActive = pathname === item.to || fullPath === item.to;
                  const toPath = item.to.split("?")[0];
                  const toSearch = item.to.includes("?")
                    ? Object.fromEntries(new URLSearchParams(item.to.split("?")[1]))
                    : undefined;
                  return (
                    <div
                      key={item.to}
                      className={`group flex items-center justify-between rounded-xl px-2.5 py-2 text-xs transition-all border backdrop-blur-md ${
                        isActive
                          ? "bg-white/25 dark:bg-white/10 border-primary/40 text-primary shadow-2xs font-semibold"
                          : "bg-white/10 dark:bg-white/5 border-white/15 dark:border-white/10 text-foreground hover:bg-white/20 dark:hover:bg-white/10"
                      }`}
                    >
                      <Link
                        to={toPath as any}
                        search={toSearch as any}
                        onClick={() => setIsRightOpen(false)}
                        className="flex items-center gap-2.5 min-w-0 flex-1 cursor-pointer"
                      >
                        <div
                          className={`grid h-7 w-7 place-items-center rounded-lg shrink-0 ${
                            isActive
                              ? "bg-primary/20 text-primary"
                              : "bg-white/15 dark:bg-white/10 text-muted-foreground group-hover:text-foreground"
                          }`}
                        >
                          <FavIcon className={`h-4 w-4 ${!isActive && item.color ? item.color : ""}`} />
                        </div>
                        <span className="truncate">{item.label}</span>
                      </Link>
                      <button
                        type="button"
                        onClick={() => toggleFavorite(item.to)}
                        className="p-1 rounded-lg text-amber-500 hover:bg-amber-500/15 transition-colors cursor-pointer shrink-0"
                        title="Hapus dari Favorit"
                      >
                        <Star className="h-3.5 w-3.5 fill-amber-500" />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ) : (
          <nav className="flex flex-col gap-2.5 items-start w-full">
            <div className="grid grid-cols-1 gap-2 w-full">
              {CONTROL_APPS.map((item) => {
                const ItemIcon = item.icon;
                const isActive = pathname === item.to;
                return (
                  <Link
                    key={item.to}
                    to={item.to as any}
                    onClick={() => setIsRightOpen(false)}
                    className={`group flex items-center justify-between rounded-xl p-2.5 transition-all border backdrop-blur-md cursor-pointer ${
                      isActive
                        ? "bg-white/25 dark:bg-white/10 border-primary/40 text-primary shadow-xs font-semibold ring-1 ring-primary/30"
                        : "bg-white/10 dark:bg-white/5 border-white/15 dark:border-white/10 text-foreground hover:bg-white/20 dark:hover:bg-white/10 hover:border-white/25"
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <div
                        className={`grid h-8 w-8 place-items-center rounded-lg shrink-0 border ${item.accentColor} transition-transform group-hover:scale-105`}
                      >
                        <ItemIcon className="h-4 w-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-xs truncate text-foreground group-hover:text-primary transition-colors">
                            {item.title}
                          </span>
                          <span className="text-[9px] font-semibold px-1.5 py-0.2 rounded-full bg-muted/70 text-muted-foreground">
                            {item.badge}
                          </span>
                        </div>
                        <p className="text-[11px] text-muted-foreground truncate mt-0.5">
                          {item.subtitle}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground/60 group-hover:text-foreground group-hover:translate-x-0.5 transition-all shrink-0 ml-1" />
                  </Link>
                );
              })}
            </div>
          </nav>
        )}

        {blurConfig.enabled && (
          <div className="sticky bottom-0 inset-x-0 -mx-4 -mb-4 sm:-mx-5 sm:-mb-4 h-8 pointer-events-none z-20">
            <ProgressiveBlur
              direction="bottom"
              height={32}
              blurLevels={[0.5, 1, 2, 4, 8]}
              tint={
                blurConfig.tint
                  ? "linear-gradient(to bottom, transparent 0%, hsl(var(--card) / 0.8) 100%)"
                  : false
              }
            />
          </div>
        )}
      </div>
    </aside>
  );
}
