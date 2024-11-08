import React from 'react';
import { Facebook, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-gray-700 py-4 text-center">
            <p>&copy; 2023 Your Company. All rights reserved.</p>
            <p>
                <a href="/privacy-policy" className="text-blue-500 hover:underline">Privacy Policy</a> | 
                <a href="/terms-of-service" className="text-blue-500 hover:underline">Terms of Service</a>
            </p>
            <div className="flex justify-center space-x-4 mt-2">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-blue-600">
                    <Facebook />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-blue-400">
                    <Twitter />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-pink-500">
                    <Instagram />
                </a>
            </div>
        </footer>
    );
};

export default Footer;
