const NotFound = () => {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm">
      <h1 className="text-2xl font-semibold text-black">Page not found</h1>
      <p className="mt-2 text-slate-600">
        The page you are looking for does not exist.
      </p>
    </div>
  );
};

export default NotFound;
