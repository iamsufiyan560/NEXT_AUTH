import Sidebar from "@/components/Sidebar";

export default function CombinedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="flex ">
        <Sidebar />
        {children}
      </div>
    </>
  );
}

// src/app/layout.server.tsx
