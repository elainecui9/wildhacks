import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { useState } from 'react'
import ChangeName from "../components/changeName";
import ChangeLocation from "../components/changeArticleLocation";

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Example() {
    const [isNameModalOpen, setNameModalOpen] = useState(false);
    const handleOpenNameModal = () => setNameModalOpen(true);
    const handleCloseNameModal = () => setNameModalOpen(false);
    const handleChangeName = () => {
    console.log("Adding a new folder...");
  };
  const [isChangeLocationOpen, setisChangeLocationOpen] = useState(false);
    const handleOpenChangeLocationModal = () => setisChangeLocationOpen(true);
  const handleCloseChangeLocationModal = () => setisChangeLocationOpen(false);
  const handleChangeLoction = () => {
    
  };
  const [selectedAction, setSelectedAction] = useState('');

  // Handler to open the ChangeColor component with specific action
  const handleAction = (action) => {
    setSelectedAction(action);
    if (action === 'Rename') {
      handleOpenNameModal();
    } else if (action === 'Move Article') {
      handleOpenChangeLocationModal(); // This line was corrected
    } else {
      // Handle other actions here
      console.log(`Action chosen: ${action}`);
    }
  };
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          Options
          <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                  onClick={() => handleAction('Remove Article')}
                >
                  Remove Article
                </a>
              )}
            </Menu.Item>
        
        
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                  onClick={() => handleAction('Rename')}
                >
                  Rename
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                  onClick={() => handleAction('Move Article')}
                >
                  Move Article
                </a>
              )}
            </Menu.Item>
            
          </div>
        </Menu.Items>
      </Transition>
      <ChangeName isOpen={isNameModalOpen} onClose={handleCloseNameModal} onAdd={handleChangeName}/>
      <ChangeLocation isOpen={isChangeLocationOpen} onClose={handleCloseChangeLocationModal} onAdd={handleOpenChangeLocationModal}/>
    </Menu>
  )
}
