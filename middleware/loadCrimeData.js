import fetch from 'node-fetch'

export async function loadCrimeData(req, res, next) {
    try {
        const url = 'https://data.princegeorgescountymd.gov/resource/amvf-x3gi.json'; // remote URL
        const data = await fetch(url); 
        const json = await data.json(); 

        const reply = json.filter((item) => Boolean(item.clearance_code_inc_type)).filter((item) => Boolean(item.street_address));

        console.log('Results in crimeData middleware', json.length); //checking 
        req.crimeData = reply;
        next();
    } catch (err) {
        console.log ('Data request failed', err);
        res.json({message: 'Data request failed', error: err });
    }
}