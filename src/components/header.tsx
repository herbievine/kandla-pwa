import { Link } from "@tanstack/react-router";

type Props = {
  label: string;
  showBackButton?: boolean;
};

export function Header({ label, showBackButton = false }: Props) {
  return (
    <div className="sticky h-16 top-0 left-0 flex justify-center items-center border-b border-neutral-300 backdrop-blur-sm z-50">
      <div className="px-4 mx-auto max-w-5xl w-full flex justify-between items-center">
        <div className="flex space-x-4 items-center">
          {showBackButton ? (
            <Link to="/" className="font-semibold">
              {"<"}
            </Link>
          ) : null}
          <h1 className="text-lg font-medium">{label}</h1>
        </div>
        {/* <div className="flex space-x-4 items-center">
          <span className="font-semibold">{user.login}</span>
          <img src={user.image_url} alt={`${user.login}'s profile picture`} className="w-10 rounded-lg" />
        </div> */}
      </div>
    </div>
  );
}
