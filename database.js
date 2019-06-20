  var mongoose = require('mongoose');
  mongoose.connect('mongodb+srv://chat:ja9xzKNLrhDSzZxn@cluster0-pvaln.mongodb.net/blogg', { useNewUrlParser: true });

  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error: '));

  // console.log(db.messages.find());

  var message = new mongoose.Schema({
    text: String,
    date: { type: Date, default: Date.now },
  }, { collection: 'messages' });

  var Message = mongoose.model('Message', message);

  exports.sendMessage = function(text) {
    var toSendMessage = new Message({
      text: text
    })
    // console.log(toSendMessage);
    toSendMessage.save(function(err,toSendMessage){
      if(err) return console.error(err);
    })
  }


  exports.refresh = function() {
    var data = "",
        promise = new Promise((resolve, reject) => {
      Message.find({}, function(err, data) {
          resolve(data);
      })
    }).then(function(value){
      value.forEach(function(element) {
        data += JSON.stringify(element) + "\n";
        return data;
      })
    })
  }
