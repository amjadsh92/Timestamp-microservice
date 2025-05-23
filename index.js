// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// app.get("/api/:date?", function (req, res){
//   let {date} = req.params
//   testDate = new Date(date)
  
//   const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
//   const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", 
//     "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
//   let validDate = !isNaN(testDate.getTime())
  
//   function formatNumber(number){
//     const pad = (n) => String(n).padStart(2, "0");
//     return `${pad(number)}`
//   }

//   if(date.match(/^-?\d+$/)){
//     const unixTimestamp = Number(date);
//     const testDate = new Date(unixTimestamp);
//     if (isNaN(testDate.getTime())) {
//       return res.json({ error: "Invalid Date" });
//     }
//     return res.json({
//       unix: unixTimestamp,
//       utc: testDate.toUTCString()
//     });
//   }
  
//   else if (validDate){
//     const hours = testDate.getHours();       
//     const minutes = testDate.getMinutes();   
//     const seconds = testDate.getSeconds();
//     const day = formatNumber(testDate.getDate())
//     const month = formatNumber(testDate.getMonth() + 1)
//     const year = testDate.getUTCFullYear()
//     date = new Date(`${year}-${month}-${day}T00:00:00Z`)
//     const unixTimestamp = date.getTime();
//     function formatTime(hours, minutes, seconds) {
//       const pad = (n) => String(n).padStart(2, "0");
//       return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
//     }

//     res.json({"unix":unixTimestamp , "utc": `${days[date.getDay()]}, ${formatNumber(date.getDate())} ${months[date.getMonth()]} ${date.getUTCFullYear()} ${formatTime(hours, minutes, seconds)} GMT`});
//   }
//   else{
//     res.json({ error : "Invalid Date" })
//   }

// })




app.get("/api/:date?", function (req, res){
  let {date} = req.params
  submittedDate = new Date(date)
  
  
  let validDate = !isNaN(submittedDate.getTime())
  
  if (!date){
    
    const now = new Date();
    const unixTimestamp = now.getTime(); 
    const utcString = now.toUTCString();
    
    res.json({"unix":unixTimestamp , "utc": utcString});

  }  

  else if(date.match(/^-?\d+$/)){
    const unixTimestamp = Number(date);
    const submittedDate = new Date(unixTimestamp);
    if (isNaN(submittedDate.getTime())) {
      return res.json({ error: "Invalid Date" });
    }
    return res.json({
      unix: unixTimestamp,
      utc: submittedDate.toUTCString()
    });
  }
  
  else if (validDate){
    
    const day = submittedDate.getDate()
    const month = submittedDate.getMonth()
    const year = submittedDate.getUTCFullYear()
    const unixTimestamp = Date.UTC(year,month,day)
    utcDate = new Date(unixTimestamp)
    
    

    res.json({"unix":unixTimestamp , "utc": utcDate.toUTCString()});
  }
  else{
    res.json({ error : "Invalid Date" })
  }

})




// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
