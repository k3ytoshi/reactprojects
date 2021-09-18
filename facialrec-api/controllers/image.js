const Clarifai = require('clarifai');
const app = new Clarifai.App({
  apiKey: '2e1c1f7a7e0149c7a5448acaf02a1773'
}); 

const handleApiCall = (reg, res) => {
app.models
  .predict(Clarifai.FACE_DETECT_MODEL, reg.body.input)
  .then(data => {
  	res.json(data);
  })
  .catch(err => res.status(400).json('unable to work with API'))
}
 

const handleImage = (reg, res, db) => {
	 const { id } = reg.body;
	 db('users').where('id','=', id)
	 .increment('entries', 1)
	 .returning('entries')
	 .then(entries => {
	 	res.json(entries[0]);
   })
    .catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
	handleImage,
	handleApiCall
}