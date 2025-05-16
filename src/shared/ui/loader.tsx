function Loader() {
  return (
    <div className="flex size-full items-center justify-center">
      <div className="flex flex-row gap-2">
        <div className="size-4 animate-bounce rounded-full bg-blue-700 [animation-delay:.7s]"></div>
        <div className="size-4 animate-bounce rounded-full bg-blue-700 [animation-delay:.3s]"></div>
        <div className="size-4 animate-bounce rounded-full bg-blue-700 [animation-delay:.7s]"></div>
      </div>
    </div>
  );
}

export { Loader };
