import { MobileSidebar } from "./mobile-sidebar"

export const Navbar = () => {
    return (
        <nav className="pt-4 px-6 flex items-center justify-between">
            <div className="flex-col hidden lg:flex">
                <h1 className="text-2xl font-semibold">
                    Dashboard
                </h1>
                <p className="text-muted-foreground">Moniter all of your Subscriptions, Sales and Active Now.</p>
            </div>
            <MobileSidebar />
        </nav>
    )
}