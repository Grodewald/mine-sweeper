# mine-sweeper
To run the app…
·      Install Node.js if you don’t already have it.

·      Install Grunt through the Node package manager with the –g option

o    > npm install grunt –g

·      At the command line navigate to the project directory and run npm install  

·      Run at the command line grunt dev

·      In a browser of choice navigate to http://localhost:8085/index.html

 
About the Game…
·      There are a number of different game types to choose from. In addition to traditional format, I have created games that have…

o   A time limit (when the time expires, you lose)

o   Multiple lives (your play continues after you hit a bomb as long as you have more than one life)

o   Time limit + multiple lives

·      I have left the graphics and styling pretty Spartan… 

o   ‘X’ means a bomb was in the cell… if you see this you lose

o   You can ‘flag’ a cell as having a bomb by 2-finger tap (right-click on a PC). This will turn the cell red. If you 2-finger tap it again the cell will turn yellow. A third 2-finger tap turns it back to black.

 
About the Code…
·      I believe the following things about good code…

o   It should be buildable (and resolve all dependencies) in a single command – the grunt build:dev I defined does this.

 

o   Developers should get constant feedback – grunt dev rebuild the code (running tests and lint each time) every time the a file is saved.

 
 

o   If you are working on a feature it should be obvious what files you edit to work on it… There are three modules (board, game [rules], and timing) each of these modules has all code for it in a single folder.

 

o   Modules need to be independent of one another and should only depend on stable abstractions. The only dependencies between modules in my code are event names. These are stable abstractions.

