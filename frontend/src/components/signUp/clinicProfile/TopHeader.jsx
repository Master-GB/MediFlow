import React from 'react'
import {
  Building2, Calendar as CalendarIcon, Clock as ClockIcon, FileText as FileTextIcon,
 Map as MapIcon, Phone as PhoneIcon, User as UserIcon, Users as UsersIcon, FileSignature as FileSignatureIcon,
  FileCheck as FileCheck2Icon, Briefcase, Calendar as CalendarIcon2,
  Clock as ClockIcon2
} from 'lucide-react';

const topHeader = () => {
  return (
    <div>
        <header className="fixed top-0 left-0 right-0 h-20 bg-slate-800/90 backdrop-blur-sm border-b border-slate-700/50 z-20 flex-shrink-0">
        <div className="h-full w-full flex items-center justify-between px-4 md:px-6">
          <div className="flex items-center">
            <button
              onClick={back}
              className="flex items-center space-x-1.5 px-3.5 py-2 rounded-lg hover:bg-slate-700/60 transition-all duration-200 group "
              aria-label="Go back"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-blue-400 group-hover:text-blue-300 transition-colors mt-0.5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-md font-bold text-gray-300 group-hover:text-white transition-colors">
                Back
              </span>
            </button>

          </div>
          <div className="flex items-center space-x-2  px-4 py-1 ">
            <Building2 className="h-12 w-12 text-blue-400" />
            <span className="font-medium text-2xl">Clinic Profile</span>
          </div>
          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">Open main menu</span>
            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </header>
    </div>
  )
}

export default topHeader