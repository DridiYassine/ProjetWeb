// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
        //header traduction
        home: 'Home',
        shop: 'Shop',
        cart: 'Cart',
        browseStore: 'Browse Store',

            //home trad
      welcome: 'Welcome',
      trendingProduct: 'Trending Product in {{year}}',
      accessorize: 'Accessorize your life with style',
      exploreStyle: 'Explore style effortlessly with our curated accessories collection.',
      findPerfect: 'Find the perfect finishing touch for any outfit, from timeless classics to trendy pieces.',
      letAccessoriesTell: 'Let your accessories tell your unique story.',
      discoverFashion: 'Discover fashion that speaks volumes, one piece at a time.',
      shopNow: 'Shop Now',
      latestProducts: 'Latest Products',
      bestSales: 'Best Sales',
      limitedOffer: 'Limited Offer',
      browseStore: 'Browse Store',


        //footer traduction
      siteName: 'OuiMade',
      footerText: 'Discover Timeless Elegance - Elevate Your Style with OuiMade. Embrace the beauty of every moment with our handpicked selection. Happy shopping!',
      socialMedia: 'Social Media',
      facebook: 'Facebook',
      instagram: 'Instagram',
      tiktok: 'TikTok',
      contactUs: 'Contact Us',
      usefulLinks: 'Useful Links',
      shop: 'Shop',
      cart: 'Cart',
      login: 'Login',
      signup: 'Sign Up',
      businessLocation: 'Business Location',
      contact: 'Contact',
      copyright: 'Copyright',
      rightsReserved: 'All rights reserved',

      //shop trad 
     commonSectionShopTitle: "Shop",
     filterByCategory: "Filter By Category",
     searchForProduct: "Search For a Product",
     noProducts: "No Products",

      // ... autres traductions

            //login trad 
            loginTitle: 'Login - OuiMade',
            loginHeading: 'Login',
            emailPlaceholder: 'Enter Email',
            passwordPlaceholder: 'Enter Your Password',
            loginButton: 'Login',
            loginSuccess: 'Connected Successfully!',
            loginError: 'Email or Password invalid',
            noAccount: "Don't have an account?",
            createAccount: 'Create One',
            forgotPassword: 'Forgot Password?',
            resetPasswordSuccess: 'Password reset email sent. Check your email inbox.',
            resetPasswordError: 'Error sending password reset email.',
          
            commonSectionProducts: "Produits",

            //signup trad

            
            signupTitle: "Signup - Your App",
            signupHeading: "Sign Up",
            usernamePlaceholder: "Enter Username",
            emailPlaceholder: "Enter Email",
            passwordPlaceholder: "Enter Your Password",
            signupButton: "Signup",
            alreadyAccount: "Already have an account?",
            connect: "Connect",
            signupSuccess: "User registered successfully. Please check your email for verification.",
            signupError: "Something Went Wrong"
    },
  },
  fr: {
    translation: {
        //header traduction
          home: 'Accueil',
      shop: 'Boutique',
      cart: 'Panier',
      browseStore: 'Parcourir la boutique',



        //home trad
      welcome: 'Bienvenue',
      trendingProduct: 'Produit tendance en {{year}}',
      accessorize: 'Ornez votre vie avec style',
      exploreStyle: 'Explorez le style sans effort avec notre collection d\'accessoires soigneusement sélectionnée.',
      findPerfect: 'Trouvez la touche finale parfaite pour n\'importe quelle tenue, des classiques intemporels aux pièces tendance.',
      letAccessoriesTell: 'Laissez vos accessoires raconter votre histoire unique.',
      discoverFashion: 'Découvrez la mode qui parle fort, une pièce à la fois.',
      shopNow: 'Achetez maintenant',
      latestProducts: 'Derniers produits',
      bestSales: 'Meilleures ventes',
      limitedOffer: 'Offre limitée',
      browseStore: 'Parcourir la boutique',
 
      //shop trad 
     commonSectionShopTitle: "Boutique",
     filterByCategory: "Filtrer par catégorie",
     searchForProduct: "Rechercher un produit",
     noProducts: "Aucun produit",



      //footer trad
      siteName: 'OuiMade',
      footerText: 'Découvrez l\'élégance intemporelle - Rehaussez votre style avec OuiMade. Embrassez la beauté de chaque moment avec notre sélection exclusive. Bon shopping !',
      socialMedia: 'Réseaux sociaux',
      facebook: 'Facebook',
      instagram: 'Instagram',
      tiktok: 'TikTok',
      contactUs: 'Contactez-nous',
      usefulLinks: 'Liens utiles',
      shop: 'Boutique',
      cart: 'Panier',
      login: 'Connexion',
      signup: 'Inscription',
      businessLocation: 'Emplacement de l\'entreprise',
      contact: 'Contact',
      copyright: 'Droits d\'auteur',
      rightsReserved: 'Tous droits réservés',
      // ... autres traductions


      //login trad 
      loginTitle: 'Connexion - OuiMade',
      loginHeading: 'Connexion',
      emailPlaceholder: 'Entrez votre email',
      passwordPlaceholder: 'Entrez votre mot de passe',
      loginButton: 'Connexion',
      loginSuccess: 'Connecté avec succès !',
      loginError: 'Email ou mot de passe invalide',
      noAccount: "Vous n'avez pas de compte ?",
      createAccount: 'Créer un compte',
      forgotPassword: 'Mot de passe oublié ?',
      resetPasswordSuccess: 'Email de réinitialisation du mot de passe envoyé. Vérifiez votre boîte de réception.',
      resetPasswordError: "Erreur lors de l'envoi de l'email de réinitialisation du mot de passe.",
        
        //signup trad 
        signupTitle: "Inscription - Votre Application",
        signupHeading: "S'inscrire",
        usernamePlaceholder: "Entrez le nom d'utilisateur",
        emailPlaceholder: "Entrez l'e-mail",
        passwordPlaceholder: "Entrez votre mot de passe",
        signupButton: "S'inscrire",
        alreadyAccount: "Vous avez déjà un compte ?",
        connect: "Connectez-vous",
        signupSuccess: "Utilisateur enregistré avec succès. Veuillez vérifier votre e-mail pour la vérification.",
        signupError: "Quelque chose s'est mal passé"
   
   
   
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
