var pos = 0;
    const pacArray = [
        ['PacMan1.png', 'PacMan2.png'],
        ['PacMan3.png', 'PacMan4.png'],
    ];
    var direction = 0;
    const pacMen = []; // This array holds all the pacmen

    var shrink = 100; //this variable will help to change the size of the pacmen
    
    
    function setToRandom(scale) {
        return {
            x: Math.random() * scale,
            y: Math.random() * scale
        }
    }

    //set the random to change pacman faces//
    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    // Factory to make a PacMan at a random position with random velocity
    function makePac() {
        // returns an object with random values scaled {x: 33, y: 21}
        let velocity = setToRandom(10); // {x:?, y:?}
        let position = setToRandom(200);
        let figures = getRandomInt(2) ; // get integers 0 or 1
        
        // Add image to div id = game
        let game = document.getElementById('game');
        let newimg = document.createElement('img');
        newimg.style.position = 'absolute';
        newimg.src = pacArray[figures][figures];
        newimg.width = 100;
        
        
        
        //
        // set position here 
        newimg.style.left = position.x;
        newimg.style.top = position.y;

        //

        // add new Child image to game
        game.appendChild(newimg);
        // return details in an object
        return {
            position,
            velocity,
            newimg,

        };
    }

    function update() {
        //loop over pacmen array and move each one and move image in DOM
        pacMen.forEach((item) => {
            checkCollisions(item)

            

            item.position.x += item.velocity.x;
            item.position.y += item.velocity.y;

            item.newimg.style.left = item.position.x;
            item.newimg.style.top = item.position.y;

            

            
        })
        setTimeout(update, 20);
    }

    function checkCollisions(item) {
        //
        // detect collision with all walls and make pacman bounce
        if(item.position.x + item.velocity.x + item.newimg.width > window.innerWidth || item.position.x + item.velocity.x < 0){
            item.velocity.x= -item.velocity.x;

            // Reduces the size of the pacmen as they bounce in the inner width of the screen
            shrink = shrink - 10;
            item.newimg.style.width= shrink + 'px';
            item.newimg.style.height= shrink + 'px';
            
        }
        if(item.position.y + item.velocity.y + item.newimg.height > window.innerHeight || item.position.y + item.velocity.y < 0){
            item.velocity.y = -item.velocity.y;
            
            // Brings the size of the pacmen back to normal
            shrink = 100;

    
        }
        //
    }

    function makeOne() {
        pacMen.push(makePac()); // add a new PacMan
    }

    function killOne() {
        pacMen.pop(); // stop a moving PacMan
    }