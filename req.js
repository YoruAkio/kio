const axios = require('axios');

(async () => {
    const response = await axios.get('http://localhost:3000/').then(res => {
        return res.data;
    });

    console.log(response);
})();
