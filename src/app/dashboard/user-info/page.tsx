import { auth } from "@/auth";
import Image from "next/image";
import { Card } from "@/components/ui/card"; // Assuming you have this component from ShadCN UI
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"; // Assuming ShadCN Avatar component

export default async function UserInfo() {
	const session = await auth();

	return (
		<div className="flex justify-center items-center h-full bg-gradient-to-r from-blue-100 to-blue-300 p-4">
			<Card className="w-full max-w-sm bg-white shadow-lg rounded-lg p-6 space-y-4">
				<div className="text-center">
					<h1 className="text-3xl font-semibold text-gray-800">
						NextAuth v5 + Next 15
					</h1>
					<p className="text-gray-600 mt-2">User signed in with:</p>
					<p className="font-medium text-gray-800">
						Name: {session?.user?.name}
					</p>
					<p className="font-medium text-gray-800">
						Email: {session?.user?.email}
					</p>
				</div>

				{session?.user?.image && (
					<div className="flex justify-center mt-4">
						<Avatar>
							<AvatarFallback>{session?.user?.name?.charAt(0)}</AvatarFallback>
							<AvatarImage
								src={session.user.image}
								width={48}
								height={48}
								alt={session.user.name ?? "Avatar"}
								className="rounded-full border-2 border-white"
							/>
						</Avatar>
					</div>
				)}

				{/* Fallback for when there's no image */}
				{!session?.user?.image && (
					<div className="flex justify-center mt-4">
						<div className="w-12 h-12 bg-gray-300 text-white rounded-full flex items-center justify-center font-semibold">
							{session?.user?.name?.charAt(0)}
						</div>
					</div>
				)}
			</Card>
		</div>
	);
}
