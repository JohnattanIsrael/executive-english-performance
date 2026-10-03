"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/** Time-of-day greeting computed in the viewer's timezone (static HTML falls back to "Welcome back"). */
export function Greeting({ name }: { name: string }) {
  const hour = useSyncExternalStore(
    subscribe,
    () => new Date().getHours(),
    () => null,
  );
  const salutation =
    hour === null ? "Welcome back" : hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
  return (
    <>
      {salutation}, {name}.
    </>
  );
}
