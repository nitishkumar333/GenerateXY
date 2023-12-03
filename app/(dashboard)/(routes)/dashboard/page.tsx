import { UserButton } from "@clerk/nextjs";

export default function DashboardPage() {
  return (
    <div>
      <p>Dashboard Page (Proteced)</p>
      <UserButton afterSignOutUrl="/" />
    </div>
  );
}
