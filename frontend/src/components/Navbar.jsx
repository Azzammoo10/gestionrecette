import { Plus, LogOut, User as UserIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

function Navbar({ onCreateRecipe }) {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="navbar-brand">
          <span className="logo-icon">🍳</span>
          <h1>{t('app_title')}</h1>
        </div>
        <div className="navbar-actions">
          <LanguageSwitcher />
          {isAuthenticated ? (
            <>
              <div className="user-info">
                <UserIcon size={18} />
                <span>{user?.prenom} {user?.nom}</span>
              </div>
              <button className="btn btn-primary" onClick={onCreateRecipe}>
                <Plus size={20} />
                {t('new_recipe')}
              </button>
              <button className="btn btn-secondary" onClick={handleLogout}>
                <LogOut size={20} />
                {t('logout')}
              </button>
            </>
          ) : (
            <>
              <button className="btn btn-secondary" onClick={() => navigate('/login')}>
                {t('login')}
              </button>
              <button className="btn btn-primary" onClick={() => navigate('/signup')}>
                {t('signup')}
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
