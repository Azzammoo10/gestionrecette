import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  fr: {
    translation: {
      // Navbar
      "app_title": "Saveurs & Recettes",
      "new_recipe": "Nouvelle Recette",
      "logout": "Déconnexion",
      "login": "Se connecter",
      "signup": "S'inscrire",
      
      // Auth
      "welcome": "Bienvenue",
      "login_subtitle": "Connectez-vous à votre compte",
      "signup_title": "Créer un compte",
      "signup_subtitle": "Rejoignez notre communauté de cuisiniers",
      "email": "Email",
      "password": "Mot de passe",
      "confirm_password": "Confirmer le mot de passe",
      "first_name": "Prénom",
      "last_name": "Nom",
      "login_button": "Se connecter",
      "signup_button": "Créer mon compte",
      "no_account": "Pas encore de compte ?",
      "have_account": "Déjà un compte ?",
      "logging_in": "Connexion...",
      "creating_account": "Création...",
      
      // Filters
      "search": "Rechercher",
      "search_placeholder": "Rechercher une recette...",
      "category": "Catégorie",
      "all_categories": "Toutes les catégories",
      "difficulty": "Difficulté",
      "all_difficulties": "Toutes les difficultés",
      
      // Categories
      "appetizer": "Entrée",
      "main_course": "Plat principal",
      "dessert": "Dessert",
      "drink": "Boisson",
      "other": "Autre",
      
      // Difficulties
      "easy": "Facile",
      "medium": "Moyen",
      "hard": "Difficile",
      
      // Recipe Card
      "min": "min",
      "persons": "pers.",
      "edit": "Modifier",
      "delete": "Supprimer",
      
      // Recipe Detail
      "back": "Retour",
      "preparation": "Préparation",
      "cooking": "Cuisson",
      "ingredients": "Ingrédients",
      "instructions": "Instructions",
      "tags": "Tags",
      "by": "Par",
      
      // Recipe Form
      "new_recipe_title": "Nouvelle recette",
      "edit_recipe_title": "Modifier la recette",
      "title": "Titre",
      "title_placeholder": "Ex: Tarte aux pommes",
      "description": "Description",
      "description_placeholder": "Décrivez votre recette...",
      "prep_time": "Temps de préparation (min)",
      "cooking_time": "Temps de cuisson (min)",
      "servings": "Nombre de personnes",
      "ingredients_title": "Ingrédients",
      "add_ingredient": "Ajouter un ingrédient",
      "quantity": "Quantité",
      "ingredient": "Ingrédient",
      "instructions_title": "Instructions",
      "add_instruction": "Ajouter une instruction",
      "step": "Étape",
      "image_url": "URL de l'image",
      "tags_title": "Tags",
      "add_tag": "Ajouter un tag",
      "author": "Auteur",
      "author_placeholder": "Votre nom",
      "cancel": "Annuler",
      "create": "Créer",
      "update": "Mettre à jour",
      
      // Messages
      "loading": "Chargement...",
      "no_recipes_found": "Aucune recette trouvée",
      "start_adding": "Commencez par ajouter votre première recette !",
      "delete_confirm": "Êtes-vous sûr de vouloir supprimer cette recette ?",
      "error_delete": "Erreur lors de la suppression de la recette",
      "error_save": "Erreur lors de la sauvegarde de la recette",
      
      // Popular Recipes
      "popular_recipes": "Recettes Populaires",
      "views": "vues",
      
      // Validation
      "passwords_dont_match": "Les mots de passe ne correspondent pas",
      "password_too_short": "Le mot de passe doit contenir au moins 6 caractères"
    }
  },
  en: {
    translation: {
      // Navbar
      "app_title": "Flavors & Recipes",
      "new_recipe": "New Recipe",
      "logout": "Logout",
      "login": "Sign In",
      "signup": "Sign Up",
      
      // Auth
      "welcome": "Welcome",
      "login_subtitle": "Sign in to your account",
      "signup_title": "Create Account",
      "signup_subtitle": "Join our community of chefs",
      "email": "Email",
      "password": "Password",
      "confirm_password": "Confirm Password",
      "first_name": "First Name",
      "last_name": "Last Name",
      "login_button": "Sign In",
      "signup_button": "Create Account",
      "no_account": "Don't have an account?",
      "have_account": "Already have an account?",
      "logging_in": "Signing in...",
      "creating_account": "Creating...",
      
      // Filters
      "search": "Search",
      "search_placeholder": "Search for a recipe...",
      "category": "Category",
      "all_categories": "All Categories",
      "difficulty": "Difficulty",
      "all_difficulties": "All Difficulties",
      
      // Categories
      "appetizer": "Appetizer",
      "main_course": "Main Course",
      "dessert": "Dessert",
      "drink": "Drink",
      "other": "Other",
      
      // Difficulties
      "easy": "Easy",
      "medium": "Medium",
      "hard": "Hard",
      
      // Recipe Card
      "min": "min",
      "persons": "serv.",
      "edit": "Edit",
      "delete": "Delete",
      
      // Recipe Detail
      "back": "Back",
      "preparation": "Preparation",
      "cooking": "Cooking",
      "ingredients": "Ingredients",
      "instructions": "Instructions",
      "tags": "Tags",
      "by": "By",
      
      // Recipe Form
      "new_recipe_title": "New Recipe",
      "edit_recipe_title": "Edit Recipe",
      "title": "Title",
      "title_placeholder": "Ex: Apple Pie",
      "description": "Description",
      "description_placeholder": "Describe your recipe...",
      "prep_time": "Preparation Time (min)",
      "cooking_time": "Cooking Time (min)",
      "servings": "Servings",
      "ingredients_title": "Ingredients",
      "add_ingredient": "Add Ingredient",
      "quantity": "Quantity",
      "ingredient": "Ingredient",
      "instructions_title": "Instructions",
      "add_instruction": "Add Instruction",
      "step": "Step",
      "image_url": "Image URL",
      "tags_title": "Tags",
      "add_tag": "Add Tag",
      "author": "Author",
      "author_placeholder": "Your name",
      "cancel": "Cancel",
      "create": "Create",
      "update": "Update",
      
      // Messages
      "loading": "Loading...",
      "no_recipes_found": "No recipes found",
      "start_adding": "Start by adding your first recipe!",
      "delete_confirm": "Are you sure you want to delete this recipe?",
      "error_delete": "Error deleting recipe",
      "error_save": "Error saving recipe",
      
      // Popular Recipes
      "popular_recipes": "Popular Recipes",
      "views": "views",
      
      // Validation
      "passwords_dont_match": "Passwords don't match",
      "password_too_short": "Password must be at least 6 characters"
    }
  },
  ar: {
    translation: {
      // Navbar
      "app_title": "نكهات ووصفات",
      "new_recipe": "وصفة جديدة",
      "logout": "تسجيل الخروج",
      "login": "تسجيل الدخول",
      "signup": "إنشاء حساب",
      
      // Auth
      "welcome": "مرحبا",
      "login_subtitle": "سجل الدخول إلى حسابك",
      "signup_title": "إنشاء حساب",
      "signup_subtitle": "انضم إلى مجتمع الطهاة لدينا",
      "email": "البريد الإلكتروني",
      "password": "كلمة المرور",
      "confirm_password": "تأكيد كلمة المرور",
      "first_name": "الاسم الأول",
      "last_name": "اسم العائلة",
      "login_button": "تسجيل الدخول",
      "signup_button": "إنشاء حسابي",
      "no_account": "ليس لديك حساب؟",
      "have_account": "هل لديك حساب؟",
      "logging_in": "جاري تسجيل الدخول...",
      "creating_account": "جاري الإنشاء...",
      
      // Filters
      "search": "بحث",
      "search_placeholder": "ابحث عن وصفة...",
      "category": "الفئة",
      "all_categories": "جميع الفئات",
      "difficulty": "الصعوبة",
      "all_difficulties": "جميع المستويات",
      
      // Categories
      "appetizer": "مقبلات",
      "main_course": "طبق رئيسي",
      "dessert": "حلويات",
      "drink": "مشروبات",
      "other": "أخرى",
      
      // Difficulties
      "easy": "سهل",
      "medium": "متوسط",
      "hard": "صعب",
      
      // Recipe Card
      "min": "دقيقة",
      "persons": "أشخاص",
      "edit": "تعديل",
      "delete": "حذف",
      
      // Recipe Detail
      "back": "رجوع",
      "preparation": "التحضير",
      "cooking": "الطهي",
      "ingredients": "المكونات",
      "instructions": "التعليمات",
      "tags": "الوسوم",
      "by": "بواسطة",
      
      // Recipe Form
      "new_recipe_title": "وصفة جديدة",
      "edit_recipe_title": "تعديل الوصفة",
      "title": "العنوان",
      "title_placeholder": "مثال: تارت التفاح",
      "description": "الوصف",
      "description_placeholder": "صف وصفتك...",
      "prep_time": "وقت التحضير (دقيقة)",
      "cooking_time": "وقت الطهي (دقيقة)",
      "servings": "عدد الأشخاص",
      "ingredients_title": "المكونات",
      "add_ingredient": "إضافة مكون",
      "quantity": "الكمية",
      "ingredient": "المكون",
      "instructions_title": "التعليمات",
      "add_instruction": "إضافة تعليمة",
      "step": "الخطوة",
      "image_url": "رابط الصورة",
      "tags_title": "الوسوم",
      "add_tag": "إضافة وسم",
      "author": "المؤلف",
      "author_placeholder": "اسمك",
      "cancel": "إلغاء",
      "create": "إنشاء",
      "update": "تحديث",
      
      // Messages
      "loading": "جاري التحميل...",
      "no_recipes_found": "لم يتم العثور على وصفات",
      "start_adding": "ابدأ بإضافة وصفتك الأولى!",
      "delete_confirm": "هل أنت متأكد من حذف هذه الوصفة؟",
      "error_delete": "خطأ في حذف الوصفة",
      "error_save": "خطأ في حفظ الوصفة",
      
      // Popular Recipes
      "popular_recipes": "الوصفات الشائعة",
      "views": "مشاهدة",
      
      // Validation
      "passwords_dont_match": "كلمات المرور غير متطابقة",
      "password_too_short": "يجب أن تحتوي كلمة المرور على 6 أحرف على الأقل"
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'fr',
    debug: false,
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
