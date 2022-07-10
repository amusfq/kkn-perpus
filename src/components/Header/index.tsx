type Props = {};

export default function Header({}: Props) {
  return (
    <div className="px-4 md:px-12 py-2 h-16 flex items-center">
      <div className="w-auto h-full">
        <img
          src="https://dummyimage.com/130x90.jpg?text=Ini Logo"
          alt=""
          className="h-full w-auto"
        />
      </div>
    </div>
  );
}
