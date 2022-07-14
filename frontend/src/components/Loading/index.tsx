type Props = {};

export default function Loading({}: Props) {
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-[99]">
      <div className="space-y-2">
        <div className="loading ml-8">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <p className="text-white font-medium text-xl md:text-2xl">Loading..</p>
      </div>
    </div>
  );
}
