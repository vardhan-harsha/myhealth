export function AppLogo() {
    return (
        <div className="flex justify-center gap-2 md:justify-start">
            <a href="/" className="flex items-center gap-3 font-semibold text-2xl">
                <div className="flex size-12 items-center justify-center">
                    <img src="/helix_light.svg" alt="Helix" className="size-10 dark:hidden" />
                    <img src="/helix_dark.svg" alt="Helix" className="size-10 hidden dark:block" />
                </div>

                <span className="hidden md:block">Helix</span>
            </a>
        </div>
    );
}
