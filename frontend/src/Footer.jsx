import React from 'react';

export function Footer() {
  return (
    <footer className="mt-16 border-t bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 py-10">
        
        
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          
          
          <div>
            <h3 className="text-xl font-bold text-gray-800">
              SalesSavvy
            </h3>
            <p className="mt-1 text-sm text-gray-600">
              Your one-stop shop for all your needs
            </p>
          </div>

          
          <div className="flex flex-wrap gap-6 text-sm font-medium text-gray-700">
            <a href="#" className="transition hover:text-indigo-600">
              About Us
            </a>
            <a href="#" className="transition hover:text-indigo-600">
              Contact
            </a>
            <a href="#" className="transition hover:text-indigo-600">
              Terms of Service
            </a>
            <a href="#" className="transition hover:text-indigo-600">
              Privacy Policy
            </a>
          </div>
        </div>

        
        <div className="mt-8 border-t pt-4 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} SalesSavvy. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
