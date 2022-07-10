type Props = {};

export default function Header({}: Props) {
  return (
    <div className="px-4 md:px-12 py-2 h-16 flex flex-row items-center justify-between fixed top-0 left-0 right-0 bg-white z-40">
      <div className="w-auto h-full">
        <img
          src="https://dummyimage.com/130x90.jpg?text=Ini Logo"
          alt=""
          className="h-full w-auto"
        />
      </div>
      <button className="bg-blue-500 hover:bg-blue-600 px-3 py-2 rounded text-white">Login</button>
    </div>
  );
}
