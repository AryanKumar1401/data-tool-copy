const express = require('express');
const path = require('path');
const multer = require('multer');
const OpenAI = require('openai');
const fs = require('fs');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const { getFirestore, FieldValue } = require('firebase-admin/firestore');
const { getAuth } = require('firebase-admin/auth');
const { useAsyncValue } = require('react-router-dom');
const app = express();
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);



const PORT = process.env.PORT || 3000;


const serviceAccount = process.env.FIREBASE_PATH; // Replace with your Firebase service account key


admin.initializeApp({
 credential: admin.credential.cert(JSON.parse(serviceAccount)),
 storageBucket: 'data-tool-6c41e.appspot.com' // Replace with your Firebase project ID
});


const bucket = admin.storage().bucket();


// User Authentication Methods
const auth = getAuth();

const getUser = async (idToken) => {
  return await auth.verifyIdToken(idToken);
}

// Firestore Database Methods
const db = getFirestore();

const updateCredits = async (userId, increment) => {
  const userRef = db.collection('users').doc(userId);

  // Atomically increment the population of the city by 50.
  const res = await userRef.update({
    tokens: FieldValue.increment(increment)
  });
}

const verifyCredits = async (userId, check) => {
  const userRef = db.collection("users").doc(userId);

  const doc = await userRef.get();
  if (!doc.exists) {
    console.log('No such user!');
    return false;
  } else {
    const data = doc.data();
    console.log('Document data:', doc.data());
    return (data.tokens >= check);
  }
}


// Defines Pricing model for debiting tokens
const pricingModel = {
  file_upload: 5,
  cleanse: 10,
  per_character: 0.25,
  visualization: 15,
}


const openai = new OpenAI({
 apiKey: process.env.REACT_APP_OPENAI_API_KEY,
});


// Set up storage engine for Multer
const storage = multer.diskStorage({
 destination: './uploads/',
 filename: (req, file, cb) => {
   cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
 }
});

// Initialize upload variable
const upload = multer({ storage: storage });

// Ensure the uploads directory exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
 fs.mkdirSync(uploadDir);
}

// Ensure the downloads directory exists
const downloadDir = path.join(__dirname, 'downloads');
if (!fs.existsSync(downloadDir)) {
 fs.mkdirSync(downloadDir);
}


// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../client/build')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// File upload route
app.post('/upload', upload.single('file'), async (req, res) => {
 try {
   if (!req.file) {
     throw new Error('No file selected!');
   }


   const filePath = req.file.path;


   const file = await openai.files.create({
     file: fs.createReadStream(filePath),
     purpose: 'assistants',
   });


   console.log('File uploaded successfully:', file.id);

   // Update credits for user
   await updateCredits(await getUser(req.headers.authorization).uid, - pricingModel.file_upload);


   res.json({
     message: 'File uploaded successfully!',
     fileId: file.id,
   });
 } catch (error) {
   console.error('Error uploading file:', error);
   res.status(500).json({ message: 'Failed to upload file to OpenAI.' });
 }
});

/**
 * Declare OpenAI variables.
 */
var storedAssistantId = null;
var storedThreadId = null;
let runIdToBeStoredClean = null;

/**
 * Helper functions 
 */

//polls the run status 
async function pollRunStatus(threadId,runId) {
  var runStatus;
    do {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      runStatus = await openai.beta.threads.runs.retrieve(threadId, runId);
      console.log('Thread status:', runStatus.status);
      //if (runStatus.status === "failed") break;

    } while (runStatus.status !== "completed");
}

//displays thread messages
function displayThreadMessages(messages) {
  for (let i = 0; i < messages.data.length; i++) {
    console.log("Message", i, " ", messages.data[i].content[0]);
  }
}




app.post('/api/create-assistant', async (req, res) => {

// const {file_store_Id} = req.body;
 
 try {
   const assistant = await openai.beta.assistants.create({
     name: "Data Visualizer",
     description: "You are great at creating beautiful data visualizations. You analyze data present in .csv files, understand trends, and come up with data visualizations relevant to those trends. You also share a brief text summary of the trends observed.",
     model: "gpt-4o",
     tools: [{ type: "code_interpreter" }],
     tool_resources: {
       "code_interpreter": {
         "file_ids": [file_store_Id],
       },
     },
   });
   console.log('Assistant created successfully:', assistant.id);
   storedAssistantId = assistant.id;
   res.json({ id: assistant.id });
 } catch (error) {
   console.error('Error creating assistant:', error);
   res.status(500).json({ message: 'Failed to create assistant.' });
 }
});

var file_form_Id;
app.post('/api/create-assistant-form', async (req, res) => {

  // const {file_store_Id} = req.body;
  const {fileId} = req.body;
  file_form_Id = fileId;
   
   try {
     const assistant = await openai.beta.assistants.create({
       name: "Data Visualizer",
       description: "you are tasked with examining the contents of the file for eventual visualization. You must ONLY return your output in the specific format of the following: viz 1, viz2, viz3, ...",
       model: "gpt-4o",
       tools: [{ type: "code_interpreter" }],
       tool_resources: {
         "code_interpreter": {
           "file_ids": [fileId],
         },
       },
     });
     console.log('Form Assistant created successfully:', assistant.id);
     storedAssistantId = assistant.id;
     res.json({ id: assistant.id });
   } catch (error) {
     console.error('Error creating assistant:', error);
     res.status(500).json({ message: 'Failed to create assistant.' });
   }
  });


//CLEANSER START



async function createRunClean() {
 try {
   const run = await openai.beta.threads.runs.createAndPoll(storedThreadId, {
     assistant_id: storedAssistantId,
     instructions: "Please create the csv."
   });


   runIdToBeStoredClean = run.id;
   console.log("Run created successfully:", runIdToBeStoredClean);
   return runIdToBeStoredClean;
 } catch (error) {
   console.error("Error:", error);
   throw new Error('Failed to create run.');
 }
}

app.post('/api/create-threadClean', async (req, res) => {
  const {assistantId, selectedValueQ1, selectedValueQ2, Info} = req.body;

 try {
   const threadId = await createThread("Create a csv file that cleanses the data the user has uploaded. The main cleaning to be done is " + selectedValueQ1 + ". Also keep in mind " + selectedValueQ2 + ". This is a summary of the data: " + Info + ".");
   res.json({ id: threadId });
 } catch (error) {
   console.error('Error:', error);
   res.status(500).json({ message: error.message });
 }
});


app.post('/api/get-responseClean', async (req, res) => {
 try {
   const messages = await openai.beta.threads.messages.list(storedThreadId);
   res.json({ messages: messages.data });
 } catch (error) {
   console.error('Error with OpenAI API:', error);
   res.status(500).json({ error: 'An error occurred' });
 }
});


app.post('/api/run-threadClean', async (req, res) => {
 try {
   const runId = await createRunClean();
   if (!runIdToBeStoredClean) {
     throw new Error('No run Id available to run.');
   }

   // Polling mechanism to see if runStatus is completed
   await pollRunStatus(storedThreadId,runIdToBeStoredClean);

   console.log('Thread completed successfully.');

  //  storedThreadId = "thread_2UAAKr5wUzaur7HflxskE3Pg";

   const messages = await openai.beta.threads.messages.list(storedThreadId);
   displayThreadMessages(messages);
   const fileId = messages.data[0].content[0].text.annotations[0].file_path.file_id;

   console.log("Clean data File ID: ",fileId)
   const cleanFile = await openai.files.content(fileId);
   // console.log(viz.headers);
   const bufferView = new Uint8Array(await cleanFile.arrayBuffer());
   const cleanFilePath = `./public/clean/${fileId}.csv`;
   fs.writeFileSync(cleanFilePath, bufferView);
   console.log("the cleaned data is saved");
  
   // Upload the file to Firebase Storage
   await bucket.upload(cleanFilePath, {
     destination: `csv/${fileId}.csv`, // Updated destination path
     metadata: {
       contentType: 'text/csv', // Correct content type for CSV
     },
   });
  
   // Get the public URL of the uploaded file
   const file = bucket.file(`csv/${fileId}.csv`); // Updated path to match the upload
   const [url] = await file.getSignedUrl({
     action: 'read',
     expires: '03-01-2500', // Set a far future expiration date
   });
  
   console.log('File uploaded to Firebase and accessible at:', url);

   // Update Credits
   await updateCredits((await getUser(req.headers.authorization)).uid, - pricingModel.cleanse);
  
   res.json({ fileUrl: url });
 } catch (error) {
   console.error('Error:', error);
   res.status(500).json({ message: error.message });
 }
});




//CLEANSER END



async function createThread(msg) {
 try {
   const thread = await openai.beta.threads.create({
     messages: [
       {
         role: "user",
         content: msg,
         attachments: [{ file_id: file_store_Id, tools: [{ type: "code_interpreter" }] }],
       },
     ],
   });


   storedThreadId = thread.id;
   console.log('Thread created successfully:', thread.id);


   return storedThreadId;
 } catch (error) {
   console.error('Error creating thread:', error);
   throw new Error('Failed to create thread.');
 }
}


let runIdToBeStored = null;


async function createRun() {
 try {
   const run = await openai.beta.threads.runs.createAndPoll(storedThreadId, {
     assistant_id: storedAssistantId,
     instructions: "Please create the visualizations."
   });
   runIdToBeStored = run.id;
   console.log("Run created successfully:", runIdToBeStored);
   return runIdToBeStored;
 } catch (error) {
   console.error("Error:", error);
   throw new Error('Failed to create run.');
 }
}
var file_store_Id;

//NEW FUNCTION CREATED
app.post('/api/file_storer', async (req, res) => {
  const {fileId} = req.body;
  file_store_Id = fileId
  res.json({file_Id: fileId});
})

var formThreadId;
app.post('/api/create-form-thread', async (req, res) => {

 try {
  const thread = await openai.beta.threads.create({
    messages: [
      {
        role: "user",
        content: "for this csv, suggest appropriate visualizations. you must only return the names of the visualizations separated by commas. the only acceptable format for your output is as follows: visualization 1, visualization 2, visualization 3,... ",
        attachments: [{ file_id: file_form_Id, tools: [{ type: "code_interpreter" }] }],
      },
    ],
  });


  formThreadId = thread.id;
  console.log('Form Thread created successfully:', formThreadId);
  res.json({ id: formThreadId });
 } catch (error) {
   console.error('Error:', error);
   res.status(500).json({ message: error.message });
 }
});

app.post('/api/run-thread-form', async (req, res) => {
 try {
  const run = await openai.beta.threads.runs.createAndPoll(formThreadId, {
    assistant_id: storedAssistantId,
    instructions: "Please create the visualizations."
  });
  runIdToBeStored = run.id;
  console.log("Form Run created successfully:", runIdToBeStored);
   if (!runIdToBeStored) {
     throw new Error('No run Id available to run.');
   }


   // Polling mechanism to see if runStatus is completed
  await pollRunStatus(formThreadId,runIdToBeStored);

  console.log('Form Thread completed successfully.');
  messages = await openai.beta.threads.messages.list(formThreadId);

  res.json({ options: messages.data[0].content[0]});

 } catch (error) {
   console.error('Error:', error);
   res.status(500).json({ message: error.message });
 }
});




app.post('/api/create-thread', async (req, res) => {

  const {assistantId, selectedValueQ1, selectedValueQ2, Info} = req.body;
 
 try {
   const threadId = await createThread("create a graph for this file. You should create a " + selectedValueQ1 + " graph. The purpose of the data visualization should be " +  selectedValueQ2 + ". These are the specific trends you should focus on exploring " + Info + ".");
   res.json({ id: threadId });
 } catch (error) {
   console.error('Error:', error);
   res.status(500).json({ message: error.message });
 }
});


app.post('/api/get-response', async (req, res) => {
 try {
   const messages = await openai.beta.threads.messages.list(storedThreadId);
   res.json({ messages: messages.data });
 } catch (error) {
   console.error('Error with OpenAI API:', error);
   res.status(500).json({ error: 'An error occurred' });
 }
});

var messages;
app.post('/api/run-thread', async (req, res) => {
 try {
   const runId = await createRun();
   if (!runIdToBeStored) {
     throw new Error('No run Id available to run.');
   }


   // Polling mechanism to see if runStatus is completed
  await pollRunStatus(storedThreadId,runId);

  console.log('Thread completed successfully.');
  messages = await openai.beta.threads.messages.list(storedThreadId);
   //display thread messages

   for (var i = 0; i < messages.data.length; i++) {
     console.log("Message", i, " ", messages.data[i].content[0]);
     if (messages.data[i].content[0].type == "image_file") {
      imageId = messages.data[i].content[0].image_file.file_id;
    }
   }

   
   console.log("image id", imageId);
   const viz = await openai.files.content(imageId);
   const bufferView = new Uint8Array(await viz.arrayBuffer());
   const imagePath = `./public/visualizations/${imageId}.png`;
   fs.writeFileSync(imagePath, bufferView);
   console.log("the image is saved");


   // Upload the file to Firebase Storage
   await bucket.upload(imagePath, {
     destination: `visualizations/${imageId}.png`,
     metadata: {
       contentType: 'image/png',
     },
   });


   // Get the public URL of the uploaded file
   const file = bucket.file(`visualizations/${imageId}.png`);
   const [url] = await file.getSignedUrl({
     action: 'read',
     expires: '03-01-2500', // Set a far future expiration date
   });

   console.log('File uploaded to Firebase and accessible at:', url);

   // Update Credits
   await updateCredits((await getUser(req.headers.authorization)).uid, - pricingModel.visualization);

   res.json({ imageUrl: url, messages: messages.data, fileContent: viz });


 } catch (error) {
   console.error('Error:', error);
   res.status(500).json({ message: error.message });
 }
});

app.post('/api/get-initial-response', async (req, res) => {

  try {
    const response = await openai.beta.threads.messages.create(
      storedThreadId,
      {
        role: "user",
        content: `Say "Hello, I'm your personal Data Tool! I can provide you with statistics, summaries, and insights into the provided data."`
      }
    );

    //create the run that responds as the first message
    const run1 = await openai.beta.threads.runs.create(storedThreadId, {
      assistant_id: storedAssistantId,
    });
    console.log("ChatBot run started")
    await pollRunStatus(storedThreadId,run1.id);
    console.log('Run completed successfully.');

    await updateCredits(await getUser(req.headers.authorization).uid, - 248 * pricingModel.per_character);

    //if (runStatus.status === "failed") storedThreadId = "thread_RBtWGbi8B0fNu6gVCREGTp4o";


    messages = await openai.beta.threads.messages.list(
      storedThreadId
    );
    displayThreadMessages(messages);
    res.json({ messages: messages.data, run_id: run1.id });
  } catch (error) {
    console.error('Error getting initial response:', error);
    res.status(500).json({ message: 'Failed to get initial response.' });
  }
});

app.post('/api/send-message', async (req, res) => {
  const { message } = req.body;
  try {
    const response = await openai.beta.threads.messages.create(
      storedThreadId,
      {
        role: "user",
        content: message
      }
    );

    // Update Credits for input
    await updateCredits(await getUser(req.headers.authorization).uid, - pricingModel.per_character * message.length);

    //create the run that responds as the first message
    const run2 = await openai.beta.threads.runs.create(storedThreadId, {
      assistant_id: storedAssistantId,
    });
    console.log("ChatBot Response run started");
    await pollRunStatus(storedThreadId,run2.id);
    console.log('Run completed successfully.');

    //if (runStatus.status === "failed") storedThreadId = "thread_RBtWGbi8B0fNu6gVCREGTp4o";


    messages = await openai.beta.threads.messages.list(
      storedThreadId
    );
    displayThreadMessages(messages);

    // Update credits with output
    await updateCredits(await getUser(req.headers.authorization).uid, - pricingModel.per_character * messages.data[ messages.data.length - 1 ].content[ 0 ].length);


    res.json({ messages: messages.data, run_id: run2.id });
  } catch (error) {
    console.error('Error getting initial response:', error);
    res.status(500).json({ message: 'Failed to get initial response.' });
  }
});

app.post('/create-payment-intent', async (req, res) => {
  try {
    const { package_name, amount } = req.body;

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: 'usd',
      metadata: {
        package_name: package_name
      }
    });

    res.send({
      clientSecret: paymentIntent.client_secret
    });
  } catch (error) {
    console.error('Error creating PaymentIntent:', error);
    res.status(500).send({ error: 'An error occurred while creating the PaymentIntent' });
  }
});


// Catch-all handler to serve the React app
app.get('*', (req, res) => {
 res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});


app.listen(PORT, () => {
 console.log(`Server is running on port ${PORT}`);
});
