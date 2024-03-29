var updateColor = function (e) {
    e.target.parentElement.nextElementSibling.childNodes[2].childNodes[0].innerHTML = e.target.value
    e.target.parentElement.nextElementSibling.childNodes[0].setAttribute("data-clipboard-text", e.target.value)
}

var browseImages = function () {
    document.getElementById("uploadInput").click()
}

// var uploadFile = function (files) {
//     if (files.length === 1) {
//         window.top.postMessage(files[0], '*')
//     }
// }

Vue.component('vue-block', {
    template: "#block-template",
    props: ["block"],
    data: function () {
        return {
            sound: '',
            playing: false
        }
    },
    methods: {
        highlight: function (code) {
            return Prism.highlight(code, Prism.languages.javascript);
        },
        playSound: function (url) {
            this.audio = new Audio(url);
            this.playing = true
            this.audio.play();
            var self = this;
            this.audio.addEventListener("ended", function () {
                self.playing = false
            });
        },
        stopSound: function () {
            this.audio.pause();
            this.playing = false
        }
    }
})

var app = new Vue({
    el: '#body',
    data: {
        search: "",
        open: undefined,
        menus: {
            "Getting Started": [{
                html: '<h2 style = "text-align: center">Make sure to read this! </br></br><a href="https://repl.it/languages/html" target="_blank"> Click here to start a new project </a></h2>'
            },
            {
                url: "./images/setupScreen.png",
                description: "Before doing your programming in script.js, make sure you have this pasted in the body of your index.html file so it looks just like above:",
                code: `<script src="https://rawgit.com/stevekrouse/WoofJS/master/dist/woof.js"></script>`,
                tags: "setup information"
            },
            {
                url: "./images/xAndYscript.png",
                description: "Add this code right after if you want to see the X and Y position of your mouse! Now your index.html file should look like above",
                code: "<script>\n      xAndY = document.createElement('p')\n      library = document.getElementsByTagName('script')[0]\n      document.body.insertBefore(xAndY, library)\n      xAndY.style = 'margin: 0;'\n      forever(() => {\n       xAndY.innerHTML = 'X: ' + mouseX + ' Y: ' + mouseY\n      })\n    </script>"
            },
            {
                url: "./images/scratchSample.png",
                description: "\nTo make pikachu do this Scratch program, we will open script.js and type this",
                tags: "setup information"

            },
            {
                url: "./images/together.png",
                description: "\nthen click run at the top. Remember to use your sprite's name!",
                code: `var pikachu = new Image({\n url: "https://woofjs.com/docs/images/pikachu.png",\n width: 120,\n height: 100,\n})\nonKeyDown(() => {\n if (keysDown.includes('SPACE')) {\n  if(pikachu.x > 50) {\n   forever(() => {\n    pikachu.turnRight(15)\n    pikachu.move(10)\n   })\n   } else {\n    pikachu.x = 51\n    pikachu.y = 0\n  }\n }\n})`,
                tags: "setup information"

            }
            ],
            "Integrations": {
                "Weather": [
                    {
                        integrationDescription: "Use the Yahoo Weather integration to get current tempertures and other weather data.",
                        integrationDescriptionClass: "alert-info",
                        integrationDocumentationLink: "https://developer.yahoo.com/weather/"
                    },
                    { html: "<hr style=\"height:7px;border:none;color:#e0e0e0;background-color:#e0e0e0;\"/>" },
                    {
                        description: "Here is a walk through of how to display the current temperature and conditions in NYC:",
                        code: '// First set up temporary text that will be replaced\nvar temp = new Text({\n text: "...", \n size: 30, \n color: "black", \nfontFamily: "arial",\n})\n// Then set your variable for the request\nvar city = "New York, NY"\n// Then set the url for your request\nvar url =  "https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid in (select woeid from geo.places(1) where text=\'" + city + "\')&format=json"\n// Finaly call the getData() function\ngetData(url, data => {\n // Replace the temporary text\n temp.text = data.query.results.channel.item.condition.temp + "° | " + data.query.results.channel.item.condition.text\n})',
                        tags: "weather temperature integration"
                    },
                    {
                        description: "There is even more you can do with the Yahoo Weather integration:",
                        code: '// Wind:\ndata.query.results.channel.wind.speed\ndata.query.results.channel.wind.direction\ndata.query.results.channel.wind.chill\n// Atmosphere:\ndata.query.results.channel.atmosphere.humidity\ndata.query.results.channel.atmosphere.pressure\ndata.query.results.channel.atmosphere.rising\n// Current Condtions\ndata.query.results.channel.item.condition.temp\ndata.query.results.channel.item.condition.text\n// Today\'s Forecast\ndata.query.results.channel.item.forecast[0].high\ndata.query.results.channel.item.forecast[0].low\ndata.query.results.channel.item.forecast[0].text\n// Tomorrow\'s Forecast\ndata.query.results.channel.item.forecast[1].high\ndata.query.results.channel.item.forecast[1].low\ndata.query.results.channel.item.forecast[1].text\n',
                        tags: "weather temperature integration"
                    }
                ],
                "Local Storage": [
                    {
                        integrationDescription: "You can use Local Storage to keep data for a specific user on a specific device. Local Stroage can help you to keep track of a specific user's high score. But Local Storage data will not be there after a user logs out of their browser.",
                        integrationDescriptionClass: "alert-info",
                        integrationDocumentationLink: "https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage"
                    },
                    { html: "<hr style=\"height:7px;border:none;color:#e0e0e0;background-color:#e0e0e0;\"/>" },
                    {
                        description: "First, you want to check if local storage for a specific variable exists. If it doesn't, then create it.",
                        code: 'if (!localStorage.highscore) {\n localStorage.setItem("highscore", 0)\n}',
                        tags: "local storage high score storage"
                    },
                    {
                        description: "Retrieve your local storage.",
                        code: 'localStorage.highscore',
                        tags: "local storage high score storage integration"
                    },
                    {
                        description: "Set your local storage.",
                        code: '// At the end of the game\nlocalStorage.highscore = 50',
                        tags: "local storage high score storage integration"
                    },
                    {
                        description: "Display your local storage.",
                        code: 'var textSprite = new Text({\n  text: () => localStorage.highscore, \n  size: 12, \n  color: "rgb(100, 50, 240)", \n  fontFamily: "arial", \n  textAlign: "left"\n})',
                        tags: "local storage high score storage integration"
                    }
                ],
                "Currency Conversion": [
                    {
                        integrationDescription: "Use the Currency Conversion integration to get current conversion rates.",
                        integrationDescriptionClass: "alert-info",
                        integrationDocumentationLink: "http://fixer.io/"
                    },
                    { html: "<hr style=\"height:7px;border:none;color:#e0e0e0;background-color:#e0e0e0;\"/>" },
                    {
                        description: "Here is a walk through of a program shows how much $5 is currently worth in EUR.",
                        code: '// First set up temporary text that will be replaced\nvar temp = new Text({\n text: "...", \n size: 60, \n color: "white", \n fontFamily: "arial",\n})\n// Then set your variables for the request\nvar base = "USD"\n// Then set the url for your request\nvar url = "http://api.fixer.io/latest?base=" + base\n// Finaly call the getData() function\ngetData(url, data => {\n // Replace the temporary text with the converted amoung\n temp.text = Math.round(5 * data.rates.EUR * 100) / 100 + " EUR"\n}) ',
                        tags: "currency conversion integration"
                    },
                    {
                        description: "Here is a walk through of a program shows how much 10 GBP is currently worth in USD.",
                        code: '// First set up temporary text that will be replaced\nvar temp = new Text({\n text: "...", \n size: 60, \n color: "white", \n fontFamily: "arial",\n})\n// Then set your variables for the request\nvar base = "GBP"\n// Then set the url for your request\nvar url = "http://api.fixer.io/latest?base=" + base\n// Finaly call the getData() function\ngetData(url, data => {\n // Replace the temporary text with the converted amoung\n temp.text = Math.round(10 * data.rates.USD * 100) / 100 + " USD"\n}) ',
                        tags: "currency conversion integration"
                    },
                    { html: "<hr style=\"height:7px;border:none;color:#e0e0e0;background-color:#e0e0e0;\"/>" },
                    {
                        integrationDescription: "For other currencies visit the integration's documentation for help.",
                        integrationDescriptionClass: "alert-info",
                        integrationDocumentationLink: "http://fixer.io/"
                    },
                ],
                "Sunrise and Sunset Data": [
                    {
                        integrationDescription: "Use the Sunrise-Sunset integration to get data about upcoming or past sunrises and sunsets.",
                        html: "You will need latitude and longitude values for this integration which you can find <a target='_blank'  href='http://www.latlong.net/'>here</a>.",
                        integrationDescriptionClass: "alert-info",
                        integrationDocumentationLink: "https://sunrise-sunset.org/api",

                    },
                    { html: "<hr style=\"height:7px;border:none;color:#e0e0e0;background-color:#e0e0e0;\"/>" },
                    {
                        description: "Here is a walk through of how to display today's sunrise time in NYC:",
                        code: '// First set up temporary text that will be replaced\nvar temp = new Text({\n text: "...", \n size: 60, \n color: "white", \nfontFamily: "arial",\n})\n// Then set your variables for the request\nvar lat = 40.7128\nvar lng = -74.0059 \n// Then set the url for your request\nvar url = "https://api.sunrise-sunset.org/json?lat=" + lat + "&lng=" + lng\n// Finaly call the getData() function\ngetData(url, data => {\n // Replace the temporary text\n temp.text = data.results.sunrise\n}) ',
                        tags: "sunrise sunset url integration"
                    },
                    {
                        description: "Here is a walk through of how to display today's sunset time in NYC:",
                        code: '// First set up temporary text that will be replaced\nvar temp = new Text({\n text: "...", \n size: 60, \n color: "white", \nfontFamily: "arial",\n})\n// Then set your variables for the request\nvar lat = 40.7128\nvar lng = -74.0059 \n// Then set the url for your request\nvar url = "https://api.sunrise-sunset.org/json?lat=" + lat + "&lng=" + lng\n// Finaly call the getData() function\ngetData(url, data => {\n // Replace the temporary text\n temp.text = data.results.sunset\n}) ',
                        tags: "sunrise sunset url integration"
                    },
                    {
                        description: "There is even more you can do with the Sunrise-Sunset integration:",
                        code: '// Instead of data.results.sunrise or data.results.sunset, try:\ndata.results.solar_noon\ndata.results.day_length\ndata.results.civil_twilight_begin\ndata.results.civil_twilight_end\ndata.results.nautical_twilight_begin\ndata.results.nautical_twilight_end\nata.results.astronomical_twilight_begin\nata.results.astronomical_twilight_begin',
                        tags: "sunrise sunset url integration"
                    }
                ],
                "Scientific Calculator": [
                    {
                        integrationDescription: "Use Netwon Scientific Calculator integration to preform complex calculations.",
                        integrationDescriptionClass: "alert-info",
                        integrationDocumentationLink: "https://github.com/aunyks/newton-api"
                    },
                    { html: "<hr style=\"height:7px;border:none;color:#e0e0e0;background-color:#e0e0e0;\"/>" },
                    {
                        description: "Here is a walk through of how to display the derivative of x^2 + 2x:",
                        code: '// First set up temporary text that will be replaced\nvar temp = new Text({\n text: "...", \n size: 15, \n color: "black", \nfontFamily: "arial",\n})\n// Then set your variables for the request\nvar operation = "derive"\nvar expression = "x^2+2x"\n// Then set the url for your request\nvar url = "https://newton.now.sh/" + operation + "/" + expression\n// Finaly call the getData() function\ngetData(url, data => {\n // Replace the temporary text\n temp.text = data.result\n})',
                        tags: "math calculations derivative calculator scientific integration"
                    },
                    {
                        description: "Here is a walk through of how to display the factorization of x^2 + 2x:",
                        code: '// First set up temporary text that will be replaced\nvar temp = new Text({\n text: "...", \n size: 15, \n color: "black", \nfontFamily: "arial",\n})\n// Then set your variables for the request\nvar operation = "factor"\nvar expression = "x^2+2x"\n// Then set the url for your request\nvar url = "https://newton.now.sh/" + operation + "/" + expression\n// Finaly call the getData() function\ngetData(url, data => {\n // Replace the temporary text\n temp.text = data.result\n})',
                        tags: "math calculations derivative factorization integration"
                    },
                    {
                        integrationDescription: "Options for operations include: simplify, factor, derive, integrate, zeroes, tangent, area (area under the curve), cos, sin, tan, arccos, arcsin, arctan, abs, log.",
                        integrationDescriptionClass: "alert-info"
                    }
                ],
                "Trivia": [
                    // {
                    //     integrationDescription:"Use the Trivia integration to preform generate trivia questions.",
                    //     integrationDescriptionClass:"alert-info",
                    //     integrationDocumentationLink:"https://opentdb.com/api_config.php"
                    // },
                    { html: "<hr style=\"height:7px;border:none;color:#e0e0e0;background-color:#e0e0e0;\"/>" },
                    {
                        description: "Here is a walk through of how to display the a random computer trivia question and its answer:",
                        code: '// First set up temporary text that will be replaced\nvar temp = new Text({\n text: "...", \n size: 15, \n color: "black", \nfontFamily: "arial",\n})\n// Then set the url for your request\nvar url = "https://opentdb.com/api.php?amount=1&category=18&type=multiple"\n// Finaly call the getData() function\ngetData(url, data => {\n // Replace the temporary text\n temp.text = data.results[0].question + "Answer:" + data.results[0].correct_answer\n})',
                        tags: "trivia integration"
                    },
                    {
                        html: "You can customize the category and number of questions retrieve <a target='_blank'  href='https://opentdb.com/api_config.php'>here</a>."
                    }
                ],
                // Firebase: [
                //     {
                //         integrationDescription:"Firebase is a database that helps you store cloud data.",
                //         integrationDescriptionClass:"alert-info",
                //         integrationDocumentationLink:"https://firebase.google.com/docs/",
                //     },
                //     {html:"<hr style=\"height:7px;border:none;color:#e0e0e0;background-color:#e0e0e0;\"/>"},
                //     {   
                //         description:"Firebase is similar to Scratch's cloud data as it allows you to store data in the cloud. Here is a quick run through of how to use Firebase to store a high score:",
                //         html:"<iframe src='//coding.space/woof/high_score.html' width='100%' height='500px' style='border:none;shadow:none;'></iframe>",
                //         tags:"firebase cloud storage high score integration"
                //     },
                // ],
                "Custom Integrations": [
                    {
                        integrationDescription: "Use the getData() function to pull data from various integrations.",
                        integrationDescriptionClass: "alert-info",
                    },
                    { html: "<hr style=\"height:7px;border:none;color:#e0e0e0;background-color:#e0e0e0;\"/>" },
                    {
                        description: "getData() works by taking an url and a function to do with the returned data. This is an example using the Sunrise-Sunset integration.",
                        code: '// First set up temporary text that will be replaced\nvar temp = new Text({\n text: "...", \n size: 60, \n color: "white", \nfontFamily: "arial",\n})\n// Then set your variables for the request\nvar lat = 40.7128\nvar lng = -74.0059 \n// Then set the url for your request\nvar url = "https://api.sunrise-sunset.org/json?lat=" + lat + "&lng=" + lng\n// Finaly call the getData() function\ngetData(url, data => {\n // Replace the temporary text\n temp.text = data.results.sunset\n}) ',
                        tags: "get request json http custom integration"
                    },
                    {
                        html: "<a target='_blank'  href='https://joebeachjoebeach.github.io/json-path-finder/'>Use this Path Finder to help you find the correct path for the data you are looking to retreive.</a>",
                        integrationDescriptionClass: "alert-info"
                    },
                ]
            },
            "Sprites & Backgrounds": {
                Background: [
                    {
                        description: "Set the backdrop to a color:",
                        code: 'setBackdropColor("blue")',
                        tags: "backdrop background",
                    },

                    {
                        url: "./images/beach.jpg",
                        code: 'setBackdropURL("https://woofjs.com/docs/images/beach.jpg")\nsetBackdropStyle("cover")',
                        tags: "beach backdrop background",
                    },

                    {
                        url: "./images/nyc.jpg",
                        code: 'setBackdropURL("https://woofjs.com/docs/images/nyc.jpg")\nsetBackdropStyle("cover")',
                        tags: "new york city backdrop background",
                    },

                    {
                        url: "./images/candyland.jpg",
                        code: 'setBackdropURL("https://woofjs.com/docs/images/candyland.jpg")\nsetBackdropStyle("cover")',
                        tags: "candy land backdrop background",
                    },

                    {
                        url: "./images/boss-backdrop.jpg",
                        code: 'setBackdropURL("https://woofjs.com/docs/images/boss-backdrop.jpg")\nsetBackdropStyle("cover")',
                        tags: "boss space",
                    },

                    {
                        url: "./images/minecraft.jpg",
                        code: 'setBackdropURL("https://woofjs.com/docs/images/minecraft.jpg")\nsetBackdropStyle("cover")',
                        tags: "minecraft backdrop background",
                    },

                    {
                        url: "./images/snow.jpg",
                        code: 'setBackdropURL("https://woofjs.com/docs/images/snow.jpg")\nsetBackdropStyle("cover")',
                        tags: "snow mountain backdrop background",
                    }, {
                        url: "./images/outerspace.jpg",
                        code: 'setBackdropURL("https://woofjs.com/docs/images/outerspace.jpg")\nsetBackdropStyle("cover")',
                        tags: "outer space mountain backdrop background",
                    },

                    {
                        url: "./images/ocean.jpg",
                        code: 'setBackdropURL("https://woofjs.com/docs/images/ocean.jpg")\nsetBackdropStyle("cover")',
                        tags: "ocean backdrop background sea",
                    },

                    {
                        url: "./images/bubbles-backdrop.jpeg",
                        code: 'setBackdropURL("https://woofjs.com/docs/images/bubbles-backdrop.jpeg")\nsetBackdropStyle("cover")',
                        tags: "bubble",
                    },

                    {
                        url: "./images/rr-backdrop.jpg",
                        code: 'setBackdropURL("https://woofjs.com/docs/images/rr-backdrop.jpg")\nsetBackdropStyle("cover")',
                        tags: "grass",
                    },

                    {
                        url: "./images/tomato-attack-backdrop.jpg",
                        code: 'setBackdropURL("https://woofjs.com/docs/images/tomato-attack-backdrop.jpg")\nsetBackdropStyle("cover")',
                        tags: "tomato outdoors",
                    },

                    {
                        url: "./images/war-backdrop.png",
                        code: 'setBackdropURL("https://woofjs.com/docs/images/war-backdrop.png")\nsetBackdropStyle("cover")',
                        tags: "blue",
                    },

                    {
                        url: "./images/hungrycrab-backdrop.jpg",
                        code: 'setBackdropURL("https://woofjs.com/docs/images/hungrycrab-backdrop.jpg")\nsetBackdropStyle("cover")',
                        tags: "ocean water",
                    },

                    {
                        url: "./images/platformer-backdrop1.png",
                        code: 'setBackdropURL("https://woofjs.com/docs/images/platformer-backdrop1.png")\nsetBackdropStyle("cover")',
                        tags: "platform mountain",
                    },

                    {
                        url: "./images/platformer-backdrop2.png",
                        code: 'setBackdropURL("https://woofjs.com/docs/images/platformer-backdrop2.png")\nsetBackdropStyle("cover")',
                        tags: "tree mountain outside",
                    },

                    {
                        url: "./images/emojibackground.jpg",
                        code: 'setBackdropURL("https://woofjs.com/docs/images/emojibackground.jpg")\nsetBackdropStyle("cover")',
                        tags: "emoji backdrop background",
                    },

                    {
                        url: "./images/galaxy.jpg",
                        code: 'setBackdropURL("https://woofjs.com/docs/images/galaxy.jpg")\nsetBackdropStyle("cover")',
                        tags: "galaxy outer space backdrop background",
                    },

                    {
                        url: "./images/harrypotter.jpg",
                        code: 'setBackdropURL("https://woofjs.com/docs/images/harrypotter.jpg")\nsetBackdropStyle("cover")',
                        tags: "harry potter backdrop background",
                    },

                    {
                        url: "./images/starwars.jpg",
                        code: 'setBackdropURL("https://woofjs.com/docs/images/starwars.jpg")\nsetBackdropStyle("cover")',
                        tags: "star wars backdrop background",
                    },

                    {
                        url: "./images/marioback.jpg",
                        code: 'setBackdropURL("https://woofjs.com/docs/images/marioback.jpg")\nsetBackdropStyle("cover")',
                        tags: "mario background backdrop",
                    },

                    {
                        url: "./images/soccer.jpg",
                        code: 'setBackdropURL("https://woofjs.com/docs/images/soccer.jpg")\nsetBackdropStyle("cover")',
                        tags: "soccer background backdrop",
                    },

                    {
                        url: "./images/flappyback.png",
                        code: 'setBackdropURL("https://woofjs.com/docs/images/flappyback.png")\nsetBackdropStyle("cover")',
                        tags: "flappy bird background backdrop",
                    },

                    {
                        url: "./images/desert.jpg",
                        code: 'setBackdropURL("https://woofjs.com/docs/images/desert.jpg")\nsetBackdropStyle("cover")',
                        tags: "desert background backdrop",
                    },

                    {
                        url: "./images/grass.jpg",
                        code: 'setBackdropURL("https://woofjs.com/docs/images/grass.jpg")\nsetBackdropStyle("cover")',
                        tags: "golf grass background backdrop",
                    },

                ],
                Text: [
                    {
                        description: "Create new text:",
                        code: 'var textSprite1 = new Text({\n  text: () => "Hello world!", \n  size: 12, \n  color: "rgb(100, 50, 240)", \n  fontFamily: "arial", \n  textAlign: "left"\n})',
                        tags: 'create make new text words string'
                    },
                    {
                        description: "Set location:",
                        code: "x: 50, y: -100",
                        tags: "text words string location x y"
                    },
                    {
                        description: "Set color:",
                        code: "color: rgb(100, 50, 240)",
                        tags: "text font words string color"
                    },
                    {
                        description: "Set font:",
                        code: "fontFamily: 'arial'",
                        tags: "text words string font family"
                    },
                    {
                        description: "Text alignment:",
                        html: "<img src=\"./images/textAlign.png\"><p>The red line is where the x value of the text is.</p>",
                        code: 'textAlign: "start"\ntextAlign: "end"\ntextAlign: "left"\ntextAlign: "center"\ntextAlign: "right"',
                        tags: "text font words string alignment left center right start end"
                    },
                    {
                        description: "Font size",
                        code: "size: 12",
                        tags: "text font words string size"
                    }
                ],
                Image: [
                    // {
                    //     html: '<button class="btn btn-medium btn-info" onclick="browseImages()">Upload Image</button>' +
                    //         '<input id="uploadInput" onchange="uploadFile(this.files)" style="display:none" type="file" name="pic" accept="image/*">',
                    //     tags: "picture image custom external upload sprite"
                    // },
                    {
                        description: "To upload your own image, drag it onto the left panel. Make sure you use the correct image name in your code!",
                        url: "./images/uploadScreen.png",
                        code: 'var myImage = new Image({\n  url: "./imageName.png",\n  width: 120, \n  height: 80,\n})',
                        tags: "upload image",
                    },
                    {
                        url: "./images/kpU9y5M.png",
                        code: 'var unicorn = new Image({\n  url: "https://woofjs.com/docs/images/unicorn.png",\n  width: 120, \n  height: 80,\n})',
                        tags: "unicorn sprite animal",
                    },

                    {
                        url: "./images/SuJhyZq.png",
                        code: 'var bb8 = new Image({\n  url: "https://woofjs.com/docs/images/BB8.png",\n  width: 150, \n  height: 220,\n})',
                        tags: "bb8 star wars sprite",
                    },

                    {
                        url: "./images/2lhEgxT.png",
                        code: 'var sushi = new Image({\n  url: "https://woofjs.com/docs/images/sushi.png",\n  width: 110, \n  height: 80,\n})',
                        tags: "sushi sprite",
                    },

                    {
                        url: "./images/zp0zzaG.png",
                        code: 'var nyanCat = new Image({\n  url: "https://woofjs.com/docs/images/nyancat.png",\n  width: 160, \n  height: 80,\n})',
                        tags: "cat sprite rainbow animal",
                    },

                    {
                        url: "./images/4B3ex6S.png",
                        code: 'var car = new Image({\n  url: "https://woofjs.com/docs/images/car.png",\n  width: 250, \n  height: 80,\n})',
                        tags: "car sprite",
                    },

                    {
                        url: "./images/Q4zxvEN.png",
                        code: 'var pikachu = new Image({\n  url: "https://woofjs.com/docs/images/pikachu.png",\n  width: 120, \n  height: 100,\n})',
                        tags: "pikachu sprite animal",
                    },

                    {
                        url: "./images/G7PpFgz.png",
                        code: 'var taco = new Image({\n  url: "https://woofjs.com/docs/images/taco.png",\n  width: 300, \n  height: 170,\n})',
                        tags: "taco sprite food",
                    },

                    {
                        url: "./images/ajkO60k.png",
                        code: 'var iceCream = new Image({\n  url: "https://woofjs.com/docs/images/icecream.png",\n  width: 130, \n  height: 170,\n})',
                        tags: "ice cream sprite food",
                    },

                    {
                        url: "./images/mZnRmHr.png",
                        code: 'var minecraft = new Image({\n  url: "https://woofjs.com/docs/images/minecraft.png",\n  width: 120, \n  height: 100,\n})',
                        tags: "minecraft sprite person",
                    },

                    {
                        url: "./images/614de0J.jpg",
                        code: 'var mario = new Image({\n  url: "https://woofjs.com/docs/images/mario.png",\n  width: 150, \n  height: 200,\n})',
                        tags: "mario sprite person",
                    },

                    {
                        url: "./images/0ioLJsk.jpg",
                        code: 'var cupcake = new Image({\n  url: "https://woofjs.com/docs/images/cupcake.png",\n  width: 170, \n  height: 170,\n})',
                        tags: "cupcake sprite food",
                    },

                    {
                        url: "./images/FArFDtL.png",
                        code: 'var snitch = new Image({\n  url: "https://woofjs.com/docs/images/snitch.png",\n  width: 250, \n  height: 150,\n})',
                        tags: "snitch harry potter sprite",
                    },

                    {
                        url: "./images/Gf0MwWP.png",
                        code: 'var bird = new Image({\n  url: "https://woofjs.com/docs/images/bird.png",\n  width: 120, \n  height: 80,\n})',
                        tags: "flappy bird sprite animal",
                    },

                    {
                        url: "./images/SepKsyn.png",
                        code: 'var puppy = new Image({\n  url: "https://woofjs.com/docs/images/puppy.png",\n  width: 150, \n  height: 210,\n})',
                        tags: "puppy dog animal sprite",
                    },

                    {
                        url: "./images/fnKpvEY.png",
                        code: 'var pusheen = new Image({\n  url: "https://woofjs.com/docs/images/pusheen.png",\n  width: 120, \n  height: 80,\n})',
                        tags: "pusheen cat animal sprite",
                    },

                    {
                        url: "./images/GfYgZJo.png",
                        code: 'var spiderman = new Image({\n  url: "https://woofjs.com/docs/images/spiderman.png",\n  width: 150, \n  height: 170,\n})',
                        tags: "spiderman person sprite",
                    },

                    {
                        url: "./images/50LlixQ.png",
                        code: 'var apple = new Image({\n  url: "https://woofjs.com/docs/images/apple.png",\n  width: 150, \n  height: 170,\n})',
                        tags: "apple food sprite",
                    },

                    {
                        url: "./images/B4kqEPt.png",
                        code: 'var spaceShip = new Image({\n  url: "https://woofjs.com/docs/images/space_ship.png",\n  width: 300, \n  height: 170,\n})',
                        tags: "space ship sprite",
                    },

                    {
                        url: "./images/9EkQfhM.png",
                        code: 'var coolEmoji = new Image({\n  url: "https://woofjs.com/docs/images/emoji-glasses.png",\n  width: 120, \n  height: 120,\n})',
                        tags: "glasses emoji sprite",
                    },

                    {
                        url: "./images/9BTkkuc.png",
                        code: 'var emoji = new Image({\n  url: "https://woofjs.com/docs/images/emoji.png",\n  width: 120, \n  height: 120,\n})',
                        tags: "emoji heart eyes sprite",
                    },

                    {
                        url: "./images/rGnUiWC.png",
                        code: 'var sadEmoji = new Image({\n  url: "https://woofjs.com/docs/images/emojilaugh.png",\n  width: 120, \n  height: 120,\n})',
                        tags: "sad laugh emoji sprite",
                    },

                    {
                        url: "./images/B9v5lZJ.png",
                        code: 'var partyEmoji = new Image({\n  url: "https://woofjs.com/docs/images/emoji-party.png",\n  width: 120, \n  height: 120,\n})',
                        tags: "party hat emoji sprite",
                    },

                    {
                        url: "./images/ZU8UBCM.png",
                        code: 'var puppyEmoji = new Image({\n  url: "https://woofjs.com/docs/images/emojipuppy.png",\n  width: 120, \n  height: 120,\n})',
                        tags: "dog puppy animal emoji sprite",
                    },

                    {
                        url: "./images/zzNfW5S.png",
                        code: 'var sillyEmoji = new Image({\n  url: "https://woofjs.com/docs/images/emojieyes.jpg",\n  width: 120, \n  height: 120,\n})',
                        tags: "silly tongue emoji sprite",
                    },

                    {
                        url: "./images/8rBZ8cu.png",
                        code: 'var dragon = new Image({\n  url: "https://woofjs.com/docs/images/dragon.png",\n  width: 300, \n  height: 170,\n})',
                        tags: "dragon animal sprite",
                    },

                    {
                        url: "./images/tt5zoZq.png",
                        code: 'var elephant = new Image({\n  url: "https://woofjs.com/docs/images/elephant.png",\n  width: 200, \n  height: 170,\n})',
                        tags: "elephant animal sprite",
                    },

                    {
                        url: "./images/uvKjnQI.png",
                        code: 'var soccer = new Image({\n  url: "https://woofjs.com/docs/images/soccer.png",\n  width: 180, \n  height: 200,\n})',
                        tags: "soccer ball sprite",
                    },
                    {
                        url: "./images/rocket.png",
                        code: 'var rocket = new Image({\n  url: "https://woofjs.com/docs/images/rocket.png",\n  width: 120, \n  height: 60,\n})',
                        tags: "rocket ship sprite",
                    },
                    {
                        url: "./images/crab.png",
                        code: 'var crab = new Image({\n  url: "https://woofjs.com/docs/images/crab.png",\n  width: 150, \n  height: 100,\n})',
                        tags: "crab animal sprite",
                    },
                    {
                        url: "./images/fish.png",
                        code: 'var fish = new Image({\n  url: "https://woofjs.com/docs/images/fish.png",\n  width: 70, \n  height: 30,\n})',
                        tags: "fish animal sprite",
                    },
                    {
                        url: "./images/bottomPipe.png",
                        code: 'var bottomPipe = new Image({\n  url: "https://woofjs.com/docs/images/bottomPipe.png",\n  width: 100, \n  height: 500,\n})',
                        tags: "bottom pipe flappy bird sprite",
                    },
                    {
                        url: "./images/topPipe.png",
                        code: 'var topPipe = new Image({\n  url: "https://woofjs.com/docs/images/topPipe.png",\n  width: 100, \n  height: 500,\n})',
                        tags: "top pipe flappy bird sprite",
                    },

                    {
                        url: "./images/explosion.png",
                        code: 'var explosion = new Image({\n  url: "https://woofjs.com/docs/images/explosion.png",\n  width: 100, \n  height: 100,\n})',
                        tags: "explosion sprite",
                    },

                    {
                        url: "./images/boss-bomb.png",
                        code: 'var bomb = new Image({\n  url: "https://woofjs.com/docs/images/boss-bomb.png",\n  width: 100, \n  height: 100,\n})',
                        tags: "bomb sprite",
                    },

                    {
                        url: "./images/boss-blaser.png",
                        code: 'var bossLaser = new Image({\n  url: "https://woofjs.com/docs/images/boss-blaser.png",\n  width: 120, \n  height: 80,\n})',
                        tags: "laser sprite",
                    },

                    {
                        url: "./images/boss-boss.png",
                        code: 'var bossShip = new Image({\n  url: "https://woofjs.com/docs/images/boss-boss.png",\n  width: 100, \n  height: 100,\n})',
                        tags: "boss ship sprite",
                    },

                    {
                        url: "./images/boss-laser.png",
                        code: 'var laser2 = new Image({\n  url: "https://woofjs.com/docs/images/boss-laser.png",\n  width: 100, \n  height: 100,\n})',
                        tags: "laser sprite",
                    },

                    {
                        url: "./images/boss-ship.png",
                        code: 'var bossShip2 = new Image({\n  url: "https://woofjs.com/docs/images/boss-ship.png",\n  width: 100, \n  height: 100,\n})',
                        tags: "ship sprite",
                    },

                    {
                        url: "./images/boss-warning.jpg",
                        code: 'var warning = new Image({\n  url: "https://woofjs.com/docs/images/boss-warning.jpg",\n  width: 100, \n  height: 80,\n})',
                        tags: "warning sprite",
                    },

                    {
                        url: "./images/bubbles-bowl.png",
                        code: 'var candyBowl = new Image({\n  url: "https://woofjs.com/docs/images/bubbles-bowl.png",\n  width: 100, \n  height: 100,\n})',
                        tags: "candy bowl sprite",
                    },

                    {
                        url: "./images/bubbles-candy.png",
                        code: 'var candy = new Image({\n  url: "https://woofjs.com/docs/images/bubbles-candy.png",\n  width: 100, \n  height: 60,\n})',
                        tags: "candy sprite",
                    },

                    {
                        url: "./images/bubbles-girl.png",
                        code: 'var girl = new Image({\n  url: "https://woofjs.com/docs/images/bubbles-girl.png",\n  width: 70, \n  height: 100,\n})',
                        tags: "girl sprite",
                    },

                    {
                        url: "./images/bubbles-wand.png",
                        code: 'var bubbleWand = new Image({\n  url: "https://woofjs.com/docs/images/bubbles-wand.png",\n  width: 70, \n  height: 100,\n})',
                        tags: "wand sprite",
                    },

                    {
                        url: "./images/candyland-mint.png",
                        code: 'var mint = new Image({\n  url: "https://woofjs.com/docs/images/candyland-mint.png",\n  width: 100, \n  height: 100,\n})',
                        tags: "mint food sprite",
                    },

                    {
                        url: "./images/candyland-obstacle.png",
                        code: 'var lollipop = new Image({\n  url: "https://woofjs.com/docs/images/candyland-obstacle.png",\n  width: 100, \n  height: 100,\n})',
                        tags: "lollipop food sprite",
                    },

                    {
                        url: "./images/fly-fly.png",
                        code: 'var fly = new Image({\n  url: "https://woofjs.com/docs/images/fly-fly.png",\n  width: 100, \n  height: 100,\n})',
                        tags: "fly animal sprite",
                    },

                    {
                        url: "./images/fly-frog.png",
                        code: 'var frog = new Image({\n  url: "https://woofjs.com/docs/images/fly-frog.png",\n  width: 120, \n  height: 90,\n})',
                        tags: "frog animal sprite",
                    },

                    {
                        url: "./images/fly-lilypad.png",
                        code: 'var lilypad = new Image({\n  url: "https://woofjs.com/docs/images/fly-lilypad.png",\n  width: 100, \n  height: 85,\n})',
                        tags: "lilypad sprite",
                    },

                    {
                        url: "./images/magic-dove.jpg",
                        code: 'var dove = new Image({\n  url: "https://woofjs.com/docs/images/magic-dove.jpg",\n  width: 100, \n  height: 105,\n})',
                        tags: "dove animal sprite",
                    },

                    {
                        url: "./images/magic-hat.png",
                        code: 'var hat = new Image({\n  url: "https://woofjs.com/docs/images/magic-hat.png",\n  width: 100, \n  height: 90,\n})',
                        tags: "hat clothing sprite",
                    },

                    {
                        url: "./images/picnic-basket.png",
                        code: 'var picnicBasket = new Image({\n  url: "https://woofjs.com/docs/images/picnic-basket.png",\n  width: 110, \n  height: 80,\n})',
                        tags: "picnic basket sprite",
                    },

                    {
                        url: "./images/picnic-cheese.png",
                        code: 'var cheese = new Image({\n  url: "https://woofjs.com/docs/images/picnic-cheese.png",\n  width: 100, \n  height: 60,\n})',
                        tags: "cheese food sprite",
                    },

                    {
                        url: "./images/picnic-eat.png",
                        code: 'var picnic = new Image({\n  url: "https://woofjs.com/docs/images/picnic-eat.png",\n  width: 110, \n  height: 110,\n})',
                        tags: "picnic people sprite",
                    },

                    {
                        url: "./images/picnic-milk.png",
                        code: 'var milk = new Image({\n  url: "https://woofjs.com/docs/images/picnic-milk.png",\n  width: 100, \n  height: 100,\n})',
                        tags: "picnic milk food sprite",
                    },

                    {
                        url: "./images/picnic-sandwich.png",
                        code: 'var sandwich = new Image({\n  url: "https://woofjs.com/docs/images/picnic-sandwich.png",\n  width: 100, \n  height: 100,\n})',
                        tags: "sandwich food sprite",
                    },

                    {
                        url: "./images/picnic-watermelon.png",
                        code: 'var watermelon = new Image({\n  url: "https://woofjs.com/docs/images/picnic-watermelon.png",\n  width: 100, \n  height: 100,\n})',
                        tags: "watermelon food sprite",
                    },

                    {
                        url: "./images/platformer-boss.png",
                        code: 'var boss1 = new Image({\n  url: "https://woofjs.com/docs/images/platformer-boss.png",\n  width: 90, \n  height: 90,\n})',
                        tags: "platformer boss animal sprite",
                    },

                    {
                        url: "./images/platformer-boss2.png",
                        code: 'var boss2 = new Image({\n  url: "https://woofjs.com/docs/images/platformer-boss.png",\n  width: 100, \n  height: 100,\n})',
                        tags: "platformer boss animal sprite",
                    },

                    {
                        url: "./images/platformer-enemy.png",
                        code: 'var enemy = new Image({\n  url: "https://woofjs.com/docs/images/platformer-enemy.png",\n  width: 100, \n  height: 100,\n})',
                        tags: "platformer boss animal sprite",
                    },

                    {
                        url: "./images/platformer-enemy2.png",
                        code: 'var enemy2 = new Image({\n  url: "https://woofjs.com/docs/images/platformer-enemy2.png",\n  width: 100, \n  height: 100,\n})',
                        tags: "platformer boss animal sprite",
                    },

                    {
                        url: "./images/platformer-game-over.png",
                        code: 'var gameOver = new Image({\n  url: "https://woofjs.com/docs/images/platformer-game-over.png",\n  width: 100, \n  height: 90,\n})',
                        tags: "game over sprite",
                    },

                    {
                        url: "./images/platformer-heart.png",
                        code: 'var pixelHeart = new Image({\n  url: "https://woofjs.com/docs/images/platformer-heart.png",\n  width: 100, \n  height: 100,\n})',
                        tags: "heart shape sprite",
                    },

                    {
                        url: "./images/platformer-next-level.png",
                        code: 'var nextLevel = new Image({\n  url: "https://woofjs.com/docs/images/platformer-next-level.png",\n  width: 130, \n  height: 120,\n})',
                        tags: "next level sprite",
                    },

                    {
                        url: "./images/platformer-player.png",
                        code: 'var player = new Image({\n  url: "https://woofjs.com/docs/images/platformer-player.png",\n  width: 100, \n  height: 100,\n})',
                        tags: "player sprite",
                    },

                    {
                        url: "./images/platformer-you-win.png",
                        code: 'var youWin = new Image({\n  url: "https://woofjs.com/docs/images/platformer-you-win.png",\n  width: 110, \n  height: 110,\n})',
                        tags: "you win sprite",
                    },

                    {
                        url: "./images/river-canoe1.png",
                        code: 'var canoe = new Image({\n  url: "https://woofjs.com/docs/images/river-canoe1.png",\n  width: 30, \n  height: 130,\n})',
                        tags: "canoe boat river sprite",
                    },

                    {
                        url: "./images/river-coconut.png",
                        code: 'var coconut = new Image({\n  url: "https://woofjs.com/docs/images/river-coconut.png",\n  width: 100, \n  height: 100,\n})',
                        tags: "coconut food sprite",
                    },

                    {
                        url: "./images/river-gator.png",
                        code: 'var gator = new Image({\n  url: "https://woofjs.com/docs/images/river-gator.png",\n  width: 130, \n  height: 80,\n})',
                        tags: "gator animal sprite",
                    },

                    {
                        url: "./images/river-tree.png",
                        code: 'var tree = new Image({\n  url: "https://woofjs.com/docs/images/river-tree.png",\n  width: 90, \n  height: 130,\n})',
                        tags: "tree sprite",
                    },

                    {
                        url: "./images/rr-gameover.png",
                        code: 'var gameOver2 = new Image({\n  url: "https://woofjs.com/docs/images/rr-gameover.png",\n  width: 140, \n  height: 90,\n})',
                        tags: "game over sprite",
                    },

                    {
                        url: "./images/rr-planet.png",
                        code: 'var planet = new Image({\n  url: "https://woofjs.com/docs/images/rr-planet.png",\n  width: 100, \n  height: 100,\n})',
                        tags: "planet sprite",
                    },

                    {
                        url: "./images/rr-star.png",
                        code: 'var star = new Image({\n  url: "https://woofjs.com/docs/images/rr-star.png",\n  width: 100, \n  height: 100,\n})',
                        tags: "star sprite",
                    },

                    {
                        url: "./images/squidchase-fish.png",
                        code: 'var fish = new Image({\n  url: "https://woofjs.com/docs/images/squidchase-fish.png",\n  width: 100, \n  height: 115,\n})',
                        tags: "fish sprite",
                    },

                    {
                        url: "./images/squidchase-squid.png",
                        code: 'var squid = new Image({\n  url: "https://woofjs.com/docs/images/squidchase-squid.png",\n  width: 100, \n  height: 115,\n})',
                        tags: "squid animal sprite",
                    },

                    {
                        url: "./images/tomato-attack-splat.png",
                        code: 'var splat = new Image({\n  url: "https://woofjs.com/docs/images/tomato-attack-splat.png",\n  width: 110, \n  height: 100,\n})',
                        tags: "splat sprite",
                    },

                    {
                        url: "./images/tomato-attack-tomato.png",
                        code: 'var tomato = new Image({\n  url: "https://woofjs.com/docs/images/tomato-attack-tomato.png",\n  width: 110, \n  height: 100,\n})',
                        tags: "tomato food sprite",
                    },

                ],
                Rectangle: [{
                    description: "Create new rectangle:",
                    code: 'var rectangleSprite1 = new Rectangle({\n  width: 20, \n  height: 55, \n  color: "pink"\n})',
                    tags: "create new rectangle"
                }, {
                    description: "Set location:",
                    code: "x: 50, y: -100",
                    tags: "rectangle location x y"
                }, {
                    description: "Set color:",
                    code: "color: rgb(100, 50, 240)"
                }, {
                    description: "Set width and height:",
                    code: "width: 30, height: 30"
                }],

                Polygon: [{
                    description: "Create new polygon:",
                    code: 'var polygonSprite1 = new Polygon({\n  sides: 6, \n  length: 100, \n  color: "orange"\n})',
                    tags: "create new polygon gon"
                }, {
                    description: "Set location:",
                    code: "x: 50, y: -100",
                    tags: "polygon gon location x y"
                }, {
                    description: "Set color:",
                    code: "color: rgb(100, 50, 240)"
                }, {
                    description: "Set sides and length:",
                    code: "sides: 12, length: 120"
                }],

                Circle: [{
                    description: "Create new circle:",
                    code: 'var circleSprite1 = new Circle({\n  radius: 10, \n  color: "#ffffff", \n  x: 0, \n  y: 0\n})',
                    tags: "create make new circle"
                }, {
                    description: "Set location:",
                    code: "x: 50, y: -100",
                    tags: "circle location x y"
                }, {
                    description: "Set color:",
                    code: "color: rgb(100, 50, 240)",
                    tags: "circle color"
                }, {
                    description: "Set size:",
                    code: "radius: 12",
                    tags: "circle size radius"
                }],

                Oval: [{
                    description: "Create new oval:",
                    code: 'var ovalSprite1 = new Oval({\n  width: 20, \n  height: 55, \n  color: "green"\n})',
                    tags: "create new oval ellipse"
                }, {
                    description: "Set location:",
                    code: "x: 50, y: -100",
                    tags: "oval ellipse location x y"
                }, {
                    description: "Set color:",
                    code: "color: rgb(100, 50, 240)"
                }, {
                    description: "Set width and height:",
                    code: "width: 30, height: 30"
                }],
                Line: [{
                    description: "Create new line:",
                    code: 'var lineSprite1 = new Line({color: "pink", \n  width: 10, \n  x: -100, \n  y: 100, \n  x1: 10, \n  y1: 20\n})'
                }, {
                    description: "Set starting point:",
                    code: "x: 50, y: -100"
                }, {
                    description: "Set ending point:",
                    code: "x1: 50, y1: -100"
                }, {
                    description: "Set line width:",
                    code: "width: 10"
                }, {
                    description: "Set color:",
                    code: "color: rgb(100, 50, 240)"
                }],
            },
            Motion: [{
                url: "./images/moveSteps.png",
                code: "sprite1.move(10)",
                tags: "motion move forward glide animate steps"
            }, {
                url: "./images/turnRight.png",
                code: "sprite1.turnRight(15)",
                tags: "turn angle point direction orientation right motion"
            }, {
                url: "./images/turnLeft.png",
                code: "sprite1.turnLeft(15)",
                tags: "turn angle point direction orientation left motion"
            },
            { html: "<hr style=\"height:7px;border:none;color:#e0e0e0;background-color:#e0e0e0;\"/>" },
            {
                url: "./images/point90.png",
                code: "sprite1.angle = LEFT  \nsprite1.angle = RIGHT \nsprite1.angle = UP \nsprite1.angle = DOWN \nsprite1.angle = 45",
                tags: "angle turn point direction right left up down orientation motion"
            }, {
                url: "./images/pointTowardsSprite.png",
                code: "sprite1.pointTowards(sprite2)",
                tags: "turn point direction angle sprite character towards mouse motion"
            }, {
                url: "./images/pointTowardsMouse.png",
                code: "sprite1.pointTowards(mouseX, mouseY)",
                tags: "motion turn point direction towards angle sprite character mouse"
            },
            { html: "<hr style=\"height:7px;border:none;color:#e0e0e0;background-color:#e0e0e0;\"/>" },
            {
                url: "./images/goToXY.png",
                code: "sprite1.x = 0 \nsprite1.y = 0",
                tags: "teleport move location set x y go motion"
            }, {
                url: "./images/goToRandom.png",
                code: "sprite1.x = randomX() \nsprite1.y = randomY()",
                tags: "teleport move location set x y random position go motion"
            }, {
                url: "./images/goToMouse.png",
                code: "sprite1.x = mouseX\nsprite1.y = mouseY",
                tags: "teleport location move mouse go pointer motion"
            }, {
                url: "./images/goToSprite2.png",
                code: "sprite1.x = sprite2.x \nsprite1.y = sprite2.y",
                tags: "teleport location other move go motion"
            },
            {
                url: "./images/glide.png",
                description: "This block does not exist in WoofJS, but you can use other Motion blocks to achieve this. For example:",
                code: "sprite1.pointTowards(166, -136)\nrepeat(100, () => {\n sprite1.move(1)\n})",
                tags: "glide go move motion"
            },
            { html: "<hr style=\"height:7px;border:none;color:#e0e0e0;background-color:#e0e0e0;\"/>" },
            {
                url: "./images/changeX.png",
                code: 'sprite1.x += 10',
                tags: "increase decrease change x move right left motion"
            },
            {
                url: "./images/setX.png",
                code: 'sprite1.x = 0',
                tags: "set x motion"
            },
            {
                url: "./images/changeY.png",
                code: 'sprite1.y += -10',
                tags: "increase decrease change y move up down motion"
            }, {
                url: "./images/setY.png",
                code: 'sprite1.y = 0',
                tags: "set y motion"
            },
            { html: "<hr style=\"height:7px;border:none;color:#e0e0e0;background-color:#e0e0e0;\"/>" },
            {
                url: "./images/ifOnEdge.png",
                description: "This block does not exist in WoofJS, but there are other ways you can do the same thing. Here is an example:",
                code: 'if(sprite1.x > maxX) {sprite1.turnRight(180)}',
                tags: "rotate bounce turn edge on motion"
            },
            { html: "<hr style=\"height:7px;border:none;color:#e0e0e0;background-color:#e0e0e0;\"/>" },
            {
                url: "./images/68747470733a2f2f692e696d6775722e636f6d2f4c576c5874444c2e706e67",
                code: 'sprite1.setRotationStyle("ROTATE LEFT RIGHT")',
                tags: "rotation style turn flip set rotate left right motion"
            }, {
                url: "./images/setRotate.png",
                code: 'sprite1.setRotationStyle("ROTATE")',
                tags: "rotation style turn all around flip motion"
            }, {
                url: "./images/68747470733a2f2f692e696d6775722e636f6d2f433337716439682e706e67",
                code: 'sprite1.setRotationStyle("NO ROTATE")',
                tags: "rotation style no don\'t turn flip motion"
            },
            { html: "<hr style=\"height:7px;border:none;color:#e0e0e0;background-color:#e0e0e0;\"/>" },
            {
                url: "./images/xpos.png",
                code: "sprite1.x",
                tags: "x position coordinate motion"
            },
            {
                url: "./images/ypos.png",
                code: "sprite1.y",
                tags: "y position coordinate motion"
            },
            {
                url: "./images/direction.png",
                code: "sprite1.angle",
                tags: "direction angle motion"
            },
            ],
            Events: [{
                description: "Warning: The shape of events in Scratch prevent you from putting an event inside other blocks.\nAlthough JavaScript doesn't prevent you from putting events insideother blocks, you should avoid it.\nFor example, don't place an onMouseDown() event inside a forever() block."
            },
            { html: "<hr style=\"height:7px;border:none;color:#e0e0e0;background-color:#e0e0e0;\"/>" },
            {
                url: "./images/whenGreenFlag.png",
                description: "Note: Unlike in Scratch, using ready() is reccomended but not always required.",
                code: "ready(() => {\n  \/* do something here */\n})",
                tags: "on onclick when green flag clicked page loaded event start ready"
            },
            { html: "<hr style=\"height:7px;border:none;color:#e0e0e0;background-color:#e0e0e0;\"/>" },
            {
                url: "./images/68747470733a2f2f692e696d6775722e636f6d2f436f58573132422e706e67",
                code: "onKeyDown(() => {\n  \/* do something here */\n})",
                tags: "on when key keyboard press down any event"
            }, {
                url: "./images/68747470733a2f2f692e696d6775722e636f6d2f5444436c756c4f2e706e67",
                code: "onKeyDown(() => {\n if (keysDown.includes('A')) {\n   \/* do something here */\n  }\n})",
                tags: "on when key keyboard press down event"
            }, {
                url: "./images/68747470733a2f2f692e696d6775722e636f6d2f556175544e77752e706e67",
                code: "onKeyDown(() => {\n if (keysDown.includes('UP')) {\n   \/* do something here */\n  }\n})",
                tags: "on when key up keyboard press down event"
            },
            { html: "<hr style=\"height:7px;border:none;color:#e0e0e0;background-color:#e0e0e0;\"/>" },
            {
                url: "./images/68747470733a2f2f692e696d6775722e636f6d2f5875506972634f2e706e67",
                code: "onMouseDown(() => {\n  \/* do something here */\n})",
                tags: "on onclick when click mouse down event stage event"
            },
            { html: "<hr style=\"height:7px;border:none;color:#e0e0e0;background-color:#e0e0e0;\"/>" },
            {
                description: "On mouse up",
                code: "onMouseUp(() => {\n  \/* do something here */\n})",
                tags: "on when click mouse up event"
            }, {
                description: "On mouse move",
                code: "onMouseMove(() => {\n  \/* do something here */\n})",
                tags: "on when mouse move event"
            },
            { html: "<hr style=\"height:7px;border:none;color:#e0e0e0;background-color:#e0e0e0;\"/>" },
            {
                url: "./images/68747470733a2f2f692e696d6775722e636f6d2f7a31356d6e506a2e706e67",
                code: "sprite1.onMouseDown(() => {\n  \/* do something here */\n})",
                tags: "on onclick sprite when click mouse down event"
            }, {
                description: "On mouse up",
                code: "sprite1.onMouseUp(() => {\n  \/* do something here */\n})",
                tags: "on when click mouse up sprite event"
            },
            { html: "<hr style=\"height:7px;border:none;color:#e0e0e0;background-color:#e0e0e0;\"/>" },
            {
                url: "./images/backdropSwitch.png",
                description: "This block does not exist in WoofJS.",
                tags: "backdrop switches when event"
            },
            { html: "<hr style=\"height:7px;border:none;color:#e0e0e0;background-color:#e0e0e0;\"/>" },
            {
                url: "./images/loudness.png",
                description: "This block does not exist in WoofJS.",
                tags: "loudness when event"
            },
            { html: "<hr style=\"height:7px;border:none;color:#e0e0e0;background-color:#e0e0e0;\"/>" },
            {
                url: "./images/broadcast.png",
                description: "These blocks do not exist in WoofJS. Scratch is first-person programming so if you want one sprite to communicate with another, you need to send messages. However, WoofJS is third-person so you can coordinate things between sprites without them talking to each other. You can use variables to hold \"messages\".",
                tags: "broadcast receive event message wait"
            }
            ],
            Looks: [{
                description: "Pick a color:",
                html: '<input value="#409cbc" style="width:100%; height: 50px" type="color" onchange="updateColor(event)"></input>',
                tags: "looks color hex pick colour red blue green yellow orange pink",
                code: '#409cbc'
            }, {
                description: "Create a color with red, green and blue values between 0 and 255",
                tags: "looks color rgb colour red blue green yellow orange pink",
                code: 'rgb(255, 100, 0)'
            },
            { html: "<hr style=\"height:7px;border:none;color:#e0e0e0;background-color:#e0e0e0;\"/>" },
            {
                url: "./images/sayAndThink.png",
                description: "These blocks do not exist in WoofJS, but you can use text for a similar effect. Here is an example:",
                code: '// First create your speech bubble image sprite\nvar speechBubble = new Image({\n  url: "https://woofjs.com/docs/images/speechBubble.png",\n  width: 150, \n  height: 75,\n})\n// Then create text\nvar text = new Text({\n text: () => "Hello!", \n size: 25\n})\nforever(() => {\n // Align the speech bubble with your sprite\n // uncomment the following lines and change sprite1 to the name of your sprite:\n // speechBubble.x = sprite1.x + (speechBubble.width / 2) + (sprite1.width / 2)\n // speechBubble.y = sprite1.y + (speechBubble.height / 2) + (sprite1.height / 2)\n // Keep the text aligned with the bubble \n text.x = speechBubble.x\n text.y = speechBubble.y + 10\n})',
                tags: "looks say think hello seconds"
            },
            { html: "<hr style=\"height:7px;border:none;color:#e0e0e0;background-color:#e0e0e0;\"/>" },
            {
                url: "./images/68747470733a2f2f692e696d6775722e636f6d2f653650393552302e706e67",
                code: "sprite1.show()",
                tags: "show appear looks"
            },
            {
                url: "./images/68747470733a2f2f692e696d6775722e636f6d2f323355617446352e706e67",
                code: "sprite1.hide()",
                tags: "looks hide disappear"
            },
            {
                code: "if(sprite1.showing){\n /* then do stuff here */\n}",
                html: "Use the <code>.showing</code> attribute to check if your sprite is showing.",
                tags: "showing hiding if when"
            },
            { html: "<hr style=\"height:7px;border:none;color:#e0e0e0;background-color:#e0e0e0;\"/>" },
            {
                url: "./images/68747470733a2f2f692e696d6775722e636f6d2f513078533746662e706e67",
                code: "imageSprite1.setImageURL('./images/SMJjVCL.png')",
                tags: "costume image url picture switch looks"
            }, {
                description: "You can only setImageURL() for Images.\nChange the color for rectangles, text, lines and circles:",
                tags: "change color looks"
            }, {
                code: 'rectangleSprite1.color = "purple"',
                tags: "change color looks rectangle"
            }, {
                code: 'textSprite1.color = "rgb(10, 150, 30)"',
                tags: "change color looks text"
            }, {
                code: 'lineSprite1.color = "#ff20ff"',
                tags: "change color line looks"
            }, {
                code: 'circleSprite1.color = "green"',
                tags: "change color circle looks"
            },
            { html: "<hr style=\"height:7px;border:none;color:#e0e0e0;background-color:#e0e0e0;\"/>" },
            {
                url: "./images/68747470733a2f2f692e696d6775722e636f6d2f7a616a30706c302e706e67",
                description: "Set the backdrop to an image URL:",
                code: 'setBackdropURL("./images/RkP7fcR.jpg")',
                tags: "background backdrop picture image URL switch looks"
            }, {
                description: "Set the backdrop to a color:",
                code: 'setBackdropColor("blue")',
                tags: "backdrop background color looks set"
            }, {
                description: "Set a backdrop image so that it resizes to fill the screen without stretching or compressing",
                code: 'setBackdropStyle("cover")',
                tags: "backdrop background set picture cover style looks"
            }, {
                description: "Set the backdrop image's width and height via pixel values.",
                code: 'setBackdropStyle("200px 300px")',
                tags: "backdrop background picture pixel size set style width looks"
            }, {
                description: "Set the backdrop image to percentages of the screen's width and height. (The default is 100% 100%.)",
                code: 'setBackdropStyle("100% 100%")',
                tags: "backdrop background picture default set style percent width height looks"
            }, {
                description: "Set the backdrop image to repeat in the x-direction and not the y-direction. (This is useful if you set the backdrop style to pixels.)",
                code: 'setBackdropRepeat("repeat-x")',
                tags: "backdrop background picture repeat style x looks set"
            }, {
                description: "Set the backdrop image to repeat in the y-direction and not the x-direction. (This is useful if you set the backdrop style to pixels.)",
                code: 'setBackdropRepeat("repeat-y")',
                tags: "backdrop background picture repeat style y looks"
            }, {
                description: "Set the backdrop image to not repeat in either direction. (no-repeat is the default.)",
                code: 'setBackdropRepeat("no-repeat")',
                tags: "backdrop background picture no repeat style looks"
            },
            { html: "<hr style=\"height:7px;border:none;color:#e0e0e0;background-color:#e0e0e0;\"/>" },
            {
                url: "./images/colorEffect.png",
                description: "These blocks do not exist in WoofJS, but you can change the colors of rectangle, text, lines, and circle sprites.",
                tags: "color effect clear graphic looks"
            }, {
                description: "Set the brightness percentage between 0-100 (also known as transparency or opacity)",
                url: "./images/brightness.png",
                code: "sprite1.brightness = 50",
                tags: "brightness opacity opaqueness transparency looks"
            },
            { html: "<hr style=\"height:7px;border:none;color:#e0e0e0;background-color:#e0e0e0;\"/>" },
            {
                url: "./images/changeSetSize.png",
                description: "You set and change the size in different ways for each type of sprite:",
                tags: "size width height radius looks"
            }, {
                code: 'imageSprite1.height = 20\nimageSprite1.width = 20',
                tags: "size height width length image looks"
            }, {
                code: 'rectangleSprite1.height = 20\nrectangleSprite1.width = 20',
                tags: "size height rectangle width length looks"
            }, {
                code: 'circleSprite1.radius = 20',
                tags: "size circle radius looks"
            }, {
                code: 'lineSprite1.x1 = 20\nlineSprite1.y1 = 20\nlineSprite1.width = 20',
                tags: "size line width length height looks"
            }, {
                code: 'textSprite1.size = 20',
                tags: "size font text looks"
            },
            { html: "<hr style=\"height:7px;border:none;color:#e0e0e0;background-color:#e0e0e0;\"/>" }, {
                url: "./images/68747470733a2f2f692e696d6775722e636f6d2f4b756d707167532e706e67",
                code: "sprite1.sendToFront()",
                tags: "layer send in front looks"
            },
            {
                url: "./images/68747470733a2f2f692e696d6775722e636f6d2f5870676c764a502e706e67",
                code: "sprite1.sendToBack()",
                tags: "layer back send behind looks"
            }],
            Control: [{
                url: "./images/68747470733a2f2f692e696d6775722e636f6d2f723677595838632e706e67",
                code: 'after(4, "seconds", () => {\n  \/* do something here */\n})',
                description: 'There is no wait block in JavaScript. Instead, you can use after():',
                tags: "wait after seconds control"
            }, {
                code: 'every(3, "seconds", () => {\n  \/* do something here */\n})',
                description: 'If you want to wait at regular intervals, use every():',
                tags: "wait every seconds control"
            }, {
                code: 'every(() => random(1, 5), "seconds", () => {\n \/* do something here */\n})',
                description: 'If you want to wait at changing intervals, use every() with a function instead of a number.',
                tags: "wait every seconds random control"
            },
            { html: "<hr style=\"height:7px;border:none;color:#e0e0e0;background-color:#e0e0e0;\"/>" },
            {
                url: "./images/68747470733a2f2f692e696d6775722e636f6d2f6a77653133626d2e706e67",
                code: 'repeat(10, () => {\n  \/* do stuff here */\n})',
                tags: "repeat times control"
            }, {
                html: "When you use <code>repeat()</code>, your code doesn't repeat as fast as the computer can run it.\
                        Instead, we slow it down, which makes things like animation and motion work well. But, if you want your code to repeat instantly,\
                        as fast as the computer can do it, you can combine the <code>range()</code> function with the <code>forEach()</code> function:\
                        <br><br>Example: Repeat your code instantly 10 times:",
                code: "range(0, 10).forEach(i => {\n  \/* something to repeat */\n})",
                tags: "repeat range array forEach control"
            }, {
                html: "In the above example, <code>i</code> will start at 0 and go up by 1 every repetition, stopping before it gets to 10.\
                        <br>If you are familiar with <code>for</code> loops, you might realize that this does the same thing.\
                        We recommend using <code>range().forEach()</code> instead of <code>for</code>."
            }, {
                url: "./images/68747470733a2f2f692e696d6775722e636f6d2f675a4f6a4c444d2e706e67",
                code: 'forever(() => {\n  \/* do stuff here */\n})',
                tags: 'forever loop repeat control'
            },
            { html: "<hr style=\"height:7px;border:none;color:#e0e0e0;background-color:#e0e0e0;\"/>" },
            {
                url: "./images/68747470733a2f2f692e696d6775722e636f6d2f7535724b4133362e706e67",
                code: 'if(\/* something is */ true) {\n  \/* then do stuff here */\n}',
                tags: 'if then when condition control'
            }, {
                url: "./images/68747470733a2f2f692e696d6775722e636f6d2f52594f705361712e706e67",
                code: 'if(\/* something is */ true) {\n  \/* then do stuff here */\n} else {\n  \/* otherwise do other stuff here */ \n}',
                tags: 'if else when condition control'
            }, {
                url: "./images/68747470733a2f2f692e696d6775722e636f6d2f615139694a4e772e706e67",
                code: 'repeatUntil(() => \/* something is */ true, () => {\n  \/* something to repeat */\n})',
                tags: 'repeat until control'
            }, {
                url: "./images/68747470733a2f2f692e696d6775722e636f6d2f615139694a4e772e706e67",
                code: 'repeatUntil(() => \/* something is */ true, () => {}, () => {\n  \/* something to do after condition is true, once */\n})',
                tags: "wait until repeat control",
                description: 'There is no wait-until in JavaScript. You can simulate a wait-until block by specifying a third function to a repeatUntil. Refer to the "Control Flow" section below for more details.'
            }, {
                url: "./images/68747470733a2f2f692e696d6775722e636f6d2f4f586c704b394a2e706e67",
                code: 'when(() => \/* something is */ true, () => {\n  \/* do stuff here */\n})',
                tags: "forever if when control",
                description: 'when() is a short-hand for a forever-if statement:'
            },
            { html: "<hr style=\"height:7px;border:none;color:#e0e0e0;background-color:#e0e0e0;\"/>" },
            {
                url: "./images/68747470733a2f2f692e696d6775722e636f6d2f5357537864566d2e706e67",
                code: 'freeze()',
                description: 'Freeze the screen. You can reanimate the screen with defrost()',
                tags: 'freeze stop all frost control'
            }, {
                description: 'Un-freezes the screen. Use this after you use freeze()',
                code: 'defrost()',
                tags: 'freeze stop start defrost control'
            },
            { html: "<hr style=\"height:7px;border:none;color:#e0e0e0;background-color:#e0e0e0;\"/>" },
            {
                url: "./images/68747470733a2f2f692e696d6775722e636f6d2f674e7a547053302e706e67",
                html: "Cloning in WoofJS is very difficult. We reccomend starting with the <a href='http://coding.space/woof/cloning-tutorial.html' target='_blank'>Cloning Tutorial</a>. You can also find it in the Tutorials tab.",
                code: '// create a list to store all of the clones\nvar clones = []\nevery(4, "seconds", () => {\n  // create a clone every 4 seconds\n  var clone = new Circle({radius: 10, color: "pink", x:\nrandomX(), y: randomY()})\n  // add each clone to the list\n  clones.push(clone)\n})\n\nforever(() => {\n  // forever, for each clone in clones\n  clones.forEach(clone => {\n    // move it to the right\n    clone.x++\n    if (clone.x > maxX) {\n      // delete it if it goes off the screen\n      clone.delete()\n      // remove it from the list\n      clones.remove(clone)\n    }\n  })\n})',
                tags: 'clone copy control'
            }, {
                code: 'sprite1.delete()',
                description: "Delete an object. (Note: This only deletes it from the screen. To truly delete it, you may need to remove it from any arrays it is in.)",
                tags: ' delete remove destroy clones copy control'
            }, {
                code: '// after a mousedown, you won\'t be able to trigger this event again for 1000 milliseconds\nonMouseDown(throttle(() => score++, 1000))',
                description: 'Only allow something to happen once every X miliseconds:',
                tags: "debounce throttle control"
            },
            ],
            Sound: [{
                sound: "./sounds/mario-jump.wav",
                url: "./images/playmario.png",
                code: 'var mario = new Sound({\n  url: "https://woofjs.com/docs/sounds/mario-jump.wav",\n  loop: false,\n  speed: "normal",\n  volume: "normal"\n})\n\nmario.startPlaying()',
                tags: "music play sounds audio"
            }, {
                sound: "./sounds/asteroids-saucer.wav",
                url: "./images/asteroids-saucer.png",
                code: 'var saucer = new Sound({\n  url: "https://woofjs.com/docs/sounds/asteroids-saucer.wav",\n  loop: false,\n  speed: "normal",\n  volume: "normal"\n})\n\nsaucer.startPlaying()',
                tags: "music play sounds audio"
            }, {
                sound: "./sounds/alien.mp3",
                url: "./images/playalien.png",
                code: 'var alien = new Sound({\n  url: "https://woofjs.com/docs/sounds/alien.mp3",\n  loop: false,\n  speed: "normal",\n  volume: "normal"\n})\n\nalien.startPlaying()',
                tags: "music play sounds audio"
            }, {
                sound: "./sounds/applause.mp3",
                url: "./images/playapplause.png",
                code: 'var applause = new Sound({\n  url: "https://woofjs.com/docs/sounds/applause.mp3",\n  loop: false,\n  speed: "normal",\n  volume: "normal"\n})\n\napplause.startPlaying()',
                tags: "applause music play sounds audio"
            }, {
                sound: "./sounds/bark.mp3",
                url: "./images/playbark.png",
                code: 'var bark = new Sound({\n  url: "https://woofjs.com/docs/sounds/bark.mp3",\n  loop: false,\n  speed: "normal",\n  volume: "normal"\n})\n\nbark.startPlaying()',
                tags: "bark dog music play sounds audio"
            }, {
                sound: "./sounds/switch.mp3",
                url: "./images/playswitch.png",
                code: 'var switchSound = new Sound({\n  url: "https://woofjs.com/docs/sounds/switch.mp3",\n  loop: false,\n  speed: "normal",\n  volume: "normal"\n})\n\nswitchSound.startPlaying()',
                tags: "switch music play sounds audio"
            }, {
                sound: "./sounds/mario-coin.wav",
                url: "./images/playlevel.png",
                code: 'var levelUp = new Sound({\n  url: "https://woofjs.com/docs/sounds/mario-coin.wav",\n  loop: false,\n  speed: "normal",\n  volume: "normal"\n})\n\nlevelUp.startPlaying()',
                tags: "mario music level play sounds audio"
            }, {
                sound: "./sounds/meow.mp3",
                url: "./images/68747470733a2f2f692e696d6775722e636f6d2f4c387a6e6d4f622e706e67",
                code: 'var meow = new Sound({\n  url: "https://woofjs.com/docs/sounds/meow.mp3",\n  loop: false,\n  speed: "normal",\n  volume: "normal"\n})\n\nmeow.startPlaying()',
                tags: "meow cat music play sounds audio"
            }, {
                sound: "./sounds/text-alert.mp3",
                url: "./images/playtext.png",
                code: 'var textAlert = new Sound({\n  url: "https://woofjs.com/docs/sounds/text-alert.mp3",\n  loop: false,\n  speed: "normal",\n  volume: "normal"\n})\n\ntextAlert.startPlaying()',
                tags: "music play sounds audio text alert"
            }, {
                sound: "./sounds/fart.wav",
                url: "./images/playfart.png",
                code: 'var fart = new Sound({\n  url: "https://woofjs.com/docs/sounds/fart.wav",\n  loop: false,\n  speed: "normal",\n  volume: "normal"\n})\n\nfart.startPlaying()',
                tags: "fart music play sounds audio"
            }, {
                sound: "./sounds/river-ride.mp3",
                url: "./images/river-ride.png",
                code: 'var riverRide = new Sound({\n  url: "https://woofjs.com/docs/sounds/river-ride.mp3",\n  loop: false,\n  speed: "normal",\n  volume: "normal"\n})\n\nriverRide.startPlaying()',
                tags: "music play sounds audio"
            }, {
                sound: "./sounds/star-wars.mp3",
                url: "./images/playstarwars.png",
                code: 'var starWars = new Sound({\n  url: "https://woofjs.com/docs/sounds/star-wars.mp3",\n  loop: false,\n  speed: "normal",\n  volume: "normal"\n})\n\nstarWars.startPlaying()',
                tags: "star wards music play sounds audio"
            }, {
                sound: "./sounds/round_new.mp3",
                url: "./images/playround.png",
                code: 'var newRound = new Sound({\n  url: "https://woofjs.com/docs/sounds/round_new.mp3",\n  loop: false,\n  speed: "normal",\n  volume: "normal"\n})\n\nnewRound.startPlaying()',
                tags: "level up music play sounds audio"
            }, {
                sound: "./sounds/pop.wav",
                url: "./images/pop.png",
                code: 'var pop = new Sound({\n  url: "https://woofjs.com/docs/sounds/pop.wav",\n  loop: false,\n  speed: "normal",\n  volume: "normal"\n})\n\npop.startPlaying()',
                tags: "pop music play sounds audio"
            }, {
                sound: "./sounds/bang.wav",
                url: "./images/bang.png",
                code: 'var bang = new Sound({\n  url: "https://woofjs.com/docs/sounds/bang.wav",\n  loop: false,\n  speed: "normal",\n  volume: "normal"\n})\n\nbang.startPlaying()',
                tags: "bang music play sounds audio"
            }, {
                sound: "./sounds/shoot.wav",
                url: "./images/shoot.png",
                code: 'var shoot = new Sound({\n  url: "https://woofjs.com/docs/sounds/shoot.wav",\n  loop: false,\n  speed: "normal",\n  volume: "normal"\n})\n\nshoot.startPlaying()',
                tags: "shoot music play sounds audio"
            }, {
                description: "Loop:",
                code: 'loop: "false"\nloop: "true"',
                tags: "sound sounds audio loop"
            }, {
                description: "Speed: (use string or number value)",
                code: '// Slow\nspeed: "slow"\nspeed: 0.5\n\n// Normal\nspeed: "normal"\nspeed: 1\n\n// Fast\nspeed: "fast"\nspeed: 2',
                tags: "sound sounds audio speed"
            }, {
                url: "./images/set-volume.png",
                description: "(use string or number value)",
                code: '// Mute\nvolume: "mute"\nvolume: 0\n\n// Low\nvolume: "low"\nvolume: 0.5\n\n// Normal\nvolume: "normal"\nvolume: 1',
                tags: "sound audio volume"
            }, {
                url: "./images/68747470733a2f2f692e696d6775722e636f6d2f58396b6b3679572e706e67",
                code: "mario.stopPlaying()",
                tags: "pause music stop sounds audio"
            }, {
                code: "if (mario.neverPlayed()){\n /* then do stuff here */\n}",
                html: "Use the <code>.neverPlayed()</code> function to check if your sound has been played:",
                tags: "sound play played"
            }, {
                html: "<hr style=\"height:7px;border:none;color:#e0e0e0;background-color:#e0e0e0;\"/>"
            }, {
                description: "These blocks do not exist in WoofJS:",
                html: "<img style='margin-top: 5px' src='./images/soundFeatures.png'>",
                tags: "drum note volume play tempo instrument beats rest audio sounds"
            }, {
                html: "<hr style=\"height:7px;border:none;color:#e0e0e0;background-color:#e0e0e0;\"/>"
            }, {
                url: "./images/68747470733a2f2f692e696d6775722e636f6d2f7439584b4f706e2e706e67",
                code: "intitle:index.of?mp3 NAME-OF-SONG",
                description: "To get the URL of an mp3, Google search:",
                tags: "mp3 sound file audio URL"
            }],
            Sensing: [{
                url: "./images/68747470733a2f2f692e696d6775722e636f6d2f515470574f78562e706e67",
                code: "sprite1.mouseOver",
                tags: "mouse over sensing"
            }, {
                url: "./images/68747470733a2f2f692e696d6775722e636f6d2f794558496e4b692e706e67",
                description: "If you want to see if the center of your sprite is outside of a boundary, here are some expressions that could be helpful:",
                code: "sprite1.x > maxX\nsprite1.x < minX\nsprite1.y > maxY\nsprite1.y < minY",
                tags: "boundary touching edge off outside sensing"
            }, {
                html: "<b>Cropping images will make <code>touching()</code> more accurate.</b>",
                url: "./images/68747470733a2f2f692e696d6775722e636f6d2f733236773670632e706e67",
                code: "sprite1.touching(sprite2)",
                tags: "touching intersecting overlap sensing"
            },
            {
                html: "<b>For circular sprites, <code>distanceTo()</code> will be more accurate than <code>touching()</code>.",
                url: "./images/68747470733a2f2f692e696d6775722e636f6d2f733236773670632e706e67",
                code: "sprite1.distanceTo(sprite2) < 100",
                tags: "touching sensing distance"
            },
            {
                url: "./images/touchingColor.png",
                description: "These blocks do not exist in WoofJS.",
                tags: "touching color sensing"
            },
            {
                url: "./images/68747470733a2f2f692e696d6775722e636f6d2f634959335359792e706e67",
                code: "sprite1.distanceTo(mouseX, mouseY)",
                tags: "distance sensing mouse pointer"
            }, {
                url: "./images/68747470733a2f2f692e696d6775722e636f6d2f7936735847544b2e706e67",
                code: "sprite1.distanceTo(sprite2)",
                tags: "distance sensing"
            },
            { html: "<hr style=\"height:7px;border:none;color:#e0e0e0;background-color:#e0e0e0;\"/>" },
            {
                url: "./images/ask.png",
                description: "These blocks do not exist in WoofJS, but you can achieve a similar effect by doing the following:",
                code: "var answer = prompt(\"Please enter your name\", \"\")",
                tags: "ask answer prompt input sensing"

            },
            { html: "<hr style=\"height:7px;border:none;color:#e0e0e0;background-color:#e0e0e0;\"/>" },
            {
                url: "./images/68747470733a2f2f692e696d6775722e636f6d2f625a6e7a524b482e706e67",
                code: "keysDown.includes('SPACE')",
                tags: "key keyboard down pressed sensing"
            }, {
                description: "List of keys currently pressed:",
                code: "keysDown",
                tags: "keys keyboard pressed down sensing"
            }, {
                url: "./images/mousedown.png",
                code: "mouseDown",
                tags: "mouse down clicked pressed sensing"
            }, {
                url: "./images/68747470733a2f2f692e696d6775722e636f6d2f4a634b4c6631722e706e67",
                code: "mouseX",
                tags: "mouse x position sensing"
            }, {
                url: "./images/68747470733a2f2f692e696d6775722e636f6d2f6a3843467155742e706e67",
                code: "mouseY",
                tags: "mouse Y position sensing"
            },
            { html: "<hr style=\"height:7px;border:none;color:#e0e0e0;background-color:#e0e0e0;\"/>" },
            {
                url: "./images/loudnessLevel.png",
                description: "This block does not exist in WoofJS.",
                tags: "loudness sensing"
            },
            { html: "<hr style=\"height:7px;border:none;color:#e0e0e0;background-color:#e0e0e0;\"/>" },
            {
                url: "./images/video.png",
                description: "These blocks do not exist in WoofJS.",
                tags: "video sensing"
            },
            { html: "<hr style=\"height:7px;border:none;color:#e0e0e0;background-color:#e0e0e0;\"/>" },
            {
                url: "./images/scratch_timer.png",
                description: "Number of seconds since the script started. If you want whole number seconds, use Math.round(timer()).",
                code: "timer()",
                tags: "timer sensing"
            },
            {
                url: "./images/scratch_reset_timer.png",
                description: "Reset the timer to 0.",
                code: "resetTimer()",
                tags: "timer sensing"
            },
            { html: "<hr style=\"height:7px;border:none;color:#e0e0e0;background-color:#e0e0e0;\"/>" },
            {
                url: "./images/68747470733a2f2f692e696d6775722e636f6d2f61664c6474384b2e706e67",
                code: "sprite1.x",
                tags: "x position sensing"
            }, {
                url: "./images/68747470733a2f2f692e696d6775722e636f6d2f42377644686a322e706e67",
                code: "sprite1.y",
                tags: "y position sensing"
            }, {
                description: "Previous mouse X:",
                code: "pMouseX previous mouse sensing"
            }, {
                description: "Previous mouse Y:",
                code: "pMouseY previous mouse sensing"
            }, {
                description: "Mouse X speed:",
                code: "mouse speed x sensing"
            }, {
                description: "Mouse Y speed:",
                code: "mouse speed sensing y "
            }, {
                description: "Right edge of the screen:",
                code: "maxX",
                tags: "edge right screen sensing maxX"
            }, {
                description: "Left edge of the screen:",
                code: "minX",
                tags: "edge left screen minX sensing"
            }, {
                description: "Top edge of the screen:",
                code: "maxY",
                tags: "edge top screen maxY sensing"
            }, {
                description: "Bottom edge of the screen:",
                code: "minY",
                tags: "edge bottom screen minY sensing"
            }, {
                description: "Width of the screen:",
                code: "width screen sensing"
            }, {
                description: "Height of the screen:",
                code: "height screen sensing"
            },
            { html: "<hr style=\"height:7px;border:none;color:#e0e0e0;background-color:#e0e0e0;\"/>" },
            {
                url: "./images/68747470733a2f2f692e696d6775722e636f6d2f316b4f4852797a2e706e67",
                code: "hour()",
                tags: "hour time sensing"
            }, {
                description: "Hour in military time:",
                code: "hourMilitary()",
                tags: "hour military time sensing"
            }, {
                url: "./images/68747470733a2f2f692e696d6775722e636f6d2f37696e366966412e706e67",
                code: "minute()",
                tags: "minute sensing current"
            }, {
                url: "./images/68747470733a2f2f692e696d6775722e636f6d2f685749394354722e706e67",
                code: "second()",
                tags: "current second time sensing"
            }, {
                url: "./images/68747470733a2f2f692e696d6775722e636f6d2f5768735166316d2e706e67",
                code: "dayOfMonth()",
                tags: "current date day month sensing"
            }, {
                url: "./images/68747470733a2f2f692e696d6775722e636f6d2f674c35786b62652e706e67",
                code: "dayOfWeek()",
                tags: "current day of week time sensing"
            }, {
                url: "./images/68747470733a2f2f692e696d6775722e636f6d2f7735634a3561742e706e67",
                code: "month()",
                tags: "current month time sensing"
            }, {
                url: "./images/68747470733a2f2f692e696d6775722e636f6d2f697357785538432e706e67",
                code: "year()",
                tags: "current year time sensing"
            },
            { html: "<hr style=\"height:7px;border:none;color:#e0e0e0;background-color:#e0e0e0;\"/>" },
            {
                url: "./images/username.png",
                description: "This block does not exist in WoofJS.",
                tags: "username"
            },
            { html: "<hr style=\"height:7px;border:none;color:#e0e0e0;background-color:#e0e0e0;\"/>" },
            {
                description: "User is on a mobile device:",
                code: "mobile()"
            }],
            Pen: [{
                url: "./images/68747470733a2f2f692e696d6775722e636f6d2f6241636d366a482e706e67",
                code: 'clearPen()',
                tags: "pen clear draw"
            },
            { html: "<hr style=\"height:7px;border:none;color:#e0e0e0;background-color:#e0e0e0;\"/>" },
            {
                url: "./images/stamp.png",
                description: "This block does not exist in WoofJS.",
                tags: "pen stamp"
            },
            { html: "<hr style=\"height:7px;border:none;color:#e0e0e0;background-color:#e0e0e0;\"/>" },
            {
                url: "./images/68747470733a2f2f692e696d6775722e636f6d2f5457656e5761702e706e67",
                code: 'sprite1.penDown()',
                tags: "pen down draw"
            }, {
                url: "./images/68747470733a2f2f692e696d6775722e636f6d2f354837696a42772e706e67",
                code: 'sprite1.penUp()',
                tags: "pen up draw"
            },
            { html: "<hr style=\"height:7px;border:none;color:#e0e0e0;background-color:#e0e0e0;\"/>" },
            {
                url: "./images/68747470733a2f2f692e696d6775722e636f6d2f504c744b5663762e706e67",
                code: 'sprite1.penColor = "blue"\nsprite1.penColor = "#ff20ff"\nsprite1.penColor = "rgb(10, 100, 20)"',
                tags: "pen color set"
            },
            {
                url: "./images/penColor.png",
                description: "These blocks do not exist in WoofJS.",
                tags: "pen color change"
            },
            { html: "<hr style=\"height:7px;border:none;color:#e0e0e0;background-color:#e0e0e0;\"/>" },
            {
                url: "./images/penShade.png",
                description: "These blocks do not exist in WoofJS.",
                tags: "pen shade"
            },
            { html: "<hr style=\"height:7px;border:none;color:#e0e0e0;background-color:#e0e0e0;\"/>" },
            {
                url: "./images/changePenSize.png",
                code: "sprite1.penWidth += 1",
                tags: "pen width size"
            },
            {
                url: "./images/68747470733a2f2f692e696d6775722e636f6d2f4f7a59355a6a552e706e67",
                code: 'sprite1.penWidth = 4',
                tags: "pen width size"
            }
            ],
            Operations: [{
                url: "./images/68747470733a2f2f692e696d6775722e636f6d2f6e73446b436b742e706e67",
                code: "sprite1.x + 4",
                tags: "addition add plus operations"
            }, {
                url: "./images/68747470733a2f2f692e696d6775722e636f6d2f585341415449502e706e67",
                code: "sprite1.y - 10",
                tags: "minus subtraction operations"
            }, {
                url: "./images/68747470733a2f2f692e696d6775722e636f6d2f756a6e477045362e706e67",
                code: "sprite1.radius * 2",
                tags: "times multiply multiplication operations"
            }, {
                url: "./images/68747470733a2f2f692e696d6775722e636f6d2f423042476b434a2e706e67",
                code: "maxX / 2",
                tags: "divide division operations fraction"
            },
            { html: "<hr style=\"height:7px;border:none;color:#e0e0e0;background-color:#e0e0e0;\"/>" },
            {
                url: "./images/68747470733a2f2f692e696d6775722e636f6d2f664148754477792e706e67",
                code: "random(1, 10)",
                tags: "random pick operations"
            }, {
                description: "Random X value on the screen between minX and maxX:",
                code: "randomX()",
                tags: "operations random x"
            }, {
                description: "Random Y value on the screen between minY and maxY:",
                code: "randomY()",
                tags: "operations random y"

            }, {
                description: "Random color:",
                code: "randomColor()",
                tags: "random color operations"
            },
            { html: "<hr style=\"height:7px;border:none;color:#e0e0e0;background-color:#e0e0e0;\"/>" },
            {
                url: "./images/68747470733a2f2f692e696d6775722e636f6d2f3268716f4866682e706e67",
                code: "sprite1.x < minX",
                tags: "less than compare operations"
            }, {
                url: "./images/68747470733a2f2f692e696d6775722e636f6d2f715837646d77742e706e67",
                code: "sprite1.y > maxY",
                tags: "greater than compare operations"
            }, {
                url: "./images/68747470733a2f2f692e696d6775722e636f6d2f3766384652625a2e706e67",
                code: "timer === 0",
                tags: "equal to same as operations"
            },

            {
                description: "Less Than or Equal To:",
                code: "sprite1.y <= minY",
                tags: "less than equal operations"
            }, {
                description: "Greater Than or Equal To:",
                code: "sprite1.x >= maxX",
                tags: "greater than equal operations"
            }, {
                description: "Not Equals:",
                code: "timer !== 0",
                tags: "not equals operations"
            }, {
                description: "Between Two Numbers :",
                code: "sprite1.x.between(minX, maxX)",
                tags: "between two numbers operations"
            },
            { html: "<hr style=\"height:7px;border:none;color:#e0e0e0;background-color:#e0e0e0;\"/>" },
            {
                url: "./images/68747470733a2f2f692e696d6775722e636f6d2f5559684d3574702e706e67",
                code: "mouseDown && sprite1.mouseOver",
                tags: "and operations"
            }, {
                url: "./images/68747470733a2f2f692e696d6775722e636f6d2f505433496c6e302e706e67",
                code: "sprite1.mouseOver || sprite2.mouseOver",
                tags: "or operations"
            }, {
                url: "./images/68747470733a2f2f692e696d6775722e636f6d2f66487253395a4b2e706e67",
                code: '!(mouseDown)',
                tags: "not operations"
            },
            { html: "<hr style=\"height:7px;border:none;color:#e0e0e0;background-color:#e0e0e0;\"/>" },
            {
                url: "./images/68747470733a2f2f692e696d6775722e636f6d2f5671674c32696f2e706e67",
                code: '"hello " + "world"',
                tags: "combine string add append join operations"
            }, {
                url: "./images/68747470733a2f2f692e696d6775722e636f6d2f684952693678512e706e67",
                code: '"world".substring(0,1)',
                tags: "cut string operations substring letter"
            }, {
                url: "./images/68747470733a2f2f692e696d6775722e636f6d2f717354526143782e706e67",
                code: '"world".length',
                tags: "operations length"
            },
            { html: "<hr style=\"height:7px;border:none;color:#e0e0e0;background-color:#e0e0e0;\"/>" },
            {
                url: "./images/68747470733a2f2f692e696d6775722e636f6d2f4e466f59396c382e706e67",
                code: "sprite1.x % 2",
                tags: "reminder modulus mod operations"
            }, {
                url: "./images/68747470733a2f2f692e696d6775722e636f6d2f746b76796a52542e706e67",
                code: "Math.round(5.763)",
                tags: 'round operations math'
            },
            { html: "<hr style=\"height:7px;border:none;color:#e0e0e0;background-color:#e0e0e0;\"/>" },
            {
                url: "./images/sqrt.png",
                code: "sqrt(9)",
                tags: "sqrt root square operations"
            },
            {
                url: "./images/abs.png",
                code: "abs(-9)",
                tags: "abs absolute value operations"
            },
            {
                url: "./images/floor.png",
                code: "floor(9.8)",
                tags: "floor round operations"
            },
            {
                url: "./images/ceiling.png",
                code: "ceiling(9.8)",
                tags: "ceiling round operations"
            },
            {
                url: "./images/sin.png",
                code: "sin(90)",
                description: "This function takes an input in degrees.",
                tags: "sin sine degrees operations"
            },
            {
                url: "./images/cos.png",
                code: "cos(90)",
                description: "This function takes an input in degrees.",
                tags: "cos cosine degrees operations"
            },
            {
                url: "./images/tan.png",
                code: "tan(90)",
                description: "This function takes an input in degrees.",
                tags: "tan tangent degrees operations"
            },
            {
                url: "./images/asin.png",
                code: "asin(1)",
                description: "This function takes an input in degrees.",
                tags: "asin arcsin inverse degrees operations"
            },
            {
                url: "./images/acos.png",
                code: "acos(0)",
                description: "This function takes an input in degrees.",
                tags: "acos arccos inverse degrees operations"
            },
            {
                url: "./images/atan.png",
                code: "atan(1)",
                description: "This function takes an input in degrees.",
                tags: "atan arctan inverse degrees operations"
            },
            {
                url: "./images/ln.png",
                code: "ln(4)",
                tags: "ln natural log operations"
            },
            {
                url: "./images/log.png",
                code: "log(100)",
                description: "This function is log base 10.",
                tags: "log logarithm operations"
            },
            {
                url: "./images/e.png",
                code: "pow(Math.E,1)",
                tags: "e to the power operations"
            },
            {
                url: "./images/10.png",
                code: "pow(10,2)",
                tags: "10 to the power operations"
            },
            ],
            Data: [{
                url: "./images/68747470733a2f2f692e696d6775722e636f6d2f656963593537492e706e67",
                code: "var variable1",
                tags: "variable make create data"
            }, {
                url: "./images/68747470733a2f2f692e696d6775722e636f6d2f4859415458584c2e706e67",
                code: "variable1 = 0",
                tags: "variable set data equals"
            }, {
                description: "You can combine creating/naming a variable with setting it:",
                code: "var variable1 = 0",
                tags: "variable data set equals create"
            }, {
                url: "./images/68747470733a2f2f692e696d6775722e636f6d2f704b4e46794d772e706e67",
                code: "variable1 += 1",
                tags: "increase add plus change by data change decrease"
            }, {
                url: "./images/68747470733a2f2f692e696d6775722e636f6d2f4447323649634e2e706e67",
                code: 'new Text({\n  text: () => "variable1: " + variable1,\n  x: 0,\n  y: 0,\n  size: 30\n})',
                description: '"Showing a variable" works by giving a Text Sprite a function instead of a "string in quotes" as its text attribute. The Text Sprite constantly reevaluates the function which keeps the value on the screen in sync with the value of the variable.',
                tags: "show variable text data"
            },
            { html: "<hr style=\"height:7px;border:none;color:#e0e0e0;background-color:#e0e0e0;\"/>" },
            {
                url: "./images/68747470733a2f2f692e696d6775722e636f6d2f7366536d6f44542e706e67",
                code: "var array1 = []",
                tags: "array list make data"
            }, {
                url: "./images/68747470733a2f2f692e696d6775722e636f6d2f304b306e5144332e706e67",
                code: "array1.push('thing')",
                description: "You can add anything to an array in JavaScript, including numbers, strings, but even Sprites, functions, and other arrays.",
                tags: "add array list push data"
            }, {
                url: "./images/68747470733a2f2f692e696d6775722e636f6d2f516754647978652e706e67",
                code: "array1.length",
                tags: "array list length size data"
            }, {
                url: "./images/68747470733a2f2f692e696d6775722e636f6d2f6a587479364c542e706e67",
                code: "array1[0]",
                tags: "array list get item data element"
            }, {
                url: "./images/68747470733a2f2f692e696d6775722e636f6d2f6a6170377166522e706e67",
                code: "array1.remove(thing)",
                tags: "array list remove delete data",
                description: "Note: this only removes things from a list. It doesn't delete them from the screen (use sprite1.delete() for that)."
            }, {
                url: "./images/68747470733a2f2f692e696d6775722e636f6d2f49625a4846706d2e706e67",
                code: "array1.includes(thing)",
                tags: "contains includes array list data"
            }, {
                url: "./images/68747470733a2f2f692e696d6775722e636f6d2f5949473973746c2e706e67",
                code: 'new Text({text: () => "array1: " + array1})',
                tags: "show list data"
            }, {
                description: 'Do something for each thing in an array:',
                code: "array1.forEach(thing => {\n  console.log(thing)\n})",
                tags: "for each loop list array data"
            }, {
                description: 'Check if a condition holds for at least one thing in an array:',
                code: "if (array1.some(thing => thing.over(mouseX, mouseY))) {\n  \/* do something here */\n}",
                tags: "reduce some any list array data overcheck  if condition"
            }, {
                description: 'Check if a condition holds for everything in an array:',
                code: "if(array1.every(thing => thing.touching(sprite1))) {\n  \/* do something here */\n}",
                tags: "every list arry reduce if check data"
            }, {
                description: "Find something in an array:",
                code: "var needle = array1.find(thing => thing.touching(sprite1))\nif(needle) {\n  console.log(needle)\n}",
                tags: "find search list array data"
            }, {
                html: "You can automatically generate an array with a range of numbers by using the <code>range()</code> function:"
            }, {
                html: "<strong>Example 1:</strong> Generate this array: <code>[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]</code><br>It starts at 1, ends <i>before</i> 11, and goes up by 1 every time:",
                code: "var oneToTen = range(1, 11, 1)",
                tags: "range array list numbers data"
            }, {
                html: "<strong>Example 2:</strong> Generate this array: <code>[15, 10, 5, 0, -5]</code><br>It starts at 15, ends <i>before</i> -10, and goes down by 5 every time:",
                code: "var fifteenToZero = range(15, -10, -5)",
                tags: "range array list numbers data"
            }],
            "More Blocks": [{
                url: "./images/68747470733a2f2f692e696d6775722e636f6d2f415a6c526236682e706e67",
                description: "You can create a function with a name:",
                code: "var namedFunction = (input1, input2) => {\n// do stuff here with input1 and input2\n}",
                tags: "block function method input more blocks"
            }, {
                description: "You can run a function by putting parentheses next to its name:",
                code: "namedFunction(1, 2)",
                tags: "run more blocks function"
            }, {
                description: "You need to do this even if the function takes no parameters:",
                code: "namedFunctionWithoutParameters()",
                tags: "more blocks parameters"
            }, {
                description: "But you can also create a function without a name, which is called an anonymous function:",
                code: "forever(() => {\n  sprite.x++\n})",
                tags: "anonymous function more blocks"
            },
            {
                description: "Import JavaScript code from an external URL. The second input happens after the code is imported.",
                code: "// import the lodash utility library\n// https://lodash.com/docs/4.17.4\nimportCodeURL('https://cdn.jsdelivr.net/lodash/4.17.4/lodash.min.js', () => {\n _.flatten([1, [2, [3, [4]], 5]])\n})",
                tags: "import code url require firebase library module more blocks"
            },

            {
                description: "A comment is a piece of code that is ignored by your browser. You can use it to separate long code into sections, making it easier to read through and edit. Add a comment block like \"Instructions\" or \"Create Sprites\" to your code.",
                code: "//------------------------------------------\n//------Instruction Screen Sprites----------\n//------------------------------------------",
                tags: "comment"
            }
            ],
            Tutorials: [{
                html: '<iframe src="https://coding.space/woof" frameborder="0"></iframe>',
            }]

        }
    },
    computed: {
        menuStyles: function () {
            if (this.search || this.open) {
                return {
                    width: "98%",
                    marginLeft: "1%",
                    marginBottom: "5px"

                }
            }
            else {
                return {
                    display: "flex",
                    flexWrap: "wrap",
                    width: "100%",
                    height: "100%"
                }
            }
        },
        menuItem: function () {
            if (this.search || this.open) {
                return {
                    width: "98%",
                    marginLeft: "1%",
                    marginTop: "5px",
                    marginBottom: "5px"
                }
            }
            else {
                return {
                    display: "flex",
                    flexFlow: "column wrap",
                    width: "48%",
                    marginLeft: "auto",
                    marginRight: "auto",
                    marginBottom: "5px"
                }
            }
        },
    },
    methods: {
        // setUserUploadImages: function (images) {
        //     var newImages = this.menus['Sprites & Backgrounds']['Image'].filter(
        //         block => !block.userUploadImage
        //     )
        //     images.reverse() // show the newest first
        //     newImages.splice(1, 0, ...images.map(imageURL => {
        //         return {
        //             url: imageURL,
        //             code: 'var sprite1 = new Image({url: "' + imageURL + '"})',
        //             tags: "upload image picture",
        //             userUploadImage: true
        //         }
        //     }))
        //     this.menus['Sprites & Backgrounds']['Image'] = newImages
        // },
        searchMenu: function (menu) {
            if (this.search == '') {
                return menu
            }
            var options = {
                shouldSort: true,
                tokenize: true,
                threshold: 0.0,
                includeMatches: true,
                findAllMatches: true,
                matchAllTokens: true,
                maxPatternLength: 15,
                keys: [{
                    name: 'tags',
                    weight: 1.0
                },
                ]
            }
            var fuse = new Fuse(menu, options)
            return fuse.search(this.search)
        },
        searched: function (menus) {
            if (this.search == '') {
                return menus
            }
            var newMenus = {}
            for (var menu in menus) {
                if (menu == 'Sprites & Backgrounds' || menu == 'Integrations') {
                    var s = this.searched(menus[menu])
                    if (Object.keys(s).length > 0) {
                        newMenus[menu] = s
                    }
                }
                else {
                    var list = menus[menu]
                    var newList = this.searchMenu(list)
                    if (newList.length > 0) {
                        newMenus[menu] = newList
                    }
                }
            }
            return newMenus
        },
        toggle: function (menu) {
            if (this.search != '') {
                return
            }
            if (this.open == menu) {
                this.open = undefined
            }
            else {
                this.open = menu
            }
        }
    }
})

var clipboard = new Clipboard('.btn-clipboard');
Vue.nextTick(function () {
    $('[data-toggle="tooltip"]').tooltip({
        trigger: 'manual'
    });
    clipboard.destroy()
    clipboard = new Clipboard('.btn-clipboard');
    clipboard.on('success', function (e) {
        $(e.trigger).tooltip('show')
        setTimeout(function () {
            $(e.trigger).tooltip('hide')
        }, 1000)
    });

})

