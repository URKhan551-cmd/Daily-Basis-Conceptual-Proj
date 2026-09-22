// handle pwa installed prompts offline detection

import {useState, useEffect, useCallback} from "react";

interface BeforeInstallPromptEvent extends Event {
    prompt: () => Promise<void>;
    userChoice: Promise<{outcome: "accepted" | "dismissed"}>;
}


export function usePWA(){
    const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
    const [isInstalled, setIsInstalled] = useState<boolean>(false);
    const [isOffline, setIsOffline] = useState<boolean>(!navigator.online);
    const [showOfflineBanner, setShowOfflineBanner] = useState<boolean>(false);

   
    

    return {
        canInstall: !!installPrompt &&  !isInstalled,
        isInstalled,
        isOffline,
        showOfflineBanner,
        dismissOfflineBanner: () => setShowOfflineBanner(false),
        install,
    };
}

