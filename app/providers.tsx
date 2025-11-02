"use client";

import { useEffect } from "react";
import { Theme, WhopApp } from "@whop/react/components";
import { WhopThemeScript } from "@whop/react/theme";
import { Theme as FrostedTheme } from "frosted-ui";

export default function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const apply = () => {
      const theme = mql.matches ? "dark" : "light";
      const el = document.documentElement;
      el.classList.remove("light", "dark", "light-theme", "dark-theme");
      el.classList.add(theme);
      el.style.colorScheme = theme;
    };
    apply();
    mql.addEventListener("change", apply);
    return () => mql.removeEventListener("change", apply);
  }, []);

  return (
    <>
      <WhopThemeScript />
      <FrostedTheme appearance="inherit">
        <Theme appearance="inherit">
          <WhopApp>{children}</WhopApp>
        </Theme>
      </FrostedTheme>
    </>
  );
}
