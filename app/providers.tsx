"use client";

import { WhopApp } from "@whop/react/components";
import { WhopThemeScript } from "@whop/react/theme";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <WhopThemeScript />
      <div className="frosted-ui" data-is-root-theme="true">
        <WhopApp>{children}</WhopApp>
      </div>
    </>
  );
}
