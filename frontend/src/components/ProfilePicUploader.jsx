import React, { useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { CameraIcon } from '@heroicons/react/24/outline';
import { Avatar, Tooltip } from '@material-tailwind/react';

function ProfilePicUploader({ isOpen, onClose , onOpen, selectedFile, setSelectedFile}) {
  

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = () => {
    // setSelectedFile(selectedFile);
    onClose();
  };

  return (
    (isOpen)? 
      (
        <Transition.Root show={isOpen} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={onClose}>
          <div className="flex items-center justify-center min-h-screen">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
            </Transition.Child>
  
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="z-10 bg-white rounded-lg overflow-hidden shadow-xl transform transition-all max-w-md w-full p-6">
                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                  Upload Profile Picture
                </Dialog.Title>
                <div className="mt-4">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="sr-only"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <div className="flex items-center justify-center w-24 h-24 mx-auto border-2 border-gray-300 border-dashed rounded-lg">
                      {selectedFile ? (
                        <img
                          src={URL.createObjectURL(selectedFile)}
                          alt="Selected file"
                          className="object-cover w-full h-full rounded-lg"
                        />
                      ) : (
                        <CameraIcon className="w-10 h-10 text-gray-400" />
                      )}
                    </div>
                  </label>
                </div>
                <div className="mt-6 flex justify-center">
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-md hover:bg-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                  >
                     Select
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="ml-3 inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-transparent rounded-md hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-500"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
      )
      :
      <Tooltip content="Upload yours profile picture">
        <Avatar onClick={onOpen} src={selectedFile? URL.createObjectURL(selectedFile): "https://docs.material-tailwind.com/img/face-2.jpg"} alt="avatar" />
      </Tooltip>
  );
}

export default ProfilePicUploader;