import { useRouter } from "next/navigation";

interface PageHeaderProps {
  title: string;
  showClose?: boolean;
}

export function PageHeader({ title , showClose= false}: PageHeaderProps) {
  const router = useRouter();

  const handleClose = () => {
    router.back(); // Navigate back to the previous page
  };

  return (
    <header className="bg-gray-100 text-gray-900 p-4 mt-4 mb-4 flex justify-between items-center border-b border-gray-300">
      <h1 className="text-xl font-semibold">{title}</h1>
      {showClose && <button
        onClick={handleClose}
        className="text-gray-600 hover:text-gray-900 focus:outline-none"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>}
    </header>
  );
}