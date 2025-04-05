import { AppSidebar } from "@/components/app-sidebar";
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/ui/sidebar";
import DashboardNavbar from "@/components/ui/dashboard-navbar";
import { auth } from "@/auth";
import type { Session } from "next-auth";

async function DashboardLayout({ children }: { children: React.ReactNode }) {
	// const { currentLang } = useLocaleStore();
	const session = (await auth()) as Session;
	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset>
				<div className="container relative mt-12 md:px-12 flex w-full flex-1 flex-col gap-4 pt-0 md:mt-16 lg:mt-20 mx-auto">
					<DashboardNavbar session={session} />
					<main className="container mx-0 md:mx-0 mb-20 grid flex-1 items-start gap-4 ">
						{children}
					</main>
				</div>
			</SidebarInset>
		</SidebarProvider>
	);
}

export default DashboardLayout;
