# Modern Day Researcher - Back End
Back-End
# TDD: 
https://docs.google.com/document/d/1iBB9GjRf1-uHYekqk0yWFF5QwthazmsI25Tk7DM8MAs/


The base URL for the deployed backend is: https://rticle.herokuapp.com


Endpoints -

    Authentication:

    /api/auth/register

    Method: POST
    Description: Register a user so they may log in.

    Structure of request object:

    {
        username: "TestUser1",  //required
        password: "password",   //required
        first_name: "John",    // not required
        last_name: "Doe"       //not required
    }


    Structure of Response:

    [
        1   //currently just returning the user id temporarily
    ]



    /api/auth/login

    Method: POST
    Description: Log user into system. Returns a token for restricted routes.

    Structure of request object:

    {
        username: "TestUser1",    //required
        password: "password"      //required
    }

    Structure of Response:

    {
        message: "Welcome TestUser1!, Have a token....",
        token: "fjdhffhufhbjfdBD3R9R89489UF9UT488478NIFJ9diejicujm9",
        user_id: 1
    }



    User Info

    /api/user/:id
    
    Method: GET
    Description: Retrieve all articles currently shared with the user  (temporaily, trying to get all user info to return)

    Structure of Response:

    [
    {
        "id": 1,
        "category": "technology",
        "title": "Purported pricing details of the Google Pixel 3a and Pixel 3a XL surface",
        "url": "https://www.notebookcheck.net/Purported-pricing-details-of-the-Google-Pixel-3a-and-Pixel-3a-XL-surface.417469.0.html",
        "description": "The Pixel 3a and 3a XL are expected to be launched next month. Pricing details have been mostly elusive until now but a new leak has given us a good idea of how Google plans to price the mid-range phones.",
        "is_read": 0,
        "user_id": 1
    },
    {
        "id": 5,
        "category": "sports",
        "title": "L.A. Lakers coaching search: They’re STILL doing this all wrong",
        "url": "https://www.sbnation.com/2019/4/15/18311158/la-lakers-coach-rumors-updates-rob-pelinka-magic-johnson-why",
        "description": "Hiring a coach before deciding on Magic Johnson’s replacement? Letting Magic’s No. 2 conduct the search? Lakers, what are you doing?",
        "is_read": 0,
        "user_id": 1
    },
    {
        "id": 6,
        "category": "finance",
        "title": "France sees blockchain as anti-monopoly weapon in digital world",
        "url": "https://phys.org/news/2019-04-france-blockchain-anti-monopoly-weapon-digital.html",
        "description": "France is pushing blockchain technology as a means of preventing finance giants enjoying a monopoly on transactions, Finance Minister Bruno Le Maire said Monday.",
        "is_read": 0,
        "user_id": 1
    },
    {
        "id": 7,
        "category": "business",
        "title": "Lyft Pulls E-Bikes From Service Amid Alarming Reports of Excessive Braking",
        "url": "https://gizmodo.com/lyft-pulls-e-bikes-from-service-amid-alarming-reports-o-1834047278",
        "description": "Following reports of problematic braking that in some cases resulted in rider injury, Lyft is pulling its recently acquired network of e-bikes from service in three major cities. Those include Citi Bike in New York, GoBike in San Francisco, and Capital Bikesh…",
        "is_read": 0,
        "user_id": 1
    },
    {
        "id": 12,
        "category": "technology",
        "title": "Disc-free Xbox One S could land on May 7th",
        "url": "https://techcrunch.com/2019/04/15/disc-free-xbox-one-s-could-land-on-may-7th/",
        "description": "Microsoft is about to launch an even cheaper Xbox One S. In order to cut costs, the company is removing the BluRay disc drive altogether. According to leaked marketing images spotted by WinFuture (via Thurrott), the console could launch on May 7th for €229 in",
        "is_read": 0,
        "user_id": 1
    },
    {
        "id": 15,
        "category": "sports",
        "title": "Tiger Woods’s peers all agree his return to the top is great for golf - The Guardian",
        "url": "https://www.theguardian.com/sport/2019/apr/15/tiger-woods-rory-mcilroy-brooks-koepka",
        "description": "Rory McIlroy hailed Tiger Woods’s Masters win as a great day for golf as his peers lined up to congratulate the comeback king",
        "is_read": 0,
        "user_id": 1
    }
]

 //defaults to an empty array if user does not have any articles

