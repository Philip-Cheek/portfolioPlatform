angular.module('resumeApp').service('projectService', function(){
	var service = {};

	var projects = [
		{	
			'name': 'ProsePair I/O',
			'components':[
				{
					'name': 'Intro',
					'body': [
						'Inspired by the informal message board games of old, Prose Pair I/O is a real-time web application that provides a ‘gamified’ platform for fun and fast-paced collaborative storytelling. A user may either pair with another user or join a group of users depending on the mode selected. After which, the user and his or her partner/group will be placed into an instance wherein they will receive a randomly selected prompt. The players will then start crafting a winding story formed from each other’s prior input.',
						'Prose Pair is turn based, which means the story’s intended direction may change as each user submits his or her contribution. The time in which a user has to do so, however, is limited. An automated text wizard guides the player throughout the process, easing the transition through the stages of the game and informing the player should they violate a rule as specified by the instance’s game mode.',
						'Some of the player’s edits to the ‘story’ (such as the title) will be visible in real time to his or her partner/group as they are made. Finalizing such edits must be sanctioned by the player’s game partner(s), which is done through a time-based polling system.',
						'Once players agree to an ending, the story is saved and may be viewed by visitors to the site henceforth. Users may vote on stories with either a ‘like’ or a ‘dislike.’',
						'Additionally, users may also submit their own writing prompts which may enter a game instance. However, users of the site may also up-vote and or down-vote said prompts. The server will purge consistently unpopular prompts from the eligible pool.'
					]
				},{
					'name':'Technical Overview',
					'body':[
						'The technical goal for this project was not only to build an application that sequestered end users into instances that then fostered real time, structured communication among them, but to do as such in a manner which would scale as cheaply and efficiently as possible. This goal was achieved by capitalizing on the single-threaded architecture of the Node.js runtime environment server-side and offloading large swathes of the business logic client-side.',
						'As stated above, the server is built with the Node.js runtime. The server logic uses a light middleware to ease database modeling and modularization of code. It also serves to abstract away some of the verbosity otherwise necessitated when writing a server with Node.',
						'There are two ways in which the server communicates with the client. One is through asynchronous calls to a REST API and the other is via WebSockets. More specifically, as it pertains to the latter, the server utilizes a popular library called Socket.IO which prioritizes the WebSocket protocol but may fallback to long polling should the WebSocket stream fail.',
						'The communication with socket.IO is handled within a unique instance of which is instantiated when a client first contacts the server. This is abstracted within what I refer to as a manager.  When the server instance initiates, what I refer to as a “soft” (saved, non-permanently, server side) session opens. The server than “bequeaths” the session to within the scope of my socket manager. This allows me to update a client session within an ‘IO’ instance. This is done for both security purposes and to allow me to direct the client to prompt the end user more appropriately (i.e. decide whether to display the “Welcome box” and whatnot).',
						'The socket manager communicates with another module that I wrote called the client manager. The client manager keeps track of all unique contacts made to my Socket Manager. This is a useful abstraction for a number of reasons. First and foremost, it easily allows each unique instance held within my socket manager to share data with one another in a simple and digestible manner.',
						'When a client secures a connection with a server an event is triggered which grants the server information to a socket object bearing a unique ‘socket id’ which is used to identify a specific client.So when a user selects a game mode, the client manager stores the players’ nickname and his client’s socket object. ',
						'The client manager is also responsible for matching players together into ‘rooms.’ Each game session has a unique room associated with it. When a client tells the server it would like to enter a game session, the server’s client manager takes check the queue that corresponds to that game mode. Should the queue not have enough players to fill the minimum required number of players for its corresponding game player, the client is placed in a queue and must wait for other players to join before a game may start.',
						'When a game is started, the client manager maps all of the players corresponding socket objects to an arbitrary namespace of which constitutes our ‘room’, and a callback is triggered that informs the socket manager after a room has been formed. The socket manager determines the order in which users trade turns and tells the prompt controller to fetch a randomly selected prompt from the database that has not been banned from the ‘pool.’ With this, the socket manager has enough data to form the appropriate object to send to all clients associated with the freshly produced room.',
						'The client was built with angular (pre 2.0, however much of the front-end architecture would remain if the platform were migrate up to 2.0), using a structure not dissimilar to the MVC structure that would be found server side in other frameworks. Using ngRoute, Angular allows us to generate little pages of HTML, called partials, depending on our url. Different pages, or functional sections, are subject to a controller, which acts as a bridge to different services and factories client side that handle different functions and dependency injections. Unique to Angular, we have directives which allow us to create re-usable modules to manipulate the DOM. A directive is what handles the modal system utilized by Prose Pair.',
						'In Prose Pair, factories are used when an object needs to be returned to a controller, but may not be instantiated as new instance when called upon. For the sake of this projects factories are used to call the appropriate ajax request to the server from which we may receive data, hold the relevant data, and parse the data as required whichever controller calls it. The ‘socket’ factory instantiates connection with the server over socket.io and wraps the functions from which the client may emit ‘messages’ to the server using socket.io. Another factory set and indexes ’timers’, or promises, that are triggered with either setTimeout or setInterval.',
						'The app’s services control large swathes of the app’s logic, ranging from dictating the text wizard, organizing peers, caching, parsing and sectioning persistent data, handling polls, analyzing user input, and adding and managing event handlers, depending on the service in question’s allotted responsibility.',
						'The controllers are responsible for linking interaction between the end user and the DOM with functions that call the appropriate factories and services to achieve the desired behavior of the application.',
						'Angular JS allows the controllers to work tightly with a templating engine that allows you to quickly display data stored in the controller’s ‘scope’ and link html elements with different functions and logic gates through a variety of inputs.',
						'It should be noted that Prose Pair’s front end was built with a front end framework (Angular). This fundamentally differs from component based libraries such as REACT or Polymer. The client-side experience is largely dictated by the client app itself, with the Server providing data, security, channels of communication, and CRUD operations.',
						'Prose Pair is architected as a single page application that serves a single purpose. I believe this made it a perfect use case for the technology stack that I used. It should be noted, that if this Prose Pair’s functionality were to be but one feature of a much larger web application, the front end framework would remain - in spirit, at least - intact. This framework would be controlled as a single page application. If it were but one feature in a large web of distinct features, the server would be a web of separate, self-contained applications, that re-use directives when appropriate.',
						'It should be noted that this application uses a NoSql database. Although, I did use an object modeling tool designed to work in asynchronous environments to model relationships between fields stored in my database. The NoSql DB was chosen for the purpose of speed and development ease, as object modeling was flexible and the data would be readily provided in JSON format. However, as I plan more extensive features for the next iteration of this project, I am going to migrate to a relational database, and perhaps use my existing database as a caching layer, as I feel a relational database will better scale to my particular ambitions for this project.',
						'The deployment of this project took advantage of Amazon Web Services. The database is running in a separate EC2 (amazon’s linux server) instance from the application’s backend. The Node.js backend uses what Amazon refer’s to as an Elastic Beanstalk instance. Additional configurations had to be made to the reverse NGINX proxy and the elastic load balancers to allow my client to communicate with my server via web sockets (which ELB does not support out of the box).',
						'Communication with the eC2 instance is guarded by two layers of security. The EC2 instance itself is restricted via firewall to only externally communicate with requests that fall under the domain of the specified security group. In addition, I edited the security configurations of Mongo to restrict communication to and from Mongo with the elastic IP that I assigned to my ELB instance. (ELB instances are virtual machines distributed across a giant network of servers so Amazon allows you to assign a static IP to address your instance).',
						'All static files are stored and fetched from Amazon’s s3 bucket. The kind of instance that I am running Prose Pair on is not meant to serve static files and would serve as a significant bottleneck, so s3 is a convenient hosting platform with convenient price caps and security options.',
						'One drawback to handling so much of the application logic client side is that a lot of your functionality is conspicuous. To avoid troublesome and trolling bots or clients ruining entire game sessions with other users, a client needs an arbitrary key that is associated with a room in order to communicate with it. This unique key is generated and granted upon entry to a game instance, which means only users that legitimately connected to a session may communicate to members of that session. This provides doubles as a logistical tool as well. In addition, socket communication must be legitimized through a ’soft session,’ which, again, increases the likelihood that a connection belongs to the intended client.',
						'With the help of an NPM module named Helmet, several HTTP headers are set server side that address various security concerns, such as frame guard which deters click jacking, strict-transport-security which tells guides and restricts client requests to HTTPS. There is also a header which prevents a browser from inferring the mime type of incoming files, which handicaps some pernicious scripts that will take advantage of the browser’s typical ability to do so. I also use a header that adds some XXS securities for good measure. All incoming data is parsed and ‘sanitized’ from potential NoSql injections or commands before being placed into the database.',
						'All in all, I had a blast developing ProsePair and I retrospectively still feel positive about the technology stack employed here. Although not appropriate for everyone, the technologies and methodologies employed here were the correct choices for this project. I will continue to provide support and updates.'
					]
				}
			],
			'technology':
				{
					'name': 'Runtime',
					'Runtime': [
						'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/AngularJS_logo.svg/695px-AngularJS_logo.svg.png'
					]
				},
			'source': 'https://github.com/Philip-Cheek/prosepairIO',
			'type': 'Solo ~ For Public',
			'status': 'Deployed',
			'deployment':{
				'status':true,
				'link': 'http://www.prosepair.io/',
				'type': 'Deployed Site'
			},
			'gallery': [
				'https://s3.amazonaws.com/prosepair/Screen+Shot+2016-10-05+at+4.20.50+PM.png',
			],
			'stack': [
				'Node.js',
				'AngularJS',
				'MongoDB'
			]
		},{
			'name': 'GKB Inventory Tool',
			'components':[
				{
					'name': 'Intro',
					'body': [
						'The GKB Inventory Tool was an application built by myself alongside a small team of developers for the Good Karma Bikes store in San Jose. This project was overseen by Fred Fowler who assisted in conforming our workflow to the SCRUM methodology.',
						'The tool itself serves as an agent between an employee or volunteer and the LightSpeed inventory system. In addition, the platform produces a unique barcode with custom sizing options, a dynamic menu system, and an additional content management system for administrators.',
						'The administrator may add items with either set static prices or a price multiplier. In addition an administrator may link certain products sub-item or options.',
						'The item options and price multiplier values for each category of attributes change dynamically with each successive item selected in accordance to the wishes of the product owner and additional configurations of the administrator.',
						'When an employee or volunteer receives a new item or batch of items, he or she will quickly navigate through our menu system, selecting appropriate attributes under a variety of categories that apply to the item at hand. Once the information is submitted, the backend calculates the price and generates a barcode number. The backend then makes a request to the Lightspeed inventory system, adding the item to the inventory.',
						'Once this request is completed, the client is notified and redirects to the ‘barcode page.’ The front-end draws the barcode based off of the the content of the barcode digits and the relative symbology dictated by the type of barcode selected.',
						'Please note that the source code provided contains a few major altercations made for security, privacy, and legal reasons.'
					],
				},{
					'name': 'Technical Overview',
					'body': [
						'This project capitalized on Django to architect the backend. Django was an attractive option for numerous reasons. It allowed us to prioritize secure communication between the intended client and the server without severely prolonging development time. In addition, Django has a built in visual interface in which an administrator may easily interact with the database, as allowed by the constraints of our DB models.',
						'Django also enables a very organized and modular development process. Each separate feature in the application was organized into its own ‘app.’ Django encourages a clean model-view-controller workflow. This workflow was slightly subverted by the way in which the Angular component of the client sends async requests, using Django a little like a REST api. However, the principle remained the same. The controller was responsible for each page or single page application. We further abstracted some of the business logic with more object oriented patterns for our views.',
						'The menu system was built with Angular JS, whereas other pages were served traditionally. One unique technical aspect of this project was the interweaving of both Angular and Django’s templating. We had to override the default templating interpolation of Angular in order to achieve this. This allowed us to implement additional security precautions client side (booting access when session expires and so on), as well as utilize the CSRF token system provided by Django - meaning that the app was served by Django and Django grants the template a CSRF token that is needed for the server to accept the request from the client.',
						'There was some debate as to whether we should use a modular library instead of a full front-end framework. We opted for Angular because we liked the support for data handling, which meant we could minimize the amount of requests that burdened the server, and allowed for the option input pages to be designed as a single page application that could be quick and fun to navigate. There was also an opportunity to write a service which would do some additional route handling client side in an organized fashion.',
						'The Lightspeed API was well documented and easy to work with. The requests made to Lightspeed were performed on the backend and certain calls were guarded based off of the user’s credentials. For simplicities sake, instead of individual logins, there were only three accounts - or, as we referred to them, tiers - that could interact with the client. The password for each account was encrypted and salted before being stored into the database. Only an administrator had permission to change any of the passwords. The user could also look up any product in the Lightspeed inventory entering a barcode or SKU number into our search page.',
						'We used a wonderful library called JSBarcode to generate the barcode. This library did a lot of the heavy lifting for us in this regard, but the advantages of using such an established library for something so critical in the timeframe that we were afforded made the use of such a no brainer.',
						'We worked with a UX designer to design the aesthetics and interactable portions of the application. It was the idea of the designer to have an expandable menuBar that would allow an employee or volunteer to quickly navigate back to sections of the input selection system that the user had previously visited.',
						'Since each item (an attribute that described the piece of inventory of which would affect the price multiplier) selected by the user would affect the available inputs of a subsequent category (this was to prevent the likelihood of an employee accidentally ascribing incompatible or nonsensical attribute of the product, and to cut down on the chances a mistake would be made by having an excess of unrelated options), we wrote an algorithm that would assemble the appropriate components based off of the possible relations as specified in the database before feeding that data into the next menu portion.',
						'The application exceeded the product owner’s expectation and has been happily used by the establishment since. As a small development team, we were quite pleased with the outcome of this endeavor.'
					],
				}
			],
			'source': 'https://github.com/Philip-Cheek/gkb_dory',
			'type': 'Team ~ Commercial',
			'status': 'Privately Deployed',
			'deployment':{
				'status':false,
			},
			'gallery': [
				'../resources/images/gkb.png',
			],
			'stack': [
				'Django',
				'AngularJS',
				'SQLite'
			]
		}, {
			'name': 'This Portfolio Platform',
			'components':[
				{
					'name': 'Intro',
					'body': [
						'This portfolio website was made for the purpose of demonstrating a few of my development capabilities. It will serve as a springboard for a ‘portfolio engine’ for other people who would like to use this website as a template.',
						'A GUI content management system is underway to make the use of this template accessible to a non-developer. Also underway: a site for mobile users. I believe the mobile-redirect option would best suite this application as features of the desktop version rely more heavily on traditional mouse interaction.',
						'This site was built with the purpose of being fun, aesthetic, and, most importantly, useful for anyone interested in either working with me as a developer, or is curious about the technical aspects involved in making projects of a similar scope to my own.',
						'Visit the contact page shown on the sidebar and send me a message!',
					],
				},{
					'name': 'Technical Overview',
					'body': [
						'The ultimate goal for this project was to build a template that would allow me to easily input relevant portfolio data that would be visually presented in the form of aesthetic pages that are easy to navigate with interactive features. ',
						'The backend is simple. The routing is largely handled client side, using deep linking to serve HTML partials that are generated by the front-end framework’s templating engine. However, the server does catch all url routes and redirects them to the index page, so when an end user refreshed his or her page, the DOM will display the same HTML partial that the user had been previously viewing.',
						'HTML5 and CSS3 compatible browsers will be privy to some visual enhancements triggered by the mouse. On the home page, there is a simulated ‘business card’ that shifts perspective in 3D space in accordance to the X, Y position of the mouse. This effect was achieved with CSS3 and Javascript.',
						'CSS3 browsers allow you to treat a div as a 3D plane using the perspective styling option. Treating the portion of the page in which the div spans as a 2D plane, the perspective value determines the ’Z’ distance of the plane from which any child elements may tilt ‘towards.’',
						'To achieve the effect of the card tilting to ‘face’ the mouse as it moves across the browser, I wrote a ‘card’ service client side that allows a controller to toggle an event handler of which is triggered by mouse movement across the page. Each time the browser detects mouse movement, the service snags the coordinates of the mouse and adjusts the x and y rotation of the ‘card’ elements by the x and y distances from the mouse and the point that serves as my axis of rotation. I further adjusted the Z distance of the additional child elements of the card to exaggerate the 3D effect.',
						'The child elements, however, were not responsive to other CSS selectors, such as ‘hover,’ so to achieve the mouseover options of the ‘Git’ logo, I had to manually determine whether the mouse overlapped with the boundary wherein I wished the ‘Git’ hover behavior to occur. I had to detect when the mouse would leave the boundary as well as entering it. This also meant I had to add a click event handler that would fire if and only if the card services were enabled and the ‘git Overlap’ bool was valid.',
						'The expanding border hover events on the side menu items are a pure CSS3 effect. This was achieved by creating a class with pseudo elements for each vertical and horizontal side. When the CSS hover effect is triggered, the pseudo elements transform to the the vertical and horizontal sizes of the div.',
						'The skills page showcases a physics sandbox wherein the logos for all of the technology I spent significant time working with fall into view and collide with one another. These bodies may be interacted with, and you may move an element and ‘throw’ it around the sandbox.',
						'This sandbox was created with the aid of the Matter.js physics engine. Although I have approximated physics on my own in the past, the Matter.js engine features extensive options, allowing you to set the density of both the objects and the ‘air’ (this effects how the objects ‘move’ when falling in the plane), as well as the restitution and elasticity of each object. The engine also sports convincing collision detection that accounts for the specified material and attributes of the ‘body’ as well.',
						'To make the engine behave properly in a controlled and re-usable manner for my template, I created an abstraction that handled all physics events, configuring the physics engine to my needs and performing additional actions to achieve the behavior that I wanted in the most performant way that I could achieve.',
						'When the physics object is called into memory, it grabs the canvas element from the DOM and sets the context in which all objects will be drawn. The canvas dimensions are set to the size of the main bar in the page at the time the object ‘inits.’ I establish a “World” object which is the object in which the Matter.js organizes the elements, or in Matter.js lingo, bodies. ',
						'The walls are rectangular bodies of which are established on the canvas for the elements to collide onto. A variety of options are also set, of which are both numerous and of likely little interest to the reader. The renderer is the sequence in which all draw attributes of the bodies are updated and redrawn onto the canvas.',
						'The controller may add both bodies and constraints for each bodies using the physics object methods I provide. It may also add a link to a sprite asset. It is, however, an expensive operation to add each body to the World at separate intervals due to quirks in the engine. This is doubly true when adding custom physical constraints to an object.',
						'Therefore when a body or constraint created in the physics object, it is added to its respective queue. It is up to the controller when to unload the queues onto the World. When you toggle to the more practical ‘legible’ view, the World is cleared and the render loop stops running.',
						'When a message is sent through the contact page, the backend re-formats the text and sends the message body by way of email to my personal email address. ',
						'I am happy with the results so far and have big plans to expand the platform little by little down the line as time affords.'
					],
				}
			],
			'source': 'https://github.com/Philip-Cheek/portfolioPlatform',
			'type': 'Solo ~ Personal',
			'status': 'Deployed',
			'deployment':{
				'status':true,
				'link': 'http://localhost:5000/contact',
				'type': 'Contact Page'

			},
			'gallery': [
				'../resources/images/portScreen.png',
			],
			'stack': [
				'Node.js',
				'Vanilla JS',
				'Angular'
			]
		}, {
			'name': 'Litter Bug',
			'components':[
				{
					'name': 'Intro',
					'body': [
						'LitterBug is an iOS application that was built to serve as a crowdsourcing task-based platform wherein a user may report public areas in need of cleaning, and other users may either donate money to add to a task’s bounty, or complete the task and be rewarded the bounty after a majority of the donors agree that the task had been completed.',
						'It should be noted that this project was abandoned at 80% completion, for it’s rather a silly idea with limited (IMO) commercial appeal. However the project features some cool tech that I am proud of, of which I will discuss further in the technical overview. If you are a mac user and have installed XCode, you may run the project either through XCode’s simulator on your computer, or on your phone . If you do so, please use 4000056655665556 as the Visa card number. It is a test card number provided by Stripe that will pass the validations and be able to complete any transaction. If you do not have access to XCode, consulting the source code will help you follow the along.',
						'After the end user connects via the Facebook login API, he or she will have the option to browse ‘tasks’ within whichever browsing radius the user chooses. The user may do this through either a ‘map view’ or a ‘list view.’ The pages can be toggled by tapping the menu options bar at the bottom of the screen. ',
						'If a user sees an area the he or she would like to report, she may click the report button. This will open the camera page wherein the user must take 1-3 photo(s) of the area. After confirmation of such, the application will reverse geo-code the users’ coordinates to grab specific street information, and the user may fill in additional details about the area in which the user would like to see cleaned.',
						'From there a user must make a minimum donation of 1.00 to the task’s bounty in order for the report to be submitted. After the bounty is submitted to the server, the server will in turn notify all active users that the donation had been submitted should the donation fall into their radius.',
						'If a user wishes to take a task, all donors will be notified. A user must be within a 100 foot radius of a task in order to take it. Once a user takes photo of the resolved area and claims that a task has been completed, the donors will have up to three days on whether to decide if a task had been completed. A mechanism to handle disputes has not yet been implemented.',
						'Users also have profile pages sporting a star rating that is determined by weighted values regarding the amount of money offered vs awarded and the tasks taken and the tasks completed. They also have a log detailing recent activity as well as a photo, provided they have a Facebook profile picture (if not, a default photo is awarded according to their listed gender).'
					],
				},{
					'name': 'Technical Overview',
					'body': [
						'This project involved the building of both a native application for iOS and a backend application. The iOS app communicates with the server via a Rest API and web sockets. Since this application involves sensitive user data, there was a considerable focus spent on security, of which I will talk about now.',
						'When the end user initiates the app on his or her mobile device, the app will contact the server via web socket, establishing a connection. The server will store the socket information and in turn send a ‘Socket Token’ that automatically changes from week to week. With a ‘Socket Token’ in hand, the client will allow the user to make a graph request to the Facebook API, which in turn grants an FB token (if they enter the correct FB info). With the FB token and Socket Token in hand, the server will accept a post request to the Login route from the application before proceeding to the next level of authentication.',
						'The Facebook Login API, and other oAuth login systems as well, are useful for this setup because the access tokens granted by FB login API are unique to the application with my specific developer ID and app ID that is established when building apps with xCode and the requisite personal developer iCloud account. With the client secret granted to me on my Facebook account for my specific application with xCode, I can validate (but not grant) FB access tokens on my server. Therefore, all users must be operating from the correct client in order to be authenticated.',
						'Once an FB token is validated server side, the server checks whether this user account has been registered in the DB before. If it has not been, the backend encrypts and salts the FB token, and stores the information granted to client by the FB graph request into the Database. A session is opened and stored with the FB ID (not the token) of the user for authentication purposes while the user uses the app (the session is destroyed after a client disconnects).',
						'The server also checks whether any payment options have been provided. If not the server tells the app to open the (skippable) Provide Payment Options page.',
						'Payments are handled by the Stripe API. There are two keys that guard access to the application’s access to the Stripe account. There is a public key which is provided to the client and a private key which is enabled on the server.',
						'The input field for the credit/visa card info on the app differ from a traditional text input field available to iOS developers. Not only can the characters not be copied, but the content of the field cannot be requested by the client or the developer of the client. When a user submits his/her information, a request is sent directly to Stripe’s servers, which responds with a Stripe token for that user. The Stripe token is then sent to my server, wherein I may create additional tokens for their card info. It is these tokens that are encrypted and salted before being stored into the database. These tokens are only valid if provided the application’s private key, of which is stored on the server.',
						'The client was mostly written in Apple’s successor to Objective C, Swift (Obj C and Swift are backwards compatible), and I used the StoryBoard features (for the most part) to build the UI. The approach that I used for coding the client combined both event driven and object oriented design patters. There are event driven controllers for each page of the app, but most of the business logic occurs in separate objects.',
						'Swift allows you to write either classes or structs. In addition, classes and structs may adhere to protocols which serve as blueprints for a specific collection of methods. This is useful because each ‘page’ in the app has a corresponding view controller, and this app has different types of views that share common functionality.',
						'I also utilized an Apple development technology called the Grand Central Dispatch, which allows the application to dispatch some tasks on a separate thread. For example, when a user object needs to access a profile photo for the first time, the image manager is given a url where it will download the image off the main thread (while the user goes about his or her business) and replace the default photo with the user’s Facebook profile photo through a callback once the download has been completed.',
						'The image manager uses a mutable collection object called NSCache to store photos. The manager may create resizable copies of photos, but the manager will not download an image twice from the same source during a single session. There was a plan to cache some items in the iPhone’s memory, however this was not built yet.',
						'The image manager also contains access to a public key for an AWS Incognito Role which allows the client privileges to directly download and upload (within a threshold) images from and to a specified S3 bucket without having to either use my server as a proxy or store my personal AWS credentials on the client (which could be compromised by an experienced and malicious developer).',
						'LitterBug uses CoreLocation to pinpoint the user’s current longitude and latitude (as supplied by the OS). The client prompts the user to either allow or deny the application access to this information. If the client approves access to the application’s locations services, a request is made to the server for all active reports within 50 miles of the users current location. The server makes this query to the the database using the DB’s (MongoDB’s) GeoSpatial operators. Each post is entered into the Phone’s memory as a ‘Post’ type (a class).',
						'The map view is achieved by using MapKit API. The map (standard iOS map) will render centered on the user’s longitude and latitude. All available posts will create an annotation (little balloon) for themselves on the map to indicate their location.',
						'When an annotation is pressed, the map will zoom in and re-center itself on the post location. A pop up will appear at the bottom of the screen with the post’s thumbnail and a set of icons. If the user taps elsewhere on the screen, or presses the cancel icon on the popUp, the map will zoom out and re-center itself on the user’s location.',
						'It should be noted that when the app received the user’s location, it sends a message via web socket to the server, which in turn informs the client manager. The client manager is responsible for sending location-specific notifications or updates to client’s who are within the appropriate radius.',
						'Since sorting through relative distances between every client currently connected to the server each time a notification room needed to form could present a potential bottleneck, the client manager deals with this by creating what I call ‘location balloons.’ A location balloon is a data structure containing client socket and geo info within the radius of its seed location.',
						'When a user connects, if his or her location does not belong within the radius of any existing location balloon, a new location balloon is created. The user’s location serves as the seed location. The client’s socket id serves as a key in an object that will allow the client manager to store the location balloon indexes in which the client belongs. There were plans to restructure the location balloons as R-tree’s before I orphaned the project. There were also plans to use Redis as a caching layer to back up client info.',
						'If a user wants to report a task in LitterBug, he or she must open the app and click the report button present in both the map and list views. The report button will redirect the user to the camera page, of which is handled by the camera view controller.',
						'The camera view controller uses the Camera object to allow establish a specified UIView as an ‘AV capture session’ using the iOS AVFoundation API. The AV Capture Session takes its video stream from the rear view camera of the mobile device.',
						'When the user clicks the ‘take photo’ icon, the Camera object captures and stores the still image data of the current video stream. The image buffer is then stored as a jPeg and converted into a cgImage and ultimately returned as a UI image in a callback. The UI Image is then overplayed on top of the camera view (a big box that I refer to as the Jumbo view) and the thumbnail is placed in the thumbnail row below. Clicking the thumbnail will allow the user to view the image in the Jumbo View and see menu options that will allow the user to delete the image.',
						'Once at least one photo is taken, the User may proceed to the Post Submit View. Before the segue to the next page is completed the user’s location data is sent to an API that will reverse geo locate the coordinates to produce a street address. The Post Submit View will populate the editable text bar with the street address if once the response from the API arrives.',
						'Here the user may add additional instructions and details about the area and the related task that the user would like to see completed. He or she must add a minimum donation of $1.00 (the report button just redirects to the Provide Payment Options page if the user has not added payment info) in order to submit.',
						'When a post is submitted and all of the info has passed the validations, a promise manager will set a timeout that will trigger a function that will alter the post’s active field to list itself as inactive and make the appropriate update to that user’s log. Every time there is a new donor, provided there are less than seven prior donors, the timeout will be canceled and another one will be added for another the previous expire time, minus one day. The promise manager stores the the info needed to set that timeout in application’s database, and it will consult the DB upon the Backend initializing to recover any lost promises.',
						'If a user is claiming a task (he or she must be in a 100 foot radius of the task at hand in order to do so), the promise manager will remove expiration promise but track how much time had passed since the creation of the expiration promise. Should the user not have successfully completed the task, the promise manager will create another expiration timeout that will fire at the difference between the default time for however many donors are attached to the post and the creation of the post, and the post will once again be visible to any users within the appropriate radius.',
						'If a user has claimed a task and the majority of other donors have accepted the task, separate Strip transactions will be created and fired from the donors to the task recipient (via Visa). A log will be added for both the user and all of the donors. The donors and the recipient may then be eligible to rate each other using the star system on their respective pages.',
						'This project accomplished some neat technical goals. I ultimately decided not to follow through and provide the last set of features and polish and submit the app to the app store at this point in time. Technically, however, I am proud of what was built. I look forward to designing more native apps for iOS.'
					],
				}
			],
			'source': 'https://github.com/Philip-Cheek/litterBug_iOS-Server',
			'type': 'For Public ~ In progress',
			'status': 'Orphan',
			'deployment':{
				'status':false,
			},
			'gallery': [
				'../resources/images/litTemp.png',
			],
			'stack': [
				'Swift (Native iOS)',
				'Node.js'
			]
		},
	];

	var open = [];

	service.getFullProjects = function(){
		return projects;
	}

	service.getProjectNames = function(){
		var pNames = [];
		for (var i = 0; i < projects.length; i ++){
			pNames.push(projects[i].name);
		}

		return pNames;
	};

	service.openProject = function(name, callback){
		var index;
		var openProjects = [];

		for (var i = 0; i < projects.length; i ++){
			if (name == projects[i].name){
				projects[i].open = !projects[i].open;
			}

			if (projects[i].open){
					service.addOpen(projects[i].name);
			}else{
				service.removeOpen(projects[i].name);
			}
		}
	}

	service.monitorOpen = function(){
		return open;
	}

	service.removeOpen = function(name){
		for (var i = 0; i < open.length; i++){
			if (open[i] == name){
				open.splice(i, 1);
				break;
			}
		}
	}

	service.addOpen = function(name){
		for (var i = 0; i < open.length; i++){
			if (name == open[i]){
				break;
			}
		}

		if (i == open.length){
			open.push(name);
		}
	}

	return service;
});