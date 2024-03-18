import { CoreMenu } from "@core/types";


export const menu: CoreMenu[] = [
  // Apps & Pages

  {
    id: "apps",
    type: "section",
    title: "Sale",
    translate: "Sale",
    icon: "package",
    role: ['Admin','1','3','5','7'],

    children: [
      {
        id: "checkout",
        title: "checkout",
        translate: "checkout",
        type: "item",
        icon: "dollar-sign",
        url: "caisse",
        role: ['Admin','1','3','5','7'],

      },



                
     {
      id: "Invoice",
      title: "Invoice",
      translate: "Invoice",
      type: "item",
      icon: "layers",
      url: "facture/lister",
      role: ['Admin','1','3','5','7'],

    },
      

      {
        id: "pay credit",
        title: "pay credit",
        translate: "paycredit",
        type: "item",
        icon: "file",
        url: "credit/payer",
        role: ['Admin','1','3','5','7'],

      },

      {
        id: "customer",
        title: "Customer",
        translate: "Customer",
        type: "collapsible",
        icon: "users",
        role: ['Admin','1','3','5','7'],

        children: [
          {
            id: "add",
            title: "add",
            translate: "add",
            type: "item",
            icon: "circle",
            url: "client/ajouter",
          },
          {
            id: "view",
            title: "View",
            translate: "view",
            type: "item",
            icon: "circle",
            url: "client/lister",
          },
        ],
      },

      {
        id: "cashier",
        title: "cashier",
        translate: "CashierClosing",
        type: "collapsible",
        icon: "file-text",
        role: ['Admin','1','3','5','7'],

        children: [
          {
            id: "add",
            title: "add",
            translate: "add",
            type: "item",
            icon: "circle",
            url: "fermeturecaisse/ajouter",
          },
          {
            id: "view",
            title: "View",
            translate: "view",
            type: "item",
            icon: "circle",
            url: "fermeturecaisse/lister",
          },
          
        ],
      },

      {
        id: "typeticketresto",
        title: "typeticketresto",
        translate: "typeticketresto",
        type: "collapsible",
        icon: "plus-square",
        role: ['Admin','1','3','5','7'],

        children: [
          {
            id: "add",
            title: "add",
            translate: "add",
            type: "item",
            icon: "circle",
            url: "typeticketresto/ajouter",
          },
          {
            id: "view",
            title: "View",
            translate: "view",
            type: "item",
            icon: "circle",
            url: "typeticketresto/lister",
          },
          
        ],
      },

   /*   {
        id: "CustomerOrder",
        title: "CustomerOrder",
        translate: "CustomerOrder",
        type: "collapsible",
        icon: "plus-square",
        role: ['Admin','1','3','5','7'],

        children: [
          
          {
            id: "view",
            title: "View",
            translate: "view",
            type: "item",
            icon: "circle",
            url: "commandeclient/lister",
          },
          
        ],
      },*/
      {
        id: "devis",
        title: "devis",
        translate: "devis",
        type: "collapsible",
        icon: "book-open",
        role: ['Admin','1','3','5','7'],

        children: [
          {
            id: "add",
            title: "add",
            translate: "add",
            type: "item",
            icon: "circle",
            url: "devis/ajouter",
          },
          {
            id: "view",
            title: "View",
            translate: "view",
            type: "item",
            icon: "circle",
            url: "devis/lister",
          },
          
        ],
      },

    ],
  },

  {
    id: "apps",
    type: "section",
    title: "Products",
    translate: "Products",
    icon: "package",
    role: ['Admin','2','3','6','7'],


    children: [
      {
        id: "product",
        title: "Product",
        translate: "Product",
        type: "collapsible",
        icon: "shopping-cart",
        role: ['Admin','2','3','6','7'],


        children: [
          {
            id: "add",
            title: "add",
            translate: "add",
            type: "item",
            icon: "circle",
            url: "produit/ajouter",
            role: ['Admin','2','3','6','7'],


          },
          {
            id: "view",
            title: "View",
            translate: "view",
            type: "item",
            icon: "circle",
            url: "produit/lister",
            role: ['Admin','2','3','6','7'],


          },
        ],
      },

      {
        id: "category",
        title: "category",
        translate: "Category",
        type: "collapsible",
        icon: "grid",
        role: ['Admin','2','3','6','7'],


        children: [
          {
            id: "add",
            title: "add",
            translate: "add",
            type: "item",
            icon: "circle",
            url: "categorie/ajouter",
            role: ['Admin','2','3','6','7'],

          },
          {
            id: "view",
            title: "View",
            translate: "view",
            type: "item",
            icon: "circle",
            url: "categorie/lister",
            role: ['Admin','2','3','6','7'],

          },
        ],
      },
    ],
  },

  {
    id: "apps",
    type: "section",
    title: "Deposits",
    translate: "Deposits",
    icon: "package",
    role: ['Admin','2','3','6','7'],

    children: [
      {
        id: "deposits",
        title: "deposits",
        translate: "Deposits",
        type: "collapsible",
        icon: "archive",
        role: ['Admin','2','3','6','7'],

        children: [
          {
            id: "add",
            title: "add",
            translate: "add",
            type: "item",
            icon: "circle",
            url: "depot/ajouter",
            role: ['Admin','2','3','6','7'],

          },
          
          
          {
            id: "view",
            title: "View",
            translate: "view",
            type: "item",
            icon: "circle",
            url: "depot/lister",
            role: ['Admin','2','3','6','7'],

          },
        ],
      },
      {
        id: "inventaire",
        title: "inventaire",
        translate: "inventaire",
        type: "item",
        icon: "align-center",
        url: "inventaire",
        role: ['Admin','2','3','6','7'],

      },
      {
        id: "deplacerproduit",
        title: "deplacerproduit",
        translate: "deplacerproduit",
        type: "item",
        icon: "shuffle",
        url: "deplacerproduit",
        role: ['Admin','2','3','6','7'],

      },
      {
        id: "produitdefectueux",
        title: "produitdefectueux",
        translate: "produitdefectueux",
        type: "collapsible",
        icon: "trash-2",
        role: ['Admin','2','3','6','7'],

        children: [
          {
            id: "add",
            title: "add",
            translate: "add",
            type: "item",
            icon: "circle",
            url: "produitdefectueux/ajouter",
            role: ['Admin','2','3','6','7'],

          },
          
          
          {
            id: "view",
            title: "View",
            translate: "view",
            type: "item",
            icon: "circle",
            url: "produitdefectueux/lister",
            role: ['Admin','2','3','6','7'],

          },
        ],
      },
      
    ],
  },

  {
    id: "apps",
    type: "section",
    title: "Provider",
    translate: "Provider",
    icon: "package",
    role: ['Admin','4','5','6','7'],

    children: [
      {
        id: "provider",
        title: "provider",
        translate: "Provider",
        type: "collapsible",
        icon: "truck",
        role: ['Admin','4','5','6','7'],

        children: [
          {
            id: "add",
            title: "add",
            translate: "add",
            type: "item",
            icon: "circle",
            url: "fournisseur/ajouter",
          },
          {
            id: "view",
            title: "View",
            translate: "view",
            type: "item",
            icon: "circle",
            url: "fournisseur/lister",
          },
          
        ],
      },

      {
        id: "provider-commande",
        title: "ProviderCommande",
        translate: "ProviderCommande",
        type: "collapsible",
        icon: "columns",
        role: ['Admin','4','5','6','7'],

        children: [
          {
            id: "add",
            title: "add",
            translate: "Add",
            type: "item",
            icon: "circle",
            url: "commandefournisseur/ajouter",
            role: ['Admin','4','5','6','7'],

          },
          {
            id: "view",
            title: "view",
            translate: "view",
            type: "item",
            icon: "circle",
            url: "commandefournisseur/lister",
            role: ['Admin','4','5','6','7'],

          },
        ],
      },
    ],
  },
 

  {
    id: "apps",
    type: "section",
    title: "Administration",
    translate: "Administration",
    icon: "package",
    role: ['Admin'],
    children: [
      { 
        role: ['Admin'],
        id: "user",
        title: "User",
        translate: "User",
        type: "collapsible",
        icon: "user",
        children: [
          {
            id: "add",
            title: "add",
            translate: "add",
            type: "item",
            icon: "circle",
            url: "utilisateur/ajouter",
          },
          {
            id: "view",
            title: "View",
            translate: "view",
            type: "item",
            icon: "circle",
            url: "utilisateur/lister",
          },
        ],
      },

     
      {
        id: "report",
        title: "report",
        translate: "Report",
        type: "item",
        icon: "book",
        url: "rapport",
        role: ['Admin'],

      },
      {
        id: "timbrefiscal",
        title: "timbrefiscal",
        translate: "timbrefiscal",
        type: "item",
        icon: "dollar-sign",
        url: "timbrefiscal",
        role: ['Admin'],

      },
    
      
    ],
  },

];

