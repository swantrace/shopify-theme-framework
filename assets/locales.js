window.theme = window.theme || {};
window.theme.locales = {
  en: {
    general: {
      accessibility: {
        refresh_page: 'choosing a selection results in a full page refresh',
        unit_price_separator: 'per',
        new_window: 'Opens in a new window.',
        new_window_and_external: 'Opens external website in a new window.',
      },
      meta: {
        tags: 'Tagged "{{ tags }}"',
        page: 'Page {{ page }}',
      },
      '404': {
        title: '404 Page Not Found',
        subtext_html:
          'The page you requested does not exist. Click <a href="{{ link }}">here</a> to continue shopping.',
      },
      password_page: {
        login_form_heading: 'Enter store using password:',
        login_form_password_label: 'Password',
        login_form_password_placeholder: 'Your password',
        login_form_submit: 'Enter',
        signup_form_email_label: 'Email',
        signup_form_success: 'We will send you an email right before we open!',
        admin_link_html:
          'Are you the store owner? <a href="/admin" class="text-link">Log in here</a>',
        password_link: 'Enter using password',
        powered_by_shopify_html: 'This shop will be powered by {{ shopify }}',
        close: 'Close (Esc)',
      },
      breadcrumbs: {
        home: 'Home',
        home_link_title: 'Back to the frontpage',
      },
      newsletter_form: {
        newsletter_email: 'Your email',
        submit: 'Subscribe',
        confirmation: 'Thanks for subscribing',
      },
      search: {
        no_results_html:
          'Your search for "{{ terms }}" did not yield any results.',
        results_for_html:
          'Your search for "{{ terms }}" revealed the following:',
        title: 'Search for products on our site',
        placeholder: 'Search',
        submit: 'Search',
      },
      social: {
        share_on_facebook: 'Share',
        share_on_twitter: 'Tweet',
        share_on_pinterest: 'Pin it',
        alt_text: {
          share_on_facebook: 'Share on Facebook',
          share_on_twitter: 'Tweet on Twitter',
          share_on_pinterest: 'Pin on Pinterest',
        },
      },
      payment: {
        method: 'Payment icons',
      },
    },
    blogs: {
      article: {
        older_post: 'Older Post',
        newer_post: 'Newer Post',
        tags: 'Tags',
        comment_meta_html: '{{ author }} on {{ date }}',
        view_all: 'View all',
        read_more: 'Read more',
      },
      comments: {
        title: 'Leave a comment',
        name: 'Name',
        email: 'Email',
        message: 'Message',
        post: 'Post comment',
        moderated:
          'Please note, comments must be approved before they are published',
        success_moderated:
          'Your comment was posted successfully. We will publish it in a little while, as our blog is moderated.',
        success: 'Your comment was posted successfully! Thank you!',
      },
      sidebar: {
        recent_articles: 'Recent Articles',
        categories: 'Categories',
      },
    },
    cart: {
      general: {
        title: 'Your Cart',
        remove: 'Remove',
        note: 'Special instructions for seller',
        subtotal: 'Subtotal',
        savings_html: "You're saving {{ price }}",
        taxes_and_shipping_at_checkout:
          'Taxes and shipping calculated at checkout',
        taxes_and_shipping_policy_at_checkout_html:
          'Taxes and <a href="{{ link }}">shipping</a> calculated at checkout',
        taxes_included_but_shipping_at_checkout:
          'Tax included and shipping calculated at checkout',
        taxes_included_and_shipping_policy_html:
          'Tax included. <a href="{{ link }}">Shipping</a> calculated at checkout.',
        update: 'Update Cart',
        checkout: 'Check Out',
        empty: 'Your cart is currently empty.',
        cookies_required: 'Enable cookies to use the shopping cart',
        continue_browsing_html:
          'Continue browsing <a href="{{ link }}">here</a>.',
        continue_shopping: 'Continue shopping',
      },
      label: {
        price: 'Price',
        quantity: 'Quantity',
        total: 'Total',
        add_note: 'Add a note to your order',
      },
    },
    collections: {
      general: {
        title: 'Collections',
        no_matches: 'Sorry, there are no products in this collection',
        link_title: 'Browse our {{ title }} collection',
      },
      sorting: {
        title: 'Sort by',
        browse: 'Browse by',
        all_tags: 'All',
      },
    },
    contact: {
      form: {
        name: 'Name',
        email: 'Email',
        phone: 'Phone Number',
        message: 'Message',
        send: 'Send',
        post_success:
          "Thanks for contacting us. We'll get back to you as soon as possible.",
      },
    },
    customer: {
      account: {
        title: 'My Account',
        details: 'Account Details',
        view_addresses: 'View Addresses',
        return: 'Return to Account Details',
      },
      activate_account: {
        title: 'Activate Account',
        subtext: 'Create your password to activate your account.',
        password: 'Password',
        password_confirm: 'Confirm Password',
        submit: 'Activate Account',
        cancel: 'Decline Invitation',
      },
      addresses: {
        title: 'Your Addresses',
        add_new: 'Add a New Address',
        edit_address: 'Edit address',
        first_name: 'First Name',
        last_name: 'Last Name',
        company: 'Company',
        address1: 'Address1',
        address2: 'Address2',
        city: 'City',
        country: 'Country/Region',
        province: 'Province',
        zip: 'Postal/Zip Code',
        phone: 'Phone',
        set_default: 'Set as default address',
        add: 'Add Address',
        update: 'Update Address',
        cancel: 'Cancel',
        edit: 'Edit',
        delete: 'Delete',
        delete_confirm: 'Are you sure you wish to delete this address?',
      },
      login: {
        title: 'Login',
        email: 'Email',
        password: 'Password',
        forgot_password: 'Forgot your password?',
        sign_in: 'Sign In',
        cancel: 'Return to Store',
        guest_title: 'Continue as a guest',
        guest_continue: 'Continue',
      },
      orders: {
        title: 'Order History',
        order_number: 'Order',
        date: 'Date',
        payment_status: 'Payment Status',
        fulfillment_status: 'Fulfillment Status',
        total: 'Total',
        none: "You haven't placed any orders yet.",
      },
      order: {
        title: 'Order {{ name }}',
        date: 'Placed on {{ date }}',
        cancelled: 'Order Cancelled on {{ date }}',
        cancelled_reason: 'Reason: {{ reason }}',
        billing_address: 'Billing Address',
        payment_status: 'Payment Status',
        shipping_address: 'Shipping Address',
        fulfillment_status: 'Fulfillment Status',
        discount: 'Discount',
        shipping: 'Shipping',
        tax: 'Tax',
        product: 'Product',
        sku: 'SKU',
        price: 'Price',
        quantity: 'Quantity',
        total: 'Total',
        fulfilled_at: 'Fulfilled {{ date }}',
        subtotal: 'Subtotal',
        track_shipment: 'Track shipment',
      },
      recover_password: {
        title: 'Reset your password',
        email: 'Email',
        submit: 'Submit',
        cancel: 'Cancel',
        subtext: 'We will send you an email to reset your password.',
        success: "We've sent you an email with a link to update your password.",
      },
      reset_password: {
        title: 'Reset account password',
        subtext: 'Enter a new password for {{ email }}',
        password: 'Password',
        password_confirm: 'Confirm Password',
        submit: 'Reset Password',
      },
      register: {
        title: 'Create Account',
        first_name: 'First Name',
        last_name: 'Last Name',
        email: 'Email',
        password: 'Password',
        submit: 'Create',
        cancel: 'Return to Store',
      },
    },
    home_page: {
      onboarding: {
        product_vendor: 'Product vendor',
        product_title: 'Example Product Title',
        blog_title: "Your post's title",
        blog_excerpt:
          'Your store hasn’t published any blog posts yet. A blog can be used to talk about new product launches, tips, or other news you want to share with your customers. You can check out Shopify’s ecommerce blog for inspiration and advice for your own store and blog.',
        collection_title: 'Example Collection Title',
      },
      slideshow: {
        previous_slide: 'Previous slide',
        next_slide: 'Next slide',
        pause: 'Pause slideshow',
        play: 'Play slideshow',
        load_slide: 'Load slide {{ slide_number }}',
        active_slide: 'Slide {{ slide_number }}, current',
        navigation_instructions:
          'Use left/right arrows to navigate the slideshow or swipe left/right if using a mobile device',
      },
    },
    layout: {
      navigation: {
        menu: 'Menu',
      },
      cart: {
        title: 'Cart',
      },
      customer: {
        account: 'My Account',
        log_out: 'Log out',
        log_in: 'Log in',
        create_account: 'Create account',
        or: 'or',
      },
      footer: {
        blog_title: 'Latest News',
        social_title: 'Follow Us',
        social_platform: '{{ name }} on {{ platform }}',
        newsletter_title: 'Newsletter',
        copyright: 'Copyright',
      },
    },
    products: {
      general: {
        from_html: 'From {{ price }}',
        include_taxes: 'Tax included.',
        shipping_policy_html:
          '<a href="{{ link }}">Shipping</a> calculated at checkout.',
        share_title: 'Share this Product',
      },
      product: {
        sold_out: 'Sold Out',
        sale: 'Sale',
        unavailable: 'Unavailable',
        compare_at: 'Compare at',
        quantity: 'Quantity',
        add_to_cart: 'Add to Cart',
        sale_price: 'Sale price',
        regular_price: 'Regular price',
        description: 'Description',
        full_details: 'Full details',
        unit_price_label: 'Unit price',
      },
      zoom: {
        next: 'Next (Right arrow key)',
        prev: 'Previous (Left arrow key)',
        close: 'Close (Esc)',
      },
    },
    map: {
      errors: {
        address_error: 'Error looking up that address',
        address_no_results: 'No results for that address',
        address_query_limit_html:
          'You have exceeded the Google API usage limit. Consider upgrading to a <a href="https://developers.google.com/maps/premium/usage-limits">Premium Plan</a>.',
        auth_error_html:
          'There was a problem authenticating your Google Maps API Key.',
      },
    },
    gift_cards: {
      issued: {
        title: "Here's your {{ value }} gift card for {{ shop }}!",
        subtext: "Here's your gift card!",
        disabled: 'Disabled',
        expired: 'Expired on {{ expiry }}',
        active: 'Expires on {{ expiry }}',
        redeem: 'Use this code at checkout to redeem your gift card',
        shop_link: 'Start shopping',
        print: 'Print',
        add_to_apple_wallet: 'Add to Apple Wallet',
      },
    },
  },
  fr: {
    general: {
      accessibility: {
        refresh_page:
          "le choix d'une sélection entraîne une actualisation complète de la page",
        unit_price_separator: 'par',
        new_window: "S'ouvre dans une nouvelle fenêtre.",
        new_window_and_external:
          'Ouvre un site externe dans une nouvelle fenêtre.',
      },
      meta: {
        tags: 'Mots clés "{{ tags }}"',
        page: 'Page {{ page }}',
      },
      '404': {
        title: '404 - Page non trouvée',
        subtext_html:
          'Cette page n\'est pas disponible. <a href="{{ link }}">Retourner vers la boutique</a>',
      },
      password_page: {
        login_form_heading: "Accéder à la boutique à l'aide d'un mot de passe:",
        login_form_password_label: 'Mot de passe',
        login_form_password_placeholder: 'Votre mot de passe',
        login_form_submit: 'Entrer',
        signup_form_email_label: 'E-mails',
        signup_form_success:
          "Nous vous enverrons un e-mail juste avant l'ouverture !!",
        admin_link_html:
          'Êtes-vous le propriétaire de la boutique? <a href="/admin" class="text-link">Connectez-vous ici</a>',
        password_link: 'Entrer avec un mot de passe',
        powered_by_shopify_html:
          'Cette boutique sera propulsée par {{ shopify }}',
        close: 'Fermer (Esc)',
      },
      breadcrumbs: {
        home: 'Accueil',
        home_link_title: "Retour à la page d'accueil",
      },
      newsletter_form: {
        newsletter_email: 'votre-e-mail@exemple.com',
        submit: "S'inscrire",
        confirmation: 'Merci de vous être inscrit',
      },
      search: {
        no_results_html:
          'Votre recherche pour "{{ terms }}" n\'a pas généré de résultats.',
        results_for_html:
          'Votre recherche pour "{{ terms }}" a généré les résultats suivants:',
        title: 'Effectuez une recherche',
        placeholder: 'Rechercher',
        submit: 'Recherche',
      },
      social: {
        share_on_facebook: 'Partager',
        share_on_twitter: 'Tweeter',
        share_on_pinterest: 'Épingler',
        alt_text: {
          share_on_facebook: 'Partager sur Facebook',
          share_on_twitter: 'Tweeter sur Twitter',
          share_on_pinterest: 'Épingler sur Pinterest',
        },
      },
      payment: {
        method: 'Méthodes de paiement',
      },
    },
    blogs: {
      article: {
        older_post: 'Article précédent',
        newer_post: 'Article suivant',
        tags: 'Tags',
        comment_meta_html: '{{ author }} le {{ date }}',
        view_all: 'Tout afficher',
        read_more: 'Plus',
      },
      comments: {
        title: 'Laissez un commentaire',
        name: 'Nom',
        email: 'E-mails',
        message: 'Message',
        post: 'Publier le commentaire',
        moderated:
          "Veuillez noter que les commentaires doivent être approuvés avant d'être affichés",
        success_moderated:
          'Votre commentaire a été soumis avec succès. Nous le publierons sous peu, suite à notre processus de modération.',
        success: 'Votre commentaire a été publié avec succès!',
      },
      sidebar: {
        recent_articles: 'Messages récents',
        categories: 'Catégories',
      },
    },
    cart: {
      general: {
        title: 'Panier',
        remove: 'Supprimer',
        note: 'Instructions spéciales pour la commande',
        subtotal: 'Sous-total',
        savings_html: 'Vous économisez {{ price }}',
        taxes_and_shipping_at_checkout:
          'Taxes et frais de port calculés à la caisse',
        taxes_and_shipping_policy_at_checkout_html:
          'Taxes et <a href="{{ link }}">frais de port</a> calculés à la caisse',
        taxes_included_but_shipping_at_checkout:
          'Taxes incluses et frais de port calculés à la caisse',
        taxes_included_and_shipping_policy_html:
          'Taxes incluses. <a href="{{ link }}">Frais de port</a> calculés à la caisse.',
        update: 'Mettre à jour',
        checkout: 'Procéder au paiement',
        empty: 'Votre panier est vide.',
        cookies_required: 'Activer les cookies pour utiliser le panier',
        continue_browsing_html:
          '<a href="{{ link }}">Retourner vers la boutique</a>.',
        continue_shopping: 'Continuer vos achats',
      },
      label: {
        price: 'Prix',
        quantity: 'Quantité',
        total: 'Total',
        add_note: 'Ajouter une note à votre commande',
      },
    },
    collections: {
      general: {
        title: 'Collections',
        no_matches: 'Aucun produit ne correspond à votre recherche.',
        link_title: 'Consultez la collection {{ title }}',
      },
      sorting: {
        title: 'Trier par',
        browse: 'Parcourir',
        all_tags: 'Tout',
      },
    },
    contact: {
      form: {
        name: 'Nom',
        email: 'E-mails',
        phone: 'Téléphone',
        message: 'Message',
        send: 'Envoyer',
        post_success:
          'Merci de nous avoir avoir contacté. Nous vous répondrons le plus rapidement possible.',
      },
    },
    customer: {
      account: {
        title: 'Mon compte',
        details: 'Détails du compte',
        view_addresses: 'Voir les adresses',
        return: 'Retour au détails du compte',
      },
      activate_account: {
        title: 'Activer le compte',
        subtext: 'Créez votre mot de passe pour activer le compte.',
        password: 'Mot de passe',
        password_confirm: 'Confirmer le mot de passe',
        submit: 'Activer le compte',
        cancel: "Refuser l'invitation",
      },
      addresses: {
        title: 'Votre adresse',
        add_new: 'Ajouter une nouvelle adresse',
        edit_address: "Éditer l'adresse",
        first_name: 'Prénom',
        last_name: 'Nom',
        company: 'Compagnie',
        address1: 'Adresse 1',
        address2: 'Adresse 2',
        city: 'Ville',
        country: 'Pays/région',
        province: 'Province',
        zip: 'Code postal',
        phone: 'Téléphone',
        set_default: 'Définir comme adresse par défaut',
        add: "Ajouter l'adresse",
        update: "Mettre à jour l'adresse",
        cancel: 'Annuler',
        edit: 'Éditer',
        delete: 'Supprimer',
        delete_confirm:
          'Êtes-vous certain(e) de vouloir supprimer cette adresse?',
      },
      login: {
        title: 'Connexion',
        email: 'E-mails',
        password: 'Mot de passe',
        forgot_password: 'Mot de passe oublié?',
        sign_in: 'Se connecter',
        cancel: 'Retourner à la boutique',
        guest_title: "Continuer en tant qu'invité",
        guest_continue: 'Continuer',
      },
      orders: {
        title: 'Historique des commandes',
        order_number: 'Commande',
        date: 'Date',
        payment_status: 'Statut du paiement',
        fulfillment_status: 'Statut du traitement de la commande',
        total: 'Total',
        none: "Vous n'avez pas encore passé commande.",
      },
      order: {
        title: 'Commande {{ name }}',
        date: 'Placée le {{ date }}',
        cancelled: 'Commande annulée le {{ date }}',
        cancelled_reason: 'Motif: {{ reason }}',
        billing_address: 'Adresse de facturation',
        payment_status: 'Statut du paiement',
        shipping_address: 'Adresse de livraison',
        fulfillment_status: 'Statut du traitement de la commande',
        discount: 'Rabais appliqué',
        shipping: 'Livraison',
        tax: 'Taxes',
        product: 'Produit',
        sku: 'SKU',
        price: 'Prix',
        quantity: 'Quantité',
        total: 'Total',
        fulfilled_at: 'Traitée le {{ date }}',
        subtotal: 'Sous-total',
        track_shipment: "Suivre l'envoi",
      },
      recover_password: {
        title: 'Réinitialiser votre mot de passe',
        email: 'E-mails',
        submit: 'Soumettre',
        cancel: 'Annuler',
        subtext:
          'Nous vous ferons parvenir un e-mail pour réinitialiser votre mot de passe.',
        success:
          'Nous vous avons fait parvenir un e-mail pour réinitialiser votre mot de passe.',
      },
      reset_password: {
        title: 'Réinitialiser le mot de passe du compte',
        subtext: 'Entrez un nouveau mot de passe pour {{ email }}',
        password: 'Mot de passe',
        password_confirm: 'Confirmer le mot de passe',
        submit: 'Réinitialiser le mot de passe',
      },
      register: {
        title: 'Créer un compte',
        first_name: 'Prénom',
        last_name: 'Nom',
        email: 'E-mails',
        password: 'Mot de passe',
        submit: 'Créer',
        cancel: 'Retour à la boutique',
      },
    },
    home_page: {
      onboarding: {
        product_vendor: 'Le vendeur du produit',
        product_title: 'Titre du produit',
        blog_title: 'Le titre de votre publication',
        blog_excerpt:
          "Votre magasin n'a encore rien bloggué. Un blog peut être utilisé pour parler des lancements de nouveaux produits, d'astuces, ou d'autres nouvelles que vous voulez partager avec vos clients. Vous pouvez regarder le blog d'e-commerce de Shopify pour trouver de l'inspiration et des conseils pour votre propre magasin et blog.",
        collection_title: 'Titre de la collection',
      },
      slideshow: {
        previous_slide: 'Diapositive précédente',
        next_slide: 'Diapositive suivante',
        pause: 'Mettre en pause le diaporama',
        play: 'Lire le diaporama',
        load_slide: 'Charger la diapositive {{ slide_number }}',
        active_slide: 'Faire glisser {{ slide_number }}, en cours',
        navigation_instructions:
          'Utilisez les flèches gauche/droite pour naviguer dans le diaporama ou glissez vers la gauche/droite sur un appareil mobile',
      },
    },
    layout: {
      navigation: {
        menu: 'Menu',
      },
      cart: {
        title: 'Panier',
      },
      customer: {
        account: 'Mon compte',
        log_out: 'Se déconnecter',
        log_in: 'Se connecter',
        create_account: 'Créer un compte',
        or: 'ou',
      },
      footer: {
        blog_title: 'Dernières nouvelles',
        social_title: 'Restez en contact',
        social_platform: '{{ name }} sur {{ platform }}',
        newsletter_title: 'Infolettre',
        copyright: "Droit d'auteur",
      },
    },
    products: {
      general: {
        from_html: 'À partir de {{ price }}',
        include_taxes: 'Taxes incluses.',
        shipping_policy_html:
          '<a href="{{ link }}">Frais de port</a> calculés à la caisse.',
        share_title: 'Partager ce produit',
      },
      product: {
        sold_out: 'Épuisé',
        sale: 'Promo',
        unavailable: 'Non disponible',
        compare_at: 'Était',
        quantity: 'Quantité',
        add_to_cart: 'Ajouter au panier',
        sale_price: 'Prix réduit',
        regular_price: 'Prix régulier',
        description: 'Description',
        full_details: 'Tous les détails',
        unit_price_label: 'Prix unitaire',
      },
      zoom: {
        next: 'Suivant (flèche droite)',
        prev: 'Précédent (flèche gauche)',
        close: 'Fermer (Esc)',
      },
    },
    map: {
      errors: {
        address_error: 'Vous ne trouvez pas cette adresse',
        address_no_results: 'Aucun résultat pour cette adresse',
        address_query_limit_html:
          'Vous avez dépassé la limite de Google utilisation de l\'API. Envisager la mise à niveau à un <a href="https://developers.google.com/maps/premium/usage-limits">régime spécial</a>.',
        auth_error_html:
          'Il y avait un problème authentifier votre compte Google Maps API.',
      },
    },
    gift_cards: {
      issued: {
        title: "Votre carte-cadeau {{ shop }} d'une valeur de {{ value }}!",
        subtext: 'Voici votre carte-cadeau!',
        disabled: 'Désactivée',
        expired: 'Expirée le {{ expiry }}',
        active: 'Expire le {{ expiry }}',
        redeem:
          'Entrez ce code lors du paiement pour utiliser votre carte-cadeau',
        shop_link: 'Boutique',
        print: 'Imprimer',
        add_to_apple_wallet: 'Ajouter à Apple Wallet',
      },
    },
  },
  'zh-CN': {
    general: {
      accessibility: {
        refresh_page: '选择选项会使整页刷新',
        unit_price_separator: '单价',
        new_window: '在新窗口中打开。',
        new_window_and_external: '在新窗口中打开外部网站。',
      },
      meta: {
        tags: '标记为“{{ tags }}”',
        page: '第 {{ page }} 页',
      },
      '404': {
        title: '找不到页面 404',
        subtext_html:
          '您请求的页面不存在。单击<a href="{{ link }}">此处</a>继续购物。',
      },
      password_page: {
        login_form_heading: '使用密码进入商店：',
        login_form_password_label: '密码',
        login_form_password_placeholder: '您的密码',
        login_form_submit: '输入',
        signup_form_email_label: '电子邮件',
        signup_form_success: '在我们打开之前，我们会向您发送电子邮件！',
        admin_link_html:
          '您是否是商店所有者？<a href="/admin" class="text-link">在此处登录</a>',
        password_link: '使用密码进入',
        powered_by_shopify_html: '此商店由 {{ shopify }} 提供支持',
        close: '关闭 (Esc)',
      },
      breadcrumbs: {
        home: '主页',
        home_link_title: '返回首页',
      },
      newsletter_form: {
        newsletter_email: '您的电子邮件',
        submit: '订阅',
        confirmation: '感谢您订阅',
      },
      search: {
        no_results_html: '您对“{{ terms }}”的搜索并未出现任何结果。',
        results_for_html: '您对“{{ terms }}”的搜索显示内容如下：',
        title: '在我们的网站上搜索产品',
        placeholder: '搜索',
        submit: '搜索',
      },
      social: {
        share_on_facebook: '共享',
        share_on_twitter: '发推文',
        share_on_pinterest: '收藏',
        alt_text: {
          share_on_facebook: '在 Facebook 上共享',
          share_on_twitter: '在 Twitter 上发推文',
          share_on_pinterest: '固定在 Pinterest 上',
        },
      },
      payment: {
        method: '付款图标',
      },
    },
    blogs: {
      article: {
        older_post: '较旧的文章',
        newer_post: '较新的文章',
        tags: '标签',
        comment_meta_html: '{{ date }} 上的 {{ author }}',
        view_all: '查看全部',
        read_more: '阅读详细内容',
      },
      comments: {
        title: '发表评论',
        name: '名称',
        email: '电子邮件',
        message: '消息',
        post: '发布评论',
        moderated: '请注意，评论必须在发布之前获得批准',
        success_moderated:
          '您的评论已成功发布。由于我们的博客要经过审核，我们会在稍后将其发布。',
        success: '您的评论已成功发布！谢谢！',
      },
      sidebar: {
        recent_articles: '最近的文章',
        categories: '类别',
      },
    },
    cart: {
      general: {
        title: '您的购物车',
        remove: '删除',
        note: '卖家须知',
        subtotal: '小计',
        savings_html: '您正在保存 {{ price }}',
        taxes_and_shipping_at_checkout: '结账时计算的税金和运费',
        taxes_and_shipping_policy_at_checkout_html:
          '结账时计算的税金和<a href="{{ link }}">运费</a>',
        taxes_included_but_shipping_at_checkout:
          '结账时计算的税金（包含）和运费',
        taxes_included_and_shipping_policy_html:
          '税金（包含）。结账时计算的<a href="{{ link }}">运费</a>。',
        update: '更新购物车',
        checkout: '结账',
        empty: '您的购物车当前是空的。',
        cookies_required: '启用 Cookie 以使用购物车',
        continue_browsing_html: '继续浏览<a href="{{ link }}">此处</a>。',
        continue_shopping: '继续购物',
      },
      label: {
        price: '价格',
        quantity: '数量',
        total: '总计',
        add_note: '为订单添加备注',
      },
    },
    collections: {
      general: {
        title: '产品系列',
        no_matches: '抱歉，此产品系列中没有产品',
        link_title: '浏览我们的 {{ title }} 产品系列',
      },
      sorting: {
        title: '排序方式',
        browse: '浏览条件',
        all_tags: '所有',
      },
    },
    contact: {
      form: {
        name: '名称',
        email: '电子邮件',
        phone: '电话号码',
        message: '消息',
        send: '发送',
        post_success: '感谢您联系我们。我们会尽快回复您。',
      },
    },
    customer: {
      account: {
        title: '我的帐户',
        details: '帐户详细信息',
        view_addresses: '查看地址',
        return: '返回帐户详细信息',
      },
      activate_account: {
        title: '激活帐户',
        subtext: '创建密码以激活您的帐户。',
        password: '密码',
        password_confirm: '确认密码',
        submit: '激活帐户',
        cancel: '拒绝邀请',
      },
      addresses: {
        title: '您的地址',
        add_new: '添加新地址',
        edit_address: '编辑地址',
        first_name: '名字',
        last_name: '姓',
        company: '公司',
        address1: '地址 1',
        address2: '地址 2',
        city: '城市',
        country: '国家/地区',
        province: '省',
        zip: '邮编/邮政编码',
        phone: '电话',
        set_default: '设为默认地址',
        add: '添加地址',
        update: '更新地址',
        cancel: '取消',
        edit: '编辑',
        delete: '删除',
        delete_confirm: '确定要删除此地址吗？',
      },
      login: {
        title: '登录',
        email: '电子邮件',
        password: '密码',
        forgot_password: '忘记您的密码了？',
        sign_in: '登录',
        cancel: '返回商店',
        guest_title: '以游客身份继续',
        guest_continue: '继续',
      },
      orders: {
        title: '订单历史记录',
        order_number: '订单',
        date: '日期',
        payment_status: '付款状态',
        fulfillment_status: '发货状态',
        total: '总计',
        none: '您尚未创建任何订单。',
      },
      order: {
        title: '订单 {{ name }}',
        date: '下单日期：{{ date }}',
        cancelled: '订单取消日期：{{ date }}',
        cancelled_reason: '原因：{{ reason }}',
        billing_address: '账单地址',
        payment_status: '付款状态',
        shipping_address: '发货地址',
        fulfillment_status: '发货状态',
        discount: '折扣',
        shipping: '发货',
        tax: '税费',
        product: '产品',
        sku: 'SKU',
        price: '价格',
        quantity: '数量',
        total: '总计',
        fulfilled_at: '已于 {{ date }} 发货',
        subtotal: '小计',
        track_shipment: '跟踪货件',
      },
      recover_password: {
        title: '重置密码',
        email: '电子邮件',
        submit: '提交',
        cancel: '取消',
        subtext: '我们会向您发送电子邮件以重置您的密码。',
        success: '我们已向您发送电子邮件，其中包含更新密码的链接。',
      },
      reset_password: {
        title: '重置帐户密码',
        subtext: '输入 {{ email }} 的新密码',
        password: '密码',
        password_confirm: '确认密码',
        submit: '重置密码',
      },
      register: {
        title: '创建账户',
        first_name: '名字',
        last_name: '姓',
        email: '电子邮件',
        password: '密码',
        submit: '创建',
        cancel: '返回商店',
      },
    },
    home_page: {
      onboarding: {
        product_vendor: '产品供应商',
        product_title: '产品标题示例',
        blog_title: '您的文章的标题',
        blog_excerpt:
          '您的商店尚未发布任何博客文章。博客可用于介绍新产品的发布、提示或您想与客户分享的其他消息。您可以查看 Shopify 的电子商务博客，以获得可用于您的商店和博客的灵感以及建议。',
        collection_title: '产品系列标题示例',
      },
      slideshow: {
        previous_slide: '上一张幻灯片',
        next_slide: '下一张幻灯片',
        pause: '暂停幻灯片',
        play: '播放幻灯片',
        load_slide: '加载幻灯片 {{ slide_number }}',
        active_slide: '当前幻灯片 {{ slide_number }}',
        navigation_instructions:
          '使用左/右箭头浏览幻灯片或者在使用移动设备时向左/向右轻扫',
      },
    },
    layout: {
      navigation: {
        menu: '菜单',
      },
      cart: {
        title: '购物车',
      },
      customer: {
        account: '我的帐户',
        log_out: '退出',
        log_in: '登录',
        create_account: '创建帐户',
        or: '或',
      },
      footer: {
        blog_title: '最新消息',
        social_title: '关注我们',
        social_platform: '{{ platform }} 上的 {{ name }}',
        newsletter_title: '新闻通讯',
        copyright: '版权',
      },
    },
    products: {
      general: {
        from_html: '来自 {{ price }}',
        include_taxes: '税金（包含）。',
        shipping_policy_html: '结账时计算的<a href="{{ link }}">运费</a>。',
        share_title: '分享此产品',
      },
      product: {
        sold_out: '售罄',
        sale: '销售额',
        unavailable: '不可用',
        compare_at: '比较',
        quantity: '数量',
        add_to_cart: '添加到购物车',
        sale_price: '销售价格',
        regular_price: '常规价格',
        description: '描述',
        full_details: '全部详细信息',
        unit_price_label: '单价',
      },
      zoom: {
        next: '下一个（右箭头键）',
        prev: '上一个（左箭头键）',
        close: '关闭 (Esc)',
      },
    },
    map: {
      errors: {
        address_error: '查找该地址时出错',
        address_no_results: '未找到该地址的结果',
        address_query_limit_html:
          '您已超过 Google API 使用限制。考虑升级到<a href="https://developers.google.com/maps/premium/usage-limits">高级套餐</a>。',
        auth_error_html: '对您的 Google 地图 API 密钥进行身份验证时出现问题。',
      },
    },
    gift_cards: {
      issued: {
        title: '这是您获得的 {{ shop }} 的 {{ value }} 礼品卡！',
        subtext: '这是您的礼品卡！',
        disabled: '已禁用',
        expired: '已于 {{ expiry }} 过期',
        active: '过期日期：{{ expiry }}',
        redeem: '在结账时使用此代码兑换您的礼品卡',
        shop_link: '开始购物',
        print: '打印',
        add_to_apple_wallet: '添加到 Apple Wallet',
      },
    },
  },
};
