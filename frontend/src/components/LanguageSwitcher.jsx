import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Languages, ChevronDown } from 'lucide-react';

function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const languages = [
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'ar', name: 'العربية', flag: '🇲🇦' }
  ];

  const currentLanguage = languages.find(l => l.code === i18n.language) || languages[0];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    document.documentElement.dir = lng === 'ar' ? 'rtl' : 'ltr';
    setIsOpen(false);
  };

  return (
    <div className="language-switcher" ref={dropdownRef}>
      <button 
        className="language-button"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Languages size={20} />
        <span>{currentLanguage.flag}</span>
        <span>{currentLanguage.code.toUpperCase()}</span>
        <ChevronDown size={18} style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.3s' }} />
      </button>
      {isOpen && (
        <div className="language-dropdown">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => changeLanguage(lang.code)}
              className={`language-option ${i18n.language === lang.code ? 'active' : ''}`}
            >
              <span className="flag">{lang.flag}</span>
              <span>{lang.name}</span>
              <span className="lang-code">{lang.code.toUpperCase()}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default LanguageSwitcher;
