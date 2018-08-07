var moment=require('moment');

var generateMessage=(from,text)=>{
	return {
		from,
		text,
		createdAt:moment().valueOf()
		//createdAt:new Date().getTime()
	};
};

var generateLocationMessage=(from,latitude,longitude)=>{
	var loc="https://www.google.com/maps?q="+latitude+","+longitude;
	return {
		from,
		url:loc,
		createdAt:moment().valueOf()
		//createdAt:new Date().getTime()
	};
	};

module.exports={generateMessage,generateLocationMessage};