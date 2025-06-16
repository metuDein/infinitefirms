// 'use client';
// // components/LanguageSelector.js

// // import { useLanguage } from "@context/LanguageContext";

// import {useLanguage} from '@component/context/LanguageContext';
// import { translateText } from "@lib/translationService";
// import { useState } from "react";

// export default function LanguageSelector() {
//   const { currentLanguage, setCurrentLanguage, setIsTranslating } = useLanguage();
//   const [isOpen, setIsOpen] = useState(false);

//   const languages = [
//     { code: 'en', name: 'English' },
//     { code: 'es', name: 'Spanish' },
//     { code: 'fr', name: 'French' },
//     { code: 'de', name: 'German' },
//     // Add more languages as needed
//   ];

//   const handleLanguageChange = async (langCode) => {
//     setIsTranslating(true);
//     setCurrentLanguage(langCode);
//     setIsOpen(false);
//     // Here you would add logic to translate your page content
//     setIsTranslating(false);
//   };

//   return (
//     <div className="relative">
//       <button 
//         onClick={() => setIsOpen(!isOpen)}
//         className="flex items-center gap-1 px-3 py-2 rounded bg-gray-100 hover:bg-gray-200"
//       >
//         {languages.find(lang => lang.code === currentLanguage)?.name}
//         <span>▼</span>
//       </button>
      
//       {isOpen && (
//         <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
//           {languages.map((lang) => (
//             <button
//               key={lang.code}
//               onClick={() => handleLanguageChange(lang.code)}
//               className="block w-full text-left px-4 py-2 hover:bg-gray-100"
//             >
//               {lang.name}
//             </button>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }