function ErrorMessage({ message }: { message: string }) {
  return (
    <div className="p-4 mb-4 text-sm text-red-800 rounded bg-red-50">
      {message}
    </div>
  );
}

export default ErrorMessage