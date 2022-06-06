import app from "./src/app"
import connectToDB from './mongoDB/mongoProvider';


const port: number | string = process.env.PORT || 3001;
async function main(){
    await connectToDB();
    
    app.listen(port);
    console.log('Server on port: ' + port);
}

main();
