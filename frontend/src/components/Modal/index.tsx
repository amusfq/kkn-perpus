import { Dispatch, Fragment, ReactNode, SetStateAction, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import classNames from "../../../Utils/classNames";

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
  size?: String;
  title?: string;
}

export default function Modal({ open, setOpen, title, size = 'md', children }: Props) {
  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className={
                classNames("relative bg-white w-full rounded-lg text-left shadow-xl transform transition-all sm:my-8", 
                  size === 'sm' ? 'max-w-sm' : '',
                  size === 'md' ? 'max-w-md' : '',
                  size === 'lg' ? 'max-w-lg' : '',
                  size === 'xl' ? 'max-w-xl' : '',
                  size === '2xl' ? 'max-w-2xl' : '',
                  size === '3xl' ? 'max-w-3xl' : '',
                  size === '4xl' ? 'max-w-4xl' : '',
                  size === '5xl' ? 'max-w-5xl' : '',
                  size === '6xl' ? 'max-w-6xl' : '',
                  size === '7xl' ? 'max-w-7xl' : '',
              )}>
                <div className="px-4 py-3 flex flex-row justify-between">
                  <h1 className="font-medium">{title}</h1>
                  <button
                    className="text-gray-300 hover:text-red-500"
                    onClick={() => setOpen(false)}
                  >
                    <i className="fa-solid fa-circle-xmark"></i>
                  </button>
                </div>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  {children}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
