import { DesktopIcon } from "@/shared/assets/icons";
import { useState, useEffect } from "react";

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}

declare global {
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent;
  }
}

const PWAInstallButton = () => {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isInstallable, setIsInstallable] = useState<boolean>(false);
  const [isInstalled, setIsInstalled] = useState<boolean>(false);
  console.log(isInstallable);
  useEffect(() => {
    const checkIfInstalled = () => {
      if (window.matchMedia("(display-mode: standalone)").matches) {
        setIsInstalled(true);
      }
    };

    // Listen for the beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: BeforeInstallPromptEvent) => {
      console.log("beforeinstallprompt event fired");

      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();

      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    const handleAppInstalled = () => {
      console.log("PWA was installed");
      setIsInstalled(true);
      setIsInstallable(false);
      setDeferredPrompt(null);
    };

    checkIfInstalled();

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async (): Promise<void> => {
    if (!deferredPrompt) {
      console.log("No install prompt available");
      return;
    }

    try {
      await deferredPrompt.prompt();

      // Wait for the user to respond to the prompt
      const { outcome } = await deferredPrompt.userChoice;

      console.log(`User response to the install prompt: ${outcome}`);

      if (outcome === "accepted") {
        console.log("User accepted the install prompt");
      } else {
        console.log("User dismissed the install prompt");
      }

      setDeferredPrompt(null);
      setIsInstallable(false);
    } catch (error) {
      console.error("Error during installation:", error);
    }
  };

  if (isInstalled) {
    return (
      <div className="flex gap-2 text-sm font-semibold text-green-600 items-center bg-green-100 py-2.5 px-4 rounded-lg mt-4">
        ✓ App Installed
      </div>
    );
  }

  // if (!isInstallable) {
  //   return null;
  // }
  // TODO: technically shouldn't show
  return (
    <button
      onClick={handleInstallClick}
      className="flex gap-2 text-sm font-semibold text-white hover:cursor-pointer items-center bg-primary-600 hover:bg-primary-700 py-2.5 px-4 rounded-lg mt-4 transition-colors"
    >
      <DesktopIcon />
      Download Desktop App
    </button>
  );
};

export default PWAInstallButton;
