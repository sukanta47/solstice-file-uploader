import { isRouteErrorResponse, useRouteError, Link } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();

  let title = "Something went wrong";
  let message = "An unexpected error occurred. Please try again.";
  let statusCode: number | undefined;

  if (isRouteErrorResponse(error)) {
    statusCode = error.status;
    if (error.status === 404) {
      title = "Page not found";
      message = "The page you’re looking for doesn’t exist or has been moved.";
    } else if (error.status === 401 || error.status === 403) {
      title = "Access denied";
      message = "You don’t have permission to view this page.";
    } else if (error.status >= 500) {
      title = "Server error";
      message = "Something went wrong on our side. Please try again later.";
    }
  } else if (error instanceof Error) {
    message = error.message || message;
  }

  return (
    <div className="h-96 flex justify-center text-slate-600 px-4 mt-10">
      <div className="w-full max-w-xl rounded-2xl bg-gray-200 p-6 shadow-lg backdrop-blur">
        <div className="flex items-center justify-center mb-4">
          <div className="h-10 w-10 rounded-full border border-red-500/40 flex items-center justify-center">
            <span className="text-red-400 text-xl">!</span>
          </div>
        </div>
        <h1 className="text-xl font-semibold text-center mb-1">{title}</h1>
        {statusCode && (
          <p className="text-xs text-center text-slate-400 mb-3">
            Error code:{" "}
            <span className="font-mono text-slate-200">{statusCode}</span>
          </p>
        )}

        <p className="text-sm text-slate-600 text-center mb-6">{message}</p>

        <div className="flex flex-col gap-2 items-center justify-center">
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="w-1/2 rounded-lg px-3 py-2 text-sm font-medium border border-slate-400 bg-slate-100 text-slate-900 hover:bg-slate-600 hover:text-white transition"
          >
            Refresh page
          </button>

          <Link
            to="/"
            className="w-1/2 rounded-lg px-3 py-2 text-sm font-medium text-center border border-slate-400 text-slate-600 hover:bg-blue-400 hover:text-white transition"
          >
            Go back home
          </Link>
        </div>
      </div>
    </div>
  );
}
