<!DOCTYPE html>
<html lang="fr" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>InService - Des techniciens qualifiés à votre service</title>
    <!-- Tailwind CSS CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
    <!-- FontAwesome icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <!-- Google Fonts Inter -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    fontFamily: {
                        sans: ['Inter', 'sans-serif'],
                    },
                    colors: {
                        brand: {
                            50: '#eff6ff',
                            100: '#dbeafe',
                            500: '#3b82f6',
                            600: '#2563eb',
                            700: '#1d4ed8',
                            900: '#1e3a8a',
                        }
                    }
                }
            }
        }
    </script>
</head>
<body class="bg-slate-50 text-slate-800 font-sans antialiased">

    <!-- Header / Navigation -->
    <header class="fixed w-full top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100 transition-all">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
            <!-- Logo -->
            <a href="#" class="flex items-center gap-3 group">
                <div class="w-10 h-10 bg-brand-600 rounded-xl flex items-center justify-center text-white text-xl font-black shadow-lg shadow-brand-500/30 group-hover:scale-105 transition-transform">
                    <i class="fa-solid fa-wrench"></i>
                </div>
                <span class="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">In<span class="text-brand-600">Service</span></span>
            </a>

            <!-- Navigation Links -->
            <nav class="hidden md:flex items-center gap-8 font-medium text-slate-600 text-sm">
                <a href="#services" class="hover:text-brand-600 transition-colors">Services</a>
                <a href="#comment-ca-marche" class="hover:text-brand-600 transition-colors">Comment ça marche</a>
                <a href="#avis" class="hover:text-brand-600 transition-colors">Avis</a>
                <a href="#pros" class="hover:text-brand-600 transition-colors">Espace Pro</a>
            </nav>

            <!-- Auth Buttons (Login / Register) -->
            <div class="flex items-center gap-3">
                <a href="login.html" class="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:text-brand-600 hover:bg-slate-100 transition-all">
                    Se connecter
                </a>
                <a href="register.html" class="px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-brand-600 hover:bg-brand-700 shadow-lg shadow-brand-600/25 hover:shadow-brand-600/40 hover:-translate-y-0.5 transition-all">
                    S'inscrire
                </a>
            </div>
        </div>
    </header>

    <!-- Hero Section -->
    <section class="pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden relative">
        <!-- Background Gradients -->
        <div class="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-brand-500/20 to-purple-500/20 blur-3xl rounded-full -z-10 pointer-events-none"></div>

        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center max-w-3xl mx-auto space-y-6">
                <!-- Badge -->
                <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-50 border border-brand-100 text-brand-700 text-xs font-semibold uppercase tracking-wider">
                    <span class="w-2 h-2 rounded-full bg-brand-600 animate-pulse"></span>
                    La référence des techniciens qualifiés
                </div>

                <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight tracking-tight">
                    Trouvez le bon technicien pour vos travaux en quelques clics
                </h1>

                <p class="text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
                    Plomberie, électricité, réparation ou rénovation : InService vous met en relation avec des professionnels certifiés et évalués près de chez vous.
                </p>

                <!-- Search Bar -->
                <div class="pt-4 max-w-2xl mx-auto">
                    <div class="bg-white p-2 sm:p-3 rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-100 flex flex-col sm:flex-row items-center gap-2">
                        <div class="flex items-center gap-3 px-4 py-2 w-full border-b sm:border-b-0 sm:border-r border-slate-100">
                            <i class="fa-solid fa-magnifying-glass text-slate-400"></i>
                            <input type="text" placeholder="De quel service avez-vous besoin ?" class="w-full bg-transparent focus:outline-none text-slate-800 placeholder-slate-400 text-sm">
                        </div>
                        <div class="flex items-center gap-3 px-4 py-2 w-full sm:w-auto min-w-[160px]">
                            <i class="fa-solid fa-location-dot text-slate-400"></i>
                            <input type="text" placeholder="Ville" class="w-full bg-transparent focus:outline-none text-slate-800 placeholder-slate-400 text-sm">
                        </div>
                        <a href="register.html" class="w-full sm:w-auto px-6 py-3.5 bg-brand-600 hover:bg-brand-700 text-white font-semibold text-sm rounded-xl shadow-md transition-all text-center whitespace-nowrap flex items-center justify-center gap-2">
                            <span>Rechercher</span>
                            <i class="fa-solid fa-arrow-right"></i>
                        </a>
                    </div>
                    <p class="text-xs text-slate-400 mt-3">Exemples : Électricité, Plomberie, Climatisation, Peinture</p>
                </div>
            </div>

            <!-- Stats / Social Proof -->
            <div class="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 text-center max-w-4xl mx-auto border-t border-slate-200/60 pt-10">
                <div>
                    <h3 class="text-3xl font-extrabold text-slate-900">1,200+</h3>
                    <p class="text-xs text-slate-500 font-medium mt-1">Techniciens qualifiés</p>
                </div>
                <div>
                    <h3 class="text-3xl font-extrabold text-slate-900">8,500+</h3>
                    <p class="text-xs text-slate-500 font-medium mt-1">Interventions réussies</p>
                </div>
                <div>
                    <h3 class="text-3xl font-extrabold text-slate-900">4.9/5</h3>
                    <p class="text-xs text-slate-500 font-medium mt-1">Avis clients vérifiés</p>
                </div>
                <div>
                    <h3 class="text-3xl font-extrabold text-slate-900">100%</h3>
                    <p class="text-xs text-slate-500 font-medium mt-1">Satisfaction garantie</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Services Categories -->
    <section id="services" class="py-20 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex flex-col md:flex-row md:items-end justify-between mb-12">
                <div>
                    <span class="text-brand-600 font-semibold text-sm tracking-wide uppercase">Catégories</span>
                    <h2 class="text-3xl font-bold text-slate-900 mt-1">Services les plus recherchés</h2>
                </div>
                <a href="register.html" class="mt-4 md:mt-0 text-brand-600 font-semibold hover:text-brand-700 flex items-center gap-2 text-sm group">
                    Voir toutes les catégories 
                    <i class="fa-solid fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
                </a>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <!-- Category Card 1 -->
                <a href="register.html" class="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-brand-200 hover:shadow-xl hover:shadow-brand-500/5 hover:-translate-y-1 transition-all group">
                    <div class="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center text-xl mb-4 group-hover:bg-brand-600 group-hover:text-white transition-colors">
                        <i class="fa-solid fa-faucet-drip"></i>
                    </div>
                    <h3 class="text-lg font-bold text-slate-900 group-hover:text-brand-600 transition-colors">Plomberie</h3>
                    <p class="text-sm text-slate-500 mt-2">Fuites, installation, débouchage et dépannage d'urgence.</p>
                </a>

                <!-- Category Card 2 -->
                <a href="register.html" class="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-brand-200 hover:shadow-xl hover:shadow-brand-500/5 hover:-translate-y-1 transition-all group">
                    <div class="w-12 h-12 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center text-xl mb-4 group-hover:bg-brand-600 group-hover:text-white transition-colors">
                        <i class="fa-solid fa-bolt"></i>
                    </div>
                    <h3 class="text-lg font-bold text-slate-900 group-hover:text-brand-600 transition-colors">Électricité</h3>
                    <p class="text-sm text-slate-500 mt-2">Pannes, câblage, tableau électrique et rénovation.</p>
                </a>

                <!-- Category Card 3 -->
                <a href="register.html" class="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-brand-200 hover:shadow-xl hover:shadow-brand-500/5 hover:-translate-y-1 transition-all group">
                    <div class="w-12 h-12 bg-teal-100 text-teal-600 rounded-xl flex items-center justify-center text-xl mb-4 group-hover:bg-brand-600 group-hover:text-white transition-colors">
                        <i class="fa-solid fa-snowflake"></i>
                    </div>
                    <h3 class="text-lg font-bold text-slate-900 group-hover:text-brand-600 transition-colors">Climatisation</h3>
                    <p class="text-sm text-slate-500 mt-2">Entretien, réparation et pose de climatiseurs.</p>
                </a>

                <!-- Category Card 4 -->
                <a href="register.html" class="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-brand-200 hover:shadow-xl hover:shadow-brand-500/5 hover:-translate-y-1 transition-all group">
                    <div class="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center text-xl mb-4 group-hover:bg-brand-600 group-hover:text-white transition-colors">
                        <i class="fa-solid fa-paint-roller"></i>
                    </div>
                    <h3 class="text-lg font-bold text-slate-900 group-hover:text-brand-600 transition-colors">Peinture & Déco</h3>
                    <p class="text-sm text-slate-500 mt-2">Peinture intérieure/extérieure et revêtements de sol.</p>
                </a>
            </div>
        </div>
    </section>

    <!-- How it Works -->
    <section id="comment-ca-marche" class="py-20 bg-slate-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center max-w-2xl mx-auto mb-16">
                <span class="text-brand-600 font-semibold text-sm tracking-wide uppercase">Simplicité & Rapidité</span>
                <h2 class="text-3xl font-bold text-slate-900 mt-1">Comment fonctionne InService ?</h2>
                <p class="text-slate-600 mt-3">Un processus simple en 3 étapes pour concrétiser vos projets en toute sérénité.</p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                <!-- Step 1 -->
                <div class="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm relative text-center flex flex-col items-center">
                    <div class="w-16 h-16 bg-brand-50 text-brand-600 rounded-2xl flex items-center justify-center text-2xl font-bold mb-6 border border-brand-100">
                        1
                    </div>
                    <h3 class="text-xl font-bold text-slate-900 mb-3">Recherchez & Choisissez</h3>
                    <p class="text-sm text-slate-600 leading-relaxed">
                        Parcourez les profils, consultez les tarifs, les avis vérifiés et les disponibilités des techniciens.
                    </p>
                </div>

                <!-- Step 2 -->
                <div class="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm relative text-center flex flex-col items-center">
                    <div class="w-16 h-16 bg-brand-50 text-brand-600 rounded-2xl flex items-center justify-center text-2xl font-bold mb-6 border border-brand-100">
                        2
                    </div>
                    <h3 class="text-xl font-bold text-slate-900 mb-3">Envoyez une demande</h3>
                    <p class="text-sm text-slate-600 leading-relaxed">
                        Décrivez votre besoin, convenez d'un créneau et échangez en direct via notre messagerie intégrée.
                    </p>
                </div>

                <!-- Step 3 -->
                <div class="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm relative text-center flex flex-col items-center">
                    <div class="w-16 h-16 bg-brand-50 text-brand-600 rounded-2xl flex items-center justify-center text-2xl font-bold mb-6 border border-brand-100">
                        3
                    </div>
                    <h3 class="text-xl font-bold text-slate-900 mb-3">Intervention & Évaluation</h3>
                    <p class="text-sm text-slate-600 leading-relaxed">
                        Une fois le service réalisé avec succès, validez l'intervention et laissez votre avis au technicien.
                    </p>
                </div>
            </div>
        </div>
    </section>

    <!-- Call to Action Banner -->
    <section class="py-16 bg-gradient-to-br from-brand-900 via-brand-700 to-brand-600 text-white relative overflow-hidden">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div class="flex flex-col md:flex-row items-center justify-between gap-8">
                <div class="max-w-xl text-center md:text-left">
                    <h2 class="text-3xl font-extrabold sm:text-4xl">Prêt à démarrer votre projet ?</h2>
                    <p class="text-brand-100 mt-3 text-base">Rejoignez des milliers de clients satisfaits ou commencez à proposer vos services dès aujourd'hui.</p>
                </div>
                <div class="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                    <a href="register.html" class="px-8 py-4 bg-white text-brand-900 hover:bg-brand-50 font-bold rounded-xl shadow-lg transition-all text-center">
                        Créer un compte Client
                    </a>
                    <a href="register.html" class="px-8 py-4 bg-brand-800/60 hover:bg-brand-800 text-white font-bold rounded-xl border border-brand-400/30 transition-all text-center">
                        Devenir Technicien
                    </a>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-slate-800">
                <!-- Col 1 -->
                <div class="space-y-4">
                    <div class="flex items-center gap-3">
                        <div class="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center text-white font-black text-sm">
                            <i class="fa-solid fa-wrench"></i>
                        </div>
                        <span class="text-xl font-bold text-white">InService</span>
                    </div>
                    <p class="text-sm text-slate-400">
                        La plateforme réseau mettant en relation clients et techniciens qualifiés en toute simplicité.
                    </p>
                </div>

                <!-- Col 2 -->
                <div>
                    <h4 class="text-white font-semibold text-sm mb-4">Plateforme</h4>
                    <ul class="space-y-2 text-sm">
                        <li><a href="#services" class="hover:text-white transition-colors">Services</a></li>
                        <li><a href="#comment-ca-marche" class="hover:text-white transition-colors">Comment ça marche</a></li>
                        <li><a href="login.html" class="hover:text-white transition-colors">Connexion</a></li>
                        <li><a href="register.html" class="hover:text-white transition-colors">Inscription</a></li>
                    </ul>
                </div>

                <!-- Col 3 -->
                <div>
                    <h4 class="text-white font-semibold text-sm mb-4">Espace Pro</h4>
                    <ul class="space-y-2 text-sm">
                        <li><a href="register.html" class="hover:text-white transition-colors">Devenir Technicien</a></li>
                        <li><a href="login.html" class="hover:text-white transition-colors">Tableau de bord</a></li>
                        <li><a href="#" class="hover:text-white transition-colors">Charte qualité</a></li>
                    </ul>
                </div>

                <!-- Col 4 -->
                <div>
                    <h4 class="text-white font-semibold text-sm mb-4">Contact & Support</h4>
                    <ul class="space-y-2 text-sm">
                        <li><a href="#" class="hover:text-white transition-colors">Centre d'aide</a></li>
                        <li><a href="#" class="hover:text-white transition-colors">support@inservice.ma</a></li>
                        <div class="flex gap-4 pt-2 text-slate-400">
                            <a href="#" class="hover:text-white"><i class="fa-brands fa-facebook"></i></a>
                            <a href="#" class="hover:text-white"><i class="fa-brands fa-instagram"></i></a>
                            <a href="#" class="hover:text-white"><i class="fa-brands fa-linkedin"></i></a>
                        </div>
                    </ul>
                </div>
            </div>

            <div class="pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-4">
                <p>&copy; 2026 InService. Tous droits réservés.</p>
                <div class="flex gap-6">
                    <a href="#" class="hover:text-slate-400">Conditions Générales</a>
                    <a href="#" class="hover:text-slate-400">Politique de Confidentialité</a>
                </div>
            </div>
        </div>
    </footer>

</body>
</html>