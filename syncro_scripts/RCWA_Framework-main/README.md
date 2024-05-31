# RCWA_Framework
This is a Prototypical Framework for Realtime connected applications

## Steps to use Frame work with your Single page website/application
1) Clone the Application code.
2) Create or copy your index.html and other files to Public folder.(If do not want Use public folder make canges in rcwa_server code)
3) Add script rcwa_client in the end of body of html page
4) In Command line "npm i" to initialze and load all the required packages
5) The "npm start" to start the server. the server port is set to 3000



## Steps to use Frame work with your Multipage page website/application
Follow the Same steps as above bu do step no 3  for all the HTML pages.

After step 3 and before step 4 there needs to be done more step:
1) edit Nav  class by addind term "socket_nav_link"
2) Also add links for redirection in nav bars

#### Before
   <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand socket_nav_link" href="/" >Welcome to the testing website</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item active">
            <a class="nav-link " href="/" d>Home <span class="sr-only">(current)</span></a>
          </li>
          <li class="nav-item">
            <a class="nav-link " href="/quiz.html" >Quiz</a>
          </li>
          <li class="nav-item">
            <a class="nav-link " href="/whiteboard.html" >Whiteboard</a>
          </li>
          <li class="nav-item">
            <a class="nav-link " href="/calculator.html" >Calculator</a>
          </li>
        </ul>
      </div>
    </nav>


#### After
   <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand socket_nav_link" href="/" data-url="https://testmultipage.azurewebsites.net">Welcome to the testing website</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item active">
            <a class="nav-link socket_nav_link" href="/" data-url="https://testmultipage.azurewebsites.net">Home <span class="sr-only">(current)</span></a>
          </li>
          <li class="nav-item">
            <a class="nav-link socket_nav_link" href="/quiz.html" data-url="https://testmultipage.azurewebsites.net/quiz.html">Quiz</a>
          </li>
          <li class="nav-item">
            <a class="nav-link socket_nav_link" href="/whiteboard.html" data-url="https://testmultipage.azurewebsites.net/whiteboard.html">Whiteboard</a>
          </li>
          <li class="nav-item">
            <a class="nav-link socket_nav_link" href="/calculator.html" data-url="https://testmultipage.azurewebsites.net/calculator.html">Calculator</a>
          </li>
        </ul>
      </div>
    </nav>


## Example
 1) Contains simple example pages based on it "https://github.com/Harshal504/RCWA_Framework_examples"
 2) Contains Multipage example "https://github.com/Harshal504/RCWA_test_Multipage"
 3) Contains Single page Website example "https://github.com/Harshal504/RCWA_single_web_page"
