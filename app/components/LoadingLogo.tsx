import Image from "next/image";

function LoadingLogo() {
  return (
    <div className="w-full h-full grid place-content-center">
      <Image
        className="w-10 h-10 animate-spin select-none"
        src="https://www.svgrepo.com/show/448500/loading.svg"
        alt="Loading icon"
        width={1000}
        height={1000}
        draggable={false}
      />
    </div>
  );
}

export default LoadingLogo;
