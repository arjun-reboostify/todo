// Navbar.tsx

import { useState } from 'react'; // Import useState normally
import { FiMenu, AiOutlineHome, VscAdd } from '../assets';
import type React from 'react'; // Import React as a type

interface NavbarProps {
  isSignedIn: boolean;
  addTask: () => void;
  changeModalMode: (mode: 'notSignedIn' | 'signOut') => () => void;
  handleCurrentPage: (targetPage: string) => () => void;
  handleSidebarClick: () => void;
}

export function Navbar({
  isSignedIn,
  addTask,
  changeModalMode,
  handleCurrentPage,
  handleSidebarClick
}: NavbarProps): JSX.Element {
  // State to control the visibility and URL of the iframe
  const [showIframe, setShowIframe] = useState(false);
  const [iframeUrl, setIframeUrl] = useState('');

  // Function to show the iframe with the specified URL
 // Function to show the iframe with the specified URL
 function handleShowIframe(url: string) {
  return function () {
    if (isSignedIn) {
      setIframeUrl(url);
      setShowIframe(true);
    } else changeModalMode('notSignedIn')(); // Show the modal if not signed in
  };
}


  function handleHideIframe(): void {
    setShowIframe(false);
    setIframeUrl('');
  }

  return (
    <div>
      <nav
        className='flex w-full justify-between bg-blue px-5 py-3 
                  children:flex children:gap-2 sm:px-10'
      >
        <div
          className='children:btn-focus children:rounded children:p-1 children:text-xl
                     children:transition hover:children:bg-white-ish focus-visible:children:ring-gray-200'
        >
          <button type='button' onClick={handleSidebarClick}>
            <FiMenu />
          </button>
          <button type='button' onClick={handleCurrentPage('Today')}>
            <AiOutlineHome />
          </button>
          {/* Buttons to show different iframes */}
          <button type='button' onClick={handleShowIframe('https://akdimensia-1.vercel.app/')}>
            .
          </button>
          <button type='button' onClick={handleShowIframe('https://yt-wheat.vercel.app/')}>
            ▶
          </button>
         
        </div>
        <div
          className='children:btn-focus flex gap-2 children:rounded children:p-1
                     children:text-xl children:transition-colors hover:children:bg-white-ish 
                     focus-visible:children:ring-gray-200'
        >
          <button
            type='button'
            onClick={isSignedIn ? addTask : changeModalMode('notSignedIn')}
          >
            <VscAdd />
          </button>
        </div>
        {/* Add akdimensia text */}
        
  <a href='https://portfolioakd.vercel.app' target='_blank' rel='noopener noreferrer'>
    <div className='text-green-500 font-bold text-xl'>
      akdimensia
    </div>
  </a>


      </nav>

      {showIframe && (
        <div style={fullscreenIframeContainerStyle}>
          <iframe
            src={iframeUrl} // Dynamic URL for the iframe
            title='Fullscreen Iframe'
            style={fullscreenIframeStyle}
          ></iframe>
          <button style={closeButtonStyle} onClick={handleHideIframe}>
            ✖
          </button>
        </div>
      )}
    </div>
  );
}

// Inline styles for the fullscreen iframe
const fullscreenIframeContainerStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.8)', // Optional: Background overlay
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000 // Make sure it's on top
};

const fullscreenIframeStyle: React.CSSProperties = {
  width: '96%',
  height: '96%',
  border: 'none'
};

const closeButtonStyle: React.CSSProperties = {
  position: 'absolute',
  top: '0px',
  right: '0px',
  backgroundColor: 'red',
  color: 'white',
  border: 'none',
  padding: '0px',
  cursor: 'pointer',
  fontSize: '16px',
  zIndex: 1001 // Make sure it's above the iframe
};
