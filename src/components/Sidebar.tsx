import React, { useState, useRef } from 'react';
import {
  VscAdd,
  VscInbox,
  VscChevronUp,
  BsCalendar3,
  BsCalendar4
} from '../assets';
import { Profile, ProjectList } from './core';
import { Fetching } from './ui';
import type { ProjectType } from '../types';

interface SidebarProps {
  isLoading: boolean;
  isSignedIn: boolean;
  isFetching: boolean;
  currentPage: string;
  allProjects: ProjectType[];
  isSidebarOpen: boolean;
  isProjectsOpen: boolean;
  addProject: () => void;
  changeModalMode: (mode: 'notSignedIn' | 'signOut') => () => void;
  handleCurrentPage: (page: string) => () => void;
  handleProjectsClickOpen: () => void;
}

export function Sidebar({
  isLoading,
  isSignedIn,
  isFetching,
  currentPage,
  allProjects,
  isSidebarOpen,
  isProjectsOpen,
  addProject,
  changeModalMode,
  handleCurrentPage,
  handleProjectsClickOpen
}: SidebarProps): JSX.Element {
  const [openIframeIndex, setOpenIframeIndex] = useState<number | null>(null);
  const iframeContainerRef = useRef<HTMLDivElement | null>(null);

  const toggleIframe = (index: number): void => {
    setOpenIframeIndex((prev) => {
      const newIndex = prev === index ? null : index;

      // Scroll to the iframe container if it's the last iframe being opened
      if (newIndex === index && iframeContainerRef.current) 
        iframeContainerRef.current.scrollIntoView({ behavior: 'smooth' });
      
      return newIndex;
    });
  };

  const renderProjectList = (project: ProjectType): JSX.Element => (
    <ProjectList
      id={project.id}
      title={project.title}
      first={false}
      currentPage={currentPage}
      isProjectsOpen={isProjectsOpen}
      handleCurrentPage={handleCurrentPage}
      key={project.id}
    />
  );

  const iframesData = [
    { title: 'Music', url: 'https://cyroscorp.github.io/0/tools/1.html' },
    { title: 'FlashCards', url: 'https://cyroscorp.github.io/0/tools/2.html' },
    { title: 'search wikipedia', url: 'https://cyroscorp.github.io/0/tools/6.html' },
    { title: 'Simple Timer', url: 'https://cyroscorp.github.io/0/tools/d.html' },
    { title: 'Clock', url: 'https://cyroscorp.github.io/0/tools/q.html' },
    { title: 'Motivation', url: 'https://cyroscorp.github.io/0/tools/e.html' },
    { title: 'Tips', url: 'https://cyroscorp.github.io/0/tools/Blog.html' },
    { title: 'Meditate breathing', url: 'https://cyroscorp.github.io/0/tools/7.html' }
  ];

  return (
    <aside
      className={`${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } fixed z-20 flex h-full w-[95vw] flex-col bg-black text-white py-4 pr-2 pb-16
        pl-4 transition-transform duration-300 sm:w-[500px] sm:pl-9 sm:pt-5 overflow-y-auto`}
    >
      <div
        className='children:btn-focus flex flex-1 flex-col gap-1
                   children:flex children:cursor-pointer children:select-none children:items-center
                   children:gap-4 children:rounded children:p-2 children:transition children:duration-300
                   hover:children:bg-gray-700 focus-visible:children:ring-blue-400'
      >
        <button
          className={`${
            currentPage === 'Inbox' ? '!bg-gray-700 font-bold' : 'bg-gray-800 text-white'
          } p-2 rounded`}
          onClick={handleCurrentPage('Inbox')}
        >
          <VscInbox className='text-xl text-blue-500' /> Inbox
        </button>
        <button
          className={`${
            currentPage === 'Today' ? '!bg-gray-700 font-bold' : 'bg-gray-800 text-white'
          } btn-today before:absolute before:text-[10px] before:font-normal 
            before:text-green-500 p-2 rounded`}
          onClick={handleCurrentPage('Today')}
        >
          <BsCalendar4 className='text-xl text-green-500' />
          Today
        </button>
        <button
          className={`${
            !['Inbox', 'Today'].includes(currentPage) ? '!bg-gray-700' : 'bg-gray-800 text-white'
          } !mb-0 p-2 rounded`}
          onClick={handleProjectsClickOpen}
        >
          <BsCalendar3 className='text-xl text-purple-500' />
          Projects
          <VscChevronUp
            className={`${
              isProjectsOpen ? 'rotate-180' : 'rotate-0'
            } ml-auto text-xl transition-transform duration-300`}
          />
        </button>
        <div
          id='projects'
          className='children:btn-focus ml-9 -mr-2 flex max-h-[500px] flex-col !gap-2 overflow-hidden
                     !p-0 !pr-2 hover:!bg-transparent children:w-[calc(100%-6px)] children:rounded children:p-1 
                     hover:children:bg-gray-700'
        >
          {allProjects.map(renderProjectList)}
          {isFetching && <Fetching sidebar />}
          <button
            className={`${
              !allProjects.length && 'mt-1'
            } group flex items-center gap-2 hover:bg-gray-700`}
            type='button'
            onClick={isSignedIn ? addProject : changeModalMode('notSignedIn')}
            tabIndex={isProjectsOpen ? 0 : -1}
            style={{ backgroundColor: 'white', color: 'black' }} // Button color set to white
          >
            <i className='rounded-full p-1 transition-colors duration-300 group-hover:bg-red-500'>
              <VscAdd className='transition-colors duration-300 group-hover:text-white' />{' '}
            </i>
            New Project
          </button>
        </div>
      </div>
      <div className='flex min-h-[48px] items-center rounded bg-gray-700 p-2 px-3'>
        {isLoading ? (
          <Fetching sidebar />
        ) : (
          <Profile isSignedIn={isSignedIn} changeModalMode={changeModalMode} />
        )}
      </div>
      <div className='mt-4 space-y-2' ref={iframeContainerRef}>
        {isSignedIn ? (
          iframesData.map((iframeData, index) => (
            <div key={index}>
              <button
                onClick={(): void => toggleIframe(index)} // Explicit return type added
                className='bg-gray-800 text-white p-2 rounded w-full'
              >
                {iframeData.title}
              </button>
              {openIframeIndex === index && (
                <div className='mt-2 h-[400px] w-full border-2 border-gray-300'>
                  <iframe
                    src={iframeData.url} // Use the corresponding URL
                    className='w-full h-full'
                    title={iframeData.title} // Use the title for accessibility
                  />
                </div>
              )}
            </div>
          ))
        ) : (
          <p className='text-center text-gray-500'>Please sign in to access more features</p>
        )}
      </div>
    </aside>
  );
}
