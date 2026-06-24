import { useEffect } from "react";

type Options = {
  /** user id for the admin or authenticated user */
  userId: string | null;
  /** role label, e.g. 'admin' or 'visitor' (currently unused but kept for future use) */
  role?: string;
  /**
   * Optional callback fired when local online/active state changes.
   * Your future WebSocket layer can use this to emit presence updates.
   */
  onPresenceChange?: (online: boolean) => void;
};

/**
 * useOnlinePresence
 *
 * Pure frontend presence tracking: listens to browser events and calls
 * `onPresenceChange` when the user appears online/active or idle/offline.
 * This is backend-agnostic and can be wired to any WebSocket server.
 */
export function useOnlinePresence({
  userId,
  role,
  onPresenceChange,
}: Options) {
  useEffect(() => {
    if (!userId) return;

    let isActive = true;
    let lastActivity = Date.now();

    const notify = (online: boolean) => {
      if (onPresenceChange) onPresenceChange(online);
    };

    const markActivity = () => {
      isActive = true;
      lastActivity = Date.now();
      notify(true);
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        isActive = false;
        notify(false);
      } else {
        markActivity();
      }
    };

    const activityEvents = ["mousemove", "keydown", "click", "scroll"];

    activityEvents.forEach((evt) =>
      window.addEventListener(evt, markActivity, { passive: true }),
    );
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("beforeunload", () => {
      isActive = false;
      notify(false);
    });

    const interval = window.setInterval(() => {
      const now = Date.now();
      // If no activity for 60s, mark offline (locally).
      if (now - lastActivity > 60_000 && isActive) {
        isActive = false;
        notify(false);
      }
    }, 30_000);

    // initial mark online (locally)
    markActivity();

    return () => {
      activityEvents.forEach((evt) =>
        window.removeEventListener(evt, markActivity),
      );
      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange,
      );
      window.clearInterval(interval);
      notify(false);
    };
  }, [userId, role, onPresenceChange]);
}


