function SuccessMessage({ message }: { message: string }) {
  return (
    <div className="p-4 mb-4 text-sm text-successText rounded bg-green-50">
      {message}
    </div>
  );
}

export default SuccessMessage;
