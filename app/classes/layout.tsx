import Navbar from "../components/Navbar";

function ClassLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-dvh gap-y-4 md:gap-0 p-4 xl:p-0 md:pb-4 w-full mx-auto flex flex-col">
      <Navbar />
      {children}
    </div>
  );
}

export default ClassLayout;
